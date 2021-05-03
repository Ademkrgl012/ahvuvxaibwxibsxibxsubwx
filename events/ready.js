const randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1)) + low;
};


activities: [
        { state: "shopping_cart・Market sistemi'ni", type: "WATCHING" },
        { state: "hammer・Yetkili alımları'nı", type: "WATCHING" },
        { state: "ticket・Seviye sistemi'ni", type: "WATCHING" },
        { state: "tada・Sayısız çekilişler'i", type: "WATCHING" },
        { state: "tv・Bişeyler", type: "WATCHING" }
    ],


this.client = client

const activities = this.client.config.activities;
             const randomNumber = randomInt(0,activities.length-1);
             this.client.user.setActivity(activities[randomNumber].state, { type: activities[randomNumber].type });