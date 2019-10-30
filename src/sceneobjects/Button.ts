export class Button {

    constructor(private scene: Phaser.Scene) {
    }

    private getButtonConfig(label: string, x: number, y: number): any {
        let style = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#555555'
        };

        let buttonConfig = {
            x: x,
            y: y,
            padding: 16,
            text: label,
            style: style
        };

        return buttonConfig;
    }

    public createButton(label: string, x: number, y: number, callback: Function): void {
        let buttonConfig = this.getButtonConfig(label, x, y);
        this.scene.make.text(buttonConfig).setInteractive().on('pointerdown', function (pointer) {
            callback(pointer, this, label);
        });
    }

    public createImageButton(image: string, x: number, y: number, callback: Function): void {
        this.scene.add.image(x, y, image).setInteractive().on('pointerdown', function (pointer) {
            callback(pointer, this, image);
        });
    }

}