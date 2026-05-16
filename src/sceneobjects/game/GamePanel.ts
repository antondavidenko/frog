import {LabelsFactory} from "../LabelsFactory";

export class GamePanel {

    private infoLabel: Phaser.GameObjects.Text;
    private currentFlyCount: number = 0;

    constructor(
        private scene: Phaser.Scene,
        private onMenuCallback: Function,
        private onLevelEndCallback: Function,
        private initialFlyCount: number) {}

    public create(): void {
        this.infoLabel = new LabelsFactory(this.scene).createGeneralLabel(this.getInfoString(), 400,700);
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