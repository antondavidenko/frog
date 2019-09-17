import "phaser";
import {Level} from "./../sceneobjects/level";
import {Frog} from "./../sceneobjects/frog";
import {GameModel, toLoadList} from "./../model/data";

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
        this.model.canDragGroup = this.matter.world.nextGroup(false);
        this.model.noDragGroup = this.matter.world.nextGroup(true);
        this.model.generalCategory = this.matter.world.nextCategory();

        this.add.image(300, 400, 'bg');

        this.frog = new Frog(this);
        this.frog.create(this.model);

        let level = new Level(this);
        level.create(this.model, this.levelId);

        this.matter.world.on('collisionstart', function (event) {
            this.scene.processingBody(event.pairs[0].bodyA);
            this.scene.processingBody(event.pairs[0].bodyB);
        });

        this.createMenuButton("MENU", 30, 700);
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

    createMenuButton(label: string, x: number, y: number) {
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
            this.scene.scene.stop('GameScene');
            this.scene.scene.shutdown();
            this.scene.matter.world.destroy();
            this.scene.scene.start("MenuScene");
        });
    }
}