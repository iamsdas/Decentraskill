import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Verify() {
  let history = useHistory();
  let location = useLocation();
  var link = location.state.link;

  const [email, setEmail] = useState('');

  return (
    <div>
      <Navbar />
      <div className='w-3/12 m-auto p-5 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>
        <div className='mx-auto text-center '>
          <h2 className='p-1'>Kindly verify your linkedin id</h2>
          <input
            placholder='Enter your LinkedIn mail id'
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='border-2 border-solid border-black'
            required
          />
          <button
            onClick={() => {
              if (link === 1 && email !== '') {
                history.push('/company');
              } else if (link === 2 && email !== '') {
                history.push('/user');
              } else {
                alert('Something is wrong, Please Try Again!!');
                history.push('/');
              }
            }}
            className='bg-gray-900 mx-auto text-white rounded-lg hover:text-white-300 block px-4 py-2 m-2 text-sm'>
            Verify
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Verify;
