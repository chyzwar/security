  /**
   * Parse CPS diectives to valid Header string
   * @param  {Object} cps
   * @return {string}
   */
  parseCSP(cps) {
    let headerValue = '';

    forIn(cps.directives,
      (cspSources, directive) => {
        headerValue += ` ${directive} ${this.cspSources(directive, cspSources)};`;
      }, ''
    );
    return headerValue;
  }

  /**
   * Concatinate sourceValues, validate them
   * @param  {array} sourceValues
   * @return {string}
   */
  cspSources(directive, sourceValues) {
    if (sourceValues.length) {
      return sourceValues.reduce(
        (source, nextSource) => `${source}  ${nextSource}`
      );
    }

    return '';
  }

  /**
   * Find Valid Header name for UserAgent
   * If not find fall to 'Content-Security-Policy'
   * @param  {UserAgent} userAgent
   * @return {string}
   */
  cspHeaderName(userAgent) {
    const handler = headerHandlers[userAgent.family];

    if (handler) {
      return handler(userAgent.major);
    }

    return 'Content-Security-Policy';
  }


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
