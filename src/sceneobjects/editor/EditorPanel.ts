import {ButtonsFactory} from "../ButtonsFactory";

export class EditorPanel {

    private toolSelection: Phaser.GameObjects.Image;

    constructor(private scene: Phaser.Scene, private onMenuClick: Function, private onToolsClick: Function, private onSaveClick: Function) {}

    public create(): void {
        this.toolSelection = this.scene.add.image(340, 732, "holder");
        this.toolSelection.scale = 1.5;
        let button = new ButtonsFactory(this.scene);
        button.createTextButton("MENU", 30, 700, this.onMenuClick);
        button.createTextButton("SAVE", 30, 600, this.onSaveClick);
        button.createTextButton("NONE", 170, 700, this.onToolClickCallback);
        button.createImageButton("fly", 340, 732, this.onToolClickCallback);
        button.createImageButton("box", 440, 732, this.onToolClickCallback);
        button.createImageButton("cactus", 540, 732, this.onToolClickCallback);
    }

    onToolClickCallback = (pointer, gameObject, toolId) => {
        this.onToolsClick(pointer, gameObject, toolId);
        if (toolId == "NONE") {
            this.toolSelection.setX(gameObject.x + gameObject.width / 2);
            this.toolSelection.setY(gameObject.y + gameObject.height / 2);
        } else {
            this.toolSelection.setX(gameObject.x);
            this.toolSelection.setY(gameObject.y);
        }
    }

}