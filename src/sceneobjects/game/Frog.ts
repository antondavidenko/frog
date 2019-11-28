import {ITongue} from "./tongue/ITongue";
import {TongueTypes} from "./tongue/TongueTypes";
import {TongueFactory} from "./tongue/TongueFactory";

export class Frog {

    private tongue:ITongue;

    constructor(private scene:Phaser.Scene) {}

    create(generalCategory: number, tongueCategory: number, tongueType: TongueTypes) {
        this.tongue = TongueFactory.createTongue(tongueType, this.scene);
        this.addFrogHolder();
        this.tongue.create(generalCategory, tongueCategory);
        this.addFrog(generalCategory);
    }

    addFrog(generalCategory: number) {
        this.scene.add.image(300, 700, 'frog');
        this.scene.matter.add.rectangle(230, 790, 80, 380, this.getHiddenOptions(generalCategory));
        this.scene.matter.add.rectangle(370, 790, 80, 380, this.getHiddenOptions(generalCategory));
        this.scene.matter.add.rectangle(300, 970, 80, 380, this.getHiddenOptions(generalCategory));
    }

    getHiddenOptions(generalCategory: number) {
        return {
            isStatic: true,
            chamfer: {radius: 20},
            collisionFilter: {category: generalCategory}
        }
    }

    addFrogHolder() {
        this.scene.add.image(300, 700, 'frog_holder');
    }

    update() {
        this.tongue.update();
    }

    tongueHide () {
        this.tongue.hide();
    }

}