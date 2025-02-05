from flask import jsonify
from app import mongo
import logging

logger = logging.getLogger(__name__)

def get_leaderboard():
    try:
        leaderboard_data = []
        leaderboard = mongo.db.users.find()

        for user in leaderboard:
            overall_stats = user.get('stats', {}).get('overall', {})
            all_time_best = overall_stats.get('all_time_best', {})
            leaderboard_data.append({
                'username': user.get('username'),
                'wpm': overall_stats.get('average_wpm', 0),
                'accuracy': overall_stats.get('overall_accuracy', 0),
                'best_time_mode_wpm': all_time_best.get('time_mode', {}).get('wpm', 0),
                'best_words_mode_wpm': all_time_best.get('words_mode', {}).get('wpm', 0)
            })

        return jsonify({"leaderboard": leaderboard_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

def get_user_stats(user_id):
    try:
        user = mongo.db.users.find_one({"username": user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user_stats = {
            'username': user['username'],
            'stats': user['stats']
        }
        
        return jsonify(user_stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500