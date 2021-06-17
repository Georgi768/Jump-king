var startMenu = new StartMenu();
var firstLevel = new MainLevelScene();
var secondLevel = new SecondLevel();
var finalLevel = new FinalLevel();
var completeGameScene = new GameCompleteScene();
var instruction = new InstructionScene();
var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 1500,
    scale: {
        autoCenter: Phaser.Scale.CENTER,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false,

        }
    },
    render: {
        pixelArt: true
    },
    scene: [startMenu, instruction, firstLevel, secondLevel, finalLevel, completeGameScene]
}

class GameCanvas extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

var canvas = new GameCanvas(config)
