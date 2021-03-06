import Layer from '@hyper/http/Layer';

import dnsPrefetchControl from "./directives/dnsPrefetchControl";
import frameOptions from "./directives/frameOptions";
import strictTransportSecurity from "./directives/strictTransportSecurity";
import xssProtection from "./directives/xssProtection";
import downloadOptions from "./directives/downloadOptions";
import contentTypeOptions from "./directives/contentTypeOptions";
import contentSecurityPolicy from "./directives/contentSecurityPolicy";

class SecurityLayer extends Layer{
  constructor(config, policy){
    super(config);

    //TODO, cannot add defaults after config is set,
    this.addDefaults({
      dnsPrefetchControl: {
        default: {
          allow: true
        },
        type: "Object"
      },
      frameOptions: {
        default: {
          directive: "SAMEORIGIN",
          domain: undefined
        },
        type: "Object"
      },
      strictTransportSecurity:{
        default: {
          maxAge: 15552000,
          includeSubdomains: true,
        },
        type: "Object"
      },
      downloadOptions:{
        default: {
          enabled: true
        },
        type: "Object"
      }
    });
  }

  handler(req, res, next){
    this.dnsPrefetchControl(res);
    this.frameOptions(res);
    this.strictTransportSecurity(res);
    this.xssProtection(res);
    this.downloadOptions(res);
    this.contentTypeOptions(res);
    this.contentSecurityPolicy(res)

    next();
  }
}

export default SecurityLayer;


