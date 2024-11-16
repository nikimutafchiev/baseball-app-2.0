from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, Date
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from typing import Optional
import enum
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
CORS(app)
db =  SQLAlchemy(app)

@app.route("/add_player",methods=['POST'])
def add_player():
    data = request.json
    new_player = Player(first_name=data['firstName'],last_name=data['lastName'])
    db.session.add(new_player)
    db.session.commit()
    print([player.first_name+""+player.last_name for player in Player.query.all()])
    return ""

class Handedness(enum.Enum):
    LEFTY = "L"
    RIGHTY = "R"
    AMBIDEXTROUS = "S"

class Genders(enum.Enum):
    MALE = "M"
    FEMALE = "F"

class Player(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(30),nullable=False)
    last_name: Mapped[str] = mapped_column(String(30),nullable=False)
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date)
    height: Mapped[Optional[int]]
    weigth: Mapped[Optional[int]]
    throwing_arm: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    batting_side: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    gender: Mapped[Optional[Genders]] = mapped_column(Enum(Genders))


class Team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    logo: Mapped[str] = mapped_column(String(100), nullable= False)


class Tournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    venue: Mapped[str] = mapped_column(String(100))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="localhost")
