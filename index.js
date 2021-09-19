import "dotenv-flow/config.js";
import { server } from "./server.js";

const listener = server.listen(process.env.PORT || 3000, () => {
  console.log(`Server start ${listener.address().port} port.`);
});
