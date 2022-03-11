class Blaster extends Phaser.Physics.Arcade.Sprite {

    destroyPutin(blaster, putin){
      if (!putin.locked){
        putin.scene.invaderExplosion.play();
        if (putin.scene){
          putin.scene.score += 1;
        }
        blaster.destroy();
        putin.explode();
      }
    }

    constructor (scene, x, y){
      super(scene, x, y);
      scene.add.existing(this)
      scene.physics.add.existing(this)
      this.setCollideWorldBounds(true)
      this.scene = scene;
      this.speed = 2.8;
      this.setOrigin(0, 0);
      this.setPosition(x, y);
      this.setTexture('blaster');
      scene.physics.add.collider(this, scene.putins1, this.destroyPutin);
      scene.physics.add.collider(this, scene.putins2, this.destroyPutin);
      scene.physics.add.collider(this, scene.putins3, this.destroyPutin);
    }



    fire(){
     let blast = new Blaster(this.scene, this.x + this.width/2 - 3, this.y - this.height/4);
    }



    preUpdate (time, delta){
      super.preUpdate(time, delta);
      this.y -= this.speed;

      if (this.y <= 0) {
        this.destroy();
      }

   }
}

export {Blaster};
