const cspHeaderName = {
  Chrome: (version) => {
    if (version >= 14 && version < 25) {
      return 'X-WebKit-CSP';
    }
    return 'Content-Security-Policy';
  },
  Firefox: (version) => {
    if (version >= 4 && version < 23) {
      return 'X-Content-Security-Policy';
    }
    return 'Content-Security-Policy';
  },
  IE: (version) => {
    if (version < 12) {
      return 'X-Content-Security-Policy';
    }
    return 'Content-Security-Policy';
  },
  Safari: (version) => {
    if (version <= 7) {
      return 'X-WebKit-CSP';
    }
    return 'Content-Security-Policy';
  },
};


export default cspHeaderName;
