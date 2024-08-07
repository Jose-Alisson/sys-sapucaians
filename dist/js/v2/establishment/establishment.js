import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { app } from '../../server.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let config;
async function loadConfig() {
    const filePath = path.join(__dirname, "../../../../public", 'config.json');
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}
(async () => { config = await loadConfig(); })();
app.get("/establishment", (req, res) => {
    res.send(config);
});
function registrarEstablishment(socket, io) {
    socket.on('toggle-open-estabelecimento', () => {
        if (config?.isOpen != undefined) {
            config.isOpen = !config.isOpen;
            io.emit('estabelecimento', config);
        }
    });
}
export { registrarEstablishment };
