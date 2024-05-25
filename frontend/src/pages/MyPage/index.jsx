import React, { useState }  from 'react';

const MyPage = () => {
    const [name, setName] = useState('byeonwoojin00');
    const [nickname, setNickname] = useState('변우진');
    const [height, setHeight] = useState('178.5');
    const [weight, setWeight] = useState('73.5');
    const [muscle, setMuscle] = useState('34.2');
    const [fat, setFat] = useState('19.2');


    const [editingName, setEditingName] = useState(false);
    const [editingNickname, setEditingNickname] = useState(false);
    const [editingHeight, setEditingHeight] = useState(false);
    const [editingWeight, setEditingWeight] = useState(false);
    const [editingMuscle, setEditingMuscle] = useState(false);
    const [editingFat, setEditingFat] = useState(false);

    const handleNameChange = () => {
        setEditingName(!editingName); // 팝업 형태로 화면을 토글합니다.
    };

    const handleNicknameChange = () => {
        setEditingNickname(!editingNickname);
    };

    const handleHeightChange = () => {
        setEditingHeight(!editingHeight);
    };

    const handleWeightChange = () => {
        setEditingWeight(!editingWeight);
    };
    const handleMuscleChange = () => {
        setEditingMuscle(!editingMuscle);
    };    
    const handleFatChange = () => {
        setEditingFat(!editingFat);
    };
    // const saveNickname = (newNickname) => {
    //     setNickname(newNickname); // 새로운 닉네임으로 변경
    //     setEditingNickname(false); // 팝업 형태의 입력 폼 닫기
    // };

    return (
        <section className="bg-[#e2d7d2]">
            <div className="max-w-4xl mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">마이페이지</h2>
                <h3 className="text-xl font-bold mb-4">프로필 편집</h3>

                <div className="bg-[#F1EBE9] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src="images/FITLM.jpg"
                                alt=""
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    marginRight: '10px', // 이미지와 버튼 사이의 간격 조절
                                }}
                            />
                            <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }}>사진 변경</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className='mb-3'>{name}</p>
                                <p style={{ fontSize: '0.8rem', color: '#777', textAlign: 'right' }}>{nickname}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <button className="bg-[#B09C93] rounded-lg p-2 ml-3 mb-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleNameChange}>아이디 변경</button>
                                <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleNicknameChange}>닉네임 변경</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 팝업 형태의 이름 변경 입력 폼 */}
                {editingName && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">이름 변경</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleNameChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
                {editingNickname && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">닉네임 변경</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleNicknameChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}

            <h3 className="text-xl font-bold mt-6 mb-4">설정</h3>
                <div className="bg-[#F1EBE9] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-3">
                                    <p>{height} cm</p>
                                    {/* 버튼 기능들 추가해야됨 */}
                                    <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleHeightChange}>키</button>
                                </div>
                                <div className="flex justify-between">
                                    <p>{weight} kg</p>
                                    {/* 버튼 기능들 추가해야됨 */}
                                    <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleWeightChange}>몸무게</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-3">
                                    <p>{muscle} kg</p>
                                    {/* 버튼 기능들 추가해야됨 */}
                                    <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleMuscleChange}>골격근량</button>
                                </div>
                                <div className="flex justify-between">
                                    <p>{fat} %</p>
                                    {/* 버튼 기능들 추가해야됨 */}
                                    <button className="bg-[#B09C93] rounded-lg p-2 ml-3" style={{ fontSize: '0.5rem', minWidth: '85px', fontWeight: 'bold' }} onClick={handleFatChange}>체지방률</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {editingHeight && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">키</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleHeightChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
                    {editingWeight && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">몸무게</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleWeightChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
                {editingMuscle && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">골격근량</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={muscle}
                                onChange={(e) => setMuscle(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleMuscleChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
                {editingFat && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">골격근량</h3>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button className="bg-[#B09C93] text-white rounded-lg p-2" onClick={handleFatChange}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            

                </div>


        </section>
    );
}

export default MyPage;
