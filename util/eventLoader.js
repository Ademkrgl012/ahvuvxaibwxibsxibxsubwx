const reqEvent = (event) => require(`../event/${event}`);
module.exports = client => {
  client.on('message', reqEvent('message'));
};