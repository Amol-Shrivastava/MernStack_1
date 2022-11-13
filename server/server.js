import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = 4000;
const app = express();

mongoose.connect("mongodb+srv://amol:amol1234@mern-1.hs4nfgo.mongodb.net/?retryWrites=true&w=majority").then(()=> {
    console.log('Succesfully Connected to MongoDB');
}).catch(err => {
    console.error(err);
}) 

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log('Connected Successfully to Server');
})