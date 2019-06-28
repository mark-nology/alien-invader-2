class Alien {
    constructor(str) {
        this.name = str;
        this.x = Math.floor(10+ Math.random()*280);
        this.y = Math.floor(10+ Math.random()*280);
    }
    getX() { return this.x; }
    getY() { return this.y; }
}

class Game {
    constructor(nameArr) {
        this.aliens=[];
        const arr = this.aliens; // dont appear to be able to use this below
        function create(name, index) { // yuk, have to use a closure
            arr[index] = new Alien(name); // dont appear to be able to use this here
        }
        nameArr.forEach(function (name, index) { // looks clumsy
            create(name, index);
        });
        this.canvas = new Canvas();
    };

    initialRender() {
        const canv = this.canvas;
        function render(alien) { canv.renderAlien(alien) }
        this.aliens.forEach(function(alien) {
            render(alien)
        });

    }

}

class Canvas {
    constructor() {
        this.canvas = document.getElementById("gameArea");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx.fillStyle = "#FF0000";
    }

    renderAlien(alien) {
        console.log(alien);
        const x = alien.getX();
        const y = alien.getY();
        this.ctx.fillRect(x-2, y-2, 4, 4);
        console.log("Alien at ", x, y);
    }
}

const invaderNames = ['Zyglot', 'Xev'];
const game = new Game(invaderNames);
game.initialRender();

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
