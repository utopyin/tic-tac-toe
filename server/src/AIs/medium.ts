import { Position } from '../classes/case';
import Grid from '../classes/Grid';
import {AI} from './AI'


export class MediumAI extends AI{
    constructor(uuid:string) {
        super(uuid)
        this.uuid = uuid

    }

    play(Board:Grid):Position {
        return this.getRandomCase(Board.tableau) as Position
    }
}