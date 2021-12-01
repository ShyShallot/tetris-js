function getRNG(min, max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function isValidMoveSpot(piece,board){
    if(piece.active == 1){
        ////console.log(piece);
        piecesBelow = 0;
        piece.shape.forEach((row,y) =>{
            ////console.log(row);
            row.forEach((value,x) =>{
                ////console.log(value);
                if(value > 0){
                    ////console.log(`Value is greater than 0`);
                    ////console.log(board.grid[piece.y+y+1]);
                    ////console.log(board.grid[piece.y+y+1][piece.x-2+x]);
                    if(board.grid[piece.y+y+1][piece.x-2+x] >= 2){
                        piecesBelow++;
                        ////console.log(piecesBelow);
                    }
                }
            });
        });
    }
    if(piecesBelow <= 0){
        return true;
    } else {
        return false;
    }
}
