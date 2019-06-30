class Alien {
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

class Game {
    constructor(alienNames ) {
        this.uiLayer = new DivImpl();
        const firstPosition = this.uiLayer.getRandomPosition();
        this.aliens = alienNames.map(name => new Alien(name, firstPosition)); // use map to transform invaderNames to array of Alien classes
    }
    initialRender() {
        this.aliens.forEach(alien => DivImpl.renderAlien(alien)); // arrow functions tidy this up a lot
    }
}


class UILayer {

    constructor() {
        this.padding = 10;
        this.size = 300;
    }

    getRandomPosition() {
        const x = Math.floor(this.padding + Math.random() * (this.size - 2 * this.padding));
        const y = Math.floor(this.padding + Math.random() * (this.size - 2 * this.padding));
        return { x, y };
    }
}


class DivImpl extends  UILayer {
    constructor() {
        super();
    }

    static renderAlien(alien) {
        console.log(alien);
        const screenAlien = document.getElementById("alien001");
        screenAlien.style.left = alien.x.toString() + 'px';
        screenAlien.style.top = alien.y.toString() + 'px';
        console.log("Alien at ", alien.x, alien.y);
        console.log(screenAlien);
        console.log('------------')
    }


}

const invaderNames = ["Zyglot", "Xev"];
const game = new Game(invaderNames);
game.initialRender();

////////////////////////////////////////////

/*class CanvasImpl extends  UILayer  {
  constructor() {
    super();
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.getElementById("gameArea");
    console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    [this.canvas.width, this.canvas.height] = [this.size, this.size]; // extracted to variable to make randomPosition easier, used destructuring syntax to show off a bit
    this.ctx.fillStyle = "#FF0000";
  }

  renderAlien(alien) {
    console.log(alien);
    this.ctx.fillRect(alien.x - 2, alien.y - 2, 4, 4);
    console.log("Alien at ", alien.x, alien.y);
  }
}*/



// just for my later use

/*function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
});*/
