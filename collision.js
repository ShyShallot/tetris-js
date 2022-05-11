async function hasTouchedBorder(piece){
    ////console.log(piece);
    if(piece.active == 1){
        console.log(piece);
        left = piece.x-1;
        console.log(left);
        right = piece.x+piece.length+1;
        console.log(right);
        if(left <= 0 || right >= 10){
            console.log(true);
            return true;
        }
    }
}
function collisionSystem(){
    board.pieces.forEach((piece, i) => {
        //hasTouchedBorder(piece);
    });
}
