import enum

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
