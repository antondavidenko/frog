import {ITongue} from "./ITongue";

const tongueItemsCount: number = 20;
const tongueAnchorX: number = 300;
const tongueAnchorY: number = 750;
const tongueStep: number = 8;

export class ElasticTongue implements ITongue {

    private tongueCategory:number;
    private generalCategory:number;
    private tongueBodiesList: Phaser.Physics.Matter.Image[] = [];
    private tonguePointer: Phaser.GameObjects.Sprite;
    private graphics;
    private constrains;

    constructor(private scene:Phaser.Scene) {}

    create(generalCategory: number, tongueCategory: number) {
        this.tongueCategory = tongueCategory;
        this.generalCategory = generalCategory;
        this.addTongue();
        this.graphics = this.scene.add.graphics();
        this.addTonguePointer();
        this.hide();
    }

    private addTongue() {
        this.constrains = [];
        for (let i = 0; i < tongueItemsCount; i++) {
            this.tongueBodiesList.push(this.scene.matter.add.image(300, 100 + 50 * i, 'tongue', null, this.getTongueOptions()));
            if (i > 0) {
                this.addConstrainByIndex(i);
            }
        }

        this.tongueBodiesList[tongueItemsCount - 1].setStatic(true);
        this.tongueBodiesList[tongueItemsCount - 1].y = tongueAnchorY;
        this.tongueBodiesList[tongueItemsCount - 1].x = tongueAnchorX;
    }

    private addConstrainByIndex(index:number) {
        let stiffness: number = index == 1 ? 1 : 0.1;
        let length: number = index == 1 ? 1 : 5;
        let constrain = this.scene.matter.add.constraint(
            this.tongueBodiesList[index],
            this.tongueBodiesList[index - 1],
            length,
            stiffness, {
                pointA: {x: 0, y: -1 * length},
                pointB: {x: 0, y: length}
            });
        this.constrains.push(constrain);
        this.tongueBodiesList[index].setCollisionCategory(this.tongueCategory);
        this.tongueBodiesList[index].setCollidesWith([this.generalCategory]);
    }

    private addTonguePointer() {
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

    hide() {
        for (let i = tongueItemsCount - 1; i >= 0; i--) {
            let positionY: number = tongueAnchorY - (tongueItemsCount - i) * tongueStep;
            this.setTongueItemPosition(this.tongueBodiesList[i], tongueAnchorX, positionY);
        }
        this.tonguePointer.x = 300;
        this.tonguePointer.y = tongueAnchorY - tongueItemsCount * tongueStep;
        this.scene.input.setDragState(this.scene.input.mousePointer, 0);
    }

    private setTongueItemPosition(item: Phaser.Physics.Matter.Image, setX: number, setY: number) {
        item.y = setY;
        item.x = setX;
        item.setVelocityX(0);
        item.setVelocityY(0);
        item.setAngularVelocity(0);
        item.setAngle(0);
    }

    private getTongueOptions() {
        return {
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
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


        let x1 = this.tonguePointer.x;
        let y1 = this.tonguePointer.y;
        let x2 = this.tongueBodiesList[1].x;
        let y2 = this.tongueBodiesList[1].y;
        let distance = Phaser.Math.Distance.Between(x1, y1, x2, y2);
        if (distance>30) {
            this.addNewSegment();
        }
    }

    private addNewSegment() {

    }

    private drawLine(point1:Phaser.Physics.Matter.Image, point2:Phaser.Physics.Matter.Image) {
        var line = new Phaser.Geom.Line(point1.x, point1.y, point2.x, point2.y);
        this.graphics.lineStyle(18, 0xff4c4c);
        this.graphics.strokeLineShape(line);
    }

}