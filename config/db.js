import mongoose from 'mongoose'
let connectionUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bazary';

(async () => {
    await mongoose.connect(
        connectionUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
        .then(() => console.log('Database connected'))
        .catch((err) => console.log('Database connection error'+err))
})()
