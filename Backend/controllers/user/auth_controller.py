from flask import jsonify, make_response
from app import mongo, bcrypt  # Import bcrypt from your Flask app
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def login(username_or_email, password):
    try:
        if not username_or_email or not password:
            return jsonify({"message": "Username/email and password are required"}), 400

        user_data = mongo.db.users.find_one({
            "$or": [
                {"username": username_or_email},
                {"email": username_or_email}
            ]
        })
        # Use Flask-Bcrypt to check the password
        if user_data and bcrypt.check_password_hash(user_data['password'], password):
            from flask_jwt_extended import create_access_token
            access_token = create_access_token(identity=user_data['username'])

            response = make_response(jsonify({
            "message": "Login successful",
            "username": user_data['username'],
            "email": user_data['email'],
            "access_token": access_token,
            "stats": user_data.get('stats', {})
            }), 200)
            return response
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        logger.error(f"Error during login: {e}")
        return jsonify({"message": "An error occurred during login"}), 500

def register(username, email, password):
    try:
        if not username or not email or not password:
            return jsonify({"message": "Username, email, and password are required"}), 400

        if "@" not in email or "." not in email:
            return jsonify({"message": "Invalid email format"}), 400

        existing_user = mongo.db.users.find_one({"$or": [{"username": username}, {"email": email}]})
        if existing_user:
            if existing_user["username"] == username:
                return jsonify({"message": "Username already exists"}), 400
            else:
                return jsonify({"message": "Email already exists"}), 400

        # Hash the password using Flask-Bcrypt
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        mongo.db.users.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password,
            "stats": {
                "overall": {
                    "all_time_best": {"low_level": {"score": 0, "seconds": 0},"medium_level": {"score": 0, "seconds": 0},"hard_level": {"score": 0, "seconds": 0}},
                },
                "test_history": []  # Initialize empty test history
            },
            "created_at": datetime.now()
        })
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        logger.error(f"Error during registration: {e}")
        return jsonify({"message": "An error occurred during registration"}), 500