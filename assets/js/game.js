class Game {
    snake = [];                     
    apple = {};                     
    squareSize = 15;                
    score = 0;                      
    speed = 0;                      
    updateDelay = 0;                
    direction = 'right';            
    newDirection = null;           
    addNew = false;   
    cursors; 
    scoreTextValue; 
    speedTextValue; 
    textStyleKey; 
    textStyleValue;
    maxAppleValue;

    // Зображення "змійки", "яблука"
    preload() {
        this.game.load.image('snake', './assets/images/blockSnake.png');
        this.game.load.image('apple', './assets/images/blockApple.png');
        
    }

    create() {               
        
      // Створення "змійки"  
      for(let i = 0; i < 10; i++){
        this.snake[i] = this.game.add.sprite(150+i*this.squareSize, 150, 'snake'); 
      }

      // Створення "яблука"
      this.generateApple();

      this.game.stage.backgroundColor = '#A024B6';
      this.textStyleKey = { font: "bold 14px sans-serif", fill: "#1ECEF4", align: "center" };
      this.textStyleValue = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

      // Кількість "яблук"
        this.game.add.text(30, 20, "Apple score:", this.textStyleKey);
        this.scoreTextValue = this.game.add.text(125, 18, this.score.toString(), this.textStyleValue);
        
      // Рекорд "яблук"
        this.game.add.text(255, 20, "Record score:", this.textStyleKey);
        let maxApple = localStorage.getItem('maxApple');
        if (!maxApple) {
            this.maxAppleValue = this.game.add.text(360, 18, '0', this.textStyleValue);
        } else {
            this.maxAppleValue = this.game.add.text(360, 18, this.maxApple, this.textStyleValue);
        }
        
      // Швидкість
      this.game.add.text(475, 20, "Speed:", this.textStyleKey);
      this.speedTextValue = this.game.add.text(530, 18, this.speed.toString(), this.textStyleValue);
        
      this.cursors = this.game.input.keyboard.createCursorKeys();

    }

    update() {

      // "Прослуховування" натиснутих кнопок  
        console.log(this.cursors);
        console.log(this.direction);
        console.log(this.newDirection);
        
      if (this.cursors.right.isDown && this.direction!='left')
      {
        this.newDirection = 'right';
      }
      else if (this.cursors.left.isDown && this.direction!='right')
      {
        this.newDirection = 'left';
      }
      else if (this.cursors.up.isDown && this.direction!='down')
      {
        this.newDirection = 'up';
      }
      else if (this.cursors.down.isDown && this.direction!='up')
      {
        this.newDirection = 'down';
      }

    // Зміна швидкості, якщо змійка з"їла 5 яблук
    if (this.score % 5 === 0) {
        this.speed = Math.min(10, Math.floor(this.score/5));
    }
    this.speedTextValue.text = '' + this.speed;
        this.updateDelay++;
        

    let oldLastCellx, oldLastCelly;
        
    if (this.updateDelay % (10 - this.speed) == 0) {

        // Рух змійки

        let firstCell = this.snake[this.snake.length - 1];
        let lastCell = this.snake.shift();
        oldLastCellx = lastCell.x;
        oldLastCelly = lastCell.y;

        if(this.newDirection){
            this.direction = this.newDirection;
            this.newDirection = null;
        }

        if(this.direction == 'right'){

            lastCell.x = firstCell.x + 15;
            lastCell.y = firstCell.y;
        }
        else if(this.direction == 'left'){
            lastCell.x = firstCell.x - 15;
            lastCell.y = firstCell.y;
        }
        else if(this.direction == 'up'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y - 15;
        }
        else if(this.direction == 'down'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y + 15;
        }

        this.snake.push(lastCell);
        firstCell = lastCell;

    };
        
    if(this.addNew){
        this.snake.unshift(this.game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
        this.addNew = false;
    }

    this.firstCell = this.snake[this.snake.length - 1];
        
    // Контроль за "зіткенням змійки"
        
        // з "яблуком"
    this.appleCollision();

        // з самим собою
    this.selfCollision(this.firstCell);

        // зі "стінкою"
    this.wallCollision(this.firstCell);
    }

    generateApple(){

      let randomX = Math.floor( Math.random() * 40 ) * this.squareSize,
          randomY = Math.floor(Math.random() * 20 ) * this.squareSize;

      this.apple = this.game.add.sprite(randomX, randomY, 'apple');
    }
    
    appleCollision() {

    for(let i = 0; i < this.snake.length; i++){
        if(this.snake[i].x == this.apple.x && this.snake[i].y == this.apple.y){

            this.addNew = true;

            this.apple.destroy();

            this.generateApple();

            this.score++;

            this.scoreTextValue.text = this.score.toString();

        }
    }

    }

    selfCollision(head) {

    for(let i = 0; i < this.snake.length - 1; i++){
        if(head.x == this.snake[i].x && head.y == this.snake[i].y){

            this.game.state.start('Game_Over');
        }
    }

    }

    wallCollision(head) {

    if (head.x >= 600) {
        head.x = 0
    }

    else if (head.x < 0) {
        head.x = 600-15
    }

    else if (head.y >= 450) {
        head.y = 0
    }

    else if (head.y < 0) {
        head.y = 450-15
    }
    }

};

export { Game };