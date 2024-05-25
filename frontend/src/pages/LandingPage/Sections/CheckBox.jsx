import React from 'react'
import PropTypes from 'prop-types';


const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {

      // 현재 누른 checkbox가 이미 누른 checkbox 인지 체크
      const currentIndex = checkedContinents.indexOf(continentId);

      const newChecked = [...checkedContinents];

      if (currentIndex === -1) {
          newChecked.push(continentId);
      } else {
          newChecked.splice(currentIndex, 1);
      }
      onFilters(newChecked);

  }
  return (
      <div className='p-2 mb-3 bg-gray-100 rounded-md'>
          {continents?.map(continent => (
              <div key={continent._id}>
                  <input
                      type='checkbox'
                      onChange={() => handleToggle(continent._id)}
                      checked={checkedContinents.indexOf(continent._id) === -1 ? false : true}  //있어야지 더 정확하다는데.. 잘 모르겠음
                  />{" "}
                  <label>{continent.name}</label>
              </div>
          ))}
      </div>
  )
}

CheckBox.propTypes = {
  continents: PropTypes.array.isRequired,
  checkedContinents: PropTypes.array.isRequired,
  onFilters: PropTypes.func.isRequired // onFilters prop의 유형을 함수로 설정
};

export default CheckBox