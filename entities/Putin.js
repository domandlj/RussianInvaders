import {InvaderBlaster} from './InvaderBlaster.js';

class Putin extends Phaser.Physics.Arcade.Sprite {
 constructor (scene, x, y, putinSprite, destructionSprite){
     super(scene, x, y);
     this.putinSprite = putinSprite;
     scene.add.existing(this);
     scene.physics.add.existing(this);
     this.setCollideWorldBounds(true);
     this.scene = scene;
     this.counter = 0;
     this.direction = 1;
     this.locked = false;

     this.anims.create({
        key: 'putin_anim',
        frames: this.anims.generateFrameNumbers(putinSprite),
        frameRate: 3,
        repeat: -1
      });

      this.anims.create({
        key: 'destruction_anim',
        frames: this.anims.generateFrameNumbers(destructionSprite),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });

      this.play('putin_anim');
      this.setOrigin(0, 0);
      this.setPosition(x, y);
    }


   fire(){
     let blast = new InvaderBlaster(this.scene, this.x + this.width/2 - 3, this.y + this.height/2);

    }



  explode(){
    this.locked = true;
    this.play('destruction_anim');
  }

  preUpdate (time, delta){
    super.preUpdate(time, delta);

    if (!this.locked){
    this.y += 0.3;
    if (this.putinSprite == 'putin1'){
      this.y += Math.cos(this.counter % 500);
      this.counter += 0.5;
    }

    if (this.putinSprite == 'putin2'){

      if (this.direction == 1){
        this.x += 3;
      } else {
        this.x -= 3;
      }

      if (this.x >= this.scene.screenWidth - this.width){
        this.direction = 0;
      }

      if (this.x <= 0){
        this.direction = 1;
      }


    }

    if (this.putinSprite == 'putin3'){
       if (this.direction == 0){
        this.x += 3;
      } else {
        this.x -= 3;
      }

      if (this.x >= this.scene.screenWidth - this.width){
        this.direction = 1;
      }

      if (this.x <= 0){
        this.direction = 0;
      }



    }
    if (Math.random() < 0.002){
        this.fire();
      }
    }

    if (this.y > this.scene.screenHeight * (1 -  1/5)){
      this.scene.gameOver = true;
    }
   }
}

function Putin1(scene, x, y){
  return new Putin(scene, x, y, 'putin1', 'destruction1');
}

function Putin2(scene, x, y){
  return new Putin(scene, x, y, 'putin2', 'destruction2');
}

function Putin3(scene, x, y){
  return new Putin(scene, x, y, 'putin3', 'destruction3');
}

export {Putin1, Putin2, Putin3};
