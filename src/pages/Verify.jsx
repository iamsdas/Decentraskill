import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { StoreContext, signUp, connectToWallet } from '../utils';

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state } = ctx;
  const emailRef = useRef('');
  const nameRef = useRef('');

  const [accType, setType] = useState('user');

  return (
    <div>
      <Navbar />
      <div className='w-3/12 m-auto p-5 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>
        <div className='mx-auto text-center '>
          <h2 className='p-1'>Kindly verify your email id</h2>
          <input
            placholder='Enter your LinkedIn mail id'
            type='text'
            ref={emailRef}
            className='border-2 border-solid border-black'
            required
          />
          <input
            placholder='Enter name'
            type='text'
            ref={nameRef}
            className='border-2 border-solid border-black'
            required
          />
          <br />
          <select name='' id=''>
            <option value='user'>user</option>
            <option value='user'>company</option>
          </select>
          <button
            onClick={async () => {
              if (state.connected) {
                if (emailRef.current !== '') {
                  const acc = accType ? 'user' : 'company';
                  if (await signUp(ctx, emailRef.current, nameRef.current, acc))
                    history.push('/');
                  else alert('signup error');
                } else {
                  alert('Something is wrong, Please Try Again!!');
                }
              } else {
                connectToWallet(ctx);
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
