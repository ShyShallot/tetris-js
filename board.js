class Board{
    constructor(Canvas){
        this.canvas = Canvas;
        this.ctx = Canvas.ctx;
        this.lastFallTime = Date.now();
        this.fallTime = 1000;
        this.inputActive = false;
        this.shapeList = [];
        this.updateList = true;
        this.pieceAhead = 0;
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
        this.grid.forEach((row,y) =>{
            row.forEach((value,x) =>{
                ////console.log(value);
                //this.offest = 0.1;
                //this.ctx.globalCompositeOperation = 'destination-over'
                this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                //this.ctx.fillRect(x,y,0.1,1);
                //this.ctx.fillRect(x,y,1,0.1);
                this.ctx.font = `1px Arial`;
                this.ctx.fillText(value.toString(),x,y+1);
            });
        });
    }

    updateBoard(pX,pY, newVal){
        if(!newVal){
            newVal = 1;
        }
        this.grid.forEach((row,y) => {
            row.forEach((value,x) =>{
                if(pY == y && pX == x){
                    ////console.table(this.grid);
                    this.grid[y][x] = newVal;
                    ////console.table(this.grid);
                }
            });
        });
    }

    changeFallTime(timeinMS){
        this.fallTime = timeinMS;
    }

    isInputActive(bool){
        if(bool){
            this.inputActive = true;
            this.lastFallTime += 250;
        } else {
            this.inputActive = false;
            this.lastFallTime -= 100;
        }
    }

    generatePieces(){
        for(;this.pieceAhead<2;this.pieceAhead++){
            if(!this.updateList){
                continue;
            }
            this.possibleShapes = ["I","J","L","O","S","T","Z"];
            var randomShape = this.possibleShapes[getRNG(0,this.possibleShapes.length-1)];
            ////console.log(randomShape);
            this.shapeList.push(randomShape);
        }
        if(this.shapeList.length == 2){
            this.pieceAhead = 0;
            this.updateList = false;
        } else if (this.shapeList <= 1){
            this.pieceAhead = 0;
            this.updateList = true;
        }
        ////console.log(this.shapeList);
        this.fallingPieces = 0;
        if(Canvas.activeItems.length >= 1){
            Canvas.activeItems.forEach((piece,i) => {
                if(piece.active == 1 ){
                    this.fallingPieces++;
                }
            });
        }
        if(this.fallingPieces == 0){
            this.createPiece(this.shapeList[0]);
            this.shapeList.splice(0,1);
        }
    }

    createPiece(type){
        this.x = 7; // offset by 2, so this x-2 is the actual x;
        this.y = 0;
        switch(type){
            case 'I':
                this.color = '#75f1ff';
                this.shape = [
                    [1,0,0],
                    [1,0,0],
                    [1,0,0],
                    [1,0,0]
                ];
                break;
            case 'J':
                this.color = '#0d00ff';
                this.shape = [
                    [0,2,0],
                    [0,2,0],
                    [1,2,0]
                ];
                break;
            case 'L':
                this.color = '#ffb300';
                this.shape = [
                    [1,0,0],
                    [1,0,0],
                    [1,2,0]
                ];
                break;
            case 'O':
                this.color = '#fff700';
                this.shape = [
                    [1,2,0],
                    [1,2,0]
                ];
                break;
            case 'S':
                this.color = '#48913c';
                this.shape = [
                    [0,2,3],
                    [1,2,0]
                ];
                break;
            case 'T':
                this.color = '#a732d1';
                this.shape = [
                    [1,2,3],
                    [0,1,0]
                ];
                break;
            case 'Z':
                this.color = '#ff3d3d';
                this.shape = [
                    [1,2,0],
                    [0,2,3]
                ];
                break;
        }
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            //console.log(row);
            row.forEach((value,x) => {
                if(value > 0){
                    //console.log(x,y,row,value);
                    this.ctx.fillRect(this.x-2+x,this.y+y,1,1);
                    board.updateBoard(this.x-2 + x,this.y+y);   
                }
            });
        });
        var piece = this.canvas.addItem({"x":this.x-2,"y":this.y,"active":1,'color':this.color,"shapeN":type,"shape":this.shape,
        height: function(){
            return this.shape.length+1;
        },
        realY: function(){
            return this.y+this.shape.length-1;
        },
        length: function(){
            this.lastLength = 0;
            this.shape.forEach((row,y) =>{
                row.forEach((value,x)=>{
                    //console.log(x,y,row,value);
                    if(value > this.lastLength && value > 0){
                        this.lastLength = value;
                    }
                });
            });
            return this.lastLength;
        }
        });
        return piece;
    }
    
    fallPieces(){
        if(this.lastFallTime + this.fallTime > Date.now()){
            return;
        }
        if(this.inputActive){
            return;
        }
        this.activePieces = this.canvas.getItems();
        //console.log(this.activePieces);
        this.activePieces.forEach((piece, i) => {
            if(piece.active == 0){
                return;
            }
            if(isValidMoveSpot(piece, board)){
                //console.log(piece, i);
                this.oldY = this.activePieces[i].y;
                this.activePieces[i].y +=1;
                board.reset();
            } else {
                this.activePieces[i].active = 0;
            }
        });
        this.lastFallTime = Date.now();
    }

    checkLineClear(){
        this.activePieces = this.canvas.getItems();
        this.grid.forEach((row,y) => {
            var isLineClear = 0;
            row.forEach((value,x) => {
                if(value > 0){
                    isLineClear++;
                }
            });
            if(isLineClear >= 10){
                row.forEach((value,x) => {
                    this.grid[y][x] = 0;
                    this.positional = [x,y];
                });
                this.activePieces.forEach((piece,i) =>{
                    piece.shape.forEach((pRow,pY) => {
                        pRow.forEach((pVal, pX) =>{
                            if(piece.x+pX == this.positional[0] && piece.y+pY == this.positional[1]){
                                pRow.forEach((_, _I) => {
                                    piece.shape[pY][pX] = 0;
                                })
                            }
                        })
                    })
                })
            }
        });
        
    }
}