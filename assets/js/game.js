let snake, apple, squareSize, score, speed,
    updateDelay, direction, newDirection,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyleKey, textStyleValue, maxAppleValue;

let Game = {

    // Зображення "змійки", "яблука"
    preload : function() {
        game.load.image('snake', './assets/images/blockSnake.png');
        game.load.image('apple', './assets/images/blockApple.png');
        
    },

    create : function() {

      snake = [];                     
      apple = {};                     
      squareSize = 15;                
      score = 0;                      
      speed = 0;                      
      updateDelay = 0;                
      direction = 'right';            
      newDirection = null;           
      addNew = false;                 
        
      // Створення "змійки"  
      for(let i = 0; i < 10; i++){
        snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake'); 
      }

      // Створення "яблука"
      this.generateApple();

      game.stage.backgroundColor = '#A024B6';
      textStyleKey = { font: "bold 14px sans-serif", fill: "#1ECEF4", align: "center" };
      textStyleValue = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

      // Кількість "яблук"
      game.add.text(30, 20, "Apple score:", textStyleKey);
        scoreTextValue = game.add.text(150, 18, score.toString(), textStyleValue);
        
      // Рекорд "яблук"
        game.add.text(255, 20, "Record score:", textStyleKey);
        let maxApple = localStorage.getItem('maxApple');
        if (!maxApple) {
            maxAppleValue = game.add.text(360, 18, '0', textStyleValue);
        } else {
            maxAppleValue = game.add.text(360, 18, maxApple, textStyleValue);
        }
        
      // Швидкість
      game.add.text(475, 20, "Speed:", textStyleKey);
      speedTextValue = game.add.text(560, 18, speed.toString(), textStyleValue);
        
      cursors = game.input.keyboard.createCursorKeys();

    },

    update: function () {

      // "Прослуховування" натиснутих кнопок  
        
      if (cursors.right.isDown && direction!='left')
      {
        newDirection = 'right';
      }
      else if (cursors.left.isDown && direction!='right')
      {
        newDirection = 'left';
      }
      else if (cursors.up.isDown && direction!='down')
      {
        newDirection = 'up';
      }
      else if (cursors.down.isDown && direction!='up')
      {
        newDirection = 'down';
      }

    // Зміна швидкості, якщо змійка з"їла 5 яблук
    if (score % 5 === 0) {
        speed = Math.min(10, Math.floor(score/5));
    }
    speedTextValue.text = '' + speed;
    updateDelay++;

    if (updateDelay % (10 - speed) == 0) {

        // Рух змійки

        let
            firstCell = snake[snake.length - 1];
            lastCell = snake.shift(),
            oldLastCellx = lastCell.x,
            oldLastCelly = lastCell.y;

        if(newDirection){
            direction = newDirection;
            newDirection = null;
        }

        if(direction == 'right'){

            lastCell.x = firstCell.x + 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'left'){
            lastCell.x = firstCell.x - 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'up'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y - 15;
        }
        else if(direction == 'down'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y + 15;
        }

        snake.push(lastCell);
        firstCell = lastCell;

    };
        
    if(addNew){
        snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
        addNew = false;
    }

    firstCell = snake[snake.length - 1];
        
    // Контроль за "зіткенням змійки"
        
        // з "яблуком"
    this.appleCollision();

        // з самим собою
    this.selfCollision(firstCell);

        // зі "стінкою"
    this.wallCollision(firstCell);
    },

    generateApple: function(){

      let randomX = Math.floor( Math.random() * 40 ) * squareSize,
          randomY = Math.floor(Math.random() * 20 ) * squareSize;

      apple = game.add.sprite(randomX, randomY, 'apple');
    },
    
    appleCollision: function() {

    for(let i = 0; i < snake.length; i++){
        if(snake[i].x == apple.x && snake[i].y == apple.y){

            addNew = true;

            apple.destroy();

            this.generateApple();

            score++;

            scoreTextValue.text = score.toString();

        }
    }

    },

    selfCollision: function(head) {

    for(let i = 0; i < snake.length - 1; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){

            game.state.start('Game_Over');
        }
    }

    },

    wallCollision: function(head) {

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
    },

};