import TextButton from "../../ui/TextButton";
import { LevelObjectTypes } from "../../LevelDataHelper";
import ImageButton from "../../ui/ImageButton";

export class EditorPanel {
  private toolSelection!: Phaser.GameObjects.Image;
  private saveButton!: TextButton;
  private noneButton!: TextButton;
  private selectedItem: LevelObjectTypes = LevelObjectTypes.FLY;

  constructor(private scene: Phaser.Scene, private onMenuCallback: Function, private onSaveCallback: Function) {}

  public create(): void {
    this.toolSelection = this.scene.add.image(340, 732, "holder");
    this.toolSelection.scale = 1.5;
    this.scene.add.textButton(30, 700, "MENU", this.onMenuCallback, 70);
    this.saveButton = this.scene.add.textButton(30, 600, "SAVE", this.onSaveCallback, 70);
    this.noneButton = this.scene.add.textButton(170, 700, LevelObjectTypes.NONE, this.onToolClick, 70);
    this.scene.add.imageButton(340, 732, LevelObjectTypes.FLY, this.onToolClick);
    this.scene.add.imageButton(440, 732, LevelObjectTypes.BOX, this.onToolClick);
    this.scene.add.imageButton(540, 732, LevelObjectTypes.CACTUS, this.onToolClick);
  }

  onToolClick = (_pointer: Phaser.Input.Pointer, button: ImageButton, toolId: LevelObjectTypes) => {
    this.selectedItem = toolId;
    this.toolSelection.setX(button.x);
    this.toolSelection.setY(button.y);
    this.noneButton.setButtonState(toolId === LevelObjectTypes.NONE ? 'pressed' : 'normal');
    this.toolSelection.visible = toolId !== LevelObjectTypes.NONE;
  };

  setSaveButtonVisible(visible:boolean): void {
    this.saveButton.visible = visible;
  }

  getSelectedItem():string {
    return this.selectedItem;
  }
}
