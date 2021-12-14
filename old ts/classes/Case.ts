class Case {
    position:number;
    value:string;
    constructor(pos:number, value:string){
        this.position = pos
        this.value = value
    }

    toString():string{
        if (this.value) {
            return this.value
        }
        return " "
    }
}

module.exports = Case