function newCanvas(){
    Canvas = {
        canvas: document.getElementById('canvas'),
        ctx: this.canvas.getContext('2d'),
        rows: 20,
        cols: 10,
        scale: 30,
        init: function(){
            this.ctx.canvas.width = this.cols * this.scale;
            this.ctx.canvas.height = this.rows * this.scale;
            this.ctx.scale(this.scale,this.scale);
        },
        draw: function(){
                this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
                console.log(board);
                if(board.pieces.length <= 0){
                    return;
                }
                for(i=0;i<board.pieces.length;i++){
                    piece = board.pieces[i];
                    ////console.log(piece);
                    this.ctx.fillStyle = piece.color;
                    piece.shape.forEach((row, y) => {
                        ////console.log(row);
                        row.forEach((value,x) => {
                            if(value > 0){
                                ////console.log(x,y,row,value);
                                this.ctx.fillStyle = piece.color;
                                this.ctx.fillRect(piece.x+x,piece.y+y,1,1);
                                if(piece.active == 0){
                                    board.updateBoard(piece.x+x,piece.y+y,2);
                                } else {
                                    board.updateBoard(piece.x+x,piece.y+y,1);
                                }
                            }
                            
                        });
                    });  
                }
        },
        
    }
    return Canvas;
}