from Case import Case

genius = [8, 1, 6, 3, 5, 7, 4, 9, 2]
class Grille:
  def __init__(this):
    this.tableau = [Case() for k in range(9)]

  def isCaseEmpty(this, pos):
    return this.tableau[pos].value == None

  def updateCase(this, pos, val):
    if this.isCaseEmpty(pos):
      this.tableau[pos].value = val

  def isGameOver(this):
    # brute force à améliorer si possible pour le rendre plus sexy
    combinaisons = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
  
    for comb in combinaisons:
      if this.tableau[comb[2]].value == this.tableau[comb[1]].value and this.tableau[comb[1]].value == this.tableau[comb[0]].value:
        return True

  def __str__(this):
    # brute force mdrr
    print(f"|{this.tableau[0].value}|{this.tableau[1].value}|{this.tableau[2].value}|")
    print(f"|{this.tableau[3].value}|{this.tableau[4].value}|{this.tableau[5].value}|")
    print(f"|{this.tableau[6].value}|{this.tableau[7].value}|{this.tableau[8].value}|")
