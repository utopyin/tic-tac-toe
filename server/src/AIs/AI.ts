import Case, { Position } from "../classes/case";
import Player from '../classes/Player';
import { v4 } from 'uuid'
export interface proposition {
    priority : "-2" | "1" | "2" | "0";
    placements : Position[] ;
}


export default class AI extends Player {
    uuid; playeruuid;
    constructor(playerUUID: string) {
        const uuid = v4();
        super({uuid: uuid, name: "AlphaTicTacToe", ws: null});
        this.uuid = uuid
        this.name = "AlphaTicTacToe"
        this.playeruuid = playerUUID
    }

    getRandomCase(Board:Array<Case>):Position{
        let caseu = Math.floor(Math.random()*9);
        while (Board[caseu].value) {
            caseu = Math.floor(Math.random()*8)
        }
        return (caseu as Position)
    }

    isBoardEmpty(Board :Array<Case>):boolean {
        for (let k = 0; k<9; k++) {
            if (Board[k].value != null) {
                return false
            }
        };
        return true
    }

    calculatePscore(combinaison: Array<Position>, Board:Array<Case>) : proposition | null{
        let prority = 0
        let placements = [] as Position[]
        combinaison.forEach(x => {
            if (Board[x].value != null) {
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
        console.log(proposition)
        return (proposition.placements[0] == undefined || proposition.priority == "-1") ? null : (proposition as proposition)
    }
}