// Кількість яблук в поточній грі
        let currentScore = localStorage.getItem('applesInCurrentGame');

class Game_Over extends Phaser.Scene {
    constructor() {
    super("End");
  }

    preload() {
        
        this.load.image('gameover', './assets/images/gameover.png');
    }

    create() {

        this.add.image(300, 225, 'gameover')

        
        this.add.text(235, 310, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
        this.add.text(344, 308, currentScore, { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        


        // Збереження рекорду в локалсторадж
        let storagedScore = localStorage.getItem('maxApple');
        if (!storagedScore) {
            localStorage.setItem('maxApple', currentScore)
        } else if(storagedScore < currentScore){
            localStorage.removeItem('maxApple');
            localStorage.setItem('maxApple', currentScore);
        }

        this.input.on("pointerdown", (pointer) => {
        this.scene.start("Game");
    });
    }

};

export { Game_Over };