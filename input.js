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
            clear = 0;
            aP = board.activePiece;
            aP.shape.forEach((row,y) => {
                row.forEach((value,x) => {
                    if(value > 0){
                        nextSpot = board.grid[aP.y+y+1][aP.x+x];
                        console.log(board.grid[aP.y+aP.height]);
                        if(nextSpot > 1){
                            clear++;
                        }
                    }
                });
            });
            if(clear < 1){
                aP.y++;
            } else {
                board.activePiece.active = 0;
                return;
            }
            board.activePiece = aP;
            break;
        case inputs.LEFT:
            if(board.activePiece.x == 0){
                console.log("FUCK YOU");
                return;
            }
            clear = 0;
            aP = board.activePiece;
            aP.shape.forEach((row,y) => {
                row.forEach((value,x) => {
                    if(value == 0){
                        return;
                    }
                    if(board.grid[aP.y+y][aP.x+x-1] > 1){
                        clear++;
                    }
                });
            });
            if(clear < 1){
                aP.x--;
            }
            board.activePiece = aP;
            break;
        case inputs.RIGHT:
            if(board.activePiece.x+board.activePiece.length > 9){
                return;
            }
            clear = 0;
            aP = board.activePiece;
            aP.shape.forEach((row,y) => {
                row.forEach((value,x) => {
                    if(value == 0){
                        return;
                    }
                    if(board.grid[aP.y+y][aP.x+x+1] > 1){
                        clear++;
                    }
                });
            });
            if(clear < 1){
                aP.x++;
            }
            board.activePiece = aP;
            break;
        case inputs.UP:
                board.activePiece.shape = transpose(board.activePiece.shape);
                newHeight = board.activePiece.length;
                newLength = board.activePiece.height;
                board.activePiece.length = newLength;
                board.activePiece.heigh
                
                t = newHeight;
                console.log(piece.x)
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