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
                for(i=0;i<this.activeItems.length;i++){
                    piece = this.activeItems[i];
                    ////console.log(piece);
                    this.ctx.fillStyle = piece.color;
                    piece.shape.forEach((row, y) => {
                        ////console.log(row);
                        row.forEach((value,x) => {
                            if(value > 0){
                                ////console.log(x,y,row,value);
                                this.ctx.fillStyle = piece.color;
                                this.ctx.fillRect(piece.x-2+x,piece.y+y,1,1);
                                if(piece.active == 0){
                                    board.updateBoard(piece.x-2+x,piece.y+y,2);
                                } else {
                                    board.updateBoard(piece.x-2+x,piece.y+y,1);
                                }
                            }
                            
                        });
                    });  
                }
        },
        getItems: function(){
            return this.activeItems;
        },
        activeItems: [

        ],
        addItem: function(object){
            //console.log(object);
            [object].push({id:this.activeItems.length}); // no need to add one as the length is 1 more than the index as arrays start at 0, a 1 item array would start at 0 but the length is 1
            this.activeItems.push(object);
            //console.log(object);
            return object;
        },
        removeItem: function(id){
            this.activeItems.splice(id,1);
        },
        grabActivePiece: function(){
            var activePiece = null;
            this.activeItems.for((piece, i) => {
                if(piece.active == 1){
                    activePiece = piece;
                }
            });
            return activePiece;
        }
    }
    return Canvas;
}