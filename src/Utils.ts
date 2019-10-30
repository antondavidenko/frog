import {LevelObjectSettings} from "./model/Data";

export class Utils {

    public static indexToPosition(index: number): number {
        return (index - 1) * 64 + 32 + 12;
    }

    public static positionToIndex(screenPosition: number): number {
        return parseInt(((screenPosition + 32 - 12) / 64).toFixed());
    }

    public static levelDataConverter(levelData: string[][]): LevelObjectSettings[] {
        let result: LevelObjectSettings[] = [];
        for (let x in levelData) {
            for (let y in levelData[x]) {
                if (levelData[x][y] != "NONE") {
                    result.push({x: parseInt(x), y: parseInt(y), type: levelData[x][y]});
                }
            }
        }
        return result;
    }
}