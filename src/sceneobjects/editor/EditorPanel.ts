import {ButtonsFactory} from "../ButtonsFactory";

export class EditorPanel {

    private toolSelection: Phaser.GameObjects.Image;
    private saveButton:Phaser.GameObjects.Text;
    private selectedItem: string = "fly";

    constructor(private scene: Phaser.Scene, private onMenuCallback: Function, private onSaveCallback: Function) {}

    public create(): void {
        this.toolSelection = this.scene.add.image(340, 732, "holder");
        this.toolSelection.scale = 1.5;
        let button = new ButtonsFactory(this.scene);
        button.createTextButton("MENU", 30, 700, this.onMenuCallback);
        this.saveButton = button.createTextButton("SAVE", 30, 600, this.onSaveCallback);
        button.createTextButton("NONE", 170, 700, this.onToolClick);
        button.createImageButton("fly", 340, 732, this.onToolClick);
        button.createImageButton("box", 440, 732, this.onToolClick);
        button.createImageButton("cactus", 540, 732, this.onToolClick);
    }

    onToolClick = (pointer, gameObject, toolId) => {
        this.selectedItem;
        if (toolId == "NONE") {
            this.toolSelection.setX(gameObject.x + gameObject.width / 2);
            this.toolSelection.setY(gameObject.y + gameObject.height / 2);
        } else {
            this.toolSelection.setX(gameObject.x);
            this.toolSelection.setY(gameObject.y);
        }
    };

    setSaveButtonVisible(visible:boolean): void {
        this.saveButton.visible = visible;
    }

    getSelectedItem():string {
        return this.selectedItem;
    }

}