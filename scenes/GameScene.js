import {Putin1, Putin2, Putin3} from '../entities/Putin.js';
import {Ship} from '../entities/Ship.js';



class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.winned = false;
    this.gameOver = false;
    this.screenWidth = 540;
    this.screenHeight = 960;
    this.endSounds = false;
  }

  preload(){
  }



  loadPutins(){
    this.putins1 = this.physics.add.group();
    this.putins2 = this.physics.add.group();
    this.putins3 = this.physics.add.group();


    for (let i = 0; i < 6; i++){
      this.putins1.add(Putin1(this, 100 + i*64, 100));
      this.putins1.add(Putin1(this, 100 + i*64, 100 + 64));
    }

    for (let i = 0; i < 6; i++){
      this.putins2.add(Putin2(this, 100 + i*64, 100 + 64*2));
      this.putins2.add(Putin2(this, 100 + i*64, 100 + 64*3));
    }


    for (let i = 0; i < 6; i++){
      this.putins2.add(Putin3(this, 100 + i*64, 100 + 64*4));
      this.putins2.add(Putin3(this, 100 + i*64, 100 + 64*5));
    }


  }

  playWinMessage(){
    this.add.bitmapText(40, 450, 'carrier_command', 'You killed Putin!', 23);
    this.add.bitmapText(50, 500, 'carrier_command', 'Press space or touch to restart...', 10);
  }

  playGameOverMessage(){
    this.add.bitmapText(40, 450, 'carrier_command', 'Kyiv has been taken!', 20);
    this.add.bitmapText(40, 500, 'carrier_command', 'Press space or touch to restart...', 10);
  }

  restartGame(){
    this.endSounds = false;
    this.gameOver = false;
    this.winned = false;
    this.score = 0;
    this.rasputin.stop();
    this.registry.destroy(); // destroy registry
    this.events.off();  // disable all active events
    this.scene.restart();  // restart current scene
  }

  create() {

    let bg = this.add.sprite(0,0, 'background');
    bg.setOrigin(0,0);

    this.ship = new Ship(this, 270, 880);

    this.loadPutins();

    this.input.addPointer();

    // Keyboard Input.
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.rasputin = this.sound.add('rasputin');
    this.shipShoot = this.sound.add('shipShoot');
    this.invaderExplosion = this.sound.add('invaderExplosion');
    this.gameOverSound = this.sound.add('gameOverSound');
    this.winSound = this.sound.add('winSound');
    this.rasputin.play();
    this.textScore = this.add.bitmapText(20, 20, 'carrier_command', 'score', 20);
  }

  update(){
    this.textScore.text = `score: ${this.score}`;
    
    if (this.winned){
      if (!this.endSounds){
        this.winSound.play();
        this.endSounds = true;
      }
      this.playWinMessage();
    }

    if (this.gameOver){
      if (!this.endSounds){
        this.gameOverSound.play();
        this.endSounds = true;
      }

      this.playGameOverMessage();
    }

    if (this.winned || this.gameOver){
       if (this.keySpace.isDown || this.input.pointer1.isDown){
        this.restartGame();
      }
    }

    if (this.score == 36){
      this.winned = true;
    }
  }

}

export {GameScene};
