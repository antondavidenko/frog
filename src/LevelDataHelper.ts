export class LevelDataHelper {

    public static indexToPosition(index: number): number {
        return (index - 1) * 64 + 32 + 12;
    }

    public static positionToIndex(screenPosition: number): number {
        return parseInt(((screenPosition + 32 - 12) / 64).toFixed());
    }

    public static getTypeById(id:string):LevelObjectTypes {
        const typeMap = new Map();
        typeMap.set("f", LevelObjectTypes.FLY);
        typeMap.set("b", LevelObjectTypes.BOX);
        typeMap.set("c", LevelObjectTypes.CACTUS);
        typeMap.set(" ", LevelObjectTypes.NONE);
        return typeMap.get(id);
    }

    public static getIdByType(type:string):string {
        let idMap = new Map();
        idMap.set(LevelObjectTypes.FLY, "f");
        idMap.set(LevelObjectTypes.BOX, "b");
        idMap.set(LevelObjectTypes.CACTUS, "c");
        idMap.set(LevelObjectTypes.NONE, " ");
        return idMap.get(type);
    }

}

export enum LevelObjectTypes {
    FLY = "fly",
    BOX = "box",
    CACTUS = "cactus",
    NONE = "NONE"
}