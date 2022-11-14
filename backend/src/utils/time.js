const timeTools = {
  getCurrentTime: () => {
    const now = new Date();
    const currTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return currTime;
  },
};

module.exports = timeTools;
