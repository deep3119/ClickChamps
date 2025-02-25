from flask_socketio import join_room, emit
import random
import time

# In-memory storage for active games
games = {}

def register_game_sockets(socketio):
    @socketio.on('create_game')
    def handle_create_game(username, mode):
        print(f"Received create_game event: username={username}, mode={mode}")
        
        # Validate 'mode' parameter
        if mode not in ["easy", "medium", "hard"]:
            emit('error', {'message': 'Invalid mode. Must be "easy", "medium", or "hard".'})
            return
        
        # Generate a random game ID
        game_id = str(random.randint(1000, 9999))
        
        # Store game data
        games[game_id] = {
            'creator': username,
            'mode': mode,
            'players': [{'username': username, 'isCreator': True}],
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
            # Check if the player is already in the game
            if any(player['username'] == username for player in games[game_id]['players']):
                emit('error', {'message': 'You are already in this game.'})
                return
            
            # Add the player to the game
            join_room(game_id)
            is_creator = username == games[game_id]['creator']
            games[game_id]['players'].append({'username': username, 'isCreator': is_creator})
            
            # Notify all players in the room
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
            
            # Emit the game start event with the mode
            emit('game_started_for_all', {
                'mode': games[game_id]['mode'],
                'start_time': games[game_id]['start_time']
            }, room=game_id)
        else:
            emit('error', {'message': 'Game not found'})

    # Correct server-side handler (remove the first incorrect one)
    @socketio.on('submit_result')
    def handle_submit_result(data):
        game_id = data['game_id']
        username = data['username']
        score = data['score']
        penalty = data['penalty']
        targetEfficiency = data['targetEfficiency']
        
        if game_id in games:
            games[game_id]['results'][username] = {
                'score': score,
                'penalty': penalty,
                'targetEfficiency': targetEfficiency
            }
            
            emit('result_submitted', {
                'username': username,
                'score': score,
                'penalty': penalty,
                'targetEfficiency': targetEfficiency
            }, room=game_id)
            
            if len(games[game_id]['results']) == len(games[game_id]['players']):
                emit('game_over', {'results': games[game_id]['results']}, room=game_id)
                del games[game_id]
            game_id = data['game_id']
            username = data['username']
            targetEfficiency = data['targetEfficiency']
            score = data['score']
            
            if game_id in games:
                # Store the player's result
                games[game_id]['results'][username] = {
                    'targetEfficiency': targetEfficiency,
                    'score': score
                }
                
                # Emit the result submission to all players
                emit('result_submitted', {
                    'username': username,
                    'targetEfficiency': targetEfficiency,
                    'score': score
                }, room=game_id)
                
                # Check if all players have submitted their results
                if len(games[game_id]['results']) == len(games[game_id]['players']):
                    # Emit the game over event with all results
                    emit('game_over', {'results': games[game_id]['results']}, room=game_id)
                    
                    # Clean up the game room
                    del games[game_id]
                game_id = data['game_id']
                username = data['username']
                score = data['score']
                penalty = data['penalty']
                targetEfficiency = data['targetEfficiency']
                
                if game_id in games:
                    # Store the player's result
                    games[game_id]['results'][username] = {
                        'score': score,
                        'penalty': penalty,
                        'targetEfficiency': targetEfficiency
                    }
                    
                    # Emit the result submission to all players
                    emit('result_submitted', {
                        'username': username,
                        'score': score,
                        'penalty': penalty,
                        'targetEfficiency': targetEfficiency
                    }, room=game_id)
                    
                    # Check if all players have submitted their results
                    if len(games[game_id]['results']) == len(games[game_id]['players']):
                        emit('game_over', {'results': games[game_id]['results']}, room=game_id)
                        del games[game_id]