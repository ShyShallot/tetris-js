function getRNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function isValidMoveSpot(piece,board,dir){
    console.log(piece);
    console.log(board);
    if(typeof piece === 'undefined'){
        return;
    }
    
}
function transpose(matrix) { // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  }