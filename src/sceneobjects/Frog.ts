import {GameModel} from "../model/Data";

const tongueItemsCount: number = 60;
const tongueAnchorX: number = 300;
const tongueAnchorY: number = 750;
const tongueStep: number = 2;

export class Frog {

    private model: GameModel;
    private tongueBodiesList: Phaser.Physics.Matter.Image[] = [];
    private tonguePointer: Phaser.GameObjects.Sprite;
    private graphics;

    constructor(private scene:Phaser.Scene) {}

    create(model: GameModel) {
        this.model = model;
        this.addFrogHolder();
        this.addTongue();
        this.graphics = this.scene.add.graphics();
        this.addFrog();
        this.addTonquePointer();
        this.tongueHide();
    }

    addTongue() {
        for (let i = 0; i < tongueItemsCount; i++) {
            this.tongueBodiesList.push(this.scene.matter.add.image(300, 100 + 50 * i, 'tongue', null, this.getTongueOptions()));

            if (i > 0) {
                let stiffness: number = i == 1 ? 1 : 0.1;
                let length: number = i == 1 ? 1 : 5;
                this.scene.matter.add.constraint(this.tongueBodiesList[i], this.tongueBodiesList[i - 1], length, stiffness, {
                    pointA: {x: 0, y: -1 * length},
                    pointB: {x: 0, y: length}
                });

                this.tongueBodiesList[i].setCollisionCategory(this.model.tongueCategory);
                this.tongueBodiesList[i].setCollidesWith([this.model.generalCategory]);
            }
        }

        this.tongueBodiesList[tongueItemsCount - 1].setStatic(true);
        this.tongueBodiesList[tongueItemsCount - 1].y = tongueAnchorY;
        this.tongueBodiesList[tongueItemsCount - 1].x = tongueAnchorX;
    }

    addTonquePointer() {
        this.tonguePointer = this.scene.add.sprite(300, tongueAnchorY - tongueItemsCount * tongueStep, 'tonque_target').setInteractive();
        this.tonguePointer.scale = 3;
        this.scene.input.setDraggable(this.tonguePointer);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.scene.input.on('dragend', function (pointer, gameObject) {
            gameObject.scene.frog.tongueHide();
        });
    }

    addFrog() {
        this.scene.add.image(300, 700, 'frog');
        this.scene.matter.add.rectangle(230, 790, 80, 380, this.getHiddenOptions(this.model.generalCategory));
        this.scene.matter.add.rectangle(370, 790, 80, 380, this.getHiddenOptions(this.model.generalCategory));
        this.scene.matter.add.rectangle(300, 970, 80, 380, this.getHiddenOptions(this.model.generalCategory));
    }

    addFrogHolder() {
        this.scene.add.image(300, 700, 'frog_holder');
    }

    tongueHide() {
        for (let i = tongueItemsCount - 1; i >= 0; i--) {
            let positionY: number = tongueAnchorY - (tongueItemsCount - i) * tongueStep;
            this.setTongueItemPosition(this.tongueBodiesList[i], tongueAnchorX, positionY);
        }
        this.tonguePointer.x = 300;
        this.tonguePointer.y = tongueAnchorY - tongueItemsCount * tongueStep;
        this.scene.input.setDragState(this.scene.input.mousePointer, 0);
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
        this.tongueBodiesList[0].alpha = 0;

        this.graphics.clear();
        for (let i = 1; i < this.tongueBodiesList.length-1; i++ ) {
            this.drawLine(this.tongueBodiesList[i], this.tongueBodiesList[i+1]);
        }
    }

    drawLine(point1:Phaser.Physics.Matter.Image, point2:Phaser.Physics.Matter.Image) {
        var line = new Phaser.Geom.Line(point1.x, point1.y, point2.x, point2.y);
        this.graphics.lineStyle(18, 0xff4c4c);
        this.graphics.strokeLineShape(line);
    }

}