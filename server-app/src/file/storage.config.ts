import { diskStorage } from 'multer';
import { extname } from 'path';

// export const storage = {
//   storage: diskStorage({
//     destination: './uploads', // Папка для сохранения файлов
//     filename: (req, file, callback) => {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//       const fileExt = extname(file.originalname);
//       callback(null, `${uniqueSuffix}${fileExt}`);
//     },
//   }),
// };

export const storage = diskStorage({
  destination: './uploads', // Папка для сохранения файлов
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = extname(file.originalname);
    callback(null, `${uniqueSuffix}${fileExt}`);
  },
});
