import { Position } from '../classes/Case_';
import Grid from '../classes/Grid';
import AI from './AI';


export default class EasyAI extends AI{
    constructor(playeruuid:string) {
        super(playeruuid)
        this.name = "SuperEasyAI"
    }

    play(Board:Grid):Position{
        return this.getRandomCase(Board.tableau)
    }

}