import {Level} from "./../sceneobjects/level";
import {ButtonsFactory} from "../sceneobjects/ButtonsFactory";
import {BaseScene} from "./BaseScene";
import {Frog} from "../sceneobjects/frog/Frog";

export class GameScene extends BaseScene {

    private frog: Frog;
    private levelId: number;
    private generalCategory: number;
    private tongueCategory: number;

    constructor() {
        super("GameScene");
    }

    preload(): void {
        super.preload();
    }

    init(params: any): void {
        this.levelId = params.levelId;
    }

    create(): void {
        super.create();

        this.generalCategory = this.generalCategory == undefined ? this.matter.world.nextCategory() : this.generalCategory;
        this.tongueCategory = this.tongueCategory == undefined ? this.matter.world.nextCategory() : this.tongueCategory;

        this.matter.world.setBounds();

        let level = new Level(this);
        level.create(this.getLevelsList()[this.levelId], this.generalCategory);

        this.frog = new Frog(this);
        this.frog.create(this.generalCategory, this.tongueCategory);

        this.matter.world.on('collisionstart', function (event) {
            this.scene.processingBody(event.pairs[0].bodyA);
            this.scene.processingBody(event.pairs[0].bodyB);
        });

        new ButtonsFactory(this).createTextButton("MENU", 30, 700, this.onButtonClick);
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