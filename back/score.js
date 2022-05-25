class Score{
    constructor(){
        this.score = 0;
        this.pointTypes = {
            SINGLE: 50,
            DOUBLE: 100,
            TRIPLE: 200,
            QUAD: 500
        }
        this.level = 0;
        this.levelChangeMin = 1500;
        this.scoreText = document.getElementById('score');
        this.highScoreText = document.getElementById('highscore');
    }

    checkLevel(){
        if(this.score > this.level * this.levelChangeMin){
            this.level++;
            this.levelChangeMin *= 1.15;
        }
    }

    addPoints(pointType){
        switch(pointType){
            case 'SINGLE':
                this.score += this.pointTypes.SINGLE;
                break;
            case 'DOUBLE':
                this.score += this.pointTypes.DOUBLE;
                break;
            case 'TRIPLE':
                this.score += this.pointTypes.TRIPLE;
                break;
            case 'QUAD':
                this.score += this.pointTypes.QUAD;
                break;
        }
    }

    savePoints(){
        window.localStorage.setItem('highscore', this.score);
    }

    updateScore(){
        this.scoreText.innerText = `Score: ${this.score.toString()}`
    }

    getHighScore(){
        var highScore = window.localStorage.getItem('highscore');
        if(typeof highScore === 'undefined' || highScore == null){
            var highScore = 0;
        }
        this.highScoreText.innerText = `High Score: ${highScore}`;
    }
}