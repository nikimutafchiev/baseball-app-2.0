from models.models import Player, Team, TeamTournament,TeamTournamentPlayer, Tournament, Game, User, UserGame, GameTeam,GameTeamTeamTournamentPlayer, Situation
from models.enums import HomeAway, GameStatuses
from flask import request, Blueprint
from flask_jwt_extended import  create_access_token,jwt_required
from datetime import date,datetime,timezone
from models.models import db
import bcrypt
route_bp = Blueprint("routes",__name__)


    
def merge_dicts(srcDict:dict,destDict:dict):
    for key in srcDict:
        if key in destDict:
            destDict[key] = destDict[key] + srcDict[key]
        else:
            destDict.update({key: srcDict[key]})

def get_stats(situations_list:list,player_id:int):
    res = {
        "PA":0,
        "H":0,
        "AB":0,
        "SO":0,
        "BB":0,
        "HBP":0,
        "AVG":0,
        "SLG":0,
        "1B":0,
        "2B":0,
        "3B":0,
        "HR":0,
        "R":0,
        "RBI":0,
        "IBB":0,
        "OPS":0,
        "TB":0,
        "XBH":0,
        "ROE":0,
        "PO":0,
        "A":0,
        "E":0,
        "TC":0,
        "FIP":0,
        "SB":0,
        "SF":0,
        "CS":0,
        "BABIP":0,
        "RC":0
    }
    #TODO Да се оптимизира TB,XBH да се смятат накрая
    for situation in situations_list:
        if situation.data["batter"]["player"]["id"] == player_id :
            
            if situation.data["situationCategory"] != "":
                res["PA"] += 1
            if situation.data["situationCategory"] == "hit":
                res["H"] += 1
                if situation.data["situation"] == "Single":
                    res["1B"] +=1
                elif situation.data["situation"] == "Double":
                    res["2B"] +=1
                elif situation.data["situation"] == "Triple":
                    res["3B"] +=1
                elif situation.data["situation"] == "Homerun":
                    res["HR"] +=1
            if situation.data["situationCategory"] == "walk":
                res["BB"] +=1
                if situation.data["situation"] == "Intentional walk":
                    res["IBB"]+=1
            if situation.data["situationCategory"] == "hit by pitch":
                res["HBP"] +=1
            if situation.data["situationCategory"] == "strikeout":
                res["SO"] +=1
            if situation.data["situationCategory"] in ["hit","fielder's choice","error","strikeout","groundout","flyout"]:
                res["AB"] +=1
            if situation.data["situationCategory"] == "error":
                res["ROE"] +=1
            if situation.data["situationCategory"] == "sacrifice flyout":
                res["SF"]+=1 
            for runner_situation in situation.data["runners"]:
                if runner_situation["finalBase"] == "Home":
                    res["RBI"] += 1
        for runner_situation in situation.data["runners"]:
            if runner_situation["player"]["player"]["id"] == player_id:
                if runner_situation["finalBase"] == "Home":
                    res["R"] += 1
                if runner_situation["situationCategory"] == 'stolen base':
                    res["SB"] +=1
                if runner_situation["situationCategory"] == 'caught stealing':
                    res["CS"]+=1
            if runner_situation.get("outs"):
                for out in runner_situation["outs"]:
                    if player_id == out["player"]["id"]:
                        res["PO"]+=1
            if runner_situation.get("assists"):
                for assist in situation.data["assists"]:
                    if player_id == assist["player"]["id"]:
                        res["A"]+=1
            if runner_situation.get("errors"):
                for error in situation.data["errors"]:
                    if player_id == error["player"]["id"]:
                        res["E"]+=1
        for out in situation.data["defense"]["outs"]:
            if player_id == out["player"]["id"]:
                res["PO"]+=1
        for assist in situation.data["defense"]["assists"]:
            if player_id == assist["player"]["id"]:
                res["A"]+=1
        for error in situation.data["defense"]["errors"]:
            if player_id == error["player"]["id"]:
                res["E"]+=1
    res["XBH"] += res["2B"]+res["3B"]+res["HR"]
    res["TB"] += res["1B"]+2*res["2B"]+3*res['3B']+4*res["HR"]
    res["TC"] += res["PO"]+res["A"]+res["E"]
    return res                    







@route_bp.route("/player",methods=['POST'])
@jwt_required()
def add_player():
    data = request.json

    if "firstName" not in data or "lastName" not in data or  "dateOfBirth" not in data or "height" not in data or "weigth" not in data or "throwingArm" not in data or"battingSide" not in data or "gender" not in data or "country" not in data or "image" not in data:
        return {"message":"Invalid data type"},400
    
    new_player = Player(first_name=data['firstName'],last_name=data['lastName'],date_of_birth= date(int(data['dateOfBirth']["year"]),int(data['dateOfBirth']["month"]),int(data['dateOfBirth']["day"])), height=data['height'],weigth = data['weigth'], throwing_arm = data['throwingArm'], batting_side=data["battingSide"], gender=data['gender'],country=data['country'],image=data['image'])
    db.session.add(new_player)
    db.session.commit()
    return "Successfully added player",200


@route_bp.route("/players",methods=['GET'])
def get_players():
    players = Player.query.all()
    res = [{
        'id':player.id,
        'firstName': player.first_name,
        'lastName': player.last_name,
        'dateOfBirth': player.date_of_birth,
        'height': player.height,
        'weigth': player.weigth,
        'throwingArm':player.throwing_arm.value if player.throwing_arm else "",
        'battingSide':player.batting_side.value if player.batting_side else "",
        "gender":player.gender.value if player.gender else "",
        "country":player.country,
        "image":player.image
    } for player in players]
    return res,200

@route_bp.route("/player/<int:player_id>",methods=['GET'])
def get_player_by_id(player_id):
    player = Player.query.get(player_id)
    return {
        'id':player.id,
        'firstName': player.first_name,
        'lastName': player.last_name,
        'dateOfBirth': player.date_of_birth,
        'height': player.height,
        'weigth': player.weigth,
        'throwingArm':player.throwing_arm.value if player.throwing_arm else "",
        'battingSide':player.batting_side.value if player.batting_side else "",
        "gender":player.gender.value if player.gender else "",
        "country":player.country,
        "image":player.image
    }

@route_bp.route("/team",methods=['POST'])
def add_team():
    data = request.json
    if "name" not in data or "tlc" not in data or "address" not in data or "contact" not in data or "socialMedia" not in data or "manager" not in data or "headCoach" not in data or "image" not in data:
        return {"message":"Invalid data"},400
    new_team = Team(name=data['name'],tlc=data['tlc'],address=data['address'],contact=data['contact'],social_media=data['socialMedia'],manager=data['manager'],head_coach=data['headCoach'],image=data["image"])
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
        'address':team.address,
        "contact":team.contact,
        "socialMedia": team.social_media,
        "manager":team.manager,
        "headCoach":team.head_coach,
        "image":team.image
    } for team in teams]
    return res,200


@route_bp.route("/team/<int:team_id>",methods=['GET'])
def get_team_by_id(team_id):
    team = Team.query.get(team_id)
    return {
        'id':team.id,
        'name': team.name,
        "tlc":team.tlc,
        'address':team.address,
        "contact":team.contact,
        "socialMedia": team.social_media,
        "manager":team.manager,
        "headCoach":team.head_coach,
        "image":team.image
    }


@route_bp.route("/tournament",methods=['POST'])
def add_tournament():
    data = request.json
    if "name" not in data or "place" not in data or "startDate" not in data or "endDate" not in data or "image" not in data:
        return {"message":"Invalid data"},400
    new_tournament = Tournament(name=data['name'],place=data['place'],start_date=date(data['startDate']['year'], data['startDate']['month'],data['startDate']['date'] ),end_date=date(data['endDate']['year'],data['endDate']['month'],data['endDate']['date']),image=data['image'])
    db.session.add(new_tournament)
    db.session.commit()
    return "Successfully added tournament",200


@route_bp.route("/tournaments",methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    res = [{
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.start_date,
        'endDate': tournament.end_date,
        "place": tournament.place,
        "image":tournament.image
    } for tournament in tournaments]
    return res,200


@route_bp.route("/tournament/<int:tournament_id>",methods=['GET'])
def get_tournament_by_id(tournament_id):
    tournament = Tournament.query.get(tournament_id)
    return {
        'id':tournament.id,
        'name': tournament.name,
        "startDate":tournament.start_date,
        'endDate': tournament.end_date,
        "place": tournament.place,
        "image":tournament.image
    } 


@route_bp.route("/tournament_game/",methods=['POST'])
def add_game_to_tournament():
    query = request.args.to_dict()
    data = request.json

    if "tournament_id" not in query or "startTime" not in data or "homeTeam" not in data or "awayTeam" not in data or "venue" not in data or "venueLink" not in data:
        return {"message":"Invalid data or query parameters"},400
    
    tournament = Tournament.query.get(query["tournament_id"])
    new_game = Game(start_time = datetime(year=data['startTime']["year"],month=data['startTime']["month"],day=data['startTime']["day"],hour=data['startTime']["hour"],minute=data['startTime']["minutes"],tzinfo=timezone.utc),tournament_id = int(query["tournament_id"]),venue=data["venue"],venue_link=data['venueLink'])
    db.session.add(new_game)
    tournament.games.append(new_game)
    home_game_association = GameTeam(game=new_game,team_tournament= TeamTournament.query.filter_by(team_id = data["homeTeam"]["id"],tournament_id = tournament.id).first(),home_away = HomeAway.HOME)
    db.session.add(home_game_association)
    db.session.commit()

    away_game_association = GameTeam(game=new_game,team_tournament= TeamTournament.query.filter_by(team_id = data["awayTeam"]["id"],tournament_id = tournament.id).first(),home_away = HomeAway.AWAY)
    db.session.add(away_game_association)
    db.session.commit()
    return "Successfully added game",200

@route_bp.route("/tournament_games/",methods=['GET'])
def get_games_by_tournament():
    query = request.args.to_dict()
    if "tournament_id" not in query:
        return {"message":"Invalid query parameters"},400
    tournament = Tournament.query.get(query["tournament_id"])
    res = []
    for game in tournament.games:
        game_teams = GameTeam.query.filter_by(game_id = game.id).all();
        home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
        away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
        res.append({
        'id':game.id,
        'homeTeam': home_team.team_tournament.team.name,
        "awayTeam":away_team.team_tournament.team.name,
        "startTime": game.start_time,
        "awayTeamImage":away_team.team_tournament.team.image,
        "homeTeamImage":home_team.team_tournament.team.image,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venue_link
        })
    return res,200

@route_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json    
    if "password" not in data or "username" not in data or "firstName" not in data or "lastName" not in data or "role" not in data:
        return {"message":"Invalid data"},400
    bytes = data["password"].encode('utf-8') 
    salt = bcrypt.gensalt() 
    hash = bcrypt.hashpw(bytes, salt) 

    if User.query.filter_by(username=data['username']).first():
        return "This username is taken",400
    new_user = User(username=data['username'],password=hash,first_name=data['firstName'], last_name= data['lastName'], role=data['role'])
    db.session.add(new_user)
    db.session.commit()
    return ""

@route_bp.route("/login",methods=["POST"])
def login():
    data = request.json
    if "username" not in data or "password" not in data:
        return {"message":"Invalid data"},400
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    #str ->422
    if user and bcrypt.checkpw(password.encode('utf-8'),user.password):
        access_token = create_access_token(identity=str(user.id),additional_claims={"user":{"id":user.id,"username":user.username,"firstName":user.first_name,"lastName":user.last_name,"role":user.role.value}})
        return {'access_token': access_token}
    else:
        return {},400
    
@route_bp.route("/is_logged/",methods=["GET"])
def is_logged():
    query = request.args.to_dict()
    if "username" not in query or "password" not in query:
        return {"message":"Invalid query parameters"},400
    username = query['username']
    password = query['password']
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return "",200
    else:
        return "",401



@route_bp.route("/tournament_teams/",methods=["POST"])
@jwt_required()
def add_team_to_tournament():
    query = request.args.to_dict()
    if "team_id" not in query or "tournament_id" not in query:
        return {"message":"Invalid query params"},400
    team = Team.query.get(query["team_id"])
    tournament = Tournament.query.get(query["tournament_id"])

    team_tournament_association = TeamTournament(team=team,tournament=tournament)
    db.session.add(team_tournament_association)
    db.session.commit()
    return ""


@route_bp.route("/tournament_teams/",methods=["GET"])
def get_teams_by_tournament():
    query = request.args.to_dict()
    if "tournament_id" not in query:
        return {"message":"Invalid query parameters"},400
    tournament = Tournament.query.get(query["tournament_id"])
    return [ {
        'id':association.team.id,
        'name': association.team.name,
        "tlc":association.team.tlc,
        'image': association.team.image,
        'address':association.team.address,
        "contact":association.team.contact,
        "socialMedia": association.team.social_media,
        "manager":association.team.manager,
        "headCoach":association.team.head_coach
    } for association in tournament.teams]

@route_bp.route("/game/assign/", methods=["POST"])
def assign_game():
    query = request.args.to_dict()
    if "game_id" not in query or "username" not in query:
        return {"message":"Invalid query paramters"},400
    game = Game.query.get(query["game_id"])
    user = User.query.filter_by(username=query["username"]).first()
    if not user:
        return {"message":"There is no such user"}
    gameUser = UserGame.query.filter_by(game_id = query["game_id"],user_id = user.id).first()
    if gameUser:
        if not gameUser.is_assigned and not gameUser.is_to_do:
            gameUser.is_assigned =  True
            db.session.commit()
            return {"message":"Successfully assigned game"}
        elif gameUser.is_assigned:
            gameUser.is_assigned = False
            db.session.commit()
            return {"message":"Successfully unassigned game"}
        else:
            return {"message":"Game is already accepted by the user"}
    else:
        user_game_association = UserGame(game=game,user=user,is_assigned=True,assigner_id=query["assigner_id"])
        db.session.add(user_game_association)
        db.session.commit()
    return {"message":"Successfully assigned game"}

@route_bp.route("/assigned_games/",methods=["GET"])
def get_assigned_games():
    query = request.args.to_dict()
    if "user_id" not in query:
        return {"message":"Invalid query parameters"},400
    userGames = UserGame.query.filter_by(user_id = query["user_id"]).all()
    res=[]
    for userGame in userGames:
        if userGame.is_assigned:
            game_teams = GameTeam.query.filter_by(game_id = userGame.game.id).all();
            home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
            away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
            assigner = User.query.get(userGame.assigner_id)
            res.append({
            'id':userGame.game.id,
            'homeTeam': home_team.team_tournament.team.name,
            "awayTeam":away_team.team_tournament.team.name,
            "homeTeamImage": home_team.team_tournament.team.image,
            "awayTeamImage": away_team.team_tournament.team.image,
            "startTime": userGame.game.start_time,
            "status": userGame.game.status.value,
            "homeResult":home_team.result,
            "awayResult": away_team.result,
            "venue": userGame.game.venue,
            "venueLink": userGame.game.venue_link,
            "assigner": assigner.first_name+" "+ assigner.last_name
            })
    return res,200

@route_bp.route("/game/to_do/", methods=["POST"])
def to_do_game():
    query = request.args.to_dict()
    if "user_id" not in query or "game_id" not in query:
        return {"message":"Invalid query parameters"},400
    game = Game.query.get(query["game_id"])
    user = User.query.get(query["user_id"])
    gameUser = UserGame.query.filter_by(game_id = query["game_id"],user_id = query["user_id"]).first()
    if gameUser:
        gameUser.is_to_do =  not gameUser.is_to_do
        gameUser.is_assigned = False
        db.session.commit()
    else:
        user_game_association = UserGame(game=game,user=user,is_assigned=True)
        db.session.add(user_game_association)
        db.session.commit()
    return ""

@route_bp.route("/to_do_games/",methods=["GET"])
def get_to_do_games():
    query = request.args.to_dict()
    if "user_id" not in query:
        return {"message":"Invalid query parameters"},400
    userGames = UserGame.query.filter_by(user_id = query["user_id"]).all()
    res=[]
    for userGame in userGames:
        if userGame.is_to_do:
            game_teams = GameTeam.query.filter_by(game_id = userGame.game.id).all();
            home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
            away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
            res.append({
            'id':userGame.game.id,
            'homeTeam': home_team.team_tournament.team.name,
            "awayTeam":away_team.team_tournament.team.name,
            "homeTeamImage": home_team.team_tournament.team.image,
            "awayTeamImage": away_team.team_tournament.team.image,
            "startTime": userGame.game.start_time,
            "status": userGame.game.status.value,
            "homeResult":home_team.result,
            "awayResult": away_team.result,
            "venue": userGame.game.venue,
            "venueLink": userGame.game.venue_link
            })
    return res,200

@route_bp.route("/game/like/",methods=["POST"])
def like_game():
    query = request.args.to_dict()
    if "game_id" not in query or "user_id" not in query:
        return {"message":"Invalid query parameters"},400
    game = Game.query.get(query["game_id"])
    user = User.query.get(query["user_id"])
    gameUser = UserGame.query.filter_by(game_id = query["game_id"],user_id = query["user_id"]).first()
    if gameUser:
        gameUser.is_liked =  not gameUser.is_liked
        db.session.commit()
    else:
        user_game_association = UserGame(game=game,user=user,is_liked=True)
        db.session.add(user_game_association)
        db.session.commit()
    return "Succefully liked/disliked game"

@route_bp.route("/liked_games/",methods=["GET"])
def get_liked_games():
    query = request.args.to_dict()
    if "user_id" not in query:
        return {"message":"Invalid query parameters"},400
    userGames = UserGame.query.filter_by(user_id = query["user_id"]).all()
    res=[]
    for userGame in userGames:
        if userGame.is_liked:
            game_teams = GameTeam.query.filter_by(game_id = userGame.game.id).all();
            home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
            away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
            res.append({
            'id':userGame.game.id,
            'homeTeam': home_team.team_tournament.team.name,
            "awayTeam":away_team.team_tournament.team.name,
            "homeTeamImage": home_team.team_tournament.team.image,
            "awayTeamImage": away_team.team_tournament.team.image,
            "startTime": userGame.game.start_time,
            "status": userGame.game.status.value,
            "homeResult":home_team.result,
            "awayResult": away_team.result,
            "venue": userGame.game.venue,
            "venueLink": userGame.game.venue_link
            })
    return res,200

@route_bp.route("/game/liked/", methods=["GET"])
def is_game_liked():
    query = request.args.to_dict()
    if "user_id" not in query or "game_id" not in query:
        return {"message":"Invalid query parameters"},400
    liked_game = UserGame.query.filter_by(game_id = query["game_id"],user_id = query["user_id"]).first()
    return {"isLiked": liked_game.is_liked  if liked_game else False}

@route_bp.route("/game/<int:game_id>",methods=["GET"])
def get_game_by_id(game_id):
    game = Game.query.get(game_id)
    game_teams = GameTeam.query.filter_by(game_id = game.id).all();
    home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
    away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
    return {
        'id':game.id,
        'homeTeam': {
            "id": home_team.team_tournament.team.id,
            "name":home_team.team_tournament.team.name,
            "tlc": home_team.team_tournament.team.tlc,
            "image": home_team.team_tournament.team.image,
            "hits":home_team.hits,
            "errors":home_team.errors,
            "lob":home_team.lob},
        "awayTeam":{
            "id": away_team.team_tournament.team.id,
            "name":away_team.team_tournament.team.name,
                    "tlc":away_team.team_tournament.team.tlc,
                    "image": away_team.team_tournament.team.image,
                    "hits":away_team.hits,
            "errors":away_team.errors,
            "lob":away_team.lob},
        "startTime": game.start_time,
        "status": game.status.value,
        "homeResult":home_team.result,
        "awayResult": away_team.result,
        "venue": game.venue,
        "venueLink": game.venue_link,
        "tournament":{
                "id":game.tournament_id,
                "name":game.tournament.name
            },
        "inning": game.inning,
        "inningHalf": game.inning_half,
        "homeBattingTurn":game.home_batting_order,
        "awayBattingTurn":game.away_batting_order,
        "outs": game.outs,
        "runners":game.runners,
        "pointsByInning":game.pointsByInning
    }
@route_bp.route("/team_tournament/player/",methods=["POST"])
def add_player_to_team_tournament():
    query = request.args.to_dict()
    data =request.json
    if "team_id" not in query or "tournament_id" not in query:
        return {"message":"Invalid query parameters"},400
    if "uniformNumber" not in data:
        return {"message":"Invalid data"},400
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    player = Player.query.get(query["player_id"])

    teamTournamentPlayerAssociation = TeamTournamentPlayer(team_tournament=teamTournament, player=player, uniform_number = int(data["uniformNumber"]))
    db.session.add(teamTournamentPlayerAssociation)
    db.session.commit()
    return ""

@route_bp.route("/team_tournament/roster/",methods=["GET"])
def get_players_by_team_tournament():
    query = request.args.to_dict()
    if "team_id" not in query or "tournament_id" not in query:
        return {"message":"Invalid query parameters"},400
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    res = []
    for association in teamTournament.players:
        player = association.player
        res.append({
            "id": player.id,
            "firstName":player.first_name,
            "lastName": player.last_name,
            "uniformNumber": association.uniform_number,
            "dateOfBirth": player.date_of_birth,
            "country":player.country,
            "image":player.image
        })
    return res

@route_bp.route("/tournament/taken_players/",methods=["GET"])
def get_taken_players():
    query = request.args.to_dict()
    if "tournament_id" not in query:
        return {"message":"Invalid query parameters"},400
    teams_tournament = TeamTournament.query.filter_by(tournament_id = query["tournament_id"]).all()
    res = []
    for teams in teams_tournament:
        for player_association in teams.players:
            res.append(player_association.player.id)
    return res

@route_bp.route("/schedule/",methods=["GET"])
def get_games_by_date():
    query = request.args.to_dict()
    if "day" not in query or "month" not in query or "year" not in query:
        return {"message":"Invalid query parameters"},400
    day,month,year = query["day"],query["month"],query["year"]
    games = Game.query.all()
    res = []
    for game in games:
        if game.start_time.year == int(year) and game.start_time.month == int(month) and game.start_time.day == int(day):
            game_teams = GameTeam.query.filter_by(game_id = game.id).all();
            home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
            away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
            res.append({
            'id':game.id,
            'homeTeam': home_team.team_tournament.team.name,
            "awayTeam":away_team.team_tournament.team.name,
            "homeTeamImage": home_team.team_tournament.team.image,
            "awayTeamImage": away_team.team_tournament.team.image,
            "startTime": game.start_time,
            "status": game.status.value,
            "homeResult":home_team.result,
            "awayResult": away_team.result,
            "venue": game.venue,
            "venueLink": game.venue_link,
            "tournament":{
                "id":game.tournament_id,
                "name":game.tournament.name
            }
            })
        
    return res

@route_bp.route("/game/team/roster/",methods=["GET"])
def get_game_team_roster():
    query = request.args.to_dict()
    if "game_id" not in query or "home_away" not in query:
        return {"message":"Invalid query parameters"},400
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    res=[]
    for player in game_team.players:
        stats = {
        }
        merge_dicts(get_stats(game_team.game.situations,player.team_tournament_player.player.id),stats)
        # for situation in game_team.game.situations:
        #     if situation.data["batter"]["player"]["id"] == player.id :
        #         if situation.data["situationCategory"] != "":
        #             stats["PA"] += 1
        #         if situation.data["situationCategory"] == "hit":
        #             stats["H"] += 1
        #             if situation.data["situation"] == "Single":
        #                 stats["1B"] +=1
        #             elif situation.data["situation"] == "Double":
        #                 stats["2B"] +=1
        #             elif situation.data["situation"] == "Triple":
        #                 stats["3B"] +=1
        #             elif situation.data["situation"] == "Homerun":
        #                 stats["HR"] +=1
        #         if situation.data["situationCategory"] == "walk":
        #             stats["BB"] +=1
        #         if situation.data["situationCategory"] == "hit by pitch":
        #             stats["HBP"] +=1
        #         if situation.data["situationCategory"] == "strikeout":
        #             stats["SO"] +=1
        #         if situation.data["situationCategory"] in ["hit","fielder's choice","error","strikeout","groundout","flyout"]:
        #             stats["AB"] +=1
        #         for runner_situation in situation.data["runners"]:
        #             if runner_situation["finalBase"] == "Home":
        #                 stats["RBI"] += 1
        #     for runner_situation in situation.data["runners"]:
        #         if runner_situation["player"]["player"]["id"]== player.id:
        #                 if runner_situation["finalBase"] == "Home":
        #                     stats["R"] += 1        
                                
                        
        stats["AVG"] = stats["H"]/stats["AB"] if stats["AB"] != 0 else 0
        stats["OBP"] = (stats["H"]+stats["BB"]+stats["HBP"])/stats["PA"] if stats["PA"] != 0 else 0
        stats["SLG"] = (stats["1B"] + 2*stats["2B"] + 3*stats["3B"] + 4*stats["HR"])/stats["AB"] if stats["AB"] != 0 else 0
        res.append({
            "battingOrder": player.batting_order,
            "position": player.position,
            "uniformNumber":player.team_tournament_player.uniform_number,
            "player":{
                "id":player.team_tournament_player.player.id,
                "firstName":player.team_tournament_player.player.first_name,
                "lastName":player.team_tournament_player.player.last_name,
                
            },"stats":stats
        })

    return res

@route_bp.route("/game/team/roster/player", methods=["POST"])
def add_player_to_game_roster():
    data = request.json
    if "game_id" not in data or "tournament_id" not in data or "team_id" not in data or "home_away" not in data or"position" not in data or "battingOrder" not in data:
        return {"message":"Invalid data"},400
    gameTeam = GameTeam.query.filter_by(game_id=data["game_id"],home_away=data["home_away"]).first()
    teamTournament = TeamTournament.query.filter_by(team_id=data["team_id"],tournament_id = data["tournament_id"]).first()
    teamTournamentPlayer = TeamTournamentPlayer.query.filter_by(team_tournament_id = teamTournament.id, player_id = data["player_id"]).first()

    association = GameTeamTeamTournamentPlayer(game_team = gameTeam, team_tournament_player = teamTournamentPlayer,position = data["position"],batting_order=int(data['battingOrder']))
    db.session.add(association)
    db.session.commit()

    return ""

@route_bp.route("/game/<int:game_id>/situation",methods=["POST"])
def add_game_situation(game_id):
    data = request.json
    if "data" not in data:
        return {"message":"Invalid data"},400
    situation = Situation(data = data["data"],game_id = game_id)
    db.session.add(situation)
    db.session.commit()

    return "Succefully added situation"

@route_bp.route("/game/<int:game_id>/situations", methods=["GET"])
def get_game_situations(game_id):
    game = Game.query.get(game_id)
    res = []
    for situation in game.situations:
        res.append({
            "id":situation.id,
            "data":situation.data
            })
    return res

@route_bp.route("/game/<int:game_id>/change_inning", methods=["POST"])
def change_inning(game_id):
    game = Game.query.get(game_id)
    if game.inning_half == "UP":
        game.inning_half = "DOWN"
    elif game.inning < 9:
        game.inning_half = "UP"
        game.inning += 1
    else:
        game.status = GameStatuses.ENDED
        game_teams = GameTeam.query.filter_by(game_id = game_id).all();
        home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
        away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]   
        if home_team.result > away_team.result:
            home_team.is_winner = True
        elif home_team.result < away_team.result:
            away_team.is_winner = True
    db.session.commit()
    return ""


@route_bp.route("/game_team/change_score/", methods=["POST"])
def change_score():
    data = request.json
    query = request.args.to_dict()
    if "game_id" not in query or "home_away" not in query:
        return {"message":"Invalid query parameters"},400
    if "points" not in data:
        return {"message":"Invalid data"},400
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    game_team.result += data["points"]
    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/change_batting_turn",methods=["POST"])
def change_batting_order(game_id):
    data = request.json
    if "homeAway" not in data or "battingTurn" not in data:
        return {"message":"Invalid data"},400
    home_away = data["homeAway"]
    game = Game.query.get(game_id)
    if home_away == "HOME":
        game.home_batting_order = data["battingTurn"]
    else:
        game.away_batting_order = data["battingTurn"]
    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/change_outs", methods=["POST"])
def change_outs(game_id):
    data = request.json
    if "outs" not in data:
        return {"message":"Invalid data"},400
    game = Game.query.get(game_id)
    
    game.outs = data["outs"]
    db.session.commit()
    return ""

@route_bp.route("/game_team/change_lob/", methods=["POST"])
def change_lob():
    data = request.json
    query = request.args.to_dict()
    if "game_id" not in query or "home_away" not in query:
        return {"message":"Invalid query parameters"},400
    if "lob" not in data:
        return {"message":"Invalid data"},400
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    game_team.lob = data["lob"]

    db.session.commit()
    return ""

@route_bp.route("/game_team/change_hits/", methods=["POST"])
def change_hits():
    data = request.json
    query = request.args.to_dict()
    if "game_id" not in query or "home_away" not in query:
        return {"message":"Invalid query parameters"},400
    if "hits" not in data:
         return {"message":"Invalid data"},400
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    game_team.hits = data["hits"]

    db.session.commit()
    return ""

@route_bp.route("/game_team/change_errors/", methods=["POST"])
def change_errors():
    data = request.json
    query = request.args.to_dict()
    if "game_id" not in query or "home_away" not in query:
         return {"message":"Invalid query parameters"},400
    if "errors" not in data:
         return {"message":"Invalid data"},400
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    game_team.errors = data["errors"]

    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/change_points_by_inning", methods=["POST"])
def change_points_by_inning(game_id):
    data = request.json
    if "points" not in data:
         return {"message":"Invalid data"},400
    game = Game.query.get(game_id)
    game.pointsByInning = data["points"]
    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/start",methods=["POST"])
def start_game(game_id):
    game = Game.query.get(game_id)
    game.status = GameStatuses.LIVE
    db.session.commit()
    return ""
    
@route_bp.route("/game/<int:game_id>/change_runners", methods=["POST"])
def change_runners(game_id):
    data = request.json
    if "runners" not in data:
         return {"message":"Invalid data"},400
    game = Game.query.get(game_id)
    game.runners = data["runners"]
    db.session.commit()
    return ""

@route_bp.route("/player/<int:player_id>/teams/",methods=["GET"])
def get_player_teams(player_id):
    query = request.args.to_dict()
    #TODO
    year_ids = eval(str(query.get("year_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    player = Player.query.get(player_id)
    res = []
    for team_tournament in player.teams_tournaments:
        if tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids or not tournament_ids:
            if id_in_list(team_tournament.team_tournament.team.id,res) == None:
                res.append({
                'id':team_tournament.team_tournament.team.id,
                'name': team_tournament.team_tournament.team.name,
                })
    return res

@route_bp.route("/player/<int:player_id>/tournaments/",methods=["GET"])
def get_player_tournaments(player_id):
    query = request.args.to_dict()
    #TODO
    year_ids = eval(str(query.get("year_ids")))
    team_ids = eval(str(query.get("team_ids")))
    player = Player.query.get(player_id)
    res = []
    for team_tournament in player.teams_tournaments:
         if team_ids and team_tournament.team_tournament.team_id in team_ids or not team_ids:
            res.append({
            'id':team_tournament.team_tournament.tournament.id,
            'name': team_tournament.team_tournament.tournament.name,
            })
    return res

@route_bp.route("/player/<int:player_id>/years/",methods=["GET"])
def get_player_years(player_id):
    query = request.args.to_dict()
    team_ids = eval(str(query.get("team_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    player = Player.query.get(player_id)
    res = set()
    for team_tournament in player.teams_tournaments:
        if (team_ids and team_tournament.team_tournament.team_id in team_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids) or (not team_ids and not tournament_ids):

            for gameTeam in team_tournament.team_tournament.games:
                res.add(gameTeam.game.start_time.year)
    return list(res)

def id_in_list(id,list):
    for i in range(0,len(list)):
        if list[i]["id"] == id:
            return i
    return None

@route_bp.route("/player/<int:player_id>/stats/",methods=["GET"])
def get_player_stats(player_id):
    query = request.args.to_dict()
    team_ids = eval(str(query.get("team_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    game_id = query.get("game_id")
    years = eval(str(query.get("years")))
    player = Player.query.get(player_id)

    res = {}
    merge_dicts(get_stats([],None),res)
    for team_tournament in player.teams_tournaments:
        if (team_ids and team_tournament.team_tournament.team_id in team_ids and not tournament_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids and not team_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids and team_ids and team_tournament.team_tournament.team_id in team_ids)or (not team_ids and not tournament_ids):
           for gameTeam in team_tournament.team_tournament.games:
                if game_id and gameTeam.game_id == game_id or not game_id or years and gameTeam.game.start_time.year in years:
                    merge_dicts(get_stats(gameTeam.game.situations,player.id),res)
                             
                    
    res["AVG"] = res["H"]/res["AB"] if res["AB"] != 0 else 0
    res["OBP"] = (res["H"]+res["BB"]+res["HBP"])/res["PA"] if res["PA"] != 0 else 0
    res["SLG"] = res["TB"]/res["AB"] if res["AB"] != 0 else 0
    res["OPS"] = (res["OBP"]+res["SLG"])/2
    res["FIP"] = (res["PO"]+res["A"])/res['TC'] if res["TC"] != 0 else 0
    res["BABIP"] = (res["H"] - res["HR"])/(res["AB"] - res["SO"] - res["HR"] + res["SF"]) if res["AB"] - res["SO"] - res["HR"] + res["SF"] != 0 else 0
    res["RC"] = res["TB"]*(res["H"] + res["BB"]) / (res["AB"] + res["BB"]) if res["AB"] + res["BB"] != 0 else 0
    return res


@route_bp.route("/team/<int:team_id>/tournaments/",methods=["GET"])
def get_team_tournaments(team_id):
    query = request.args.to_dict()
    #TODO
    year_ids = eval(str(query.get("year_ids")))
    team_ids = eval(str(query.get("team_ids")))
    team = Team.query.get(team_id)
    res = []
    for team_tournament in team.tournaments:
        for gameTeam in team_tournament.games:
            gameTeamObject = GameTeam.query.filter_by(game_id = gameTeam.game_id,   home_away = HomeAway.AWAY if gameTeam.home_away == HomeAway.HOME else HomeAway.HOME).first()
            if (team_ids and gameTeamObject.team_tournament.team.id in team_ids or not team_ids) and id_in_list(team_tournament.tournament.id,res) == None:
                res.append({
                    'id':team_tournament.tournament.id,
                    'name': team_tournament.tournament.name,
                    })
        # if team_ids and team_tournament.team_tournament.tournament_id in team_ids or not team_ids:
    return res

@route_bp.route("/team/<int:team_id>/years/",methods=["GET"])
def get_team_years(team_id):
    query = request.args.to_dict()
    #TODO
    tournament_ids = eval(str(query.get("tournament_ids")))
    team_ids = eval(str(query.get("tournament_ids")))
    team = Team.query.get(team_id)
    res = set()
    for team_tournament in team.tournaments:
        # if team_ids and team_tournament.team_tournament.tournament_id in team_ids or not team_ids:
        for gameTeam in team_tournament.games:
            res.add(gameTeam.game.start_time.year)
    return list(res)

@route_bp.route("/team/<int:team_id>/teams/",methods=["GET"])
def get_team_opponents(team_id):
    query = request.args.to_dict()
    #TODO
    tournament_ids = eval(str(query.get("tournament_ids")))
    year_ids = eval(str(query.get("year_ids")))
    team = Team.query.get(team_id)
    res = []
    for team_tournament in team.tournaments:
        if tournament_ids and team_tournament.tournament_id in tournament_ids or not tournament_ids:
            for gameTeam in team_tournament.games:
                gameTeamObject = GameTeam.query.filter_by(game_id = gameTeam.game_id,home_away = HomeAway.AWAY if gameTeam.home_away == HomeAway.HOME else HomeAway.HOME).first()
                if id_in_list(gameTeamObject.team_tournament.team.id,res) == None:
                    res.append(
                        {"id":gameTeamObject.team_tournament.team.id,
                        "name":gameTeamObject.team_tournament.team.name
                        })
    
    return res


@route_bp.route("/team/<int:team_id>/stats/",methods=["GET"])
def get_team_stats(team_id):
    query = request.args.to_dict()
    team_ids = eval(str(query.get("team_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    game_id = query.get("game_id")
    years = eval(str(query.get("years")))
    print(f"team id->{team_id}")

    team = Team.query.get(team_id)
    print(f"team name->{team.name}")
    res = {
        "W":0,
        "L":0
    }
    players_stats = []
    games_stats = []

    merge_dicts(get_stats([],None),res)
    for team_tournament in team.tournaments:
        #(team_ids and team_tournament.team_id in team_ids)
        if (tournament_ids and team_tournament.tournament_id in tournament_ids) or ( not tournament_ids):
            for player in team_tournament.players:
                player_stats = {
                    }
                merge_dicts(get_stats([],None),player_stats)
                for gameTeam in team_tournament.games:
                    gameTeamObject = GameTeam.query.filter_by(game_id = gameTeam.game_id,   home_away = HomeAway.AWAY if gameTeam.home_away == HomeAway.HOME else HomeAway.HOME).first()
                    game_stats = {
                    }
                    merge_dicts(get_stats([],None),game_stats)
                    if not years and game_id and gameTeam.game_id == game_id or not game_id and years and gameTeam.game.start_time.year in years or game_id and years and gameTeam.game_id == game_id and gameTeam.game.start_time.year in years or not game_id and not years : 
                        if team_ids and gameTeamObject.team_tournament.team_id in team_ids or not team_ids:
                            res_stats = get_stats(gameTeam.game.situations,player.player.id)
                            merge_dicts(res_stats,game_stats)
                            merge_dicts(res_stats,player_stats)
                            merge_dicts(res_stats,res)
                            game_index = id_in_list(gameTeam.game.id,games_stats)
                            if game_index == None:
                                games_stats.append({
                                    "id": gameTeam.game.id,
                                    "homeTeam": gameTeam.team_tournament.team.name if gameTeam.home_away == HomeAway.HOME else gameTeamObject.team_tournament.team.name,
                                    "awayTeam": gameTeamObject.team_tournament.team.name if gameTeam.home_away == HomeAway.HOME else gameTeam.team_tournament.team.name,
                                    "startTime":gameTeam.game.start_time,
                                    "stats":game_stats
                                })
                            else:
                                merge_dicts(game_stats,games_stats[game_index]["stats"])

                player_index = id_in_list(player.player.id,players_stats)
                if player_index == None:
                    players_stats.append({
                        "id": player.player.id,
                        "firstName": player.player.first_name,
                        "lastName":player.player.last_name,
                        "stats":player_stats
                    })
                else:
                    merge_dicts(player_stats,players_stats[player_index]["stats"])
    for team_tournament in team.tournaments:
        #(team_ids and team_tournament.team_id in team_ids)
        if (tournament_ids and team_tournament.tournament_id in tournament_ids) or ( not tournament_ids):
            for gameTeam in team_tournament.games:
                gameTeamObject = GameTeam.query.filter_by(game_id = gameTeam.game_id,   home_away = HomeAway.AWAY if gameTeam.home_away == HomeAway.HOME else HomeAway.HOME).first()
                if team_ids and gameTeamObject.team_tournament.team_id in team_ids or not team_ids:
                    if gameTeam.game.status == GameStatuses.ENDED:
                        if gameTeam.is_winner:
                            res["W"]+=1
                        else:
                            res["L"]+=1
                    
    res["AVG"] = res["H"]/res["AB"] if res["AB"] != 0 else 0
    res["OBP"] = (res["H"]+res["BB"]+res["HBP"])/res["PA"] if res["PA"] != 0 else 0
    res["SLG"] = (res["1B"] + 2*res["2B"] + 3*res["3B"] + 4*res["HR"])/res["AB"] if res["AB"] != 0 else 0
    res["OPS"] = (res["OBP"]+res["SLG"])/2
    res["FIP"] = (res["PO"]+res["A"])/res['TC'] if res["TC"] != 0 else 0
    for game in games_stats:
        game["stats"]["AVG"] = game["stats"]["H"]/game["stats"]["AB"] if game["stats"]["AB"] != 0 else 0
        game["stats"]["OBP"] = (game["stats"]["H"]+game["stats"]["BB"]+game["stats"]["HBP"])/game["stats"]["PA"] if game["stats"]["PA"] != 0 else 0
        game["stats"]["SLG"] = game["stats"]["TB"]/game["stats"]["AB"] if game["stats"]["AB"] != 0 else 0
        game["stats"]["OPS"] = (game["stats"]["OBP"]+game["stats"]["SLG"])/2
        game["stats"]["FIP"] = (game["stats"]["PO"]+game["stats"]["A"])/game["stats"]['TC'] if game["stats"]["TC"] != 0 else 0
    for player in players_stats:
        player["stats"]["AVG"] = player["stats"]["H"]/player["stats"]["AB"] if player["stats"]["AB"] != 0 else 0
        player["stats"]["OBP"] = (player["stats"]["H"]+player["stats"]["BB"]+player["stats"]["HBP"])/player["stats"]["PA"] if player["stats"]["PA"] != 0 else 0
        player["stats"]["SLG"] = player["stats"]["TB"]/player["stats"]["AB"] if player["stats"]["AB"] != 0 else 0 
        player["stats"]["OPS"] = (player["stats"]["OBP"]+player["stats"]["SLG"])/2
        player["stats"]["FIP"] = (player["stats"]["PO"]+player["stats"]["A"])/player["stats"]['TC'] if player["stats"]["TC"] != 0 else 0   
    
    return {"stats":res,"games_stats":games_stats,"players_stats":players_stats}

@route_bp.route("/tournament/<int:tournament_id>/stats/",methods=["GET"])
def get_tournament_stats(tournament_id):
    query = request.args.to_dict()
    game_id = query.get("game_id")
    years = eval(str(query.get("years")))
    tournament = Tournament.query.get(tournament_id)

    res = []
    for team_tournament in tournament.teams:
        #(team_ids and team_tournament.team_id in team_ids)
            for player in team_tournament.players:
                player_stats  = {
                    }
                merge_dicts(get_stats([],None),player_stats)
                for gameTeam in team_tournament.games:
                    if game_id and gameTeam.game_id == game_id and not years or years and gameTeam.game.start_time.year in years and not game_id or years and gameTeam.game.start_time.year in years and game_id and gameTeam.game_id == game_id or not game_id and not years:
                        merge_dicts(get_stats(gameTeam.game.situations,player.player.id),player_stats)
                player_stats["AVG"] = player_stats["H"]/player_stats["AB"] if player_stats["AB"] != 0 else 0
                player_stats["OBP"] = (player_stats["H"]+player_stats["BB"]+player_stats["HBP"])/player_stats["PA"] if player_stats["PA"] != 0 else 0
                player_stats["SLG"] = (player_stats["1B"] + 2*player_stats["2B"] + 3*player_stats["3B"] + 4*player_stats["HR"])/player_stats["AB"] if player_stats["AB"] != 0 else 0
                player_stats["FIP"] = (player_stats["PO"]+player_stats["A"])/player_stats['TC'] if player_stats["TC"] != 0 else 0
                res.append({
                    "id":player.id,
                    "teamName": team_tournament.team.name,
                    "teamImage":team_tournament.team.image,
                    "firstName":player.player.first_name,
                    "lastName":player.player.last_name,
                    "stats":player_stats})
                                
                    
    

    return res



#TODO Може да го вкараш player/player_id/stats
@route_bp.route("/player/<int:player_id>/games_stats/",methods=["GET"])
def get_player_games_stats(player_id):
    query = request.args.to_dict()
    team_ids = eval(str(query.get("team_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    years = eval(str(query.get("years")))
    player = Player.query.get(player_id)

    res = []
    for team_tournament in player.teams_tournaments:
        if (team_ids and team_tournament.team_tournament.team_id in team_ids and not tournament_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids and not team_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids and team_ids and team_tournament.team_tournament.team_id in team_ids)or (not team_ids and not tournament_ids):
            for gameTeam in team_tournament.team_tournament.games:
                if years and gameTeam.game.start_time.year in years or not years:
                    game_stats = {
                    }
                    merge_dicts(get_stats(gameTeam.game.situations,player_id),game_stats)
                    game_stats["AVG"] = game_stats["H"]/game_stats["AB"] if game_stats["AB"] != 0 else 0
                    game_stats["OBP"] = (game_stats["H"]+game_stats["BB"]+game_stats["HBP"])/game_stats["PA"] if game_stats["PA"] != 0 else 0
                    game_stats["SLG"] = (game_stats["1B"] + 2*game_stats["2B"] + 3*game_stats["3B"] + 4*game_stats["HR"])/game_stats["AB"] if game_stats["AB"] != 0 else 0
                    game_teams = GameTeam.query.filter_by(game_id = gameTeam.game.id).all();
                    home_team = list(filter(lambda x: x.home_away.value == "home",game_teams))[0]
                    away_team = list(filter(lambda x: x.home_away.value == "away",game_teams))[0]
                    res.append({
                        "id":gameTeam.game.id,
                        "homeTeam":home_team.team_tournament.team.name,
                        "awayTeam":away_team.team_tournament.team.name,
                        "startTime":gameTeam.game.start_time,
                        "stats":game_stats
                        })
                            
    return res


@route_bp.route("/tournament/<int:tournament_id>/ranking",methods=["GET"])
def get_tournament_ranking(tournament_id):
    tournament = Tournament.query.get(tournament_id)

    res = []
    for team_tournament in tournament.teams:
        #(team_ids and team_tournament.team_id in team_ids)
        team_stats={
            "W":0,
            "L":0
        }

        for gameTeam in team_tournament.games:
            if gameTeam.game.status == GameStatuses.ENDED:
                if gameTeam.is_winner:
                    team_stats["W"]+=1
                else:
                    team_stats["L"]+=1
        res.append({
            "id":team_tournament.team.id,
            "teamName": team_tournament.team.name,
            "teamImage":team_tournament.team.image,
            "stats":team_stats})
                                
    return res

