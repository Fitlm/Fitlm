const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: String,
    images: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    },

    // 사진 업로드 날짜. 기본값은 현재 시간입니다.
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    // 운동 부위. 필수 필드입니다.
    exercisePart: { 
        type: String, 
        required: true 
    },
    // 운동 시간 (분 단위). 필수 필드입니다.
    exerciseTime: { 
        type: Number, 
        required: true 
    },
    // 운동 만족도. 필수 필드입니다.
    satisfaction: { 
        type: Number, 
        required: true 
    },
    // 추가 메모. 선택적 필드입니다.
    memo: {
        type: String,
        default: ''
    },
    // 추가 필드: x, y, rotate 값을 저장하는 필드
    x: {
        type: Number,
        default: Math.random() * 100 // 예시로 랜덤한 값 설정
    },
    y: {
        type: Number,
        default: Math.random() * 100 // 예시로 랜덤한 값 설정
    },
    rotate: {
        type: Number,
        default: Math.random() * 360 // 예시로 랜덤한 값 설정
    }
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;