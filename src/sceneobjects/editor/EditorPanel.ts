import {ButtonsFactory} from "../ButtonsFactory";
import {LevelObjectTypes} from "../../LevelObjectTypes";

export class EditorPanel {

    private toolSelection: Phaser.GameObjects.Image;
    private saveButton:Phaser.GameObjects.Text;
    private selectedItem: LevelObjectTypes = LevelObjectTypes.FLY;

    constructor(private scene: Phaser.Scene, private onMenuCallback: Function, private onSaveCallback: Function) {}

    public create(): void {
        this.toolSelection = this.scene.add.image(340, 732, "holder");
        this.toolSelection.scale = 1.5;
        let button = new ButtonsFactory(this.scene);
        button.createTextButton("MENU", 30, 700, this.onMenuCallback);
        this.saveButton = button.createTextButton("SAVE", 30, 600, this.onSaveCallback);
        button.createTextButton(LevelObjectTypes.NONE, 170, 700, this.onToolClick);
        button.createImageButton(LevelObjectTypes.FLY, 340, 732, this.onToolClick);
        button.createImageButton(LevelObjectTypes.BOX, 440, 732, this.onToolClick);
        button.createImageButton(LevelObjectTypes.CACTUS, 540, 732, this.onToolClick);
    }

    onToolClick = (pointer, gameObject, toolId) => {
        this.selectedItem = toolId;
        if (toolId == LevelObjectTypes.NONE) {
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