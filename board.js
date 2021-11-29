class Board{
    constructor(Canvas){
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
    }
    reset(){
        this.grid = this.emptyBoard();
    }

    emptyBoard(){
        return Array.from(
            {length: Canvas.rows}, () => Array(Canvas.cols).fill(0)
        );
    }

    visualize(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.grid.forEach((row,y) =>{
            row.forEach((value,x) =>{
                console.log(value);
                this.ctx.fillStyle = 'black';
                this.ctx.font = `1px Arial`;
                this.ctx.fillText(value.toString(),x,y+1);
            });
        });
    }

    updateBoard(pX,pY, newVal){
        this.grid.forEach((row,y) => {
            row.forEach((value,x) =>{
                if(pY == y && pX == x){
                    //console.table(this.grid);
                    this.grid[y][x] = newVal;
                    //console.table(this.grid);
                }
            });
        });
    }

    createPiece(){
        this.x = 5;
        this.y = 0;
        this.possibleShapes = ["I","J","L","O","S","T","Z"];
        var randomShape = this.possibleShapes[getRNG(0,this.possibleShapes.length-1)];
        console.log(randomShape);
        switch(randomShape){
            case 'I':
                this.color = '#75f1ff';
                this.shape = [
                    [0,1,0],
                    [0,2,0],
                    [0,3,0],
                    [0,4,0]
                ];
                break;
            case 'J':
                this.color = '#0d00ff';
                this.shape = [
                    [0,1,0],
                    [0,2,0],
                    [3,3,0]
                ];
                break;
            case 'L':
                this.color = '#ffb300';
                this.shape = [
                    [0,1,0],
                    [0,2,0],
                    [0,3,3]
                ];
                break;
            case 'O':
                this.color = '#fff700';
                this.shape = [
                    [1,1],
                    [2,2]
                ];
                break;
            case 'S':
                this.color = '#48913c';
                this.shape = [
                    [0,1,1],
                    [2,2,0]
                ];
                break;
            case 'T':
                this.color = '#a732d1';
                this.shape = [
                    [1,1,1],
                    [0,2,0]
                ];
                break;
            case 'Z':
                this.color = '#ff3d3d';
                this.shape = [
                    [1,1,0],
                    [0,2,2]
                ];
                break;
        }
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            console.log(row);
            row.forEach((value,x) => {
                if(value > 0){
                    console.log(x,y,row,value);
                    this.ctx.fillRect(this.x-2+x,this.y+y,1,1);
                    board.updateBoard(this.x-2 + x,this.y+y);   
                }
            });
        });
        var piece = this.canvas.addItem({"x":this.x,"y":this.y,"shapeN":randomShape,"shape":this.shape,
        height: function(){
            return this.shape.length+1;
        },
        realY: function(){
            return this.y+this.height()-1;
        }
        });
        return piece;
    }
    
    fallPieces(){
        this.activePieces = this.canvas.getItems();
        console.log(this.activePieces);
        this.activePieces.forEach((piece, i) => {
            if(isValidMoveSpot(piece, board)){
                console.log(piece, i);
                this.oldY = this.activePieces[i].y;
                this.activePieces[i].y +=1;
                board.reset();
            }
        });
    }
}