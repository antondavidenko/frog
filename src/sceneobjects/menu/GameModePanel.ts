import {ButtonsFactory} from "../ButtonsFactory";

export class GameModePanel {

    private toolSelection: Phaser.GameObjects.Image;

    constructor(private scene: Phaser.Scene, private onModeClickCallback: Function) {}

    public create(posY: number): void {
        this.toolSelection = this.scene.add.image(350 + 112/2, posY + 68/2, "holder");
        this.toolSelection.scale = 1.5;
        let button = new ButtonsFactory(this.scene);
        button.createTextButton("EDITOR", 150, posY, this.onModeClick);
        button.createTextButton("PLAY", 350, posY, this.onModeClick);
    }

    onModeClick = (pointer, gameObject, toolId) => {
        this.onModeClickCallback(pointer, gameObject, toolId);
        this.toolSelection.setX(gameObject.x + gameObject.width / 2);
        this.toolSelection.setY(gameObject.y + gameObject.height / 2);
    }

}