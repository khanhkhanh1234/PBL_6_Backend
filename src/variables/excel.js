const ExcelJS = require('exceljs');
const fs = require('fs');

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');

const imagePath = 'D:/Download/khanh.jpg';

const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
console.log(imageBase64);

const imageId = workbook.addImage({
  base64: imageBase64,
  extension: 'png',
});

worksheet.addImage(imageId, {
  tl: { col: 2, row: 2 },
  br: { col: 5, row: 7 },
  editAs: 'undefined',
});

workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('File Excel đã được tạo thành công!');
  })
  .catch((error) => {
    console.error('Lỗi khi tạo file Excel:', error);
  });