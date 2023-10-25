import { Router } from 'express';
import multer from 'multer';
import { importCSV } from '../../controllers/csv.controllers';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/csv', upload.single('cosechas'), importCSV);

export default router;
