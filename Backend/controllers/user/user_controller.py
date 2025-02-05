from flask import jsonify
from app import mongo
import logging

logger = logging.getLogger(__name__)

def profile(current_user):
    try:
        user_data = mongo.db.users.find_one(
            {"username": current_user},
            {"password": 0}
        )

        if user_data:
            user_data["_id"] = str(user_data["_id"])
            return jsonify({
                "message": "Profile retrieved successfully",
                "user": user_data
            }), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        return jsonify({"message": "An error occurred while fetching profile"}), 500