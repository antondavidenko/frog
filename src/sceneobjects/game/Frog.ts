import { ITongue } from "./tongue/ITongue";
import { TongueTypes } from "./tongue/TongueTypes";
import { TongueFactory } from "./tongue/TongueFactory";

export class Frog {

  private tongue!: ITongue;
  private leftBlinkInterval!: number;
  private rightBlinkInterval!: number;

  constructor(private scene: Phaser.Scene) { }

  create(generalCategory: number, tongueCategory: number, tongueType: TongueTypes) {
    this.tongue = TongueFactory.createTongue(tongueType, this.scene);
    this.addFrogHolder();
    this.tongue.create(generalCategory, tongueCategory);
    this.addFrog(generalCategory);
  }

  addFrog(generalCategory: number) {
    const frog = this.scene.add.sprite(300, 700, 'frog_spritesheet', 'frog_0006.png');
    frog.setDepth(2);

    const leftEye = this.scene.add.sprite(300, 700, 'frog_spritesheet', 'frog_0007.png');
    const framesLeft = this.generateFrames([7, 5, 4, 3, 4, 5, 7]);
    this.scene.anims.create({ key: 'blinkLeft', frames: framesLeft, frameRate: 20, repeat: 0 });
    this.leftBlinkInterval = window.setInterval(() => leftEye.play('blinkLeft'), 1600);
    leftEye.setDepth(3);

    const rightEye = this.scene.add.sprite(300, 700, 'frog_spritesheet', 'frog_0007.png');
    const framesRight = this.generateFrames([7, 2, 1, 0, 1, 2, 7]);
    this.scene.anims.create({ key: 'blinkRight', frames: framesRight, frameRate: 20, repeat: 0 });
    this.rightBlinkInterval = window.setInterval(() => rightEye.play('blinkRight'), 1900);
    rightEye.setDepth(3);

    this.scene.matter.add.rectangle(230, 790, 80, 380, this.getHiddenOptions(generalCategory));
    this.scene.matter.add.rectangle(370, 790, 80, 380, this.getHiddenOptions(generalCategory));
    this.scene.matter.add.rectangle(300, 970, 80, 380, this.getHiddenOptions(generalCategory));
  }

  getHiddenOptions(generalCategory: number) {
    return {
      isStatic: true,
      chamfer: { radius: 20 },
      collisionFilter: { category: generalCategory }
    }
  }

  addFrogHolder(): void {
    this.scene.add.image(300, 700, 'frog_holder');
  }

  update(): void {
    this.tongue.update();
  }

  tongueHide(): void {
    this.tongue.hide();
  }

  generateFrames(sequence: number[]) {
    return sequence.map((id: number) => ({ key: 'frog_spritesheet', frame: `frog_000${id}.png` }));
  }

  getTonquePath() {
    return (this.tongue as any).tongueBodiesList;
  }

  destroy() {
    clearInterval(this.leftBlinkInterval);
    clearInterval(this.rightBlinkInterval);
  }
}
