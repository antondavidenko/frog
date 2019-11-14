export class Background {

    constructor(private scene: Phaser.Scene) {
        scene.add.image(300, 400, 'bg');
    }

}