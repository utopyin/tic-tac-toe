import { Position } from '../classes/case';
import Grid from '../classes/Grid';
import AI from './AI';

interface minimax {
    position : Position | null,
    value :number
}

export default class HardAI extends AI{
    constructor(playeruuid:string) {
        super(playeruuid)
        this.name = "Gori Kosporav"
    }

    play(Board:Grid,turn:number):Position {
        let casesVides = Board.casesVides()
        let bestScore : minimax = {position : null, value : Number.NEGATIVE_INFINITY}
        casesVides.forEach(x => {
            const board = Board.duplicate()
            board.updateCase(x,this.uuid)
            let evaluation = this.minimax(board,9-turn-1,false,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY)
            if (evaluation > bestScore.value) {
                bestScore = {position : x, value: evaluation}
            }
        });
        return bestScore.position as Position
        
    }

    // customMax(a:minimax,b:minimax) {
    //     return a.value>b.value ? a : b 
    // }

    // customMin(a:minimax,b:minimax) {
    //     return a.value<b.value ? a : b 
    // }

    minimax(Board:Grid,depth:number,maximizingPlayer:boolean,alpha:number,beta:number,placement:Position|null=null):number{
        
        const casesVides = Board.casesVides()
        if (depth<=4 && placement) {
            if (Board.isGameOver()) {
                return (+maximizingPlayer * -2) +1 
            } else if (depth==0) {
                return 0
            }
        }

        if (maximizingPlayer) {
            let maxEval = Number.NEGATIVE_INFINITY

            for (let x of casesVides ){
                const board = Board.duplicate()
                board.updateCase(x,this.uuid)

                let evalu = this.minimax(board,depth-1, false,alpha,beta, x)
                maxEval = Math.max(evalu,maxEval)
                // alpha = Math.max(alpha, evalu.value)
                // if (beta <= alpha) {
                //     break;
                // }
            };
            return maxEval
        } else {
            let minEval = Number.POSITIVE_INFINITY
            for (let x of casesVides) {
                const board = Board.duplicate()
                board.updateCase(x,this.playeruuid)

                let evalu = this.minimax(board,depth-1, true,alpha,beta, x)

                minEval = Math.min(evalu,minEval)
                // beta = Math.min(beta, evalu.value)
                // if (beta <= alpha) {
                //     break;
                // }
            };
            return minEval
        }
    }

}