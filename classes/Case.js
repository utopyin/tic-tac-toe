class Case {
    constructor(this, pos, value){
        this.position = pos
        this.value = value
    }

    toString(this){
        if (this.value) {
            return this.value
        }
        return " "
    }
}

module.export = Case