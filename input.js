const inputs = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    PAUSE:27,
    HOLD: 72
}
function InputHandler(e){
    console.log(e);
    board.isInputActive(true);
    //console.log(board.inputActive);
    switch(e.keyCode){
        case inputs.DOWN:
            if(!pieceCollide(board.activePiece,'down')){
                board.activePiece.y++;
            }
            break;
        case inputs.LEFT:
            if(!pieceCollide(board.activePiece,'left')){
                board.activePiece.x--;
            }
            break;
        case inputs.RIGHT:
            if(!pieceCollide(board.activePiece,'right')){
                board.activePiece.x++;
            }
            break;
        case inputs.UP:
                board.activePiece.shape = transpose(board.activePiece.shape);
                newHeight = board.activePiece.length;
                newLength = board.activePiece.height;
                board.activePiece.length = newLength;
                board.activePiece.height = newHeight;
                
            break;
        case inputs.PAUSE:
            if(board.paused){
                board.paused = false;
                document.getElementById("paused").style.display = "none";
            } else {
                board.paused = true;
                document.getElementById("paused").style.display = "block";
            }
            break;
        case inputs.HOLD:
            board.holdPiece();
            break;
    }
    board.isInputActive(false);
    //console.log(board.inputActive);
}