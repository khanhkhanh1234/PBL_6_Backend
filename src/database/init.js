const connection = require('./connection');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender BOOLEAN NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT(11) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
  );

  CREATE TABLE IF NOT EXISTS landCertificate (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    owner VARCHAR(255) NOT NULL,  //chu so huu
    yob VARCHAR(255) NOT NULL,   //nam sinh
    idcard VARCHAR(255) NOT NULL,  //so cmnd
    owneraddress VARCHAR(255) NOT NULL,  //dia chi chu so huu
    idcerti VARCHAR(255) NOT NULL,    //so giay chung nhan
    landplot VARCHAR(255) NOT NULL, //thua dat so
    landaddress VARCHAR(255) NOT NULL, //dia chi thua dat
    acreage VARCHAR(255) NOT NULL, //dien tich
    uses VARCHAR(255) NOT NULL,   //hinh thuc su dung
    purpose VARCHAR(255) NOT NULL,  //muc dich su dung
    dateuse VARCHAR(255) NOT NULL, // thoi han su dung
    originuse VARCHAR(255) NOT NULL,  // nguon goc su dung
    house VARCHAR(255),        //nha o
    constructionorther VARCHAR(255), //cong trinh khac
    productionforest VARCHAR(255), //rung san xuat
    oldtree VARCHAR(255),     //cay lau nam
    note VARCHAR(255),      //ghi chu
    changecontent VARCHAR(255), // noi dung thay doi
    image LONGTEXT NOT NULL,   //anh
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`;

connection.query(createTableQuery, function (error, results, fields) {
    console.log(error);
    console.log('The solution is: ', results);
});
