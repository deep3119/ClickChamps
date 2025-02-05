from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.game.game_controller import store_game_result  # Import new controller

# Blueprint definition for game results
game = Blueprint('game', __name__)

# Store the game result (score, penalty, etc.)
@game.route('/store_result', methods=['POST'])
@jwt_required()
def store_game_result_route():
    try:
        current_user = get_jwt_identity()  # Get the current user from JWT
        return store_game_result(request, current_user)
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

