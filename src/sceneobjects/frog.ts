import "phaser";
import {GameModel} from "../model/data";

const tongueItemsCount: number = 30;
const tongueAnchorX: number = 300;
const tongueAnchorY: number = 750;
const tongueStep: number = 5;

export class Frog {

    scene: Phaser.Scene;
    model:GameModel;
    tongueBodiesList: Phaser.Physics.Matter.Image[];
    tongueHideTimeout: number;
    tonguePointer: Phaser.GameObjects.Sprite;

    constructor(scene) {
        this.scene = scene;
        this.tongueBodiesList = [];
    }

    create(model:GameModel) {
        this.model = model;
        this.addTongue();
        this.addFrog();
        this.tongueHide();
        this.addTonquePointer();
        this.tongueHideTimeout = -1;
    }

    addTongue() {
        for (let i = 0; i < tongueItemsCount; i++) {
            this.tongueBodiesList.push(this.scene.matter.add.image(300, 100 + 50 * i, 'tongue', null, this.getTongueOptions()));

            if (i > 0) {
                let stiffness:number = i==1 ? 1 : 0.1;
                let length:number = i==1 ? 1 : 5;
                this.scene.matter.add.constraint(this.tongueBodiesList[i], this.tongueBodiesList[i - 1], length, stiffness, {
                    pointA: {x: 0, y: -1*length},
                    pointB: {x: 0, y: length}
                });

                let catTongue = this.scene.matter.world.nextCategory();
                this.tongueBodiesList[i].setCollisionCategory(catTongue);
                this.tongueBodiesList[i].setCollidesWith([catTongue, this.model.generalCategory]);
            }
        }

        this.tongueBodiesList[tongueItemsCount - 1].setStatic(true);
        this.tongueBodiesList[tongueItemsCount - 1].y = tongueAnchorY;
        this.tongueBodiesList[tongueItemsCount - 1].x = tongueAnchorX;
    }

    addTonquePointer() {
        this.tonguePointer = this.scene.add.sprite(300, tongueAnchorY - tongueItemsCount * tongueStep, 'tongue').setInteractive();
        this.scene.input.setDraggable(this.tonguePointer);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.scene.input.on('dragend', function (pointer, gameObject) {
            gameObject.x = 300;
            gameObject.y = tongueAnchorY - tongueItemsCount * tongueStep;
            gameObject.scene.frog.tongueHide();
        });
    }

    addFrog() {
        let frog = this.scene.add.image(300, 700, 'frog');
        frog.scaleX = frog.scaleY = 0.35;
        this.scene.matter.add.rectangle(230, 790, 80, 380, this.getHiddenOptions(this.model.generalCategory));
        this.scene.matter.add.rectangle(370, 790, 80, 380, this.getHiddenOptions(this.model.generalCategory));
        this.scene.matter.add.rectangle(300, 970, 80, 380, this.getHiddenOptions(this.model.generalCategory));
    }

    tongueHide() {
        for (let i = tongueItemsCount - 1; i >= 0; i--) {
            let positionY: number = tongueAnchorY - (tongueItemsCount - i) * tongueStep;
            this.setTongueItemPosition(this.tongueBodiesList[i], tongueAnchorX, positionY);
        }
    }

    setTongueItemPosition(item: Phaser.Physics.Matter.Image, setX: number, setY: number) {
        item.y = setY;
        item.x = setX;
        item.setVelocityX(0);
        item.setVelocityY(0);
        item.setAngularVelocity(0);
        item.setAngle(0);
    }

    getTongueOptions() {
        return {
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        }
    }

    getHiddenOptions(generalCategory: number) {
        return {
            isStatic: true,
            chamfer: {radius: 20},
            collisionFilter: {category: generalCategory}
        }
    }

    update() {
        this.tongueBodiesList[0].x = this.tonguePointer.x;
        this.tongueBodiesList[0].y = this.tonguePointer.y;
        this.tongueBodiesList[0].alpha = 0.1;
        this.tonguePointer.alpha = 0.1;
    }

}