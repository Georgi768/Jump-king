var startMenu = new StartMenu();
var firstLevel = new MainLevelScene();
var secondLevel = new SecondLevel();
var finalLevel = new FinalLevel();
var completeGameScene = new GameCompleteScene
var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 1500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false,

        }
    },
    scene: [startMenu,firstLevel,secondLevel,finalLevel,completeGameScene]
}

class GameCanvas extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

var canvas = new GameCanvas(config)
