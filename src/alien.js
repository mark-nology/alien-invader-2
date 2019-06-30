export default class Alien {
    constructor(name, firstPosition) {
        this.name = name;
        this.pos = firstPosition;
    }
    //es6 get syntax used to expose function as property, eg. alien.x rather than alien.x()
    get x() {
        return this.pos.x;
    }
    get y() {
        return this.pos.y;
    }
}
