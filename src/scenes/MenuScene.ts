import {Button} from "../sceneobjects/Button";

export class MenuScene extends Phaser.Scene {

    constructor() {
        super({key: "MenuScene"});
    }

    preload(): void {}

    create(): void {
        let button = new Button(this);
        button.createButton("level 1", 250, 150, this.onButtonClick);
        button.createButton("level 2", 250, 250, this.onButtonClick);
        button.createButton("level 3", 250, 350, this.onButtonClick);
        button.createButton("level 4", 250, 450, this.onButtonClick);
        button.createButton("level 5", 250, 550, this.onButtonClick);
    }

    onButtonClick = (pointer, gameObject, label) => {
        const labelsMap = {
            "level 1": 0,
            "level 2": 1,
            "level 3": 2,
            "level 4": 3,
            "level 5": 4
        };

        this.scene.stop('MenuScene');
        this.scene.start("GameScene", {levelId: labelsMap[label]});
    };

}