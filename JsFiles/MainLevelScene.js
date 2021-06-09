var player;
var movingPlatform;
var platform;
var cursor;
var enemy;
var enemy2;
var heart;

class MainLevelScene extends Phaser.Scene {
    constructor() {
        super('MainLevelScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('platform', 'assets/platform.png');
        this.load.image('smallPlatform', 'assets/smallPlatform.png');
        this.load.image('mediumPlatform', 'assets/mediumPlatform.png');
        this.load.image('bigPlatform', 'assets/BigPlatform.png');
        this.load.image('star', 'assets/star.png');
    }

    create() {
        let background = this.add.image(400, 200, 'sky');
        player = new Player(this, 200, 300, cursor);
        cursor = this.input.keyboard.createCursorKeys();

        heart = new Heart(this);
        heart.addItem(100, 350);
        platform = new Platform(this);

        platform.addPlatform(200, 220, 'platform');
        platform.addPlatform(300, 400, 'mediumPlatform');


        platform.addMovingPlatform(player,100,450,'bigPlatform');

        enemy = new Enemy(this, 300, 300);
        enemy2 = new Enemy(this, 300, 100);


        this.physics.add.collider(player, platform.group);
        this.physics.add.collider(heart.group, platform.group);
        player.onCollisionEnter();
    }

    update() {
        player.moveCharacter();
    }


}
