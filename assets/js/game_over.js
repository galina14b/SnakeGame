import {Game} from './game.js'

class Game_Over extends Game {
    constructor(score) {
        super(score);
    }

    preload() {
        
        this.game.load.image('gameover', './assets/images/gameover.png');
    }

    create() {
        
        this.add.button(0, 0, 'gameover', this.startGame, this);

        this.game.add.text(235, 310, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
        this.game.add.text(344, 308, this.score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        

        // Збереження рекорду в локалсторадж
        let storagedScore = localStorage.getItem('maxApple');
        if (!storagedScore) {
            localStorage.setItem('maxApple', this.score.toString())
        } else if(storagedScore < this.score){
            localStorage.removeItem('maxApple');
            localStorage.setItem('maxApple', this.score.toString());
        }
    }

    startGame() {

        this.state.start('Game');
    }

};

export { Game_Over };