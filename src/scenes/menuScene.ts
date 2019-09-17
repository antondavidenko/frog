import "phaser";

export class MenuScene extends Phaser.Scene {

    constructor() {
        super({key: "MenuScene"});
    }

    preload(): void {
    }

    create(): void {
        this.createButton("level 1", 250, 150, 0);
        this.createButton("level 2", 250, 250, 1);
        this.createButton("level 3", 250, 350, 2);
        this.createButton("level 4", 250, 450, 3);
        this.createButton("level 5", 250, 550, 4);
    }

    createButton(label: string, x: number, y: number, levelId: number) {
        let style = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#555555'
        };

        let config1 = {
            x: x,
            y: y,
            padding: 16,
            text: label,
            style: style
        };

        this.make.text(config1).setInteractive().on('pointerdown', function (pointer, gameObject) {
            this.scene.scene.stop('MenuScene');
            this.scene.scene.start("GameScene", {levelId: levelId});
        });
    }

}