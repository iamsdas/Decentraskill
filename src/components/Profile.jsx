import { useState } from 'react';

function Profile() {
  const [name, setName] = useState('Hardik Agarwal');
  const [role, setRole] = useState('Software Developer');
  const [location, setLocation] = useState('India');

  return (
    <div className='flex flex-row h-full w-full p-3 items-center justify-between text-gray-600'>
      <div className='w-4/6 h-full'>
        <h1 className='text-xl text-black'>{name}</h1>
        <div className='text-3xl '>{role}</div>
        <div>
          <h1>{location}</h1>
        </div>
      </div>
      <div className='w-2/6 h-full'>
        <div className='border-black w-36 h-36 border-solid rounded-full bg-gray-500'>
          <div className='text-7xl text-center p-6'>
            <i class='fas fa-user'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
