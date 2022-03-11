import {IntroScene} from './scenes/IntroScene.js';
import {GameScene} from './scenes/GameScene.js';
import {PreloadScene} from './scenes/PreloadScene.js';

let config = {
  parent: 'game',
       
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  scene: [IntroScene, PreloadScene, GameScene],

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 270,
      height: 480
    },
    
    zoom: 1  // Size of game canvas = game size * zoom
  },
  physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
} 


let game = new Phaser.Game(config);
