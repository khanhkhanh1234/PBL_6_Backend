const jwt = require('jsonwebtoken');
const express = require('express');
const localStorage = require('localStorage');
const {user_router,
    validateUser}
     = require('../router/user');
const exceljs = require('exceljs');
const db = require('../database/connection');
const crypto = require('crypto');
const fs = require('fs');
const { hashPasswordWithSalt, hashPasswordWithSaltFromDB, encrypt, decrypt } = require('./security');
const secret = 'secret';
const { getOne, create, getMany } = require('./query');
const loginRouter = express.Router();
const expireTime = 60 * 60 * 24 * 7; // 7 days
const options = { expiresIn: expireTime };
const path = require('path');
const { TLSSocket } = require('tls');
// const {
//     publicKey,
//     privateKey,
// } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
// const keyPair = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
// const publicKey = keyPair.publicKey.export({type: 'pkcs1', format: 'pem'});

// // Lưu khóa công khai vào file public_key.pem
// fs.writeFileSync('public_key.pem', Buffer.from(publicKey).toString('utf8'));
// const privateKey = keyPair.privateKey.export({type: 'pkcs1', format: 'pem'});
// // Lưu khóa riêng tư vào file private_key.pem
// fs.writeFileSync('private_key.pem', Buffer.from(privateKey).toString('utf8'));
const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const privateKey = fs.readFileSync('private_key.pem', 'utf8');
loginRouter.post('/register', async (req, res, next) => {
    const data = req.body;
    console.log(data)
    
    var { username, password, name, age, gender, email } = data;
    console.log(data.password);
    try {
        var isUserExist = await getOne({
            db,
            query: "SELECT * FROM users WHERE username = ?",
            params: [username], // Đảm bảo truyền tham số dưới dạng mảng
        });

        if (isUserExist) {
            res.json({ message: 'Username is already exist' });
        } else {
            // Đảm bảo hàm hashPasswordWithSalt() trả về một đối tượng chứa salt và hashedPw
            var { salt, hashedPw } = hashPasswordWithSalt(password);
        
            var result = await create({
                db,
                query: `INSERT INTO users (username, password, salt, name, age, gender, email)  
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                params: [username, hashedPw, salt, name, age, gender, email]
            });
            console.log("hihi123");
            
            res.status(200).json({ message: 'Register success' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
});

loginRouter.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const username = data.username;
        const password = data.password;
        const isUserValid = await getOne({
            db,
            query: "SELECT * FROM users WHERE username = ?",
            params: username,
        });
        
        if (!isUserValid) {
            res.status(400).json({ message: 'Username does not exist' });
        } else {
            console.log(isUserValid);
            const salt = isUserValid.salt;
            const hashedPw = isUserValid.password;
            const hashedPwFromDB = hashPasswordWithSaltFromDB(password, salt).hashedPw;
            const user_id = isUserValid.id;

            if (hashedPwFromDB.localeCompare(hashedPw) === 0) {
                const token = jwt.sign({ username: isUserValid.username }, privateKey, { algorithm: 'RS256' }, options);
                res.status(200).json({ token, isUserValid,  message: 'Username or password is correct' });
                console.log(isUserValid);
            } else {
                res.json({ message: 'Username or password is incorrect' });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});



loginRouter.put('/:id', async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    console.log(token);
    const data = req.body;
    const name = data.name;
    const age = data.age;
    const gender = data.gender;
    var id = req.params.id;
    const isUserValid = await getOne({
        db,
        query: "SELECT username FROM users WHERE id = ?",
        params: id,
    });
    console.log(id);
    try {
        const isTokenValid = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        console.log(isTokenValid);
        if (isTokenValid.username.localeCompare(isUserValid.username) === 0) {
            console.log(isTokenValid.username);
            const result = await create({
                db,
                query: `UPDATE users SET name = ?, gender = ?, age = ? WHERE id = ? `,
                params: [name, gender, age, id]
            });
            res.status(200).json({ message: 'Update success' });
            }
            else {
                res.status(400).json({ message: 'Username is incorrect' });
            }
        
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});


loginRouter.post('/saveLandCertificate',async (req, res, next) => {
    const data = req.body;
    var { user_id, owner, yob, idcard, owneraddress, idcerti, landplot,landaddress,acreage, uses,purpose,
        dateuse,originuse,house,constructionorther,productionforest,oldtree,note,changecontent,image
    } = data;
    console.log(data)
    
    console.log(user_id)
    // console.log(user_id)
    try {
      const result = await create({
        db,
        query: `
          INSERT INTO landCertificate (
            user_id, owner, yob, idcard, owneraddress, idcerti,
            landplot, landaddress, acreage, uses, purpose, dateuse,
            originuse, house, constructionorther, productionforest,
            oldtree, note, changecontent, image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        params: [
          user_id, owner, yob, idcard,
          owneraddress, idcerti, landplot,
          landaddress, acreage, uses,
          purpose, dateuse, originuse,
          house, constructionorther,
          productionforest, oldtree,
          note, changecontent, image
        ],
      });
      console.log(result)
  
      res.status(200).json({ message: 'Land certificate saved successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    this.route
  });

loginRouter.get('/exportExcelWithUserId', async (req, res) => {
    try {
        // Lấy tất cả dữ liệu từ bảng landCerti
        const user_id = localStorage.getItem('user_id');
        const allLandCertData = await getMany({
            db,
            query: 'SELECT * FROM landCertificate where user_id = ?',
            params: user_id,
        });

        // Tạo một workbook mới
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('LandCertificates');

        // Đặt các hàng tiêu đề
        const headers = Object.keys(allLandCertData[0]);
        worksheet.addRow(headers);

        // Thêm dữ liệu từ cơ sở dữ liệu vào worksheet
        allLandCertData.forEach((row) => {
            const newRow = { ...row };

            // Xử lý trường image
            const imageBase64 = row.image;
            if (imageBase64) {
                const imageBuffer = Buffer.from(imageBase64, 'base64');
                const imageFileName = `image_${row.id}.png`; // Đặt tên file ảnh
                const imagePath = path.join(__dirname, imageFileName);
                console.log(imagePath);
                // Lưu ảnh vào tệp
                fs.writeFileSync(imagePath, imageBuffer);

                // Thêm đường dẫn ảnh vào trường 'image'
                newRow.image = imagePath;
            }

            worksheet.addRow(Object.values(newRow));
        });

        // Tạo file Excel và trả về cho client
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=LandCertificates.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).json({ message: 'An error occurred during export' });
    }
});

loginRouter.get('/exportAllExcel', async (req, res) => {
    console.log("xuất execl")
    try {
        // Lấy tất cả dữ liệu từ bảng landCerti
        const allLandCertData = await getMany({
            db,
            query: 'SELECT * FROM landCertificate'
        });

        // Tạo một workbook mới
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('LandCertificates');

        // Đặt các hàng tiêu đề
        const headers = Object.keys(allLandCertData[0]);
        worksheet.addRow(headers);

        // Thêm dữ liệu từ cơ sở dữ liệu vào worksheet
        allLandCertData.forEach((row) => {
            const newRow = { ...row };

            // Xử lý trường image
            const imageBase64 = row.image;
            if (imageBase64) {
                const imageBuffer = Buffer.from(imageBase64, 'base64');
                const imageFileName = `image_${row.id}.png`; // Đặt tên file ảnh
                const imagePath = path.join(__dirname, imageFileName);
                console.log(imagePath);
                // Lưu ảnh vào tệp
                fs.writeFileSync(imagePath, imageBuffer);

                // Thêm đường dẫn ảnh vào trường 'image'
                newRow.image = imagePath;
            }

            worksheet.addRow(Object.values(newRow));
        });

        // Tạo file Excel và trả về cho client
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=LandCertificates.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).json({ message: 'An error occurred during export' });
    }
});

function validateToken (req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    try {
        const isTokenValid = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        if(isTokenValid) {
        res.locals.userToken = isTokenValid;
        next();
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = loginRouter;

