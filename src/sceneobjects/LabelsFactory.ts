export class LabelsFactory {

    generalStyle = {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6
    };

    constructor(private scene: Phaser.Scene) {
    }

    private getLabelConfig(label: string, x: number, y: number, style:any): any {
        return {
            x: x,
            y: y,
            padding: 16,
            text: label,
            style: style
        };
    }

    public createGeneralLabel(label: string, x: number, y: number): Phaser.GameObjects.Text {
        let labelConfig = this.getLabelConfig(label, x, y, this.generalStyle);
        return this.scene.make.text(labelConfig);
    }

}