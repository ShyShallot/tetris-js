Canvas = newCanvas();
Canvas.init();
let board = new Board(Canvas);

function main(){
    console.log(Array(Canvas.cols));
    board.reset();
    document.addEventListener('keydown', InputHandler);
    setInterval(() =>{
        loop();
    },100);
}

function loop(){
    board.reset();
    board.generatePieces();
    Canvas.draw();
    board.visualize();
    collisionSystem();
    board.fallPieces();
    board.checkLineClear();
}