function getRNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function isValidMoveSpot(piece,board){
    ////console.log(piece);
    piecesBelow = 0;
    piece.shape.forEach((row,y) =>{
        ////console.log(row);
        row.forEach((value,x) =>{
            if(value > 0){
                console.log(piece);
                ////console.log(`Value is greater than 0`);
                ////console.log(board.grid[piece.y+y+1]);
                ////console.log(board.grid[piece.y+y+1][piece.x-2+x]);
                if(typeof piece === 'undefined'){
                    return;
                }
                if(value == 0 || typeof x == 'undefined'){
                    return;
                }
                if(board.grid[piece.y+y+1][piece.x-2+x] >= 2){
                    piecesBelow++;
                    ////console.log(piecesBelow);
                }
            }
        });
    });
    if(piecesBelow <= 0 && piece.realY()+1 <= 19){
        return true;
    } else {
        return false;
    }
}
