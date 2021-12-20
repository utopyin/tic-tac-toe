import { Position } from '../classes/case';
import Grid from '../classes/Grid';
import AI from './AI';


export default class EasyAI extends AI{
    constructor() {
        super()
        this.name = "You'll never win"
    }

    play(Board:Grid):Position{
        return this.getRandomCase(Board.tableau)
    }

}