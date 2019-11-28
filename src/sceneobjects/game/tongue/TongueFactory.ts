import {ITongue} from "./ITongue";
import {TongueTypes} from "./TongueTypes";
import {LazyTongue} from "./LazyTongue";
import {ElasticTongue} from "./ElasticTongue";

export class TongueFactory {
    static createTongue(tongueType:TongueTypes, scene:Phaser.Scene):ITongue {
        if (tongueType == TongueTypes.LazyTongue) {
            return new LazyTongue(scene);
        } else if (tongueType == TongueTypes.ElasticTongue) {
            return new ElasticTongue(scene);
        } else {
            console.error("tongueType is not supported");
            return null;
        }
    }
}