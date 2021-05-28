var game;

window.onload = function ()
{
    var config = {
        type:Phaser.AUTO,
        width:800,
        height:500,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400 },
                debug: false
            }
        },
        scene:[MainLevelScene]
    }
    game = new Phaser.Game(config);
}