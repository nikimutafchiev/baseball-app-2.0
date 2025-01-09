from sqlalchemy import String, Enum, Date, JSON, DateTime, Integer, ForeignKey,Text,Boolean
from sqlalchemy.orm import Mapped, mapped_column,relationship
from typing import Optional,List
from models.enums import Handedness, HomeAway, Genders, GameStatuses, UserRoles
from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy

db =  SQLAlchemy()

class Player(db.Model):
    __tablename__ = "Player"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(30),nullable=False)
    last_name: Mapped[str] = mapped_column(String(30),nullable=False)
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date)
    country: Mapped[Optional[str]]
    height: Mapped[Optional[int]]
    weigth: Mapped[Optional[int]]
    image: Mapped[Optional[str]] = mapped_column(Text)
    throwing_arm: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    batting_side: Mapped[Optional[Handedness]] = mapped_column(Enum(Handedness))
    gender: Mapped[Optional[Genders]] = mapped_column(Enum(Genders))
    teams_tournaments: Mapped[List["TeamTournamentPlayer"]] = relationship(back_populates="player")
    

class Team(db.Model):
    __tablename__ = "Team"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    tlc: Mapped[str] = mapped_column(String(3), nullable=False)
    image: Mapped[Optional[str]] = mapped_column(Text)
    social_media: Mapped[Optional[JSON]] = mapped_column(JSON)
    address: Mapped[Optional[str]] = mapped_column(String(200))
    contact: Mapped[Optional[str]] = mapped_column(String(20))
    manager: Mapped[Optional[str]] = mapped_column(String(100))
    head_coach: Mapped[Optional[str]] = mapped_column(String(100))
    tournaments: Mapped[List["TeamTournament"]] = relationship(back_populates="team")


class Tournament(db.Model):
    __tablename__ = "Tournament"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    place: Mapped[str] = mapped_column(String(100))
    image: Mapped[Optional[str]] = mapped_column(Text)
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
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
    games: Mapped[List["GameTeam"]] = relationship(back_populates="team_tournament")

class TeamTournamentPlayer(db.Model):
    __tablename__ = "TeamTournamentPlayer"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    player_id: Mapped[int] =  mapped_column(ForeignKey("Player.id"))
    team_tournament_id: Mapped[int] =  mapped_column(ForeignKey("TeamTournament.id"))
    player: Mapped["Player"] = relationship(back_populates="teams_tournaments")
    team_tournament: Mapped["TeamTournament"] = relationship(back_populates="players")
    uniform_number: Mapped[int] = mapped_column(Integer,nullable=False)
    __table_args__ = (
        db.UniqueConstraint("player_id","team_tournament_id",name="unique_team_tournament_player"),
    )
    games: Mapped[List["GameTeamTeamTournamentPlayer"]] = relationship(back_populates="team_tournament_player")

class Game(db.Model):
    __tablename__ = "Game"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    tournament_id: Mapped[int] = mapped_column(ForeignKey("Tournament.id"))
    tournament: Mapped["Tournament"] = relationship(back_populates="games")
    start_time: Mapped[datetime] = mapped_column(DateTime,nullable=False)
    status:  Mapped[Optional[GameStatuses]] = mapped_column(Enum(GameStatuses),default=GameStatuses.SCHEDULED)
    scoring_status: Mapped[Optional[str]] = mapped_column(String(10))
    venue: Mapped[str] = mapped_column(String(60), nullable=False)
    venue_link: Mapped[Optional[str]] = mapped_column(String(100))

    inning: Mapped[int] = mapped_column(Integer,default=1)
    inning_half: Mapped[str] = mapped_column(String(10),default="UP")
    home_batting_order: Mapped[int] = mapped_column(Integer,default = 1)
    away_batting_order: Mapped[int] = mapped_column(Integer,default = 1)
    outs: Mapped[int] = mapped_column(Integer,default=0)

    runners: Mapped[JSON] = mapped_column(JSON,default={
        "firstBaseRunner": None,
        "secondBaseRunner": None,
        "thirdBaseRunner": None})
    pointsByInning: Mapped[JSON] = mapped_column(JSON,default=
    {
        "home": [0 for i in range(0,9)], "away": [0 for i in range(0,9)]
    })
    


    teams: Mapped[List["GameTeam"]] = relationship(back_populates="game")
    user_associations: Mapped[List["UserGame"]] = relationship(back_populates="game")
    situations: Mapped[List["Situation"]] = relationship(back_populates="game")

class GameTeam(db.Model):
    __tablename__ = "GameTeam"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    team_tournament_id: Mapped[int] = mapped_column(ForeignKey("TeamTournament.id"))
    game_id: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    game: Mapped["Game"] = relationship(back_populates="teams")
    team_tournament: Mapped["TeamTournament"] = relationship(back_populates="games")
    result: Mapped[int] = mapped_column(Integer,nullable=False,default=0)
    home_away: Mapped[HomeAway] = mapped_column(Enum(HomeAway),nullable=False)
    players: Mapped[List["GameTeamTeamTournamentPlayer"]] = relationship(back_populates="game_team")
    is_winner: Mapped[bool] = mapped_column(Integer,default = False)
    hits: Mapped[int] = mapped_column(Integer,default =0)
    errors: Mapped[int] = mapped_column(Integer,default =0)
    lob: Mapped[int]= mapped_column(Integer,default =0)
    __table_args__ = (db.UniqueConstraint("game_id","home_away",name="unique_game_home_away"),
                      db.UniqueConstraint("game_id","team_tournament_id",name="unique_game_team"),)

class GameTeamTeamTournamentPlayer(db.Model):
    __tablename__ = "GameTeamTeamTournamentPlayer"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    game_team_id: Mapped[int] = mapped_column(ForeignKey("GameTeam.id"))
    team_tournament_player_id: Mapped[int] = mapped_column(ForeignKey("TeamTournamentPlayer.id"))
    game_team: Mapped["GameTeam"] = relationship(back_populates = "players")
    team_tournament_player: Mapped["TeamTournamentPlayer"] = relationship(back_populates = "games")
    position: Mapped[str] = mapped_column(String(60))
    batting_order: Mapped[int] = mapped_column(Integer)
    is_playing: Mapped[bool] = mapped_column(Boolean, default=True)
    game_stats: Mapped[Optional[JSON]] = mapped_column(JSON)

class User(db.Model):
    __tablename__="User"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(60),nullable=False,unique=True)
    password: Mapped[str] = mapped_column(String(60),nullable=False)
    first_name: Mapped[str] = mapped_column(String(60),nullable=False)
    last_name: Mapped[str] = mapped_column(String(60),nullable=False)
    role: Mapped[UserRoles] = mapped_column(Enum(UserRoles), nullable=False)

class UserGame(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    game_id: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"))
    is_liked: Mapped[bool] = mapped_column(Boolean,default=False)
    is_assigned: Mapped[bool] = mapped_column(Boolean,default=False)
    assigner_id: Mapped[Optional[int]] = mapped_column(Integer)
    is_to_do: Mapped[bool] = mapped_column(Boolean, default=False)
    
    game: Mapped["Game"] = relationship(back_populates="user_associations")
    user: Mapped["User"] = relationship()

class Situation(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    game_id: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    game: Mapped["Game"] = relationship(back_populates="situations")
    data: Mapped[dict] = mapped_column(JSON,nullable=False)