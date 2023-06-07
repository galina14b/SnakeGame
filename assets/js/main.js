import { Menu } from './menu.js';
import { Game } from './game.js';
import { Game_Over } from './game_over.js';

let sceneToPlay = new Game();
let sceneToFinish = new Game_Over();
let sceneToBegin = new Menu();

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 450,
  scene: [sceneToBegin, sceneToPlay, sceneToFinish]
};

const game = new Phaser.Game(config);

