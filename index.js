import 'dotenv-flow/config.js';
import app from './app.js';

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server start ${listener.address().port} port.`);
});
