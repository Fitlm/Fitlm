import React from 'react';
import Dropzone from 'react-dropzone';
import axiosInstance from '../utils/axios';
import PropTypes from 'prop-types';

// FileUpload 컴포넌트 정의
const FileUpload = ({ onImageChange, images }) => {

  // 파일을 드롭했을 때 실행되는 함수
  const handleDrop = async (files) => {
    let formData = new FormData(); // 새로운 FormData 객체 생성

    const config = {
      header: { 'content-type': 'multipart/form-data' } // 헤더 설정
    }

    formData.append('file', files[0]); // FormData에 파일 추가

    try {
      const response = await axiosInstance.post('/products/image', formData, config); // 이미지를 업로드하는 POST 요청
      onImageChange([...images, response.data.fileName]); // 새 이미지 파일 이름을 포함한 배열을 전달하여 이미지 변경 콜백 호출

    } catch (error) {
      console.error(error); // 에러 발생 시 콘솔에 로그 출력
    }
  }

  // 이미지 삭제 처리 함수
  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image); // 삭제할 이미지의 인덱스 찾기
    let newImages = [...images]; // 원본 복사
    newImages.splice(currentIndex, 1); // 해당 이미지를 배열에서 제거
    onImageChange(newImages); // 이미지 변경 콜백 호출하여 이미지를 업데이트
  }

  return (
    <div className='flex gap-4'> {/* flex 컨테이너 생성 */}

      {/* Dropzone 컴포넌트를 사용하여 파일 드롭 영역 생성 */}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section
            className='min-w-[300px] h-[300px] border flex items-center justify-center'
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className='text-3xl'>+</p> {/* 드롭 영역 안에 '+' 아이콘 표시 */}
            </div>
          </section>
        )}
      </Dropzone>

      {/* 이미지를 보여주는 영역 */}
      <div className='flex-grow h-[300px] border flex  items-center justify-center overflow-x-scroll overflow-y-hidden'>
        {/* 이미지 배열을 매핑하여 각 이미지를 표시 */}
        {images.map(image => (
          <div key={image} onClick={() => handleDelete(image)}> {/* 이미지 클릭 시 삭제 처리 함수 호출 */}
            <img
              className='min-w-[300px] h-[300px]'
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`} // 이미지 경로 설정
              alt={image} // 대체 텍스트 설정
            />
          </div>
        ))}
      </div>

    </div>
  )
}

// props의 타입을 검증하는 PropTypes 설정
FileUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired, // onImageChange가 함수 타입이고 필수임을 설정
  images: PropTypes.array.isRequired // images가 배열 타입이고 필수임을 설정
}

export default FileUpload; // FileUpload 컴포넌트를 내보냄
