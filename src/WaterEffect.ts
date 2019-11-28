export class WaterEffect {

    static waterPipeline:WaterPipeline;

    static setupWaterEffect(game:Phaser.Game):void {
        WaterEffect.waterPipeline = (<any>game.renderer).addPipeline('WaterEffect', new WaterPipeline(game));
    }

    static updateWaterEffect(time):void {
        WaterEffect.waterPipeline.setFloat1('time', time);
    }
}

export class WaterPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {

    constructor(game) {
        super({
            game: game,
            renderer: game.renderer,
            fragShader: [
                "precision mediump float;",

                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform sampler2D uMainSampler;",
                "varying vec2 outTexCoord;",

                "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "uv.y += (sin((uv.x + (time * 0.00005)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                "gl_FragColor = texColor;",

                "}"
            ].join('\n')
        });
    }

}