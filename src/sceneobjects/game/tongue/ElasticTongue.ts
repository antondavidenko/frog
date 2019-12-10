import {ITongue} from "./ITongue";
import {LazyTongue} from "./LazyTongue";

const tongueItemsCount: number = 10;
const tongueAnchorX: number = 300;
const tongueAnchorY: number = 750;
const tongueStep: number = 8;

const maxDistance: number = 25;
const minDistance: number = 10;

export class ElasticTongue extends LazyTongue implements ITongue {

    protected constrains: MatterJS.Constraint[] = [];

    constructor(protected scene: Phaser.Scene) {
        super(scene);
    }

    addTongue(): void {
        for (let i = 0; i < tongueItemsCount; i++) {
            this.tongueBodiesList.push(this.scene.matter.add.image(300, 100 + 50 * i, 'tongue', null, this.getTongueOptions()));
            if (i > 0) {
                this.addConstrainByIndex(i);
            }
            this.setupCollision(this.tongueBodiesList[i]);
        }

        this.tongueBodiesList[tongueItemsCount - 1].setStatic(true);
        this.tongueBodiesList[tongueItemsCount - 1].y = tongueAnchorY;
        this.tongueBodiesList[tongueItemsCount - 1].x = tongueAnchorX;

        this.tongueBodiesList[0].alpha = 0;
    }

    private addConstrainByIndex(index: number) {
        let stiffness: number = index == 1 ? 1 : 0.1;
        let length: number = index == 1 ? 1 : 5;
        let constrain: MatterJS.Constraint = this.scene.matter.add.constraint(
            this.tongueBodiesList[index],
            this.tongueBodiesList[index - 1],
            length,
            stiffness, {
                pointA: {x: 0, y: -1 * length},
                pointB: {x: 0, y: length}
            });
        this.constrains.push(constrain);
    }

    hide(): void {
        for (let i = tongueItemsCount - 1; i >= 0; i--) {
            let positionY: number = tongueAnchorY - (tongueItemsCount - i) * tongueStep;
            this.setTongueItemPosition(this.tongueBodiesList[i], tongueAnchorX, positionY);
        }
        this.tonguePointer.x = 300;
        this.tonguePointer.y = tongueAnchorY - tongueItemsCount * tongueStep;
        this.scene.input.setDragState(this.scene.input.mousePointer, 0);
    }

    update(): void {
        let speedX: number = this.tonguePointer.x - this.tongueBodiesList[0].x;
        let speedY: number = this.tonguePointer.y - this.tongueBodiesList[0].y;
        this.tongueBodiesList[0].setVelocityX(speedX / 2);
        this.tongueBodiesList[0].setVelocityY(speedY / 2);

        this.graphics.clear();
        for (let i = 1; i < this.tongueBodiesList.length - 1; i++) {
            this.drawLine(this.tongueBodiesList[i], this.tongueBodiesList[i + 1]);
        }

        let x1 = this.tongueBodiesList[2].x;
        let y1 = this.tongueBodiesList[2].y;
        let x2 = this.tongueBodiesList[1].x;
        let y2 = this.tongueBodiesList[1].y;
        let distance = Phaser.Math.Distance.Between(x1, y1, x2, y2);

        let moveSpeed: number = Math.abs(speedX) + Math.abs(speedY);

        if (distance > maxDistance && moveSpeed < maxDistance) {
            this.addNewSegment();
        } else if (distance < minDistance && this.tongueBodiesList.length > tongueItemsCount) {
            this.deleteSegment();
        }
    }

    private addNewSegment(): void {
        let segmentAfter = this.tongueBodiesList[1];
        let segmentBefore = this.tongueBodiesList[2];
        let newSegmentX = (segmentBefore.x + segmentAfter.x) / 2;
        let newSegmentY = (segmentBefore.y + segmentAfter.y) / 2;
        let newSegment = this.scene.matter.add.image(newSegmentX, newSegmentY, 'tongue', null, this.getTongueOptions());
        this.setupCollision(newSegment);
        this.tongueBodiesList.splice(2, 0, newSegment);
        this.updateConstrains();
    }

    private deleteSegment(): void {
        let toDeleteSegment = this.tongueBodiesList[2];
        this.tongueBodiesList.splice(2, 1);
        this.scene.matter.world.remove(toDeleteSegment, false);
        this.scene.children.remove(toDeleteSegment);
        this.updateConstrains();
    }

    private updateConstrains(): void {
        for (let i = 0; i < this.constrains.length; i++) {
            this.scene.matter.world.remove(this.constrains[i], false);
        }
        this.constrains = [];
        for (let i = 1; i < this.tongueBodiesList.length; i++) {
            this.addConstrainByIndex(i);
        }
    }

}