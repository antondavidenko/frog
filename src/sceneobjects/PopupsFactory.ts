import {ButtonsFactory} from "./ButtonsFactory";

export class PopupsFactory {

    private congratStr:string = "  GREAT! YOU ARE WIN!  \n  THIS LEVEL IS CLEAR!  ";
    private popupX: number = 100;
    private popupY: number = 250;
    private callback: Function;
    private popupContainer:Phaser.GameObjects.Container;

    constructor(private scene: Phaser.Scene) {}

    private getPopupConfig(label: string, x: number, y: number): any {
        let style = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#aaaaaa'
        };

        return {
            x: x,
            y: y,
            padding: 16,
            text: label,
            style: style
        };
    }

    public crateLevelWinPopup(callback: Function): Phaser.GameObjects.Container {
        this.callback = callback;
        this.popupContainer = this.scene.add.container(0, 0);
        this.popupContainer.add(this.getPopupBackground());
        this.popupContainer.add(this.getPopupBody(this.congratStr));
        this.popupContainer.add(this.getPopupButton("  OK  ", this.buttonCallback));
        return this.popupContainer;
    }

    private buttonCallback = () => {
        this.popupContainer.visible = false;
        this.callback();
    };

    private getPopupBody(label:string): Phaser.GameObjects.Text {
        label = label + "\n\n\n";
        let popupConfig = this.getPopupConfig(label, this.popupX, this.popupY);
        return this.scene.make.text(popupConfig);
    }

    private getPopupButton(label:string, callback:Function): Phaser.GameObjects.Text {
        let buttonFactory = new ButtonsFactory(this.scene);
        let buttonX: number = this.popupX + 150;
        let buttonY: number = this.popupY + 110;
        return buttonFactory.createTextButton(label, buttonX, buttonY, callback);
    }

    private getPopupBackground():Phaser.GameObjects.Rectangle {
        let screenWidth:number = this.scene.cameras.main.width + 2;
        let screenHeight: number = this.scene.cameras.main.height + 2;
        return this.scene.add.rectangle(screenWidth/2, screenHeight/2, screenWidth, screenHeight, 0x000000, 0.7);
    }

}