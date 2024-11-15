from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, Date
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
CORS(app)
db =  SQLAlchemy(app)

@app.route("/add_player",methods=['POST'])
def add_player():
    print("Hello")
    print(request.get_data())
    return ""

class Handedness(Enum):
    LEFTY = "L"
    RIGHTY = "R"
    AMBIDEXTROUS = "S"


class Player(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(30),nullable=False)
    last_name: Mapped[str] = mapped_column(String(30),nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date)
    height: Mapped[int]
    weigth: Mapped[int]
    # throwing_arm: Mapped[Handedness] = mapped_column(Enum(Handedness))
    # batting_side: Mapped[Handedness] = mapped_column(Enum(Handedness))


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



if __name__ == "__main__":
    app.run(host="localhost")
