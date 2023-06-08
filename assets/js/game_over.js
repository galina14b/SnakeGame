// Кількість яблук в поточній грі

class GameOver extends Phaser.Scene {
    constructor() {
        super("End");
  }

    preload() {
        
        this.load.image('gameover', './assets/images/gameover.png');
    }

    create() {

        this.add.image(300, 225, 'gameover')

        
        this.add.text(235, 310, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
        this.add.text(344, 308, this.score, { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        


        // Збереження рекорду в локалсторадж
        let storagedScore = localStorage.getItem('maxApple');
        if (!storagedScore) {
            localStorage.setItem('maxApple', this.score)
        } else if(storagedScore < this.score){
            localStorage.removeItem('maxApple');
            localStorage.setItem('maxApple', this.score);
        }

        this.input.on("pointerdown", (pointer) => {
        this.scene.start("Game");
    });
    }

};

export { GameOver };