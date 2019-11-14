import {Tongue} from "./Tongue";

export class Frog {

    private tongue:Tongue;

    constructor(private scene:Phaser.Scene) {}

    create(generalCategory: number, tongueCategory: number) {
        this.tongue = new Tongue(this.scene);
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