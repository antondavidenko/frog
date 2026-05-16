export default class ImageButton extends Phaser.GameObjects.Image {
  static register() {
    (Phaser.GameObjects as any).GameObjectFactory.register('imageButton', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, key: string, callback: Function) {
      const imageButton = new ImageButton(this.scene, x, y, key, callback);
      this.displayList.add(imageButton);
      return imageButton;
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, callback: Function) {
    super(scene, x, y, key);
    this.setInteractive();
    this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        callback(pointer, this, key);
    });
  }
}