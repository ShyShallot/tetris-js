class Board{
    constructor(Canvas){
        this.canvas = Canvas;
        this.ctx = Canvas.ctx; 
        this.lastFallTime = Date.now(); // keeps track of when a piece falls
        this.fallTime = 1000; // time that the game waits to drop a piece
        this.inputActive = false; // check if input was recently pressed
        this.shapeList = [];
        this.updateList = true;
        this.pieceAhead = 0;
        this.linesCleared = 0;
        this.lastLineClearedTime = Date.now();
        this.LineClearedTime = 2500;
        this.gameOver = false;
        this.nextPieceText = document.getElementById('nextPiece');
        this.activePiece;
        this.pieces = [];
        this.paused = false;
        this.heldPiece;
    }
    reset(){
        this.grid = this.emptyBoard();
    }

    emptyBoard(){
        return Array.from(
            {length: this.canvas.rows}, () => Array(this.canvas.cols).fill(0)
        );
    }

    visualize(){
        this.grid.forEach((row,y) =>{
            row.forEach((value,x) =>{
                ////console.log(value);
                //this.offest = 0.1;
                this.ctx.globalCompositeOperation = 'destination-over'
                this.ctx.fillStyle = 'rgba(0,0,0,1)';
                this.ctx.fillRect(x,y,0.1,1);
                this.ctx.fillRect(x,y,1,0.1);
                this.ctx.font = `1px Arial`;
                this.ctx.fillText(value.toString(),x,y+1);
            });
        });
        //this.ctx.fillStyle = 'rgba(255,255,255,1)';
        //this.ctx.fillRect(0,0,Canvas.ctx.canvas.width,Canvas.ctx.canvas.height)
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
            this.lastFallTime += 150;
        } else {
            this.inputActive = false;
            this.lastFallTime -= 100;
        }
    }

    generatePieces(){
        if(this.gameOver){
            return;
        }
        if(this.shapeList.length == 1){
            this.updateList = false;
        }
        while(this.shapeList.length < 1 && this.updateList){
            this.possibleShapes = ["I","J","L","O","S","T","Z"];
            var randomShape = this.possibleShapes[getRNG(this.possibleShapes.length-1)];
            ////console.log(randomShape);
            this.shapeList.push(randomShape);
        }
        if(this.shapeList.length == 1){
            this.updateList = false;
        }
        
        ////console.log(this.shapeList);
        this.fallingPieces = 0;
        if(this.pieces.length >= 1){
            this.pieces.forEach((piece,i) => {
                if(piece.active == 1 ){
                    this.fallingPieces++;
                }
            });
        }
        if(this.fallingPieces == 0){
            this.createPiece(this.shapeList[0]);
            this.shapeList.splice(0,1);
            this.updateList = true;
        }
        console.log(this.shapeList);
        this.nextPieceText.innerText = `Next Piece: ${this.shapeList[0]}`;
    }

    createPiece(type,bool){
        this.x = 0;
        this.y = 0;
        switch(type){
            case 'I':
                this.color = '#75f1ff';
                this.length = 1;
                this.height = 4;
                this.shape = [
                    [1],
                    [1],
                    [1],
                    [1]
                ];
                break;
            case 'J':
                this.color = '#0d00ff';
                this.length = 2;
                this.height = 3;
                this.shape = [
                    [0,1],
                    [0,1],
                    [1,1]
                ];
                break;
            case 'L':
                this.color = '#ffb300';
                this.length = 2;
                this.height = 3;
                this.shape = [
                    [1,0],
                    [1,0],
                    [1,1]
                ];
                break;
            case 'O':
                this.color = '#fff700';
                this.length = 2;
                this.height = 2;
                this.shape = [
                    [1,1],
                    [1,1]
                ];
                break;
            case 'S':
                this.color = '#48913c';
                this.length = 3;
                this.height = 2;
                this.shape = [
                    [0,1,1],
                    [1,1,0]
                ];
                break;
            case 'T':
                this.color = '#a732d1';
                this.length = 3;
                this.height = 2;
                this.shape = [
                    [1,1,1],
                    [0,1,0]
                ];
                break;
            case 'Z':
                this.color = '#ff3d3d';
                this.length = 3;
                this.height = 2;
                this.shape = [
                    [1,1,0],
                    [0,1,1]
                ];
                break;
        }
        this.ctx.fillStyle = this.color;
        let pieceData = {"x":this.x,"y":this.y,"active":1,'color':this.color,"shapeN":type,"length":this.length,"height":this.height,"shape":this.shape, "id":this.pieces.length}
        if(!bool){
            this.shape.forEach((row, y) => {
                //console.log(row);
                row.forEach((value,x) => {
                    if(value > 0){
                        console.log(x,y,row,value);
                        this.ctx.fillRect(this.x+x-this.length,this.y+y+this.height,1,1);
                        board.updateBoard(this.x+x-this.length,this.y+y+this.height);   
                    }
                });
            });
            var piece = this.addItem(pieceData);
            console.log(piece);
            this.activePiece = piece;
            return piece;
        } else {
            return pieceData;
        }
    }
    
    fallPieces(){
        if(this.gameOver){
            return;
        }
        if(this.lastFallTime + this.fallTime > Date.now()){
            console.log("dont fall");
            return;
        }
        if(this.inputActive){
            this
        }
        if(this.activePiece.y+this.activePiece.height > 19){
            this.activePiece.active = 0;
            return;
        }
        let clear = 0;
        console.log(this.activePiece.shape);
        this.activePiece.shape.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value == 0){
                    return;
                }
                if(board.grid[this.activePiece.y+y+1][this.activePiece.x+x] == 2){
                    clear--;
                }
            });
        });
        console.log(clear);
        if(clear == 0){
            this.activePiece.y++;
        } else {
            this.activePiece.active = 0;
        }
        this.lastFallTime = Date.now();
    }

    resetLinesCleared(){
        if(Date.now() < this.lastLineClearedTime + this.LineClearedTime){
            //console.log(`Cannot Update Lines Cleared: Time Left: ${(this.lastLineClearedTime + this.LineClearedTime)-Date.now()}`);
            return;
        }
        if(this.linesCleared > 0){
            switch(this.linesCleared){
                case 1:
                    scoreMan.addPoints('SINGLE');
                    break;
                case 2:
                    scoreMan.addPoints('DOUBLE');
                    break;
                case 3:
                    scoreMan.addPoints('TRIPLE');
                    break;
                case 4:
                    scoreMan.addPoints('QUAD');
                    break;
            }
            
        }
        this.linesCleared = 0;
        this.lastLineClearedTime = Date.now();
    }

    checkLineClear(){
        this.grid.forEach((row,y) => {
            console.log(row.every(value => value == 2));
            if(row.every(value => value == 2)){
                this.cleared = false;
                console.log(`Row is ready to clear`);
                canvas.activeItems.forEach((piece,i) =>{
                    console.log(`Active Piece: ${piece}`)
                    piece.shape.forEach((pRow,pY) =>{
                        console.log(`Current Row: ${pRow}, Index: ${pY}`);
                        if(piece.y+pY == y){
                            console.log(`Y Levels Match`);
                            pRow.forEach((pVal,pX) => {
                                piece.shape[pY][pX] = 0;
                                this.cleared = true;    
                            });
                        }
                    });
                    if(this.cleared && piece.realY() < y){
                        piece.y++;
                    }
                });
                this.linesCleared++;
            }
        });
        
    }

    addItem(object){
        console.log(object);
        [object].push({id:this.pieces.length}); // no need to add one as the length is 1 more than the index as arrays start at 0, a 1 item array would start at 0 but the length is 1
        console.log(this.pieces);
        this.pieces.push(object);
        //console.log(object);
        return object;
    }
    removeItem(id){
        this.pieces.splice(id,1);
    }

    setInactive(){
        board.activePiece.active = 0;
    }

    holdPiece(){
        if(typeof this.heldPiece === 'object'){
            this.shapeList[0] = this.heldPiece.shapeN;
            this.activePiece.active = 0;
            this.heldPiece = this.activePiece;
            this.removeItem(this.activePiece.id);
            document.getElementById("heldPiece").innerText = `Held Piece: ${this.heldPiece.shapeN}`;
        } else {
            this.heldPiece = this.activePiece;
            this.activePiece.active = 0;
            this.removeItem(this.activePiece.id);
            document.getElementById("heldPiece").innerText = `Held Piece: ${this.heldPiece.shapeN}`;
        }
        
    }
}