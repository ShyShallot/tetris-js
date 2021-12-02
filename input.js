const inputs = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38
}
function InputHandler(e){
    //console.log(e);
    board.isInputActive(true);
    //console.log(board.inputActive);
    switch(e.keyCode){
        case inputs.DOWN:
            Canvas.activeItems.forEach((piece, i) => {
                if(piece.active == 1){
                    ////console.log(piece);
                    piecesBelow = 0;
                    piece.shape.forEach((row,y) =>{
                        ////console.log(row);
                        row.forEach((value,x) =>{
                            //console.log(value);
                            if(value > 0){
                                console.log(`Value is greater than 0`);
                                ////console.log(board.grid[piece.y+y+1]);
                                console.log(board.grid[piece.y+y+1][piece.x-2+x]);
                                if(typeof piece === 'undefined'){
                                    return;
                                }
                                if(board.grid[piece.y+y+1][piece.x-2+x] >= 2){
                                    piecesBelow++;
                                    ////console.log(piecesBelow);
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
                                if(typeof piece === 'undefined'){
                                    return;
                                }
                                nextX = board.grid[piece.y+y][(piece.x+x)-3];
                                if(nextX >= 2 || typeof nextX === 'undefined'){
                                    nextSpot++;
                                    console.log(nextSpot);
                                } 
                            }
                        });
                    });
                    if(nextSpot <= 0){
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
                                if(typeof piece === 'undefined'){
                                    return;
                                }
                                nextX = board.grid[piece.y+y][(piece.x+x)-1];
                                if(nextX >= 2 || typeof nextX === 'undefined'){
                                    nextSpot++;
                                    console.log(nextSpot);
                                } 
                            }
                        });
                    });
                    if(nextSpot <= 0){
                        Canvas.activeItems[i].x++;
                    }
                }
            });
            break;
        case inputs.UP:
            Canvas.activeItems.forEach((piece,i) => {
                if(piece.active == 1){
                    piece.shape = transpose(piece.shape);
                    console.log(piece.x)
                    if(piece.x <= 6){
                        piece.x++;
                    } else {
                        piece.x--;
                    }
                }
            });
            break;
    }
    board.isInputActive(false);
    //console.log(board.inputActive);
}