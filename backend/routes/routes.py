from models.models import Player, Team, TeamTournament,TeamTournamentPlayer, Tournament, Game, User, UserGame, GameTeam,GameTeamTeamTournamentPlayer, Situation
from models.enums import HomeAway, GameStatuses
from flask import request, Blueprint
from flask_jwt_extended import  create_access_token
from datetime import date,datetime,timezone
from models.models import db
route_bp = Blueprint("routes",__name__)

@route_bp.route("/player",methods=['POST'])
def add_player():
    data = request.json
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
    tournament = Tournament.query.get(query["tournament_id"])
    new_game = Game(start_time = datetime(year=data['startTime']["year"],month=data['startTime']["month"],day=data['startTime']["day"],hour=data['startTime']["hour"],minute=data['startTime']["minutes"],tzinfo=timezone.utc),tournament_id = int(query["tournament_id"]),venue=data["venue"],venue_link=data['venueLink'])
    db.session.add(new_game)
    tournament.games.append(new_game)
    home_game_association = GameTeam(game=new_game,team_tournament= TeamTournament.query.filter_by(team_id = data["homeTeam"]["id"]).first(),home_away = HomeAway.HOME)
    away_game_association = GameTeam(game=new_game,team_tournament= TeamTournament.query.filter_by(team_id = data["awayTeam"]["id"]).first(),home_away = HomeAway.AWAY)
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

    if User.query.filter_by(username=data['username']).first():
        return "This username is taken",400
    new_user = User(username=data['username'],password=data['password'],first_name=data['firstName'], last_name= data['lastName'], role=data['role'])
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
        access_token = create_access_token(identity=user.id,additional_claims={"user":{"id":user.id,"username":user.username,"firstName":user.first_name,"lastName":user.last_name,"password":user.password,"role":user.role.value}})
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
    game = Game.query.get(query["game_id"])
    user = User.query.filter_by(username=query["username"]).first()
    gameUser = UserGame.query.filter_by(game_id = query["game_id"],user_id = user.id).first()
    if gameUser:
        if not game.is_assigned and not game.is_to_do:
            gameUser.is_assigned =  True
        elif game.is_assigned:
            gameUser.is_assigned = False
        db.session.commit()
    else:
        user_game_association = UserGame(game=game,user=user,is_assigned=True,assigner_id=query["assigner_id"])
        db.session.add(user_game_association)
        db.session.commit()
    return "Succefully assigned/unassigned game"

@route_bp.route("/assigned_games/",methods=["GET"])
def get_assigned_games():
    query = request.args.to_dict()
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
            "image": home_team.team_tournament.team.image},
        "awayTeam":{
            "id": away_team.team_tournament.team.id,
            "name":away_team.team_tournament.team.name,
                    "tlc":away_team.team_tournament.team.tlc,
                    "image": away_team.team_tournament.team.image,},
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
    teamTournament = TeamTournament.query.filter_by(team_id = query["team_id"],tournament_id = query["tournament_id"]).first()
    player = Player.query.get(query["player_id"])

    teamTournamentPlayerAssociation = TeamTournamentPlayer(team_tournament=teamTournament, player=player, uniform_number = int(data["uniformNumber"]))
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
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    res=[]
    for player in game_team.players:
        res.append({
            "battingOrder": player.batting_order,
            "position": player.position,
            "uniformNumber":player.team_tournament_player.uniform_number,
            "player":{
                "id":player.team_tournament_player.player.id,
                "firstName":player.team_tournament_player.player.first_name,
                "lastName":player.team_tournament_player.player.last_name
            }
        })

    return res

@route_bp.route("/game/team/roster/player", methods=["POST"])
def add_player_to_game_roster():
    data = request.json
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
    db.session.commit()
    return ""


@route_bp.route("/game_team/change_score/", methods=["POST"])
def change_score():
    data = request.json
    query = request.args.to_dict()
    game_team = GameTeam.query.filter_by(game_id=query["game_id"],home_away=query["home_away"]).first()
    game_team.result += data["points"]
    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/change_batting_turn",methods=["POST"])
def change_batting_order(game_id):
    data = request.json
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
    game = Game.query.get(game_id)

    game.outs = data["outs"]
    db.session.commit()
    return ""

@route_bp.route("/game/<int:game_id>/change_points_by_inning", methods=["POST"])
def change_points_by_inning(game_id):
    data = request.json
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
    

@route_bp.route("/player/<int:player_id>/teams",methods=["GET"])
def get_player_teams(player_id):
    player = Player.query.get(player_id)
    res = []
    for team_tournament in player.teams_tournaments:
         res.append({
        'id':team_tournament.team_tournament.team.id,
        'name': team_tournament.team_tournament.team.name,
        })
    return res

@route_bp.route("/player/<int:player_id>/tournaments",methods=["GET"])
def get_player_tournaments(player_id):
    player = Player.query.get(player_id)
    res = []
    for team_tournament in player.teams_tournaments:
         res.append({
        'id':team_tournament.team_tournament.tournament.id,
        'name': team_tournament.team_tournament.tournament.name,
        })
    return res
         
@route_bp.route("/player/<int:player_id>/stats/",methods=["GET"])
def get_player_stats(player_id):
    query = request.args.to_dict()
    team_ids = eval(str(query.get("team_ids")))
    tournament_ids = eval(str(query.get("tournament_ids")))
    game_id = query.get("game_id")
    player = Player.query.get(player_id)
    res = {
        "PA":0,
        "H":0,
        "AB":0,
        "SO":0,
        "BB":0,
        "HBP":0,
        "AVG":0,

    }
    for team_tournament in player.teams_tournaments:
        if (team_ids and team_tournament.team_tournament.team_id in team_ids) or (tournament_ids and team_tournament.team_tournament.tournament_id in tournament_ids) or (not team_ids and not tournament_ids):
            for gameTeam in team_tournament.team_tournament.games:
                if game_id and gameTeam.game_id == game_id or not game_id:
                    for situation in gameTeam.game.situations:
                        if situation.data["batter"]["player"]["id"] == player_id :
                            if situation.data["situationCategory"] != "":
                                res["PA"] += 1
                            if situation.data["situationCategory"] == "hit":
                                res["H"] += 1
                            if situation.data["situationCategory"] == "walk":
                                res["BB"] +=1
                            if situation.data["situationCategory"] == "hit by pitch":
                                res["HBP"] +=1
                            if situation.data["situationCategory"] == "strikeout":
                                res["SO"] +=1
                            if situation.data["situationCategory"] in ["hit","fielder's choice","error","strikeout","groundout","flyout"]:
                                res["AB"] +=1
                    
    res["AVG"] = res["H"]/res["AB"] if res["AB"] != 0 else 0
    res["OBP"] = (res["H"]+res["BB"]+res["HBP"])/res["PA"] if res["PA"] != 0 else 0
    return res
