import React from 'react';
import PropTypes from 'prop-types';

const RadioBox = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {prices?.map(price => (
        <div key={price._id}>
          <input
            checked={checkedPrice === price.array}
            onChange={e => onFilters(e.target.value)}
            type="radio"
            id={price._id}
            value={price._id}
          />
          {" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}

    </div>
  )
}
// props의 타입을 지정합니다
RadioBox.propTypes = {
  prices: PropTypes.array.isRequired, // 가격 옵션 배열이 필수입니다
  checkedPrice: PropTypes.array, // 선택된 가격을 나타내는 문자열, isRequired
  onFilters: PropTypes.func.isRequired // 필터가 변경될 때 호출되는 함수입니다
};

export default RadioBox;
