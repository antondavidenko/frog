import {ITongue} from "./ITongue";
import {LazyTongue} from "./LazyTongue";
import {LevelObjectTypes} from "../../../LevelDataHelper";

const tongueItemsCount: number = 10;
const tongueAnchorX: number = 300;
const tongueAnchorY: number = 750;
const tongueStep: number = 8;

const maxDistance: number = 25;
const minDistance: number = 10;

const TONGUE_FIRST_BODY: string = "tongueFirstBody";

export class ElasticTongue extends LazyTongue implements ITongue {

    protected constrains: MatterJS.Constraint[] = [];
    protected tongueFirstBodyUnderCollision: boolean = false;

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
        this.tongueBodiesList[0].body['label'] = TONGUE_FIRST_BODY;

        this.scene.matter.world.on('collisionstart', this.collisionProcessing);
        this.scene.matter.world.on('collisionend', this.noCollisionProcessing);
    }

    collisionProcessing = (event) => {
        if (event.pairs[0].bodyA.label == LevelObjectTypes.BOX && event.pairs[0].bodyB.label == TONGUE_FIRST_BODY
            || event.pairs[0].bodyB.label == LevelObjectTypes.BOX && event.pairs[0].bodyA.label == TONGUE_FIRST_BODY) {
            this.tongueFirstBodyUnderCollision = true;
        }
    };

    noCollisionProcessing = (event) => {
        if (event.pairs[0].bodyA.label == LevelObjectTypes.BOX && event.pairs[0].bodyB.label == TONGUE_FIRST_BODY
            || event.pairs[0].bodyB.label == LevelObjectTypes.BOX && event.pairs[0].bodyA.label == TONGUE_FIRST_BODY) {
            this.tongueFirstBodyUnderCollision = false;
        }
    };

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
        this.checkForPointerAndBodyInSync();

        let velocityX: number = this.tonguePointer.x - this.tongueBodiesList[0].x;
        let velocityY: number = this.tonguePointer.y - this.tongueBodiesList[0].y;
        this.tongueBodiesList[0].setVelocityX(velocityX / 2);
        this.tongueBodiesList[0].setVelocityY(velocityY / 2);

        this.graphics.clear();
        for (let i = 1; i < this.tongueBodiesList.length - 1; i++) {
            this.drawLine(this.tongueBodiesList[i], this.tongueBodiesList[i + 1]);
        }

        let distance = this.pointsDistance(this.tongueBodiesList[2], this.tongueBodiesList[1]);
        let moveSpeed: number = Math.abs(velocityX) + Math.abs(velocityY);

        if (distance > maxDistance && moveSpeed < maxDistance) {
            this.addNewSegment();
        } else if (distance < minDistance && this.tongueBodiesList.length > tongueItemsCount) {
            this.deleteSegment();
        }
    }

    private checkForPointerAndBodyInSync(): void {
        if (this.pointsDistance(this.tongueBodiesList[0], this.tonguePointer) >= 32 && this.tongueFirstBodyUnderCollision) {
            this.tonguePointer.x = this.tongueBodiesList[0].x;
            this.tonguePointer.y = this.tongueBodiesList[0].y;
            this.scene.input.setDragState(this.scene.input.mousePointer, 0);
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

    private pointsDistance(point1, point2): number {
        return Phaser.Math.Distance.Between(point1.x, point1.y, point2.x, point2.y);
    }

}