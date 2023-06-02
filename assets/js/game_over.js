var Game_Over = {

    preload: function () {
        
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create: function () {
        
        this.add.button(0, 0, 'gameover', this.startGame, this);

        game.add.text(235, 310, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
        game.add.text(344, 308, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        

        // Збереження рекорду в локалсторадж
        let storagedScore = localStorage.getItem('maxApple');
        if (!storagedScore) {
            localStorage.setItem('maxApple', score.toString())
        } else if(storagedScore < score){
            localStorage.removeItem('maxApple');
            localStorage.setItem('maxApple', score.toString());
        }
    },

    startGame: function () {

        this.state.start('Game');
    }

};