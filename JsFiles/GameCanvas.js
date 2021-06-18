const startMenu = new StartMenu();
const firstLevel = new FirstLevel();
const secondLevel = new SecondLevel();
const finalLevel = new FinalLevel();
const completeGameScene = new GameCompleteScene();
const instruction = new InstructionScene();
const config = {
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
};

class GameCanvas extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}

var canvas = new GameCanvas(config)
