export default class ThreeSlice extends Phaser.GameObjects.Container {
  static register() {
      (Phaser.GameObjects as any).GameObjectFactory.register('threeslice', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, key: string, width: number = 0) {
      const threeSlice = new ThreeSlice(this.scene, x, y, key, width);
      this.displayList.add(threeSlice);
      return threeSlice;
    });
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, width: number = 0) {
    super(scene, x, y, [
      scene.add.image(0, 0, `${key}_left`).setOrigin(0, 0).setScale(0.5),
      scene.add.image(0 + 23, 0, `${key}_center`).setOrigin(0, 0).setDisplaySize(width + 23, 69),
      scene.add.image(0 + 46 + width, 0, `${key}_right`).setOrigin(0, 0).setScale(0.5),
    ]);
  }
}