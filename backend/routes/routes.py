from models.models import Player, Team, TeamTournament,TeamTournamentPlayer, Tournament, Game, User, UserFavoriteGame, GameTeam
from models.enums import HomeAway
from flask import request, Blueprint
from flask_jwt_extended import  create_access_token
from datetime import date,datetime,timezone
from models.models import db
route_bp = Blueprint("routes",__name__)

@route_bp.route("/player",methods=['POST'])
def add_player():
    data = request.json
    new_player = Player(firstName=data['firstName'],lastName=data['lastName'],dateOfBirth= date(int(data['dateOfBirth']["year"]),int(data['dateOfBirth']["month"]),int(data['dateOfBirth']["day"])), height=data['height'],weigth = data['weigth'], throwingArm = data['throwingArm'], battingSide=data["battingSide"], gender=data['gender'],country=data['country'])
    db.session.add(new_player)
    db.session.commit()
    return "Successfully added player",200


@route_bp.route("/players",methods=['GET'])
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

@route_bp.route("/player/<int:player_id>",methods=['GET'])
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

@route_bp.route("/team",methods=['POST'])
def add_team():
    data = request.json
    new_team = Team(name=data['name'],tlc=data['tlc'],address=data['address'],contact=data['contact'],socialMedia=data['socialMedia'],manager=data['manager'],headCoach=data['headCoach'])
    db.session.add(new_team)
    db.session.commit()
    return "Successfully added team",200

@route_bp.route("/teams",methods=['GET'])
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


@route_bp.route("/team/<int:team_id>",methods=['GET'])
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


@route_bp.route("/tournament",methods=['POST'])
def add_tournament():
    data = request.json
    new_tournament = Tournament(name=data['name'],place=data['place'],startDate=date(data['startDate']['year'], data['startDate']['month'],data['startDate']['date'] ),endDate=date(data['endDate']['year'],data['endDate']['month'],data['endDate']['date']))
    db.session.add(new_tournament)
    db.session.commit()
    return "Successfully added tournament",200


@route_bp.route("/tournaments",methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    res = [{
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.startDate,
        'endDate': tournament.endDate,
        "place": tournament.place
    } for tournament in tournaments]
    return res,200


@route_bp.route("/tournament/<int:tournament_id>",methods=['GET'])
def get_tournament_by_id(tournament_id):
    tournament = Tournament.query.get(tournament_id)
    return {
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.startDate,
        'endDate': tournament.endDate,
        "place": tournament.place
    } 


@route_bp.route("/tournament_game/",methods=['POST'])
def add_game_to_tournament():
    query = request.args.to_dict()
    data = request.json
    tournament = Tournament.query.get(query["tournament_id"])
    new_game = Game(startTime = datetime(year=data['startTime']["year"],month=data['startTime']["month"],day=data['startTime']["day"],hour=data['startTime']["hour"],minute=data['startTime']["minutes"],tzinfo=timezone.utc),tournamentId = int(query["tournament_id"]),venue=data["venue"],venueLink=data['venueLink'])
    db.session.add(new_game)
    tournament.games.append(new_game)
    home_game_association = GameTeam(game=new_game,teamTournament= TeamTournament.query.get(data["homeTeam"]["id"]),homeAway = HomeAway.HOME)
    away_game_association = GameTeam(game=new_game,teamTournament= TeamTournament.query.get(data["awayTeam"]["id"]),homeAway = HomeAway.AWAY)
    db.session.add(home_game_association)
    db.session.add(away_game_association)
    db.session.commit()
    return "Successfully added game",200

@route_bp.route("/tournament_games/",methods=['GET'])
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
'homeTeam': home_team.teamTournament.team.name,
        "awayTeam":away_team.teamTournament.team.name,
        "startTime": game.startTime,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venueLink
        })
    return res,200

@route_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json    

    if User.query.filter_by(username=data['username']).first():
        return "This username is taken",400
    new_user = User(username=data['username'],password=data['password'],firstName=data['firstName'], lastName= data['lastName'], role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return ""

@route_bp.route("/login",methods=["POST"])
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
    

@route_bp.route("/tournament_teams/",methods=["POST"])
def add_team_to_tournament():
    query = request.args.to_dict()
    team = Team.query.get(query["team_id"])
    tournament = Tournament.query.get(query["tournament_id"])

    team_tournament_association = TeamTournament(team=team,tournament=tournament)
    db.session.add(team_tournament_association)
    db.session.commit()
    return ""


@route_bp.route("/tournament_teams/",methods=["GET"])
def get_teams_by_tournament():
    query = request.args.to_dict()
    tournament = Tournament.query.get(query["tournament_id"])
    return [ {
        'id':association.id,
        'name': association.team.name,
        "tlc":association.team.tlc,
        'logo': association.team.logo,
        'address':association.team.address,
        "contact":association.team.contact,
        "socialMedia": association.team.socialMedia,
        "manager":association.team.manager,
        "headCoach":association.team.headCoach
    } for association in tournament.teams]

@route_bp.route("/game/like/",methods=["POST"])
def like_game():
    query = request.args.to_dict()
    game = Game.query.get(query["game_id"])
    user = User.query.get(query["user_id"])

    team_tournament_association = UserFavoriteGame(game=game,user=user)
    db.session.add(team_tournament_association)
    db.session.commit()
    return "Succefully liked game"

@route_bp.route("/liked_games/",methods=["GET"])
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
        'homeTeam': home_team.teamTournament.team.name,
        "awayTeam":away_team.teamTournament.team.name,
        "startTime": association.game.startTime,
        "status": association.game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": association.game.venue,
        "venueLink": association.game.venueLink
        })
    return res,200

@route_bp.route("/game/liked/", methods=["GET"])
def is_game_liked():
    query = request.args.to_dict()
    liked_game = UserFavoriteGame.query.filter_by(gameId = query["game_id"],userId = query["user_id"]).first()
    return {"isLiked": liked_game != None}

@route_bp.route("/game/<int:game_id>",methods=["GET"])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    game_teams = GameTeam.query.filter_by(gameId = game.id).all();
    home_team = list(filter(lambda x: x.homeAway.value == "home",game_teams))[0]
    away_team = list(filter(lambda x: x.homeAway.value == "away",game_teams))[0]
    return {
        'id':game.id,
        'homeTeam': {
            "id": home_team.teamTournament.team.id,
            "name":home_team.teamTournament.team.name,
            "tlc": home_team.teamTournament.team.tlc},
        "awayTeam":{
            "id": away_team.teamTournament.team.id,
            "name":away_team.teamTournament.team.name,
                    "tlc":away_team.teamTournament.team.tlc},
        "startTime": game.startTime,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venueLink,
        "tournament":{
                "id":game.tournamentId,
                "name":game.tournament.name
            }
    }
@route_bp.route("/team_tournament/player/",methods=["POST"])
def add_player_to_team_tournament():
    query = request.args.to_dict()
    data =request.json
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    player = Player.query.get(query["player_id"])

    teamTournamentPlayerAssociation = TeamTournamentPlayer(team_tournament=teamTournament, player=player, uniformNumber = int(data["uniformNumber"]))
    db.session.add(teamTournamentPlayerAssociation)
    db.session.commit()
    return ""

@route_bp.route("/team_tournament/roster/",methods=["GET"])
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

@route_bp.route("/tournament/taken_players/",methods=["GET"])
def get_taken_players():
    query = request.args.to_dict()
    teams_tournament = TeamTournament.query.filter_by(tournament_id = query["tournament_id"]).all()
    res = []
    for teams in teams_tournament:
        for player_association in teams.players:
            res.append(player_association.player.id)
    return res

@route_bp.route("/schedule/",methods=["GET"])
def get_games_by_date():
    query = request.args.to_dict()
    day,month,year = query["day"],query["month"],query["year"]
    games = Game.query.all()
    res = []
    for game in games:
        print(game.startTime.day)
        if game.startTime.year == int(year) and game.startTime.month == int(month) and game.startTime.day == int(day):
            game_teams = GameTeam.query.filter_by(gameId = game.id).all();
            home_team = list(filter(lambda x: x.homeAway.value == "home",game_teams))[0]
            away_team = list(filter(lambda x: x.homeAway.value == "away",game_teams))[0]
            res.append({
            'id':game.id,
            'homeTeam': home_team.teamTournament.team.name,
            "awayTeam":away_team.teamTournament.team.name,
            "startTime": game.startTime,
            "status": game.status.value,
            "homeResult":home_team.result,
            "awayResult": away_team.result,
            "venue": game.venue,
            "venueLink": game.venueLink,
            "tournament":{
                "id":game.tournamentId,
                "name":game.tournament.name
            }
            })
        
    return res

