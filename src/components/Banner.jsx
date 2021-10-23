import { StoreContext } from '../utils/store';
import { useContext } from 'react';

function Banner() {
  const { state } = useContext(StoreContext);
  return (
    <div className='font-Open text-center h-full p-5 left-10 right-10 '>
      {/* <h1>{state.account || 'loading'}</h1> */}
      <div className='font-extrabold text-7xl p-1 md:text-4xl'>
        Decentraskill
      </div>
      <div className='text-4xl p-1'>Your Virtual Verified Resume</div>
      <div class='p-8'>
        <div class='bg-white flex items-center rounded-full shadow-xl'>
          <input
            class='rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
            id='search'
            type='text'
            placeholder='Search'
          />

          <div class='p-4'>
            <button class='bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none w-12 h-12 flex items-center justify-center'>
              <i class='material-icons'>search</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
