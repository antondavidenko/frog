export default class LevelSelectPanel extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, private onLevelClickCallback: Function) {
    super(scene, x, y);
    scene.add.existing(this);
    this.createLevelsList(scene, onLevelClickCallback);
  }

  createLevelsList(scene: Phaser.Scene, onLevelClickCallback: Function): void {
    let gapX: number = 110;
    let gapY: number = 110;

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 5; x++) {
        let label: string = (x + y * 5 + 1).toString();
        label = parseInt(label) > 9 ? label : " " + label + " ";
        let posX: number = gapX * x;
        let posY: number = gapY * y;
        this.add(scene.add.textButton(posX, posY, label, onLevelClickCallback));
      }
    }
  }
}