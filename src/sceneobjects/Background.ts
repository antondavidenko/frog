import {WaterEffect} from "../WaterEffect";
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;

export class Background {

    constructor(private scene: Phaser.Scene) {}

    create() {
        let arrayMap:Array<Array<number>> = [[0,0],[0,0]];
        let map:Tilemap = this.scene.add.tilemap("background", 500, 500, 0, 0, arrayMap);
        let tiles:Tileset = map.addTilesetImage('bg_tile');
        let layer:StaticTilemapLayer = map.createStaticLayer(0, tiles, 0, 0);
        layer.setPipeline('WaterEffect');
    }

    update(time: number): void {
        WaterEffect.updateWaterEffect(time);
    }
}