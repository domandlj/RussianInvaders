class PreloadScene extends Phaser.Scene {

	constructor() {
		super({key : 'PreloadScene'});
	}

	preload() {
    this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(75, 195, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(80, 200, 290, 40);
    this.cameras.main.setBackgroundColor(0x171642);
		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);
    
    this.loadingText = this.add.bitmapText(120, 300, 'carrier_command', `Loading: 0 %`, 20);

    this.load.bitmapFont('carrier_command',
      'assets/fonts/carrier_command.png',
      'assets/fonts/carrier_command.xml');


    this.load.audio('rasputin', 'assets/sounds/rasputin.mp3');
    this.load.audio('shipShoot', 'assets/sounds/shipShoot.wav');
    this.load.audio('winSound', 'assets/sounds/winSound.wav');
    this.load.audio('gameOverSound', 'assets/sounds/gameOverSound.wav');
    this.load.audio('invaderExplosion', 'assets/sounds/invaderExplosion.wav');
    this.load.image('background', 'assets/bg.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('blaster', 'assets/blaster.png');
    this.load.image('invaderBlaster', 'assets/invaderblaster.png');



    this.load.spritesheet('putin1', 'assets/spritesheets/putin1.png',
      {
        frameWidth: 64,
        frameHeight: 64
      });

     this.load.spritesheet('putin2', 'assets/spritesheets/putin2.png',
      {
        frameWidth: 64,
        frameHeight: 64
      });

    this.load.spritesheet('putin3', 'assets/spritesheets/putin3.png',
      {
        frameWidth: 64,
        frameHeight: 64
      });

    this.load.spritesheet('destruction1', 'assets/spritesheets/destruction1.png',
      {
        frameWidth: 64,
        frameHeight: 64
      });

     this.load.spritesheet('destruction2', 'assets/spritesheets/destruction2.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }); 

     this.load.spritesheet('destruction3', 'assets/spritesheets/destruction3.png',
      {
        frameWidth: 64,
        frameHeight: 64
      });

    // status bar...
    this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics, loadingText: this.loadingText});
    this.load.on('complete', this.complete, {scene:this.scene});

	}
  
  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0xFFD700, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(80, 200, percentage*390, 40));
		
    percentage = Math.round(percentage * 100);
       //this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    this.loadingText.text = `Loading: ${percentage}%`; 
  }

  complete() {
		this.scene.start("GameScene");
	}
}

export {PreloadScene};
