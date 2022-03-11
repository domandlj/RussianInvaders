class InvaderBlaster extends Phaser.Physics.Arcade.Sprite {

    destroyShip(blaster, ship){
      blaster.destroy();
      ship.explode();
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
      this.setTexture('invaderBlaster');

      scene.physics.add.collider(this, scene.ship, this.destroyShip);


    }





    preUpdate (time, delta){
      super.preUpdate(time, delta);
      this.y += this.speed;

      if (this.y > this.scene.screenHeight - this.scene.screenHeight/10){
        this.destroy();
      }
   }

}

export {InvaderBlaster}
