import Case, { Position } from "../classes/case";

export class AI {
    uuid;name: string| null
    constructor(uuid:string) {
        this.uuid = uuid
        this.name = "AlphaTicTacToe"
    }

    getRandomCase(Board:Array<Case>):Position{
        let caseu = Math.floor(Math.random()*9);
        while (!Board[caseu].value) {
            caseu =Math.floor(Math.random()*8)
        }
        return (caseu as Position)
    }
}