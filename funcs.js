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
                if(piece.y+y+1 >= 20){
                    piecesBelow++;
                    return;
                }
                nextSpot = board.grid[piece.y+y+1][piece.x-2+x];
                console.log(nextSpot);
                if(typeof nextSpot === 'undefined'){
                    piecesBelow++;
                    return;
                }
                if(nextSpot >= 2){
                    piecesBelow++;
                    ////console.log(piecesBelow);
                }
            }
        });
    });
    if(piecesBelow <= 0 && piece.y+1 <= 20){
        return true;
    } else {
        return false;
    }
}
function transpose(matrix) { // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    return matrix.map((row, i) =>
        row.map((val, j) => matrix[matrix.length - 1 - j][i])
    );
  }