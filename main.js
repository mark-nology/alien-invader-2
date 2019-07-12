class Drawing {
    constructor(shapes) {
        this._drawing = new CanvasDrawingImplementation();
        this._shapes = shapes
    }

    render() {
        this._shapes.forEach(shape => shape.render(this._drawing))
    }
}

class CanvasDrawingImplementation {
    constructor() {
        this._size = 300;
        this.initCanvas();
    }

    initCanvas() {
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'canvasId';
        document.getElementById('gameArea').appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.width = this._size;
        this._canvas.height = this._size;
        this._ctx.fillStyle = "#FF0000";
    }

    get ctx() { return this._ctx; }
}



class Shape {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() { return this._x; }
    get y() { return this._y; }
}

class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this._width = width;
        this._height = height;
    }

    get width() { return this._width; }
    get height() { return this._height; }
    render(drawing) {
        drawing.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


const shapes = [new Rectangle(50,50, 10, 20), new Rectangle(200,200,80, 90)];
const drawing = new Drawing(shapes);
drawing.render();
