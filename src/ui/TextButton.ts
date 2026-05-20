import config from "./config";

export default class TextButton extends Phaser.GameObjects.Container {

  private text: Phaser.GameObjects.Text;
  private normalBg: Phaser.GameObjects.Container;
  private pressedBg: Phaser.GameObjects.Container;

  static register() {
    (Phaser.GameObjects as any).GameObjectFactory.register('textButton', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, label: string, callback: Function, width: number = 0) {
      const textButton = new TextButton(this.scene, x, y, label, callback, width);
      this.displayList.add(textButton);
      return textButton;
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number, label: string, callback: Function, width = 0) {
    super(scene, x, y);

    this.normalBg = this.scene.add.threeslice(0, 0, 'button', width);
    this.pressedBg = this.scene.add.threeslice(0, 0, 'button_pressed', width);
    this.pressedBg.setVisible(false);

    this.text = this.scene.add.text(0, -3, label, config.textStyle.button).setInteractive();
    this.text.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      callback(pointer, this, label);
    });

    this.add([this.normalBg, this.pressedBg, this.text]);
  }

  public setButtonState = (state: String) => {
    if (state === 'normal') {
      this.normalBg.setVisible(true);
      this.pressedBg.setVisible(false);
      this.text.style.setColor(config.colors.button.normalTextColor);
    } else if (state === 'pressed') {
      this.normalBg.setVisible(false);
      this.pressedBg.setVisible(true);
      this.text.style.setColor(config.colors.button.pressedTextColor);
    }
  }
}
