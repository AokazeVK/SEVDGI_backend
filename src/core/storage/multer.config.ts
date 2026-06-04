import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerDocumentConfig = {
  storage: diskStorage({
    destination: './uploads/documents',
    filename: (_req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

    callback(null, allowedMimeTypes.includes(file.mimetype));
  },
};
