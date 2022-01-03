import { Position } from '../classes/case';
import Grid from '../classes/Grid';
import AI from './AI'


export default class MediumAI extends AI{
    constructor(playeruuid:string) {
        super(playeruuid)
        this.name = "Mork Zeckurburg"
    }
    
    play(Board:Grid):Position {
        if (this.isBoardEmpty(Board.tableau)) return this.getRandomCase(Board.tableau) as Position
        
        let propositions = {"1" : [], "-2" : [],"2" : [], "0" : []} as any
        const combinaisons: Position[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

        combinaisons.forEach(comb => {
            let prop = this.calculatePscore(comb,Board.tableau)
            if (prop != null) {
                propositions[prop.priority].push(...prop.placements)
            }
        })
        console.log(propositions)
        const priorities = ["2","-2","1","0"]
        for (let k=0; k<4;k++) {
            if (propositions[priorities[k]][0]) {
                return propositions[priorities[k]][Math.floor(Math.random()*(propositions[priorities[k]].length-1))]
            }
        }
        return this.getRandomCase(Board.tableau) as Position
    }
}