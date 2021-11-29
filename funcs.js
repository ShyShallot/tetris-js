function getRNG(min, max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function isValidMoveSpot(piece,board){
    var bool;
    console.log(piece);
    if(piece.realY+1 >= 19){
        return false;
    }
    if(piece.x+1 > 10){
        return false;
    }
    board.grid.forEach((row,y) => {
        row.forEach((value,x) =>{
            console.log(row,y,x,value);
            if(piece.y == y && piece.x == x){
                if(y == 0){
                    y++;
                }
                nextSpot = piece.realY() + 1;
                console.log(board.grid.length, nextSpot);
                console.log(nextSpot);
                if(nextSpot <= board.grid.length){
                    console.log(nextSpot);
                    if(nextSpot == 20){
                        nextSpot -= 1;
                    }
                    console.log(board.grid[nextSpot][x]);
                    if(board.grid[nextSpot][x] == 0){
                        console.log(true);
                        bool = true;
                    }
                }
            }
        });
    });
    if(bool){
        return true;
    }
}