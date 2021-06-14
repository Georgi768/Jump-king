class Item extends Phaser.Physics.Arcade.Image
{

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this._group = scene.physics.add.group();
        if(this.target === Item)
        {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this._scene = scene;
    }


    addItem(x,y,texture)
    {
        this.group.create(x,y,texture);
    }

    get group() {
        return this._group;
    }

    set group(value) {
        this._group = value;
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