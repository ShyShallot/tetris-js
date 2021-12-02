Canvas = newCanvas();
Canvas.init();
let board = new Board(Canvas);
let scoreMan = new Score();

function main(){
    //console.log(Array(Canvas.cols));
    board.reset();
    document.addEventListener('keydown', InputHandler);
    loopFunc = setInterval(() =>{
        loop();
    },100);
}

function loop(){
    //console.log(`Game Status ${board.gameOver}`);
    board.reset();
    Canvas.draw();
    board.generatePieces();
    scoreMan.checkLevel();
    scoreMan.updateScore();
    scoreMan.getHighScore();
    board.visualize();
    collisionSystem();
    board.fallPieces();
    board.checkLineClear();
    board.resetLinesCleared();
    board.gameOverCheck();
    if(board.gameOver){
        clearInterval(loopFunc);
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('gameover').style.display = 'block';
        scoreMan.savePoints();

    }
    
}