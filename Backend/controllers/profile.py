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
    games = mongo.db.games.find({"players.user_id": user_id})

    wpm_by_day = {}

    for game in games:
        for player in game["players"]:
            if player["user_id"] == user_id:
                finished_at = player.get("finished_at")  # Use `.get()` to avoid KeyError
                
                if not finished_at:  # Skip if `finished_at` is None
                    continue  

                # Convert MongoDB date format if needed
                if isinstance(finished_at, dict) and "$date" in finished_at:
                    finished_at = datetime.utcfromtimestamp(finished_at["$date"] / 1000)

                day = finished_at.strftime('%Y-%m-%d')  # Extract the day

                # Append WPM to the list for that day
                wpm_by_day.setdefault(day, []).append(player["wpm"])

    # Calculate average WPM per day
    avg_wpm_by_day = {day: sum(wpms) / len(wpms) for day, wpms in wpm_by_day.items()}

    return jsonify(avg_wpm_by_day)