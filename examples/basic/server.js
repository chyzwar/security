import Router from "@hyper/http/src/Router";
import Security from "@hyper/security/lib/Security";
import Server from "@hyper/http/src/Server";

const server = new Server();

const router = new Router();
router.get("/",
  (req, res) => res.text("Hello World")
);


const security = new Security();

server.addLayer(security);
server.addRouter(router);


server.listen(
  () =>  console.log("Server listen on http://localhost:3000")
);
