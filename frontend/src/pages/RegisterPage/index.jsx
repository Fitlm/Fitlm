import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/thunkFunctions';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  const onSubmit = ({ email, password, name, nickname, height, weight, muscleMass, bodyFatPercentage }) => {
    const body = {
      email,
      password,
      name,
      nickname,
      profile: {
        height,
        weight,
        muscleMass,
        bodyFatPercentage
      }
    };

    dispatch(registerUser(body));
    reset();
  };

  const validationRules = {
    email: { required: "필수 필드입니다." },
    name: { required: "필수 필드입니다." },
    password: { required: '필수 필드입니다.', minLength: { value: 6, message: "최소 6자입니다." } },
    nickname: { required: '필수 필드입니다.', pattern: { value: /^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/, message: "영어와 특수기호만 입력하세요." } },
    height: { required: '필수 필드입니다.', pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "cm 기준입니다." } },
    weight: { required: '필수 필드입니다.', pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "kg 기준입니다." } },
    muscleMass: { required: '필수 필드입니다.', pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "kg 기준입니다." } },
    bodyFatPercentage: { required: '필수 필드입니다.', pattern: { value: /^(0|[1-9][0-9]{0,2})$/, message: "% 기준입니다." } }
  };

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>회원가입</h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label htmlFor='email' className='text-sm font-semibold text-gray-800'>Email</label>
            <input type='email' id="email" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('email', validationRules.email)} />
            {errors?.email && <div><span className='text-red-500'>{errors.email.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='name' className='text-sm font-semibold text-gray-800'>Name</label>
            <input type='text' id="name" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('name', validationRules.name)} />
            {errors?.name && <div><span className='text-red-500'>{errors.name.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='text-sm font-semibold text-gray-800'>Password</label>
            <input type='password' id="password" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('password', validationRules.password)} />
            {errors?.password && <div><span className='text-red-500'>{errors.password.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='nickname' className='text-sm font-semibold text-gray-800'>Nickname</label>
            <input type='text' id="nickname" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('nickname', validationRules.nickname)} />
            {errors?.nickname && <div><span className='text-red-500'>{errors.nickname.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='height' className='text-sm font-semibold text-gray-800'>Height (cm)</label>
            <input type='text' id="height" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('height', validationRules.height)} />
            {errors?.height && <div><span className='text-red-500'>{errors.height.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='weight' className='text-sm font-semibold text-gray-800'>Weight (kg)</label>
            <input type='text' id="weight" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('weight', validationRules.weight)} />
            {errors?.weight && <div><span className='text-red-500'>{errors.weight.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='muscleMass' className='text-sm font-semibold text-gray-800'>Muscle Mass (kg)</label>
            <input type='text' id="muscleMass" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('muscleMass', validationRules.muscleMass)} />
            {errors?.muscleMass && <div><span className='text-red-500'>{errors.muscleMass.message}</span></div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='bodyFatPercentage' className='text-sm font-semibold text-gray-800'>Body Fat Percentage (%)</label>
            <input type='text' id="bodyFatPercentage" className='w-full px-4 py-2 mt-2 bg-white border rounded-md' {...register('bodyFatPercentage', validationRules.bodyFatPercentage)} />
            {errors?.bodyFatPercentage && <div><span className='text-red-500'>{errors.bodyFatPercentage.message}</span></div>}
          </div>
          <div className='mt-6'>
            <button type='submit' className='w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700'>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
