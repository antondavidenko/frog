import UiConfig from "./config";

export default class Popup extends Phaser.GameObjects.Container {

  private callback!: Function;

  static register() {
    (Phaser.GameObjects as any).GameObjectFactory.register('popup', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, label: string, callback: Function) {
      const imageButton = new Popup(this.scene, x, y, label, callback);
      this.displayList.add(imageButton);
      return imageButton;
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number, label: string, callback: Function) {
    super(scene, 0, 0);
    this.callback = callback;
    this.add(this.getPopupBackground());
    this.add(this.scene.add.nineslice(100, 240, 420, 240, 'popup9', 46));
    this.add(this.scene.add.text(x, y, label, UiConfig.textStyle.popup));
    this.add(this.scene.add.textButton(x + 150, y + 130, "  OK  ", this.buttonCallback, 50));
  }

  private buttonCallback = () => {
    this.visible = false;
    this.callback();
  };

  private getPopupBackground(): Phaser.GameObjects.Rectangle {
    const screenWidth: number = this.scene.cameras.main.width + 2;
    const screenHeight: number = this.scene.cameras.main.height + 2;
    return this.scene.add.rectangle(screenWidth / 2, screenHeight / 2, screenWidth, screenHeight, 0x000000, 0.7);
  }
}
