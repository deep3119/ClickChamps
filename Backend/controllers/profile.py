from flask import jsonify
from app import mongo
import logging
from datetime import datetime
from bson import ObjectId

logger = logging.getLogger(__name__)

def profile_section(current_user):
    try:
        user_data = mongo.db.users.find_one(
            {"username": current_user},
            {"password": 0}
        )

        if user_data:
            user_data["_id"] = str(user_data["_id"])
            user_data["stats"].pop("test_history", None) 
            return jsonify({
                "message": "Profile retrieved successfully",
                "user": user_data
            }), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        return jsonify({"message": "An error occurred while fetching profile"}), 500

    
def bar_graph(user_id):
    try:
        # Query the game_results collection for this user
        games = list(mongo.db.game_results.find({"user_id": ObjectId(user_id)}))
        
        # For debugging
        print(f"Found {len(games)} games for user {user_id}")
        
        scores_by_day = {}
        
        for game in games:
            # Get the created_at timestamp
            created_at = game.get("created_at")
            
            if not created_at:
                continue
                
            # If created_at is in MongoDB $date format, convert it
            if isinstance(created_at, dict) and "$date" in created_at:
                # MongoDB stores dates in milliseconds, so divide by 1000
                created_at = datetime.fromtimestamp(created_at["$date"]/1000)
            
            day = created_at.strftime('%Y-%m-%d')
            
            game_data = {
                "score": game["score"],
                "penalty": game["penalty"],
                "level": game["level"],
                "efficiency": game.get("targetEfficiency", 0)
            }
            
            if day not in scores_by_day:
                scores_by_day[day] = []
            scores_by_day[day].append(game_data)
        
        # Calculate daily stats
        daily_stats = {}
        
        for day, games_data in scores_by_day.items():
            daily_stats[day] = {
                "average_score": round(sum(game["score"] for game in games_data) / len(games_data), 2),
                "games_played": len(games_data),
                "by_level": {},
                "total_efficiency": round(sum(game["efficiency"] for game in games_data) / len(games_data), 2)
            }
            
            # Group scores by level
            levels = {}
            for game in games_data:
                level = game["level"]
                if level not in levels:
                    levels[level] = []
                levels[level].append(game["score"])
            
            # Calculate average score per level
            for level, scores in levels.items():
                daily_stats[day]["by_level"][level] = {
                    "average_score": round(sum(scores) / len(scores), 2),
                    "games_played": len(scores)
                }
        
        return jsonify({
            "status": "success",
            "data": {
                "daily_stats": daily_stats,
                "total_games": sum(len(games_data) for games_data in scores_by_day.values())
            }
        }), 200
        
    except Exception as e:
        print(f"Error in bar_graph: {str(e)}")  # Debug print
        return jsonify({
            "status": "error",
            "message": f"Error generating bar graph data: {str(e)}"
        }), 500