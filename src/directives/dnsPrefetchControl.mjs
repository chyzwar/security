import isBoolean from "@utility/utils/isBoolean";
import className from "@utility/utils/className";

/**
 * X-DNS-Prefetch Control
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
 *
 * @param  {Config} config
 * @return {Function}
 */
function dnsPrefetchControl(config){
  const {allow} = config.get("dnsPrefetchControl");

  if(isBoolean(allow)){
    if(allow){
      return function(res){
        res.setHeader('X-DNS-Prefetch-Control', 'on');
      }
    }
    else {
      return function(res){
        res.setHeader('X-DNS-Prefetch-Control', 'off');
      }
    }
  }
  else {
    throw new Error(
      `Security.dnsPrefetchControl(..): allow expected to be Boolean, got: ${className(allow)}`
    );
  }
}

export default dnsPrefetchControl;


