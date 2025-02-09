from flask import jsonify
from app import mongo
import logging

logger = logging.getLogger(__name__)

def get_leaderboard():
    try:
        pipeline = [
            {
                "$project": {
                    "username": 1,
                    "average_score": "$stats.average_score",
                    "overall_efficiency": "$stats.overall_efficiency",
                    "tests_completed": "$stats.tests_completed",
                    "all_time_best_score": "$stats.overall.all_time_best.low_level.score",
                    "all_time_best_seconds": "$stats.overall.all_time_best.low_level.seconds",
                    "last_activity": {"$arrayElemAt": ["$stats.test_history.date", -1]}  # Gets the most recent test date
                }
            },
            {
                "$sort": {
                    "average_score": -1,
                    "overall_efficiency": -1,
                    "last_activity": -1
                }
            },
            {
                "$limit": 10  # Top 10 players
            }
        ]

        leaderboard_data = list(mongo.db.users.aggregate(pipeline))
        
        # Convert MongoDB objects to JSON-serializable format
        for entry in leaderboard_data:
            entry["_id"] = str(entry["_id"])
            # Check if last_activity exists and is not None before parsing
            if "last_activity" in entry and entry["last_activity"] is not None:
                entry["last_activity"] = entry["last_activity"]
            else:
                entry["last_activity"] = None

        return jsonify({"leaderboard": leaderboard_data}), 200

    except Exception as e:
        logger.error(f"Leaderboard error: {str(e)}")
        return jsonify({'error': 'Could not retrieve leaderboard'}), 500
        

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