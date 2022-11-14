import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect("mongodb+srv://amol:amol1234@mern-1.hs4nfgo.mongodb.net/?retryWrites=true&w=majority").then(()=> {
        console.log('Succesfully Connected to MongoDB');
    }).catch(err => {
        console.error(err);
    }) 
}

export default connect;
