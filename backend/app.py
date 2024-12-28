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


@app.route("/tournament_game/",methods=['POST'])
def add_game_to_tournament():
    query = request.args.to_dict()
    data = request.json
    tournament = Tournament.query.get(query["tournament_id"])
    new_game = Game(startTime = datetime(year=data['startTime']["year"],month=data['startTime']["month"],day=data['startTime']["day"],hour=data['startTime']["hour"],minute=data['startTime']["minutes"],tzinfo=timezone.utc),tournamentId = int(query["tournament_id"]),venue=data["venue"],venueLink=data['venueLink'])
    db.session.add(new_game)
    tournament.games.append(new_game)
    home_game_association = GameTeam(game=new_game,team= Team.query.get(data["homeTeam"]["id"]),homeAway = HomeAway.HOME)
    away_game_association = GameTeam(game=new_game,team= Team.query.get(data["awayTeam"]["id"]),homeAway = HomeAway.AWAY)
    db.session.add(home_game_association)
    db.session.add(away_game_association)
    db.session.commit()
    return "Successfully added game",200

@app.route("/tournament_games/",methods=['GET'])
def get_games_by_tournament():
    query = request.args.to_dict()
    tournament = Tournament.query.get(query["tournament_id"])
    res = []
    for game in tournament.games:
        game_teams = GameTeam.query.filter_by(gameId = game.id).all();
        home_team = list(filter(lambda x: x.homeAway.value == "home",game_teams))[0]
        away_team = list(filter(lambda x: x.homeAway.value == "away",game_teams))[0]
        res.append({
        'id':game.id,
        'homeTeam': home_team.team.name,
        "awayTeam":away_team.team.name,
        "startTime": game.startTime,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venueLink
        })
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
        access_token = create_access_token(identity=user.id,additional_claims={"user":{"id":user.id,"username":user.username,"firstName":user.firstName,"lastName":user.lastName,"password":user.password,"role":user.role.value}})
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

@app.route("/game/like/",methods=["POST"])
def like_game():
    query = request.args.to_dict()
    game = Game.query.get(query["game_id"])
    user = User.query.get(query["user_id"])

    team_tournament_association = UserFavoriteGame(game=game,user=user)
    db.session.add(team_tournament_association)
    db.session.commit()
    return "Succefully liked game"

@app.route("/liked_games/",methods=["GET"])
def get_liked_games():
    query = request.args.to_dict()
    user = User.query.get(query["user_id"])
    res=[]
    for association in user.favoriteGames:
        game_teams = GameTeam.query.filter_by(gameId = association.game.id).all();
        home_team = list(filter(lambda x: x.homeAway.value == "home",game_teams))[0]
        away_team = list(filter(lambda x: x.homeAway.value == "away",game_teams))[0]
        res.append({
        'id':association.game.id,
        'homeTeam': home_team.team.name,
        "awayTeam":away_team.team.name,
        "startTime": association.game.startTime,
        "status": association.game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": association.game.venue,
        "venueLink": association.game.venueLink
        })
    return res,200

@app.route("/game/liked/", methods=["GET"])
def is_game_liked():
    query = request.args.to_dict()
    liked_game = UserFavoriteGame.query.filter_by(gameId = query["game_id"],userId = query["user_id"]).first()
    return {"isLiked": liked_game != None}

@app.route("/game/<int:game_id>",methods=["GET"])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    game_teams = GameTeam.query.filter_by(gameId = game.id).all();
    home_team = list(filter(lambda x: x.homeAway.value == "home",game_teams))[0]
    away_team = list(filter(lambda x: x.homeAway.value == "away",game_teams))[0]
    return {
        'id':game.id,
        'homeTeam': {
            "name":home_team.team.name,
            "tlc": home_team.team.tlc},
        "awayTeam":{"name":away_team.team.name,
                    "tlc":away_team.team.tlc},
        "startTime": game.startTime,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venueLink
    }
@app.route("/team_tournament/player/",methods=["POST"])
def add_player_to_team_tournament():
    query = request.args.to_dict()
    data =request.json
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    player = Player.query.get(query["player_id"])

    teamTournamentPlayerAssociation = TeamTournamentPlayer(team_tournament=teamTournament, player=player, uniformNumber = int(data["uniformNumber"]))
    db.session.add(teamTournamentPlayerAssociation)
    db.session.commit()
    return ""

@app.route("/team_tournament/roster/",methods=["GET"])
def get_players_by_team_tournament():
    query = request.args.to_dict()
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    res = []
    for association in teamTournament.players:
        player = association.player
        res.append({
            "id": player.id,
            "firstName":player.firstName,
            "lastName": player.lastName,
            "uniformNumber": association.uniformNumber,
            "dateOfBirth": player.dateOfBirth,
            "country":player.country
        })
    return res

@app.route("/tournament/taken_players/",methods=["GET"])
def get_taken_players():
    query = request.args.to_dict()
    teams_tournament = TeamTournament.query.filter_by(tournament_id = query["tournament_id"]).all()
    res = []
    for teams in teams_tournament:
        for player_association in teams.players:
            res.append(player_association.player.id)
    return res

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

class HomeAway(enum.Enum):
    HOME = "home"
    AWAY = "away"


class Player(db.Model):
    __tablename__ = "Player"
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
    teams_tournaments: Mapped[List["TeamTournamentPlayer"]] = relationship(back_populates="player")

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
    games: Mapped[List["GameTeam"]] = relationship(back_populates="team")


class Tournament(db.Model):
    __tablename__ = "Tournament"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    place: Mapped[str] = mapped_column(String(100))
    startDate: Mapped[date] = mapped_column(Date)
    endDate: Mapped[date] = mapped_column(Date)
    teams: Mapped[List["TeamTournament"]] = relationship(back_populates="tournament")
    games: Mapped[List["Game"]] = relationship(back_populates="tournament")

    
class TeamTournament(db.Model):
    __tablename__ = "TeamTournament"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("Team.id"))
    tournament_id: Mapped[int] = mapped_column(ForeignKey("Tournament.id"))
    team: Mapped["Team"] = relationship(back_populates="tournaments")
    tournament: Mapped["Tournament"] = relationship(back_populates="teams")
    __table_args__ = (
        db.UniqueConstraint("team_id","tournament_id",name="unique_team_tournament"),
    )
    players: Mapped[List["TeamTournamentPlayer"]] = relationship(back_populates="team_tournament")

class TeamTournamentPlayer(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    player_id: Mapped[int] =  mapped_column(ForeignKey("Player.id"))
    team_tournament_id: Mapped[int] =  mapped_column(ForeignKey("TeamTournament.id"))
    player: Mapped["Player"] = relationship(back_populates="teams_tournaments")
    team_tournament: Mapped["TeamTournament"] = relationship(back_populates="players")
    uniformNumber: Mapped[int] = mapped_column(Integer,nullable=False)

class Game(db.Model):
    __tablename__ = "Game"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    tournamentId: Mapped[int] = mapped_column(ForeignKey("Tournament.id"))
    tournament: Mapped["Tournament"] = relationship(back_populates="games")
    startTime: Mapped[datetime] = mapped_column(DateTime,nullable=False)
    status:  Mapped[Optional[GameStatuses]] = mapped_column(Enum(GameStatuses),default=GameStatuses.SCHEDULED)
    scoringStatus: Mapped[Optional[str]] = mapped_column(String(10))
    venue: Mapped[str] = mapped_column(String(60), nullable=False)
    venueLink: Mapped[Optional[str]] = mapped_column(String(100))
    teams: Mapped[List["GameTeam"]] = relationship(back_populates="game")
    userLikes: Mapped[List["UserFavoriteGame"]] = relationship(back_populates="game")

class GameTeam(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    teamId: Mapped[int] = mapped_column(ForeignKey("Team.id"))
    gameId: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    game: Mapped["Game"] = relationship(back_populates="teams")
    team: Mapped["Team"] = relationship(back_populates="games")
    result: Mapped[int] = mapped_column(Integer,nullable=False,default=0)
    homeAway: Mapped[HomeAway] = mapped_column(Enum(HomeAway),nullable=False)
    __table_args__ = (db.UniqueConstraint("gameId","homeAway",name="unique_game_home_away"),)

class User(db.Model):
    __tablename__="User"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(60),nullable=False,unique=True)
    password: Mapped[str] = mapped_column(String(60),nullable=False)
    firstName: Mapped[str] = mapped_column(String(60),nullable=False)
    lastName: Mapped[str] = mapped_column(String(60),nullable=False)
    role: Mapped[UserRoles] = mapped_column(Enum(UserRoles), nullable=False)
    favoriteGames: Mapped[List["UserFavoriteGame"]] = relationship(back_populates="user")

class UserFavoriteGame(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    gameId: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    userId: Mapped[int] = mapped_column(ForeignKey("User.id"))

    game: Mapped["Game"] = relationship(back_populates="userLikes")
    user: Mapped["User"] = relationship(back_populates="favoriteGames")

with app.app_context():
    # db.session.execute(text("DROP TABLE Game"))
    # db.session.commit()
    # db.drop_all()
    db.create_all()
    

if __name__ == "__main__":
    app.run(host="localhost",port=6363,debug=True,threaded=True)
