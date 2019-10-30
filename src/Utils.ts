export class Utils {

    public static indexToPosition(index: number): number {
        return (index - 1) * 64 + 32 + 12;
    }

    public static positionToIndex(screenPosition: number): number {
        return parseInt(((screenPosition + 32 - 12) / 64).toFixed());
    }

    public static getTypeById(id:string):string {
        const typeMap = {
            "f": "fly",
            "b": "box",
            "c": "cactus",
            " ": "NONE"
        };
        return typeMap[id];
    }

    public static getIdByType(type:string):string {
        const idMap = {
            "fly": "f",
            "box": "b",
            "cactus": "c",
            "NONE": " "
        };
        return idMap[type];
    }

    public static replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }
}