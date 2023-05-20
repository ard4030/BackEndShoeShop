const multer = require('multer');
const { createUploadPath } = require('./functions');
const path = require("path");
const sharp = require('sharp');
const fs = require('fs');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.headers.foldername){
      cb(null,createUploadPath(req.headers.foldername))
    }else{
      cb(null,createUploadPath(req.user.mobile))
    }
    
  },
  filename: function (req, file, cb) {
      const type = path.extname(file?.originalname || "")
      cb(null, Date.now() + type)
  }
});

// Set up Multer upload
// const uploader = multer({storage: storage,});

const fileFilter = function (req, file, cb) {
  // Check if the file format is supported
  const allowedFormats = ['.jpg','.JPG','.jpeg','.JPEG','.png','.PNG','.webp','.WEBP'];
  if (!allowedFormats.includes(path.extname(file.originalname))) {
    const error = new Error('فرمت فایل صحیح نیست');
    error.statusCode = 400;
    return cb(error);
  }
  
  // Check if the file size is within the limit
  const maxSize = 1 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    const error = new Error('حداکثر حجم مجاز 1 مگابایت');
    error.statusCode = 400;
    return cb(error);
  }

  // If everything is okay, accept the file
  cb(null, true);
};

const uploader = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Set up middleware to convert uploaded images to webp format

// const convertToWebp = async (req, res, next) => {
//   let x = [];
//   if (req.files) {
//     for (let i = 0; i < req.files.length; i++) {
//       const file = req.files[i];
//       const ext = path.extname(file.originalname).toLowerCase();
//       if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
//         const tempPath = file.path.replace(/\.\w+$/, '.webp');
//         await sharp(file.path)
//           .webp()
//           .toFile(tempPath);

//         // دریافت اطلاعات فایل webp
//         const metadataWebp = await sharp(tempPath).metadata();

//         if (fs.existsSync(tempPath)) {
//           const stats = fs.statSync(tempPath);

//           fs.unlinkSync(file.path); 

//           // دریافت نام و مسیر فایل
//           const filename = path.basename(tempPath);
//           const filepath = path.dirname(tempPath).replace(/\\/g, '/');

//           // اضافه کردن اطلاعات فایل به آرایه
//           x.push({
//             filename: filename,
//             address: filepath,
//             size: stats.size,
//             mimetype: "webp",
//             width: metadataWebp.width,
//             height: metadataWebp.height,
//             path: '/' + filepath + '/' + filename
//           });
//         }
//       }
//     }
//   }
//   req.cc = x;
//   next();
// }; 


module.exports = {
  uploader,
  // convertToWebp
}
