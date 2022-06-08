function pieceCollide(piece, dir){
    if(!dir){
        return;
    }
    collide = false;
    piece.shape.forEach((row,y) => {
        row.forEach((value,x) => {
            if(value == 0){
                return;
            }
            switch (dir){
                case 'down':
                    y++;
                    if(piece.y+piece.height >= 19){
                        return;
                    }
                    break;
                case 'left':
                    if(piece.x <= 0){
                        return;
                    }
                    x--;
                    break;
                case 'right':
                    if(piece.x+piece.length >= 9){
                        return;
                    }
                    x++;
                    break;
            }
            boardValue = board.grid[piece.y+y][piece.x+x];
            if(boardValue == 1){
                collide = true;
            }
        });
    });
    return collide;
}