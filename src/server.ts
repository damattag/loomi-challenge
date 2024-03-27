import 'dotenv/config';

import './env';
import app from '@app';

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${process.env.SERVER_PORT}`,
  );
});
