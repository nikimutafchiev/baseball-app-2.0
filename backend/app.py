from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, Date, JSON, DateTime,text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,DeclarativeBase
from datetime import date, datetime, timezone
from typing import Optional,List
from flask_jwt_extended import  create_access_token,JWTManager
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

import enum
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SECRET_KEY'] = 'mcskdcmk2mkd23kmdkkm33ksodcoexsd'
app.config["JWT_SECRET_KEY"] = 'csimdcisdmc5d1eaaa59e6480eb1ff546458903fc90551fb4dbef1f0ef204f18aaf903a39e9'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
CORS(app)
db =  SQLAlchemy(app)
jwt = JWTManager(app)

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
    new_tournament = Tournament(name=data['name'],place=data['place'],startDate=date(data['startDate']['year'], data['startDate']['month'],data['startDate']['date'] ),endDate=date(data['endDate']['year'],data['endDate']['month'],data['endDate']['date']))
    db.session.add(new_tournament)
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


@app.route("/game",methods=['POST'])
def add_game():
    data = request.json
    new_game = Game(homeTeam = data['homeTeam'], awayTeam = data['awayTeam'],startTime = datetime(year=data['startTime']["year"],month=data['startTime']["month"],day=data['startTime']["day"],hour=data['startTime']["hour"],minute=data['startTime']["minutes"],tzinfo=timezone.utc))
    db.session.add(new_game)
    db.session.commit()
    return "Successfully added tournament",200

@app.route("/games",methods=['GET'])
def get_games():
    games = Game.query.all()
    res = [{
        'id':game.id,
        'homeTeam': game.homeTeam,
        "awayTeam":game.awayTeam,
        "startTime": game.startTime,
        "status": game.status.value,
        "homeResult":game.homeResult,
        "awayResult": game.awayResult
    } for game in games]
    return res,200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json    

    if User.query.filter_by(username=data['username']).first():
        return "This username is taken",400
    new_user = User(username=data['username'],password=data['password'],firstName=data['firstName'], lastName= data['lastName'], role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return ""

@app.route("/login",methods=["POST"])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and user.password == password:
        access_token = create_access_token(identity=user.id,additional_claims={"user":{"username":user.username,"firstName":user.firstName,"lastName":user.lastName,"password":user.password,"role":user.role.value}})
        return {'access_token': access_token}
    else:
        return {},400
    

@app.route("/tournament_teams/",methods=["POST"])
def add_team_to_tournament():
    query = request.args.to_dict()
    team = Team.query.get(query["team_id"])
    tournament = Tournament.query.get(query["tournament_id"])

    team_tournament_association = TeamTournament(team=team,tournament=tournament)
    db.session.add(team_tournament_association)
    db.session.commit()
    return ""


@app.route("/tournament_teams/",methods=["GET"])
def get_teams_by_tournament():
    query = request.args.to_dict()
    tournament = Tournament.query.get(query["tournament_id"])
    return [ {
        'id':association.team_id,
        'name': association.team.name,
        "tlc":association.team.tlc,
        'logo': association.team.logo,
        'address':association.team.address,
        "contact":association.team.contact,
        "socialMedia": association.team.socialMedia,
        "manager":association.team.manager,
        "headCoach":association.team.headCoach
    } for association in tournament.teams]

class Handedness(enum.Enum):
    LEFTY = "L"
    RIGHTY = "R"
    AMBIDEXTROUS = "S"

class Genders(enum.Enum):
    MALE = "M"
    FEMALE = "F"

class GameStatuses(enum.Enum):
    ENDED = "ended"
    SCHEDULED = "scheduled"
    LIVE = "live"

class UserRoles(enum.Enum):
    ADMIN = "admin"
    USER = "user"
class Base(DeclarativeBase):
    pass


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
    __tablename__ = "Team"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    tlc: Mapped[str] = mapped_column(String(3), nullable=False)
    logo: Mapped[Optional[str]] = mapped_column(String(100))
    socialMedia: Mapped[Optional[JSON]] = mapped_column(JSON)
    address: Mapped[Optional[str]] = mapped_column(String(200))
    contact: Mapped[Optional[str]] = mapped_column(String(20))
    manager: Mapped[Optional[str]] = mapped_column(String(100))
    headCoach: Mapped[Optional[str]] = mapped_column(String(100))
    tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="team")


class Tournament(db.Model):
    __tablename__ = "Tournament"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    place: Mapped[str] = mapped_column(String(100))
    startDate: Mapped[date] = mapped_column(Date)
    endDate: Mapped[date] = mapped_column(Date)
    teams: Mapped[List["TeamTournament"]] = relationship(back_populates="tournament")

    
class TeamTournament(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("Team.id"))
    tournament_id: Mapped[int] = mapped_column(ForeignKey("Tournament.id"))

    team: Mapped["Team"] = relationship(back_populates="tournaments")
    tournament: Mapped["Tournament"] = relationship(back_populates="teams")


class Game(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    homeTeam: Mapped[str] = mapped_column(String(60), nullable=False)
    awayTeam: Mapped[str] = mapped_column(String(60), nullable=False)
    startTime: Mapped[datetime] = mapped_column(DateTime,nullable=False)
    status:  Mapped[Optional[GameStatuses]] = mapped_column(Enum(GameStatuses),default=GameStatuses.SCHEDULED)
    scoringStatus: Mapped[Optional[str]] = mapped_column(String(10))
    homeResult: Mapped[int] = mapped_column(Integer, nullable=False, default = 0)
    awayResult: Mapped[int] = mapped_column(Integer, nullable=False, default = 0)


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(60),nullable=False,unique=True)
    password: Mapped[str] = mapped_column(String(60),nullable=False)
    firstName: Mapped[str] = mapped_column(String(60),nullable=False)
    lastName: Mapped[str] = mapped_column(String(60),nullable=False)
    role: Mapped[UserRoles] = mapped_column(Enum(UserRoles), nullable=False)


with app.app_context():
    # db.session.execute(text("DROP TABLE User"))
    # db.session.commit()
    db.create_all()
    

if __name__ == "__main__":
    app.run(host="localhost",port=6363,debug=True)
