let game;
import { Menu } from './menu.js';
import { Game } from './game.js';
import { Game_Over } from './game_over.js';

game = new Phaser.Game(600, 450, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Menu');

