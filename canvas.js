class Canvas{
    constructor(Canvas){
        this.canvas = document.getElementById(Canvas);
        this.ctx = this.canvas.getContext('2d');
        this.rows = 20;
        this.cols = 10;
        this.scale =  30;
    }
    init(){
        this.ctx.canvas.width = this.cols * this.scale;
        this.ctx.canvas.height = this.rows * this.scale;
        this.ctx.scale(this.scale,this.scale);
    }
    draw(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        console.log(board);
        if(board.pieces.length <= 0){
            return;
        }
        for(let i=0;i<board.pieces.length;i++){
            let piece = board.pieces[i];
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
    }
}