async function hasTouchedBorder(piece){
    ////console.log(piece);
    if(piece.active == 1){
        nextSpot = piece.realY()+1;
        if(nextSpot >= 20){
            await sleep(500);
            piece.active = 0;
            piece.shape.forEach((row,y) =>{
                row.forEach((value,x) =>{
                    if(value > 0){
                        pieceY = piece.y;
                        if(pieceY >= 20){
                            pieceY = 19;
                        }
                        board.updateBoard(piece.x-2+x,pieceY+y,2);
                    }
                });
            });
        }
    }
}
function collisionSystem(){
    Canvas.activeItems.forEach((piece, i) => {
        hasTouchedBorder(piece);
    });
}