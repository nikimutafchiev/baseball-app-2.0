from sqlalchemy import String, Enum, Date, JSON, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional,List
from sqlalchemy.orm import relationship
from models.enums import Handedness, HomeAway, Genders, GameStatuses, UserRoles
from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy

db =  SQLAlchemy()

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
    games: Mapped[List["GameTeam"]] = relationship(back_populates="teamTournament")
#TODO ADD unique constraint for player_id, team_tournament_id
class TeamTournamentPlayer(db.Model):
    __tablename__ = "TeamTournamentPlayer"
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
    __tablename__ = "GameTeam"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    teamTournamentId: Mapped[int] = mapped_column(ForeignKey("TeamTournament.id"))
    gameId: Mapped[int] = mapped_column(ForeignKey("Game.id"))
    game: Mapped["Game"] = relationship(back_populates="teams")
    teamTournament: Mapped["TeamTournament"] = relationship(back_populates="games")
    result: Mapped[int] = mapped_column(Integer,nullable=False,default=0)
    homeAway: Mapped[HomeAway] = mapped_column(Enum(HomeAway),nullable=False)
    __table_args__ = (db.UniqueConstraint("gameId","homeAway",name="unique_game_home_away"),)

# class GameTeamTeamTournamentPlayer(db.Model):
#     __tablename__ = "GameTeamTeamTournamentPlayer"
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     gameTeamId: Mapped[int] = mapped_column(ForeignKey("GameTeam.id"))
#     teamTournamentPlayerId: Mapped[int] = mapped_column(ForeignKey("TeamTournamentPlayer.id"))
#     gameTeam: Mapped["GameTeam"] = relationship(back_populates = "players")
#     teamTournamentPlayer: Mapped["TeamTournamentPlayer"] = relationship(back_populates = "games")

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
