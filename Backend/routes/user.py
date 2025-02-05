from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.user.auth_controller import login, register

# Blueprint definition
user = Blueprint('user', __name__)


@user.route('/login', methods=['POST'])
def login_route():
    username_or_email = request.json.get('username_or_email')
    password = request.json.get('password')
    return login(username_or_email, password)


@user.route('/register', methods=['POST'])
def register_route():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    return register(username, email, password)
