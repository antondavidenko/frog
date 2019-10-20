export class Button {

    scene: Phaser.Scene;

    constructor(scene) {
        this.scene = scene;
    }

    createButton(label: string, x: number, y: number, callback: Function) {
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

        this.scene.make.text(buttonConfig).setInteractive().on('pointerdown', function (pointer, gameObject) {
            callback(pointer, gameObject, label);
        });
    }

}