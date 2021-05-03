const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('message', reqEvent('message'));
};
module.exports = client => {
  client.on('ready', reqEvent('ready'));
};
