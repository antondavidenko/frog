import {WaterEffect} from "../WaterEffect";

export class Background {

    constructor(private scene: Phaser.Scene) {}

    create() {
        this.scene.add.image(300, 400, 'bg').setPipeline('WaterEffect');
    }

    update(time: number): void {
        WaterEffect.updateWaterEffect(time);
    }
}