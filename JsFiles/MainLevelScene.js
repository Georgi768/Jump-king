var player;
var platform;
var cursor;

class MainLevelScene extends Phaser.Scene {
    constructor() {
        super('MainLevelScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('platform', 'assets/platform.png');
    }

    create() {
        cursor = this.input.keyboard.createCursorKeys();
        this.add.image(400, 200, 'sky');
        platform = new Platform(this);
        platform.scene.create(400, 400, 'platform').setScale(2).refreshBody();
        player = new Player(this,200,300,cursor);
        this.physics.add.collider(platform.scene, player);

    }

    update() {
        player.movePlayer();
    }

}
