import className from "@utility/utils/className";
import isString from "@utility/utils/isString";

function frameOptions(config){
  const {directive, domain} = config.get("frameOptions");

  switch(directive){
  case "SAMEORIGIN":
    return function(res){
      res.setHeader('X-Frame-Options', "SAMEORIGIN");
    }
  case "DENY":
    return function(res){
       res.setHeader('X-Frame-Options', "DENY");
    }
  case "ALLOW-FROM":
    if(isString(domain)){
      return function(res){
        res.setHeader('X-Frame-Options', `ALLOW-FROM ${domain}`);
      }
    }
    else {
      throw new Error(
        `Security.xFrameOptions(..): expected String domain got: ${className(domain)}`
      );
    }
  default:
    throw new Error(
      `Security.xFrameOptions(..): invalid directive ${directive}`
    );
  }
}

export default frameOptions;
