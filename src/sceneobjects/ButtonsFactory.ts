export class ButtonsFactory {

    constructor(private scene: Phaser.Scene) {}

    private getButtonConfig(label: string, x: number, y: number): any {
        let style = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#555555'
        };

        return {
            x: x,
            y: y,
            padding: 16,
            text: label,
            style: style
        };
    }

    public createTextButton(label: string, x: number, y: number, callback: Function): Phaser.GameObjects.Text {
        let buttonConfig = this.getButtonConfig(label, x, y);
        let result = this.scene.make.text(buttonConfig).setInteractive();
        result.on('pointerdown', function (pointer) {
            callback(pointer, this, label);
        });
        return result;
    }

    public createImageButton(image: string, x: number, y: number, callback: Function): Phaser.GameObjects.Image {
        let result = this.scene.add.image(x, y, image).setInteractive();
        result.on('pointerdown', function (pointer) {
            callback(pointer, this, image);
        });
        return result;
    }

}