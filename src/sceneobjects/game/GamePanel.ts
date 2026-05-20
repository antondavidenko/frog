import UiConfig from "../../ui/config";

export class GamePanel {

  private infoLabel!: Phaser.GameObjects.Text;
  private currentFlyCount: number = 0;

  constructor(
    private scene: Phaser.Scene,
    private onMenuCallback: Function,
    private onLevelEndCallback: Function,
    private initialFlyCount: number) { }

  public create(): void {
    this.infoLabel = this.scene.add.text(400, 700, this.getInfoString(), UiConfig.textStyle.label);
    this.scene.add.textButton(30, 700, "MENU", this.onMenuCallback, 70);
  }

  getInfoString(): string {
    return `FLY: ${this.initialFlyCount}/${this.currentFlyCount}`;
  }

  updateFlyCount(): void {
    this.currentFlyCount++;
    this.infoLabel.setText(this.getInfoString());
    if (this.currentFlyCount == this.initialFlyCount) {
      this.onLevelEndCallback();
    }
  }
}
