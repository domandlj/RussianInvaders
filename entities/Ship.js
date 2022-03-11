import {Blaster} from './Blaster.js';

class Ship extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y){
      super(scene, x, y);
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);

      this.locked = false;
      this.speed = 2.8;
      this.fireSpeed = 0.6;
      this.setTexture('ship');
      this.setOrigin(0, 0);
      this.setPosition(x, y);

      this.anims.create({
        key: 'destruction_anim',
        frames: this.anims.generateFrameNumbers('destruction3'),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });

    }

    fire(){
     this.scene.shipShoot.play();
     let blast = new Blaster(this.scene,
                    this.x + this.width/2 - 3, this.y - this.height/4);

    }


    explode(){
      this.scene.invaderExplosion.play();
      this.scene.gameOver = true;
      this.play('destruction_anim');
    }

    handleFire(){
      let pointer1 = this.scene.input.pointer1;
      let pointer2 = this.scene.input.pointer2;

      if (pointer1.isDown && pointer1.downY < this.scene.screenHeight* 3/4 && pointer1.getDuration() < this.fireSpeed){
        this.fire();
      }

      if (pointer2.isDown && pointer2.getDuration() < this.fireSpeed) {
        this.fire();
      }

      if (Phaser.Input.Keyboard.JustDown(this.scene.keySpace)){
          this.fire();
      }
    }

    moveRight(){
      this.x = Math.min(this.scene.screenWidth - this.width, this.x + this.speed);
    }

    moveLeft(){
      this.x = Math.max(0, this.x - this.speed);
    }

    preUpdate(time, delta){
      super.preUpdate(time, delta);

      if (this.scene.input.pointer1.isDown){
      if (this.scene.input.pointer1.downY > this.scene.screenHeight * 3/4) {
          if (this.scene.input.pointer1.downX > this.scene.screenWidth/2){
            this.moveRight();
          } else {
            this.moveLeft();
          }

        }
      }

      if (this.scene.keyLeft.isDown){
        this.moveLeft();
      }

      if (this.scene.keyRight.isDown){
        this.moveRight();
      }

      this.handleFire();


     if (this.anims.currentFrame != null){
       if (this.anims.currentFrame.isLast){
        this.destroy();
       }
     }
    }

}

export {Ship};
