import { Game } from './game.js';


var e = document.querySelector("body");

e.height = "100%";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 100 },
      debug: false
    }
  }
}

var game = new Phaser.Game(config);