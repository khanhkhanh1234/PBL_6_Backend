const express = require('express');
const bodyParser = require('body-parser');
const {user_router} = require('./router/user');
const {reset_pw_router} = require('./router/reset_pw');
const loginRouter = require('./variables/auth');
const loginRouter2 = require('./variables/testprivatekey');
const dotenv = require('dotenv').config();
const connection = require('./database/connection');
const crypto = require('crypto');
const cors = require('cors');
console.log(process.env.host);
const app = express();
const port = 8080;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(  
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(cors());
app.use('/user', user_router);
app.use('/auth', loginRouter);
app.use('/auth2', loginRouter2);
app.use('/reset', reset_pw_router);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
  