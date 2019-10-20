import {Level} from "./../sceneobjects/level";
import {Frog} from "./../sceneobjects/frog";
import {GameModel, toLoadList} from "./../model/data";
import {Button} from "../sceneobjects/Button";

export class GameScene extends Phaser.Scene {

    model: GameModel;
    frog: Frog;
    levelId: number;

    constructor() {
        super({key: "GameScene"});
        this.model = new GameModel();
    }

    preload(): void {
        for (let i in toLoadList) {
            this.load.image(toLoadList[i]);
        }
    }

    init(params: any): void {
        this.levelId = params.levelId;
    }

    create(): void {
        this.matter.world.setBounds();
        if (this.model.generalCategory == undefined) {
            this.model.generalCategory = this.matter.world.nextCategory();
            this.model.tongueCategory = this.matter.world.nextCategory();
        }

        this.add.image(300, 400, 'bg');

        this.frog = new Frog(this);
        this.frog.create(this.model);

        let level = new Level(this);
        level.create(this.model, this.levelId);

        this.matter.world.on('collisionstart', function (event) {
            this.scene.processingBody(event.pairs[0].bodyA);
            this.scene.processingBody(event.pairs[0].bodyB);
        });

        new Button(this).createButton("MENU", 30, 700, this.onButtonClick);
    }

    processingBody(body: any) {
        if (body.label == "fly") {
            body.gameObject.destroy();
        }
        if (body.label == "cactus") {
            this.frog.tongueHide();
        }
    }

    update(time: number): void {
        this.frog.update();
    }

    onButtonClick = (pointer, gameObject, label) => {
        this.scene.stop('GameScene');
        this.matter.world.destroy();
        this.scene.start("MenuScene");
    };

}