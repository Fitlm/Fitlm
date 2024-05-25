import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';

const UploadProductPage = () => {

   // 로컬 상태 정의
   const [product, setProduct] = useState({
    images: [], // 업로드된 이미지 파일 경로 목록
    exercisePart: '', // 운동 부위
    exerciseTime: 0, // 운동 시간
    satisfaction: 0, // 운동 만족도
    memo: '', // 추가 메모
  });


  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div className='text-center m-7'>
        <h1>오운완 인증 제출</h1>
      </div>

      <form className='mt-6' onSubmit={handleSubmit}>

        <FileUpload images={product.images} onImageChange={handleImages} />

        <div className='mt-4'>
          <label htmlFor='exercisePart'>운동 부위</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="exercisePart" id="exercisePart" onChange={handleChange} value={product.exercisePart}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='exerciseTime'>운동 시간(분 단위)</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            type="number" name="exerciseTime" id="exerciseTime" onChange={handleChange} value={product.exerciseTime}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='satisfaction'>운동 만족도</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            type="number" name="satisfaction" id="satisfaction" onChange={handleChange} value={product.satisfaction}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='memo'>추가 메모</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="memo" id="memo" onChange={handleChange} value={product.memo}
          />
        </div>
        <div className='mt-4'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700'>
            SUBMIT
          </button>
        </div>
      </form>
    </section>
  )
}

export default UploadProductPage