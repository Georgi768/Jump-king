class Item extends Phaser.Physics.Arcade.Image
{

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        if(this.target === Item)
        {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this._scene = scene;
    }


    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }
}

class Heart extends Item
{

    constructor(scene) {
        super(scene);
        this._group = scene.physics.add.group();
    }


    get group() {
        return this._group;
    }

    set group(value) {
        this._group = value;
    }

    addItem(x,y)
    {
        this.group.create(x,y,'star');
    }
}
class Door extends Item
{

    constructor(scene,x,y) {
        super(scene);
        this.setTexture("door");
        this._scene = scene;
        this.x = x;
        this.y = y;
    }

    setLevelTransitionDestination(scene)
    {
       return this.scene.scene.start(scene)
    }
}