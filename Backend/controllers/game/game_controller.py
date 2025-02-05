from flask import jsonify
from app import mongo
from datetime import datetime

def store_game_result(request, current_user):
    try:
        # Extract data from the request
        score = request.json.get('score')
        penalty = request.json.get('penalty')
        targetEfficiency = request.json.get('targetEfficiency')
        level = request.json.get('level')
        
        # Fetch user from the database using current_user
        user = mongo.db.users.find_one({"$or": [{"username": current_user}, {"email": current_user}]})
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Prepare the game result document
        game_result = {
            "user_id": user["_id"],
            "score": score,
            "penalty": penalty,
            "level": level,
            "targetEfficiency": targetEfficiency,
            "created_at": datetime.utcnow()
        }

        # Store the game result in the database
        game_result_id = str(mongo.db.game_results.insert_one(game_result).inserted_id)

        # Retrieve current stats for the user
        current_stats = user.get('stats', {})
        tests_completed = current_stats.get('tests_completed', 0) + 1  # Increment test count by 1
        
        # Calculate the new average score
        previous_total_score = current_stats.get('average_score', 0) * current_stats.get('tests_completed', 0)
        new_average_score = (previous_total_score + score) / tests_completed

        # Retrieve all_time_best stats (preserving existing data)
        all_time_best = current_stats.get('all_time_best', {
            "low_level": {"score": 0, "seconds": 0},
            "medium_level": {"score": 0, "seconds": 0},
            "hard_level": {"score": 0, "seconds": 0}
        })
        test_history = current_stats.get('test_history', [])

        # Update level-specific scores in all_time_best (only if the new score is higher)
        if level.lower() == "low":
            if score > all_time_best["low_level"]["score"]:
                all_time_best["low_level"] = {"score": score, "seconds": penalty}

        elif level.lower() == "medium":
            if score > all_time_best["medium_level"]["score"]:
                all_time_best["medium_level"] = {"score": score, "seconds": penalty}

        elif level.lower() == "hard":
            if score > all_time_best["hard_level"]["score"]:
                all_time_best["hard_level"] = {"score": score, "seconds": penalty}

        # Add the new test result to test_history, ensuring no duplicates
        new_test_entry = {
            "score": score,
            "penalty": penalty,
            "targetEfficiency": targetEfficiency,
            "level": level,
            "date": datetime.utcnow().isoformat()
        }

        # Ensure the new test result is unique in test_history
        if not any(
            test['score'] == new_test_entry['score'] and test['level'] == new_test_entry['level'] and test['date'] == new_test_entry['date']
            for test in test_history
        ):
            test_history.append(new_test_entry)

        # Update only the necessary fields in the user's stats (without overwriting everything)
        mongo.db.users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "stats.tests_completed": tests_completed,
                    "stats.average_score": new_average_score,
                    "stats.all_time_best": all_time_best,  # Only update all_time_best (ensure no duplication)
                    "stats.test_history": test_history,  # Only update test_history
                }
            }
        )

        return jsonify({"message": "Game result stored and user stats updated successfully", "game_result_id": game_result_id}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred while storing the result: {str(e)}"}), 500
