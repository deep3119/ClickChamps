from flask import Flask, send_from_directory
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from sockets.game_sockets import register_game_sockets
from datetime import timedelta
from flask_cors import CORS

# Global variables for extensions
mongo = None
bcrypt = None
socketio = None


def create_app():
    global mongo, bcrypt, socketio
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True},})
    
    # MongoDB configuration
    app.config["MONGO_URI"] = "mongodb://localhost:27017/ClickChamps"
    app.config['SECRET_KEY'] = '1Click@Champs1'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)

    # Initialize extensions
    mongo = PyMongo(app)
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)
    socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173", async_mode=None)

    # Register Socket.IO event handlers
    register_game_sockets(socketio)
    # @socketio.on('message')
    # def handle_message(msg):
    #     print(f"Received message: {msg}")
    #     socketio.send(msg, broadcast=True)

    # Importing routes
    from routes.user import user
    from routes.game import game
    from routes.profile import profile
    from routes.leaderboard import leaderboard
    app.register_blueprint(user, url_prefix='/user')
    app.register_blueprint(game, url_prefix='/game')
    app.register_blueprint(profile, url_prefix='/profile')
    app.register_blueprint(leaderboard, url_prefix='/leaderboard')

    @app.route('/')
    def index():
        return send_from_directory('static', 'index.html')

    return app  # Return the app instance

app = create_app()  # Assign the returned app instance

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000, use_reloader=False)