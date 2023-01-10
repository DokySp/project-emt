const TimeTools = {
  getCurrentTime: () => {
    // const now = new Date();
    // const currTime = new Date(
    //   now.getTime() - now.getTimezoneOffset() * 1 * 60 * 1000
    // );
    return new Date(Date.now());
  },

  setUTCReset: (target) => {
    const time = new Date(
      target.getTime() - target.getTimezoneOffset() * 1 * 60 * 1000
    );
    return time;
  },
};

module.exports = TimeTools;
