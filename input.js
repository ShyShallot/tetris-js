const inputs = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}
function InputHandler(e){
    console.log(e);
    board.isInputActive(true);
    console.log(board.inputActive);
    switch(e.keyCode){
        case inputs.DOWN:
            Canvas.activeItems.forEach((piece, i) => {
                if(piece.active == 1){
                    //console.log(piece);
                    piecesBelow = 0;
                    piece.shape.forEach((row,y) =>{
                        //console.log(row);
                        row.forEach((value,x) =>{
                            console.log(value);
                            if(value > 0){
                                //console.log(`Value is greater than 0`);
                                //console.log(board.grid[piece.y+y+1]);
                                //console.log(board.grid[piece.y+y+1][piece.x-2+x]);
                                if(board.grid[piece.y+y+1][piece.x-2+x] >= 2){
                                    piecesBelow++;
                                    //console.log(piecesBelow);
                                }
                            }
                        });
                    });
                    if(piecesBelow <= 0 && typeof (piece.realY()+1) === 'number'){
                        Canvas.activeItems[i].y++;
                    } else {
                        Canvas.activeItems[i].active=0;
                    }
                }
            })
            break;
        case inputs.LEFT:
            Canvas.activeItems.forEach((piece, i) =>{
                if(piece.active == 1){
                    nextSpot = 0;
                    piece.shape.forEach((row,y) =>{
                        row.forEach((value,x) =>{
                            if(value > 0){
                                console.log(board.grid[piece.y+y][piece.x+x-1]);
                                if(board.grid[piece.y+y][piece.x+x-1] >= 2){
                                    nextSpot++;
                                    console.log(nextSpot);
                                }
                            }
                        });
                    });
                    if(nextSpot <= 0 && piece.x-2 > 0){
                        Canvas.activeItems[i].x--;
                    }
                }
            });
            break;
        case inputs.RIGHT:
            Canvas.activeItems.forEach((piece, i) =>{
                if(piece.active == 1){
                    nextSpot = 0;
                    piece.shape.forEach((row,y) =>{
                        row.forEach((value,x) =>{
                            if(value > 0){
                                console.log(board.grid[piece.y+y][piece.x+x+1]);
                                if(board.grid[piece.y+y][piece.x+x+1] >= 2){
                                    nextSpot++;
                                    console.log(nextSpot);
                                } else {
                                    nextTile = board.grid[piece.y+y][piece.x-2+x+1];
                                    if(piece.length() == 3){
                                        nextTile = board.grid[piece.y+y][piece.x-1+x+1];
                                    }
                                }
                            }
                        });
                    });
                    if(nextSpot <= 0 && typeof nextTile === 'number'){
                        Canvas.activeItems[i].x++;
                    }
                }
            });
            break;
    }
    board.isInputActive(false);
    console.log(board.inputActive);
}