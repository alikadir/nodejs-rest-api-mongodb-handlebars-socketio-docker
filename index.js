import 'dotenv-flow/config.js';
import app from './app.js';

app.listen(3000, () => {
  console.log('server start http://localhost:3000');
});
