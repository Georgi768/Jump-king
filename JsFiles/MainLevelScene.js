class SceneLevel extends Phaser.Scene
{

    constructor(key) {
        super(key);
        if (new.target === Character) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    preload()
    {
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
    create(){
        throw new TypeError("Cannot call abstract method.");
    }
    update()
    {
        throw new TypeError("Cannot call abstract method.");
    }

}



var player;
var platform;
var cursor;
var enemy;
var heart;
var door;

class MainLevelScene extends SceneLevel {
    constructor() {
        super('MainLevelScene');
    }


    create() {
        let background = this.add.image(400, 200, 'sky');
        cursor = this.input.keyboard.createCursorKeys();
        player = new Player(this, 200, 100, cursor);
        heart = new Heart(this);
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

        enemy = new Enemy(this, 200, 400);
        // enemy2 = new Enemy(this, 300, 100);

        door = new Door(this,400,100);
        this.physics.add.overlap(door,player,() => door.setLevelTransitionDestination('secondLevel'), null, door);
        this.physics.add.collider(door,platform.group);
        this.physics.add.collider(player, platform.group);
        this.physics.add.collider(heart.group, platform.group);
        player.onCollisionEnter();
    }

    update() {
        player.moveCharacter();
    }

}

class SecondLevel extends SceneLevel
{
    constructor() {
        super('secondLevel');
    }


    create() {
        this.add.image(400, 200, 'sky');
    }

    update() {
    }
}
