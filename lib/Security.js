import Layer from '@hyper/http/lib/Layer'
import Defaults from '@hyper/config/lib/Defaults';


class Security extends Layer{
  constructor({handler, name, config, path, policy}={}){
    super({handler, name, config, path})

    /**
     * Security Policy
     */
    this.setPolicy(policy);
  }

  /**
   * Set Security policy
   *
   * @param {Object} policy
   */
  setPolicy(policy={}){
    invariant(
      isObject(policy),
      `Security.setPolicy(..): expect object got: ${typeOf(policy)}`
    );
    this.policy = new Config(defaults, policy);

    return this;
  }

  handler(req, res, next){
    res.setHeader(
      'X-Frame-Options',
      this.policy.xFrameOptions
    );

    res.setHeader(
      'X-DNS-Prefetch-Control',
      this.policy.xDNSPrefetchControl
    );

    res.setHeader(
      'Strict-Transport-Security',
      7776000000
    );

    res.setHeader(
      'x-xss-protection',
      '1; mode=block'
    );

    res.setHeader(
      'X-Download-Options',
      'noopen'
    );

    res.setHeader(
      'x-content-type-options',
      'nosniff'
    );

    res.setHeader(
      this.cspHeaderName(req.userAgent),
      this.cspValue
    );

    next();
  }


  /**
   * Parse CPS diectives to valid Header string
   * @param  {object} cps
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
}


}

export default Security;


