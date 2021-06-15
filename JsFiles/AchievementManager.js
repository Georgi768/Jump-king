class AchievementManager
{
    constructor() {
        this._achievements = {
            "CompeteTheGame" :{
                "name": "Saver",
                "description": "Complete the game",
                "Unlocked" : "false"
            },
            "EnemyKills":{
                "name":"Slayer",
                "description":"Kill 7 or more enemies",
                "Unlocked" : "false"
            }
        }
    }

    get achievements() {
        return this._achievements;
    }

    set achievements(value) {
        this._achievements = value;
    }
}