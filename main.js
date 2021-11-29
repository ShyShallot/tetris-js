Canvas = newCanvas();
Canvas.init();
let board = new Board(Canvas);

function main(){
    console.log(Array(Canvas.cols));
    board.reset();
    let piece = board.createPiece();
    console.log(piece.height());
    setInterval(() =>{
        loop();
    },1000)
}

function loop(){
    Canvas.draw();
    board.visualize();
    board.fallPieces();
}