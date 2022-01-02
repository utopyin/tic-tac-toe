import Case, { Position } from "../classes/case";
export interface proposition {
    priority : "-2" | "1" | "2";
    placements : Position[] ;
}


export default class AI {
    uuid;name: string| null;playeruuid;
    constructor(playeruuid:string) {
        this.uuid = "SomeAI"
        this.name = "AlphaTicTacToe"
        this.playeruuid = playeruuid
    }


    getRandomCase(Board:Array<Case>):Position{
        let caseu = Math.floor(Math.random()*9);
        while (Board[caseu].value) {
            caseu =Math.floor(Math.random()*8)
        }
        return (caseu as Position)
    }

    isBoardEmpty(Board :Array<Case>):boolean {
        Board.forEach(Case => {
            if (Case.value) return false
        });
        return true
    }

    calculatePscore(combinaison : Array<Position>, Board:Array<Case>) : proposition | null{
        let prority = 0
        let placements = [] as Position[]
        combinaison.forEach(x => {
            if (Board[x].value) {
                if (Board[x].value == this.uuid) {
                    prority ++
                }else {
                    prority --
                }
            } else {
                placements.push(x)
            }
        })

        let proposition = {
            'priority' : prority.toString(),
            'placements' : placements as Position[]
        }
        return proposition.placements[0] == undefined && proposition.priority == "-1"? null : (proposition as proposition) 
    }
}