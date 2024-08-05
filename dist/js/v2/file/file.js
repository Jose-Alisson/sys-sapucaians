import { app } from "../../server.js";
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/main/data');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
// Middleware para servir arquivos estáticos
// Rota para fazer upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    res.send({ path: req.file.path, filename: req.file.filename });
});
// Rota para fazer download de arquivos
app.get('/download/:filename', (req, res) => {
    // const __filename = path.dirname(fileURLToPath(import.meta.url))
    const file = path.join('./data', req.params.filename);
    res.download(file);
});
function registrarFile() { }
export { registrarFile };
