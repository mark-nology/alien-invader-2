class Alien {
    constructor(name, firstPosition) {
        this.name = name;
        this.pos = firstPosition;
    }
    //es6 get syntax used to expose function as property, eg. alien.x rather than alien.x()
    get x() { return this.pos.x; }
    get y() { return this.pos.y; }
    set x(x) { this.x = x; }
    set y(y) { this.y = y; }
    move() { AlienMovement.moveAlien(this); }
}

class Game {
    constructor(alienNames ) {

        this.uiLayer = new DivImpl();
        this.aliens = alienNames.map(name => new Alien(name, this.uiLayer.getRandomPosition() )); // use map to transform invaderNames to array of Alien classes
        this.alienCount = alienNames.count;
    }
    initialRender() {
        this.aliens.forEach(alien => DivImpl.renderAlien(alien)); // arrow functions tidy this up a lot
    }
    createAlien() {
        name = this.alienCount.toString();
        this.aliens += new Alien(name, this.uiLayer.getRandomPosition() )
        this.aliens.last();
        this.alienCount++;
    }
    moveAliens() {
        this.aliens.map(alien => {
            alien.move();
            DivImpl.move(alien, newCoord);
        });
    }
}

class AlienMovement {
    static registerAlien(alien) { AlienMovement[alien.name] = alien; }

    static moveAlien(alien) {
        const currentX = alien.x;
        let newX = currentX;
        const currentY = alien.y;
        let newY = currentY;
        const direction = Math.floor(Math.random()*4);
        console.log("direction ", direction);
        switch (direction) {
            case 0: alien.x = (alien.x+10) % 300; break;
            case 1: alien.x = (alien.x-10) % 300; break;
            case 2: alien.y = (alien.y+10) % 300; break;
            case 3: alien.y = (alien.y-10) % 300; break;
        }
    }

}
AlienMovement.aliens = new Map([]);


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
        const screenAlien = DivImpl.createScreenAlien(alien);
        // const screenAlien = document.getElementById("alien001");
        screenAlien.style.left = alien.x.toString() + 'px';
        screenAlien.style.top = alien.y.toString() + 'px';
        console.log(screenAlien);
        console.log('------------')
    }

    static createScreenAlien(alien) {
        var div = document.createElement("div");
        div.className = "alien";
        div.id = alien.name;
        document.getElementById("gameArea").appendChild(div);
        return div;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const invaderNames = ["Zyglot", "Xev"];
const game = new Game(invaderNames);
game.initialRender();

async function testwait () {
    for (let i = 0; i < 5; i++) {
        await sleep(1000);
        game.moveAliens();
    }
}

testwait();

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
