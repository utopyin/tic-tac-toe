class Grille:
  def __init__(this):
    this.tableau = []

  def isCaseEmpty(this, pos):
    return this.tableau[pos].value == None

  def changeCase(this, pos, val):
    if this.isCaseEmpty(pos):
      this.tableau[pos].value = val

  def checkGameState(this):
    