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
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('platform', 'assets/platform.png');
        this.load.image('mediumPlatform', 'assets/MediumPlatform.png');
        this.load.image('smallPlatform', 'assets/smallPlatform.png');
        this.load.image('bigPlatform', 'assets/BigPlatform.png');
        this.load.image('littlePlatform', 'assets/littlePlatform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('door', 'assets/Basic_Door_Pixel.png');
    }

    create() {
        throw new TypeError("Cannot call abstract method.");
    }

    update() {
        throw new TypeError("Cannot call abstract method.");
    }

}

class StartMenu extends SceneLevel {

    constructor() {
        super('startMenu');
    }

    create() {
        this.add.text(300, 400, "Jump king-ish", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        let startButton = this.add.text(300, 500, "Start", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("30px").setInteractive();
        startButton.on("pointerup", () => {
            this.scene.start("MainLevelScene");
        });
    }

    update() {

    }
}

class MainLevelScene extends SceneLevel {
    constructor() {
        super('MainLevelScene');
    }


    create() {
        let background = this.add.image(400, 200, 'sky');
        cursor = this.input.keyboard.createCursorKeys();
        player = new Player(this, 300, 100, cursor);
        // heart = new Heart(this);
        // heart.addItem(100, 350);
        platform = new Platform(this);
        platform.addPlatform(400, 1500, 'platform').setScale(2).refreshBody();
        // platform.addPlatform(300, 400, 'smallPlatform');
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
        // heart.addItem(300, 120);
        // platform.addPlatform(450, 1000, 'smallPlatform');
        this.cameras.main.setBounds(0, 0, this.displayWidth, this.displayHeight);
        this.cameras.main.startFollow(player);
        //platform.addMovingPlatform(player,100,1100,'bigPlatform');

        enemy = new Enemy(this, 100, 400);
        // enemy2 = new Enemy(this, 300, 100);

        door = new Door(this, 400, 100);
        this.physics.add.overlap(door, player, () => door.setLevelTransitionDestination('secondLevel'), null, door);
        this.physics.add.collider(door, platform.group);
        // this.physics.add.collider(heart.group, platform.group);
        this.physics.add.collider(player, platform.group);

        //player.onCollisionEnter();
    }

    update() {
        player.moveCharacter();

    }

}

class SecondLevel extends SceneLevel {
    constructor() {
        super('secondLevel');
    }


    create() {
        cursor = this.input.keyboard.createCursorKeys();
        player = new Player(this, 50, 500, cursor);
        platform = new Platform(this);
        enemy = new Enemy(this, 450, 1100);
        enemy = new Enemy(this, 200, 1030);
        enemy = new Enemy(this, 500, 860);
        enemy = new Enemy(this, 230, 700);
        enemy = new Enemy(this, 70, 240);
        heart = new Heart(this);
        door = new Door(this, 400, 100);
        this.physics.add.overlap(door, player, () => door.setLevelTransitionDestination('finalLevel'), null, door);
        this.physics.add.collider(door, platform.group);
        heart.addItem(20, 630, 'star');
        this.physics.add.collider(heart.group, platform.group);
        platform.addPlatform(400, 1500, 'platform').setScale(2).refreshBody();
        platform.addPlatform(100, 1400, 'smallPlatform');
        platform.addPlatform(190, 1270, 'smallPlatform');
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
        this.physics.add.collider(player, platform.group);
    }

    update() {
        player.moveCharacter();
    }
}

class FinalLevel extends SceneLevel {

    constructor() {
        super('finalLevel');
    }

    create() {
        queen = new Queen(this, 510, 20);
        cursor = this.input.keyboard.createCursorKeys();
        player = new Player(this, 410, 20, cursor)
        platform = new Platform(this);
        heart = new Heart(this);
        heart.addItem(20, 400, 'star');
        this.physics.add.collider(heart.group, platform.group);
        enemy = new Enemy(this, 300, 1000);
        enemy = new Enemy(this, 180, 600);
        enemy = new Enemy(this, 410, 250);
        player.onCollisionEnter()
        platform.addPlatform(400, 1500, 'platform').setScale(2).refreshBody();
        platform.addPlatform(100, 1400, 'smallPlatform');
        platform.addPlatform(200, 1250, 'smallPlatform');
        platform.addMovingPlatform(player, 350, 1250, 'littlePlatform');
        platform.addPlatform(550, 1095, 'littlePlatform');
        platform.addPlatform(300, 1050, 'mediumPlatform');
        platform.addPlatform(50, 1000, 'littlePlatform');
        platform.addMovingPlatform(player, 150, 870, 'smallPlatform');
        platform.addMovingPlatform(player, 450, 840, 'smallPlatform');
        platform.addPlatform(230, 750, 'bigPlatform');
        platform.addPlatform(100, 650, 'mediumPlatform');
        platform.addPlatform(180, 550, 'littlePlatform');
        platform.addPlatform(250, 500, 'littlePlatform');
        platform.addPlatform(150, 440, 'littlePlatform');
        platform.addPlatform(20, 440, 'littlePlatform');
        platform.addPlatform(230, 750, 'littlePlatform');
        platform.addPlatform(400, 500, 'littlePlatform');
        platform.addPlatform(570, 400, 'mediumPlatform');
        platform.addPlatform(410, 310, 'bigPlatform');
        platform.addMovingPlatform(player, 100, 220, 'littlePlatform');
        platform.addPlatform(250, 100, 'mediumPlatform');
        platform.addPlatform(510, 100, 'bigPlatform');


        this.physics.add.collider(player, platform.group);
        this.physics.add.overlap(player, queen, () => this.scene.start('CompleteGameScene'));
        this.physics.add.collider(queen, platform.group);
        this.cameras.main.setBackgroundColor('#000000');
    }

    update() {
        player.moveCharacter();
    }

}

class GameCompleteScene extends SceneLevel {

    constructor() {
        super('CompleteGameScene');
    }

    create() {
        this.add.text(300, 300, "Congratulation,you got the babe", {fill: '#FFFFFF'}).setOrigin(0.5).setFontSize("25px");
        this.add.text(300, 360, "Thank you for playing !", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("40px");
        let restartButton = this.add.text(300, 420, "Try again ?", {fill: '#FFFFFF'}).setScrollFactor(0).setOrigin(0.5).setFontSize("30px").setInteractive();
        restartButton.on("pointerup", () => {
            this.scene.start("MainLevelScene");
        });
    }

    update() {
    }
}


