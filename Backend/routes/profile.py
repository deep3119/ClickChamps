from flask import Blueprint,jsonify
from app import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.profile import profile_section, bar_graph


# Blueprint definition
profile = Blueprint('profile', __name__)

@profile.route('/data', methods=['GET'])
@jwt_required()
def profile_route():
    current_user = get_jwt_identity()
    return profile_section(current_user)


@profile.route('/score_over_time', methods=['GET'])
@jwt_required()  # Protect the endpoint with JWT authentication
def get_wpm_over_time():
    current_user = get_jwt_identity()
    
    # Fetch user from the database using `current_user`
    user = mongo.db.users.find_one({"username": current_user}, {"_id": 1})
    print(user)
    if not user:
        return jsonify({"message": "User not found"}), 404

    user_id = user["_id"]  # Get the ObjectId directly
    return bar_graph(user_id)
    