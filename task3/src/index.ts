import { app } from './app';
import config from './config/index';

const PORT = config.apiPort || 3000;

app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
});

