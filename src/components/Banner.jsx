import { useContext, useRef } from 'react';
import { StoreContext } from '../utils/store';
import design from '../assets/design.png';
import { useHistory } from 'react-router-dom';

function Banner() {
  const { state } = useContext(StoreContext);
  const history = useHistory();
  const idRef = useRef('');
  return (
    <div className='font-Open text-center h-screen p-5 bg-design bg-center bg-cover bg-no-repeat mx-auto '>
      {/* <h1>{state.account || 'loading'}</h1> */}
      <div className='font-extrabold lg:text-7xl text-3xl p-2  text-gray-800'>
        Decentraskill
      </div>
      <div className='text-4xl p-2 text-gray-800 '>
        Your Verified Virtual Resume
      </div>
      <div className='p-8 w-1/2 mx-auto'>
        <div className='bg-white flex items-center   rounded-full shadow-xl'>
          <input
            className=' bg-white rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
            id='search'
            type='text'
            ref={idRef}
            placeholder='Search'
          />
          <button
            className='bg-gray-800 text-white rounded-full p-2 m-1 hover:bg-gray-700 focus:outline-none w-12 h-12 flex items-center justify-center'
            onClick={() => {
              history.push(`/user/${idRef.current}`);
            }}>
            <i className='material-icons'>search</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
