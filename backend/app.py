from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, Date, JSON,text
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date
from typing import Optional
import enum
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
CORS(app)
db =  SQLAlchemy(app)

@app.route("/player",methods=['POST'])
def add_player():
    data = request.json
    new_player = Player(firstName=data['firstName'],lastName=data['lastName'],dateOfBirth= date(int(data['dateOfBirth']["year"]),int(data['dateOfBirth']["month"]),int(data['dateOfBirth']["day"])), height=data['height'],weigth = data['weigth'], throwingArm = data['throwingArm'], battingSide=data["battingSide"], gender=data['gender'],country=data['country'])
    db.session.add(new_player)
    db.session.commit()
    return "Successfully added player",200


@app.route("/players",methods=['GET'])
def get_players():
    players = Player.query.all()
    res = [{
        'id':player.id,
        'firstName': player.firstName,
        'lastName': player.lastName,
        'dateOfBirth': player.dateOfBirth,
        'height': player.height,
        'weigth': player.weigth,
        'throwingArm':player.throwingArm.value,
        'battingSide':player.battingSide.value,
        "gender":player.gender.value,
        "country":player.country
    } for player in players]
    return res,200

@app.route("/player/<int:player_id>",methods=['GET'])
def get_player_by_id(player_id):
    player = Player.query.get(player_id)
    return {
        'id':player.id,
        'firstName': player.firstName,
        'lastName': player.lastName,
        'dateOfBirth': player.dateOfBirth,
        'height': player.height,
        'weigth': player.weigth,
        'throwingArm':player.throwingArm.value,
        'battingSide':player.battingSide.value,
        "gender":player.gender.value,
        "country":player.country
    }

@app.route("/team",methods=['POST'])
def add_team():
    data = request.json
    new_team = Team(name=data['name'],tlc=data['tlc'],address=data['address'],contact=data['contact'],socialMedia=data['socialMedia'],manager=data['manager'],headCoach=data['headCoach'])
    db.session.add(new_team)
    db.session.commit()
    return "Successfully added team",200

@app.route("/teams",methods=['GET'])
def get_teams():
    teams = Team.query.all()
    res = [{
        'id':team.id,
        'name': team.name,
        "tlc":team.tlc,
        'logo': team.logo,
        'address':team.address,
        "contact":team.contact,
        "socialMedia": team.socialMedia,
        "manager":team.manager,
        "headCoach":team.headCoach
    } for team in teams]
    return res,200


@app.route("/team/<int:team_id>",methods=['GET'])
def get_team_by_id(team_id):
    team = Team.query.get(team_id)
    return {
        'id':team.id,
        'name': team.name,
        "tlc":team.tlc,
        'logo': team.logo,
        'address':team.address,
        "contact":team.contact,
        "socialMedia": team.socialMedia,
        "manager":team.manager,
        "headCoach":team.headCoach
    }


@app.route("/tournament",methods=['POST'])
def add_tournament():
    data = request.json
    print(data['startDate'])
    new_team = Tournament(name=data['name'],place=data['place'],startDate=date(data['startDate']['year'], data['startDate']['month'],data['startDate']['date'] ),endDate=date(data['endDate']['year'],data['endDate']['month'],data['endDate']['date']))
    db.session.add(new_team)
    db.session.commit()
    return "Successfully added tournament",200


@app.route("/tournaments",methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    res = [{
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.startDate,
        'endDate': tournament.endDate,
    } for tournament in tournaments]
    return res,200


@app.route("/tournament/<int:tournament_id>",methods=['GET'])
def get_tournament_by_id(tournament_id):
    tournament = Tournament.query.get(tournament_id)
    return {
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.startDate,
        'endDate': tournament.endDate,
    } 


class Handedness(enum.Enum):
    LEFTY = "L"
    RIGHTY = "R"
    AMBIDEXTROUS = "S"

class Genders(enum.Enum):
    MALE = "M"
    FEMALE = "F"

class Player(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    firstName: Mapped[str] = mapped_column(String(30),nullable=False)
    lastName: Mapped[str] = mapped_column(String(30),nullable=False)
    dateOfBirth: Mapped[Optional[date]] = mapped_column(Date)
    country: Mapped[Optional[str]]
    height: Mapped[Optional[int]]
    weigth: Mapped[Optional[int]]
    throwingArm: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    battingSide: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    gender: Mapped[Optional[Genders]] = mapped_column(Enum(Genders))


class Team(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    tlc: Mapped[str] = mapped_column(String(3), nullable=False)
    logo: Mapped[Optional[str]] = mapped_column(String(100))
    socialMedia: Mapped[Optional[JSON]] = mapped_column(JSON)
    address: Mapped[Optional[str]] = mapped_column(String(200))
    contact: Mapped[Optional[str]] = mapped_column(String(20))
    manager: Mapped[Optional[str]] = mapped_column(String(100))
    headCoach: Mapped[Optional[str]] = mapped_column(String(100))



class Tournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    place: Mapped[str] = mapped_column(String(100))
    startDate: Mapped[date] = mapped_column(Date)
    endDate: Mapped[date] = mapped_column(Date)



with app.app_context():

    db.create_all()

if __name__ == "__main__":
    app.run(host="localhost",port=6363,debug=True)
