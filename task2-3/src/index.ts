import { app } from './app';
import config from './config/index';
import { sequelize } from './loaders/db';

const PORT = config.apiPort || 3000;

app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
}).on('close', () => {
    sequelize.close();
});
