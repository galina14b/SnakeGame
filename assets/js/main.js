import { Menu } from './menu.js';
import { Game } from './game.js';
import { GameOver } from './game_over.js';


const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 450,
  scene: [Menu, Game, GameOver]
};

const game = new Phaser.Game(config);

