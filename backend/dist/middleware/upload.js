// import multer from 'multer';
// import path from 'path';
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         // ✅ Keep the file extension
//         const ext = path.extname(file.originalname);
//         const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, unique + ext);
//     },
// });
// export const upload = multer({ storage });
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // keep the file extension (e.g. .jpg, .png)
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + ext);
    }
});
export const upload = multer({ storage });
//# sourceMappingURL=upload.js.map