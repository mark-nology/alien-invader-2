class Alien {
    constructor(name, firstPosition) {
        this.name = name;
        this.pos = firstPosition;
    }
    get x() { return this.pos.x; }
    get y() { return this.pos.y; }
    set x(x) { this.pos.x = x; }
    set y(y) { this.pos.y = y; }
    move() { AlienMovement.moveAlien(this); }
}

class Game {
    constructor(alienNames ) {
        this.uiLayer = new CanvasImpl();
        this.aliens = alienNames.map(name => new Alien(name, this.uiLayer.getRandomPosition() )); // use map to transform invaderNames to array of Alien classes
        this.alienCount = alienNames.length;
    }
    initialRender() {
        this.aliens.forEach(alien => this.uiLayer.createAndRenderAlien(alien)); // arrow functions tidy this up a lot
    }
    createAlien() {
        const name = this.alienCount.toString();
        const alien = new Alien( name, this.uiLayer.getRandomPosition() );
        this.aliens.push( alien );
        this.alienCount++;
        console.log(this.alienCount);
        this.uiLayer.createAndRenderAlien(alien);
    }
    moveAliens() {
        this.aliens.map(alien => {
            alien.move();
            CanvasImpl.renderAlien(alien);
        });
    }
}

// wanted to break out from Alien for DI later, different movements might be used
class AlienMovement {

    static moveAlien(alien) {
        const direction = Math.floor(Math.random()*4);
        // yeah the arithmetic could be better but I'm not interested in that atm
        switch (direction) {
            case 0: alien.x = ( (alien.x+10) % 300);  break;
            case 1: alien.x = ( (alien.x-10) % 300); alien.x < 0 ? alien.x = -alien.x : alien.x ; break;
            case 2: alien.y = ( (alien.y+10) % 300); break;
            case 3: alien.y = ( (alien.y-10) % 300); alien.y < 0 ? alien.y = -alien.y : alien.y ; break;
        }
    }

}
// later use AlienMovement.lastDirection = new Map([]);

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

//diferen refinement uses canvas, this subclass moves divs around as aliens, need better class name
class DivImpl extends  UILayer {
    constructor() {
        super();
    }
    static createAndRenderAlien(alien) {
        DivImpl.createScreenAlien(alien);
        DivImpl.renderAlien(alien);
    }
    static renderAlien(alien) {
        const screenAlienDiv = document.getElementById(alien.name);
        screenAlienDiv.style.left = alien.x.toString() + 'px';
        screenAlienDiv.style.top = alien.y.toString() + 'px';
    }
    static createScreenAlien(alien) {
        var div = document.createElement("div");
        div.className = "alien";
        div.id = alien.name;
        document.getElementById("gameArea").appendChild(div);
    }
}

let counter = 0;
function runGame() {
    game.moveAliens();
    counter ++;
    if (counter > 2) {
        counter = 0;
        game.createAlien();
    }
}

////////////////////////////////////////////

class CanvasImpl extends  UILayer  {
  constructor() {
    super();
    this.initCanvas();
  }

  initCanvas() {
      //messy got working (?) in a short time
      var canv = document.createElement('canvas');
      canv.id = 'canvasId';

      //placeToAdd.appendChild(canv); // adds the canvas to the body element
      document.getElementById('gameArea').appendChild(canv); // adds the canvas to #someBox
    this.canvas = document.getElementById("canvasId");
    // console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    [this.canvas.width, this.canvas.height] = [this.size, this.size]; // extracted to variable to make randomPosition easier, used destructuring syntax to show off a bit
    this.ctx.fillStyle = "#FF0000";
  }

  createAndRenderAlien(alien) {
    // console.log(alien);
    this.ctx.fillRect(alien.x - 2, alien.y - 2, 4, 4);
    // console.log("Alien at ", alien.x, alien.y);
  }
}

///////////////////////////

const invaderNames = ["Zyglot", "Xev"];
const game = new Game(invaderNames);
game.initialRender();
setInterval(runGame, 200);

// just for my later use

/*function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // console.log("x: " + x + " y: " + y);
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
});*/
