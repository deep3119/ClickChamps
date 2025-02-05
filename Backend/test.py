from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room
import random
import time

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'
    socketio.init_app(app)

    SENTENCES = [
        "The quick brown fox jumps over the lazy dog.",
        "Python is an amazing programming language.",
        "Real-time applications are fun to build.",
        "Flask and Socket.IO make a great combination.",
        "Practice makes perfect when it comes to typing."
    ]

    games = {}

    @app.route('/')
    def index():
        return render_template('index.html')

    @socketio.on('create_game')
    def handle_create_game(username):
        game_id = str(random.randint(1000, 9999))
        games[game_id] = {
            'creator': username,  # Track the creator
            'players': [{'username': username, 'isCreator': True}],  # Store players as objects
            'sentence': random.choice(SENTENCES),
            'start_time': None,
            'results': {},
            'stats': {}
        }
        join_room(game_id)
        emit('game_created', {
            'game_id': game_id,
            'is_creator': True  # The creator is always the first player
        }, room=game_id)


    @socketio.on('join_game')
    def handle_join_game(data):
        game_id = data['game_id']
        username = data['username']
        if game_id in games:
            join_room(game_id)
            is_creator = username == games[game_id]['creator']  # Check if the user is the creator
            games[game_id]['players'].append({'username': username, 'isCreator': is_creator})  # Add player as an object
            emit('player_joined', {'username': username}, room=game_id)
            emit('update_players', {
                'players': games[game_id]['players']  # Send the list of player objects
            }, room=game_id)
        else:
            emit('error', {'message': 'Game not found'})

    def join_game(game_id, username):
        games[game_id]['players'].append(username)
        is_creator = username == games[game_id]['creator']  # Check if the user is the creator
        emit('player_joined', {'username': username}, room=game_id)
        emit('update_players', {'players': games[game_id]['players'], 'is_creator': is_creator}, room=game_id)  # Send is_creator flag


    @socketio.on('start_game_for_all')
    def handle_start_game_for_all(data):
        game_id = data['game_id']
        if game_id in games:
            print(f"Starting game for all players in room: {game_id}")  # Debug log
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

    return app

app = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True,transport=['websockets'])