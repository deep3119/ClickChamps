from flask_socketio import join_room, emit
from flask import jsonify
import random
import time
from utils.fake_data import generate_sample_text

# Game sentences

# In-memory storage for active games
games = {}

def register_game_sockets(socketio):
    @socketio.on('create_game')
    def handle_create_game(username, mode, word_count=None, time_duration=None):
        print(f"Received create_game event: username={username}, mode={mode}, word_count={word_count}, time_duration={time_duration}")

        # Validate 'mode' parameter
        if mode not in ["words", "time"]:
            emit('error', {'message': 'Invalid mode. Must be "words" or "time".'})
            return

        # Validate 'word_count' or 'time_duration' based on the mode
        if mode == "words" and word_count not in [15, 30, 45]:
            emit('error', {'message': 'Invalid word count. Must be 15, 30, or 45.'})
            return
        if mode == "time" and time_duration not in [15, 30, 60]:
            emit('error', {'message': 'Invalid time duration. Must be 15, 30, or 60 seconds.'})
            return

        # Generate a random game ID and sentence
        game_id = str(random.randint(1000, 9999))
        text = generate_sample_text(word_count) if mode == "words" else generate_sample_text(45)

        # Store game data
        games[game_id] = {
            'creator': username,
            'players': [{'username': username, 'isCreator': True}],
            'sentence': text,
            'start_time': None,
            'results': {},
            'stats': {}
        }

        # Join the creator to the game room
        join_room(game_id)
        emit('game_created', {'game_id': game_id, 'is_creator': True}, room=game_id)

    @socketio.on('join_game')
    def handle_join_game(data):
        game_id = data['game_id']
        username = data['username']
        if game_id in games:
            join_room(game_id)
            is_creator = username == games[game_id]['creator']
            games[game_id]['players'].append({'username': username, 'isCreator': is_creator})
            emit('player_joined', {'username': username}, room=game_id)
            emit('update_players', {'players': games[game_id]['players']}, room=game_id)
        else:
            emit('error', {'message': 'Game not found'})

    @socketio.on('start_game_for_all')
    def handle_start_game_for_all(data):
        game_id = data['game_id']
        if game_id in games:
            print(f"Starting game for all players in room: {game_id}")
            games[game_id]['start_time'] = time.time()
            emit('game_started_for_all', {
                'sentence': games[game_id]['sentence'],
                'start_time': games[game_id]['start_time']
            }, room=game_id)

    @socketio.on('update_stats')
    def handle_update_stats(data):
        game_id = data['game_id']
        username = data['username']
        wpm = data['wpm']
        accuracy = data['accuracy']

        if game_id in games:
            games[game_id]['stats'][username] = {'wpm': wpm, 'accuracy': accuracy}
            emit('update_leaderboard', games[game_id]['stats'], room=game_id)

    @socketio.on('submit_result')
    def handle_submit_result(data):
        game_id = data['game_id']
        username = data['username']
        typed_text = data['typed_text']
        wpm = data['wpm']
        accuracy = data['accuracy']

        if game_id in games:
            games[game_id]['results'][username] = {'wpm': wpm, 'accuracy': accuracy}
            emit('result_submitted', {
                'username': username,
                'wpm': wpm,
                'accuracy': accuracy
            }, room=game_id)

            if len(games[game_id]['results']) == len(games[game_id]['players']):
                emit('game_over', {'results': games[game_id]['results']}, room=game_id)
                del games[game_id]