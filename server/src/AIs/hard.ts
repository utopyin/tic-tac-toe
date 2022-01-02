import { Position } from '../classes/case';
import Grid from '../classes/Grid';
import AI from './AI';

interface minimax {
    position : Position,
    value :number
}

export default class HardAI extends AI{
    constructor(playeruuid:string) {
        super(playeruuid)
        this.name = "Gori Kosporav"
    }

    play(Board:Grid,turn:number):Position{
        let evaluation = this.minimax(Board,9-turn,true,-2,2)
        console.log(evaluation)
        return evaluation.position
    }

    customMax(a:minimax,b:minimax) {
        return a.value>b.value ? a : b 
    }

    customMin(a:minimax,b:minimax) {
        return a.value<b.value ? a : b 
    }

    minimax(Board:Grid,depth:number,maximizingPlayer:boolean,alpha:number,beta:number,placement:Position|null=null):minimax{
        console.log("minimax : " + depth + maximizingPlayer+ placement)
        
        const casesVides = Board.casesVides()
        console.log(Board)

        if (depth<=4 && placement) {
            if (Board.isGameOver()) {
                console.log("Somebody won, branch is over")
                return {'position':placement,'value': (+maximizingPlayer * -2) +1 }
            } else if (depth==0) {
                console.log("No more space, branch is over")
                return {'position':placement,'value':0}
            }
        }

        if (maximizingPlayer) {
            let maxEval = {'position':0 as Position,'value': -2 }

            for (let x of casesVides ){
                const board = Board.duplicate()
                board.updateCase(x,this.uuid)

                let evalu = this.minimax(board,depth-1, false,alpha,beta, x)
                
                maxEval = this.customMax(evalu,maxEval)
                alpha = Math.max(alpha, evalu.value)
                if (beta <= alpha) {
                    console.log("pruning")
                    break;
                }
            };
            return maxEval
        } else {
            let minEval = {'position':0 as Position,'value': 10 }
            for (let x of casesVides) {
                const board = Board.duplicate()
                board.updateCase(x,this.playeruuid)

                let evalu = this.minimax(board,depth-1, true,alpha,beta, x)

                minEval = this.customMin(evalu,minEval)
                beta = Math.min(beta, evalu.value)
                if (beta <= alpha) {
                    console.log("pruning")
                    break;
                }
            };
            return minEval
        }
    }

}