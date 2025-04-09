require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./route/router')

require('./mongodb/initDB').MongoDBConnection();

const initApp = () => {
    if (process.env.NODE_ENV === 'DEV') {
        console.log('[ENVIROMENT] Running on develop ...');
    }
}

app.listen(port, () => {
    console.log(`[STATE] App listening on port ${port}`);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);



initApp();