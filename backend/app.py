from flask import Flask
from flask_cors import CORS

from flask_jwt_extended import  JWTManager
from models.models import db
from routes.routes import route_bp

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SECRET_KEY'] = 'mcskdcmk2mkd23kmdkkm33ksodcoexsd'
app.config["JWT_SECRET_KEY"] = 'csimdcisdmc5d1eaaa59e6480eb1ff546458903fc90551fb4dbef1f0ef204f18aaf903a39e9'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
CORS(app)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(route_bp)

with app.app_context():
    # db.drop_all()
    db.create_all()
    

if __name__ == "__main__":
    app.run(host="localhost",port=6363,debug=True,threaded=True)
