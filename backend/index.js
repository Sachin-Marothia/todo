import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import todos from './mongo.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/get/todos', async (req, res) => {
    let data = await todos.find();
    res.send(data);
});

app.post('/api/todos', async (req, res) => {
    console.log(req.body);
    let data = new todos(req.body);
    let result = await data.save();
    res.send(result);
});

app.delete('/api/todos/:id', async (req, res) => {
    let data = await todos.deleteOne({ _id: req.params.id });
    res.send(data);
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
