const Discord = require("discord.js");
const client = new Discord.Client()
const randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1)) + low;
};

this.client = client

const activities = this.client.config.activities;
             const randomNumber = randomInt(0,activities.length-1);
             this.client.user.setActivity(activities[randomNumber].state, { type: activities[randomNumber].type });