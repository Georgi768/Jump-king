var player;
var platform;
var cursor;
var enemy;
var heart;
var door;
var queen;

class SceneLevel extends Phaser.Scene {

    constructor(key) {
        super(key);
        if (new.target === Character) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    preload() {
        this.load.image('sky', 'assets/Backgrounds/sky.png');
        this.load.image('sunshineSky', 'assets/Backgrounds/SunShine.png');
        this.load.image('queen', 'assets/Characters/queen.png');
        this.load.image('greySky', 'assets/Backgrounds/GreySky.png');
        this.load.image('crown', 'assets/Backgrounds/Crown.png');
        this.load.spritesheet('player', 'assets/Characters/JumpKing.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('platform', 'assets/Platforms/platform.png');
        this.load.image('mediumPlatform', 'assets/Platforms/MediumPlatform.png');
        this.load.image('smallPlatform', 'assets/Platforms/smallPlatform.png');
        this.load.image('bigPlatform', 'assets/Platforms/BigPlatform.png');
        this.load.image('littlePlatform', 'assets/Platforms/littlePlatform.png');
        this.load.image('heart', 'assets/Items/heart.png');
        this.load.image('door', 'assets/Items/Basic_Door_Pixel.png');
    }

    create() {
        throw new TypeError("Cannot call abstract method.");
    }

    update() {
        player.moveCharacter();
    }

    addCameraFollow(background, player, scene) {
        const cam = this.cameras.main.setBounds(0, 0, background.displayWidth, scene.displayHeight);
        return cam.startFollow(player);
    }

}

class StartMenu extends SceneLevel {

    constructor() {
        super('startMenu');
    }

    create() {
        this.add.image(300, 200, 'crown').setScrollFactor(1)
        this.add.text(300, 400, "Jump king", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        this.add.text(300, 450, "Legend has it there is a babe at the top...", {
            fill: '#FFFFFF',
            align: 'center'
        }).setScrollFactor(0).setOrigin(0.5).setFontSize("20px");

        let startButton = this.add.text(300, 500, "Start <", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("20px").setInteractive();
        let infoButton = this.add.text(300, 550, "How to play <", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("20px").setInteractive();
        startButton.on("pointerup", () => {
            this.scene.start("Levels");
            document.documentElement.requestFullscreen().then(r => console.log('fullscreen'));

        });
        infoButton.on("pointerup", () => {
            this.scene.start("instructionScene");

        });
    }

    update() {
    }
}

class Levels extends SceneLevel {
    constructor() {
        super('Levels');
    }

    create() {
        const background = this.add.image(300, 750, 'sky').setScrollFactor(1)

        platform = new Platform(this);
        platform.addPlatform(300, 1500, 'platform').setScale(1.5).refreshBody();
        platform.addPlatform(550, 1350, 'mediumPlatform');
        platform.addPlatform(50, 1350, 'mediumPlatform');
        platform.addPlatform(300, 1230, 'platform');
        platform.addPlatform(400, 1055, 'mediumPlatform');
        platform.addPlatform(530, 975, 'littlePlatform');
        platform.addPlatform(290, 820, 'littlePlatform');
        platform.addPlatform(220, 880, 'littlePlatform');
        platform.addPlatform(80, 820, 'littlePlatform');
        platform.addPlatform(170, 690, 'littlePlatform');
        platform.addPlatform(270, 690, 'littlePlatform');
        platform.addPlatform(195, 605, 'bigPlatform');
        platform.addPlatform(560, 650, 'littlePlatform');
        platform.addPlatform(10, 520, 'littlePlatform');
        platform.addPlatform(200, 400, 'smallPlatform');
        platform.addPlatform(200, 260, 'smallPlatform');
        platform.addPlatform(5, 260, 'mediumPlatform');
        platform.addPlatform(300, 150, 'platform').setScale(1).refreshBody();

        player = new Characters(this, 300, 1400, platform.group);

        door = new Door(this, 400, 100, platform.group);

        this.physics.add.overlap(door, player, () => door.setLevelTransitionDestination('secondLevel'), null, door);

        this.addCameraFollow(background, player, this);
    }

}

class SecondLevel extends SceneLevel {
    constructor() {
        super('secondLevel');
    }
    create() {
        const background = this.add.image(300, 750, 'greySky').setScrollFactor(1)
        platform = new Platform(this);

        player = new Characters(this, 300, 1400, platform.group);

        enemy = new Enemy(this, 450, 1100);
        enemy = new Enemy(this, 200, 1030);
        enemy = new Enemy(this, 500, 860);
        enemy = new Enemy(this, 230, 700);
        enemy = new Enemy(this, 70, 240);
        heart = new Heart(this, platform.group);

        door = new Door(this, 400, 100, platform.group);
        this.physics.add.overlap(door, player, () => door.setLevelTransitionDestination('finalLevel'), null, door);

        heart.addItem(20, 630, 'heart');

        platform.addPlatform(300, 1500, 'platform').setScale(1.5).refreshBody();
        platform.addPlatform(100, 1400, 'smallPlatform');
        platform.addPlatform(290, 1350, 'smallPlatform');
        platform.addPlatform(490, 1210, 'mediumPlatform');
        platform.addPlatform(570, 1100, 'littlePlatform');
        platform.addPlatform(270, 1070, 'bigPlatform');
        platform.addPlatform(50, 990, 'smallPlatform');
        platform.addPlatform(250, 900, 'littlePlatform');
        platform.addPlatform(500, 900, 'bigPlatform');
        platform.addPlatform(570, 750, 'littlePlatform');
        platform.addPlatform(480, 680, 'littlePlatform');
        platform.addPlatform(380, 680, 'littlePlatform');
        platform.addPlatform(230, 750, 'bigPlatform');
        platform.addPlatform(20, 700, 'smallPlatform');
        platform.addPlatform(230, 530, 'mediumPlatform');
        platform.addPlatform(550, 480, 'mediumPlatform');
        platform.addPlatform(380, 315, 'littlePlatform');
        platform.addPlatform(100, 290, 'bigPlatform');
        platform.addPlatform(400, 150, 'platform');

        player.onCollisionEnter();

        this.addCameraFollow(background, player, this)
    }
}

class FinalLevel extends SceneLevel {
    constructor() {
        super('finalLevel');
    }

    create() {
        const background = this.add.image(300, 750, 'sunshineSky').setScrollFactor(1)
        platform = new Platform(this);

        player = new Characters(this, 300, 1400, platform.group);
        queen = new Queen(this, 510, 20,platform.group);

        heart = new Heart(this,platform.group);
        heart.addItem(20, 400, 'heart');

        enemy = new Enemy(this, 300, 1000);
        enemy = new Enemy(this, 180, 600);
        enemy = new Enemy(this, 410, 250);

        platform.addPlatform(300, 1500, 'platform').setScale(1.5).refreshBody();
        platform.addPlatform(100, 1400, 'smallPlatform');
        platform.addPlatform(250, 1250, 'smallPlatform');
        platform.addMovingPlatform(player, 350, 1250, 'littlePlatform');
        platform.addPlatform(550, 1095, 'littlePlatform');
        platform.addPlatform(300, 1050, 'mediumPlatform');
        platform.addPlatform(50, 1000, 'littlePlatform');
        platform.addMovingPlatform(player, 150, 870, 'smallPlatform');
        platform.addMovingPlatform(player, 450, 840, 'smallPlatform');
        platform.addPlatform(230, 750, 'bigPlatform');
        platform.addPlatform(100, 650, 'mediumPlatform');
        platform.addPlatform(180, 550, 'littlePlatform');
        platform.addPlatform(300, 500, 'littlePlatform');
        platform.addPlatform(150, 440, 'littlePlatform');
        platform.addPlatform(20, 440, 'littlePlatform');
        platform.addPlatform(400, 500, 'littlePlatform');
        platform.addPlatform(570, 400, 'mediumPlatform');
        platform.addPlatform(410, 310, 'bigPlatform');
        platform.addMovingPlatform(player, 100, 220, 'littlePlatform');
        platform.addPlatform(250, 100, 'mediumPlatform');
        platform.addPlatform(510, 100, 'bigPlatform');

        this.physics.add.overlap(player, queen, () => this.scene.start('CompleteGameScene'));
        this.addCameraFollow(background, player, this);

        player.onCollisionEnter()
    }

}

class GameCompleteScene extends SceneLevel {

    constructor() {
        super('CompleteGameScene');
    }

    create() {
        this.add.text(300, 300, "Congratulation,you got the babe", {fill: '#FFFFFF'}).setOrigin(0.5).setFontSize("25px");
        this.add.text(300, 360, "Thank you for playing !", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        const restartButton = this.add.text(300, 420, "Would you like to Try again ? <", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("25px").setInteractive();
        restartButton.on("pointerup", () => {
            this.scene.start("Levels");
        });
    }

    update() {
    }
}

class InstructionScene extends SceneLevel {
    constructor() {
        super('instructionScene');
    }

    create() {
        this.add.text(300, 100, "How to play", {fill: '#FFFFFF'}).setOrigin(0.5).setFontSize("35px");
        const goBackButton = this.add.text(40, 50, "<=", {fill: '#FFFFFF'}).setOrigin(0.5).setFontSize("50px").setInteractive();
        goBackButton.on("pointerup", () => {
            this.scene.start("startMenu");

        });
        this.add.text(0, 150, this.content(), {
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            align: 'justify'
        }).setFontSize('15px').setLineSpacing(10);

    }

    update() {

    }

    content() {
        return ["To move the character:",
            "Right: Right arrow.",
            "Left: Left arrow.",
            "Jump: Space bar.",
            "Note: The more you hold it the bigger the jump is going to be.",
            "To jump at a certain position, you need to hold the left or the right arrow",
            "before pressing the jump button.",
            "The game includes:" +
            "enemies that can take part of your health." +
            "Health pick ups for healing.",
            "To kill an enemy you have bounce on his head",
            "The character is bouncy,so be careful with your jumps !",
            "Reach the doors to progress to the next level."];
    }
}


