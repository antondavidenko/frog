import {ButtonsFactory} from "../ButtonsFactory";
import {LabelsFactory} from "../LabelsFactory";

export class GamePanel {

    private infoLabel:Phaser.GameObjects.Text;
    private currentFlyCount:number = 0;

    constructor(private scene: Phaser.Scene, private onMenuCallback: Function, private initialFlyCount: number) {}

    public create(): void {
        this.infoLabel = new LabelsFactory(this.scene).createGeneralLabel(this.getInfoString(), 400,700);
        new ButtonsFactory(this.scene).createTextButton("MENU", 30, 700, this.onMenuCallback);
    }

    getInfoString(): string {
        return `FLY: ${this.initialFlyCount}/${this.currentFlyCount}`;
    }

    updateFlyCount(): void {
        this.currentFlyCount++;
        this.infoLabel.setText(this.getInfoString());
    }

}