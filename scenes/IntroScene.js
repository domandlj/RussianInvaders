class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
    this.textSize = 15;
  }

  preload() {
    this.load.image('intro', 'assets/TitleBG.png');
    this.load.bitmapFont('carrier_command',
      'assets/fonts/carrier_command.png',
      'assets/fonts/carrier_command.xml');
  }

  async getRublePrice(url){
    const response = await fetch(url);
    const price = await response.json();
    return price.result;
  }

  async getRubleDevaluation(){
    let priceNow = 0;
    let priceBeforeInvasion = 0;

    await this.getRublePrice('https://api.exchangerate.host/convert?from=RUB&to=USD')
      .then(price => {
        priceNow = price;
      });

    await this.getRublePrice('https://api.exchangerate.host/convert?from=RUB&to=USD&date=2022-01-01')
      .then(price => {
        priceBeforeInvasion = price;
      });

    return Math.abs(Math.round((priceNow - priceBeforeInvasion)/priceBeforeInvasion * 100));
  }

  create() {
    let bg = this.add.sprite(0,0, 'intro');
    bg.setOrigin(0,0);
    this.input.addPointer();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.text1 = this.add.bitmapText(70, 400, 'carrier_command', 'Putin Must Die!',25);
    this.text2 = this.add.bitmapText(100, 450, 'carrier_command', 'Stop the invasion with the ghost of Kyiv',8);
    this.text2.setCharacterTint(0, 100, true, 0xFFFF00);
    this.text3 = this.add.bitmapText(20, 700, 'carrier_command', 'Press SPACE or touch  \n\nthe screen to start \n\nplaying...', 10);
    this.getRubleDevaluation().then(devaluation => {
      this.add.bitmapText(110, 490, 'carrier_command', `russian ruble dropped ${devaluation}%\n\n  against the USD dollar`, 10);
    });
  }

  update(){


    if (this.input.pointer1.isDown || this.keySpace.isDown){
      this.scene.start('PreloadScene');
    }
  }
}

export {IntroScene}
