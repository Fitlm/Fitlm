const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quote = require('./models/Quotes');
const app = express();
const port = 4000;

dotenv.config();

// MongoDB에 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // 가짜 데이터 생성
        const motivationQuotes = [
            { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
            { quote: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
            { quote: "Good things come to those who sweat.", author: "Unknown" },
            { quote: "Success starts with self-discipline.", author: "Unknown" },
            { quote: "The body achieves what the mind believes.", author: "Unknown" },
            { quote: "Train insane or remain the same.", author: "Unknown" },
            { quote: "Don’t wish for it, work for it.", author: "Unknown" },
            { quote: "Exercise is a celebration of what your body can do. Not a punishment for what you ate.", author: "Unknown" },
            { quote: "Work hard in silence. Let success be your noise.", author: "Frank Ocean" },
            { quote: "Strive for progress, not perfection.", author: "Unknown" },
        ];

        // 가짜 데이터 삽입
        return Quote.insertMany(motivationQuotes);
    })
    .then(() => {
        console.log('Motivation quotes inserted successfully');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(express.json());

// 라우터 등록
app.use('/quotes', require('./routes/quotes'));
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.use(express.static(path.join(__dirname, '../uploads')));

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});