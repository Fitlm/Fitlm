import React, { useState } from 'react';
import { logoutUser } from '../../store/thunkFunctions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [name, setName] = useState('Fitlm');
    const [nickname, setNickname] = useState('핏-름');
    const [height, setHeight] = useState('178.5');
    const [weight, setWeight] = useState('73.5');
    const [muscle, setMuscle] = useState('34.2');
    const [fat, setFat] = useState('19.2');
    const [inputBoxColor] = useState('#FCF5F3');

    

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

    return (
        <div className='h-full w-full flex flex-col items-center justify-center'>
        <section className="h-4/5 w-4/5 bg-light-color rounded-lg">
            <div className="max-w-6xl mx-auto p-10">
                <div className="flex justify-center items-center p-6">
                    <div className="flex items-center relative" style={{width:'800px'}}>
                        <img
                            src="images/FITLM.jpg"
                            alt=""
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                marginRight: '20px',
                                cursor : 'pointer',
                            }}
                        />
                        <div className="flex flex-col justify-center" style={{ flex: 1 }}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-1 text-xl font-bold"
                                    style={{ backgroundColor: 'transparent', color: '#B09C93', border: 'none', height: '2rem' }}
                                />
                            ) : (
                                <p className='mb-1 text-xl font-bold text-[#401C0C]'>{name}</p>
                            )}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="text-sm"
                                    style={{ backgroundColor: 'transparent', color: '#B09C93', border: 'none', height: '1.5rem' }}
                                />
                            ) : (
                                <p className='text-sm text-[#401C0C] pt-1'>{nickname}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <div className="w-[48%] border-2 border-[#E2D7D2] rounded-2xl overflow-hidden">
                        <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
                            <p className="text-[#401C0C] font-bold w-1/4">키</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    style={{ backgroundColor: inputBoxColor, color: '#B09C93', border: 'none' }}
                                />
                            ) : (
                                <p>{height}cm</p>
                            )}
                        </div>
                    </div>

                    <div className="w-[48%] border-2 border-[#E2D7D2] rounded-2xl overflow-hidden">
                        <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
                            <p className="text-[#401C0C] font-bold w-1/4">몸무게</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    style={{ backgroundColor: inputBoxColor, color: '#B09C93', border: 'none' }}
                                />
                            ) : (
                                <p>{weight}kg</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <div className="w-[48%] border-2 border-[#E2D7D2] rounded-2xl overflow-hidden">
                        <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
                            <p className="text-[#401C0C] font-bold w-1/4">골격근량</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={muscle}
                                    onChange={(e) => setMuscle(e.target.value)}
                                    style={{ backgroundColor: inputBoxColor, color: '#B09C93', border: 'none' }}
                                />
                            ) : (
                                <p>{muscle}kg</p>
                            )}
                        </div>
                    </div>
                    <div className="w-[48%] border-2 border-[#E2D7D2] rounded-2xl overflow-hidden">
                        <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
                            <p className="text-[#401C0C] font-bold w-1/4">체지방률</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={fat}
                                    onChange={(e) => setFat(e.target.value)}
                                    style={{ backgroundColor: inputBoxColor, color: '#B09C93', border: 'none' }}
                                />
                            ) : (
                                <p>{fat}%</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <button className="px-6 py-2 bg-[#E2D7D2] text-[#401C0C] rounded-3xl" style={{width:'100px'}} onClick={handleEdit}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </section>
        <button
        className="w-full block text-dark-color hover:text-white underline hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
      </div>
    );
};

export default MyPage;
