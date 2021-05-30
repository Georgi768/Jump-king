var firstLevel = new MainLevelScene();

var config = {
    type:Phaser.AUTO,
    width:800,
    height:500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene:[firstLevel]
}
class GameCanvas extends Phaser.Game
{
    constructor(config) {
        super(config);
    }
}

var canvas = new GameCanvas(config)