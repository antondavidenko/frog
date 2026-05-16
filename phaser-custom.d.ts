import ThreeSlice from './src/ui/ThreeSlice';
import TextButton from './src/ui/TextButton';

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            threeslice(x: number, y: number, key: string, width: number): ThreeSlice;
            imageButton(x: number, y: number, key: string, callback: Function): Phaser.GameObjects.Image;
            textButton(x: number, y: number, label: string, callback: Function, width = 0): TextButton;
        }
    }
}