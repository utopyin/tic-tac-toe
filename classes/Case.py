class Case :
    def __init__(this, pos, value) -> None:
        this.position = pos
        this.value = value

    def __str__(this) -> str:
        if this.value :
            return this.value
        return " "