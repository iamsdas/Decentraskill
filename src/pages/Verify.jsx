import { useRef, useState, useContext, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { StoreContext, signUp, connectToWallet } from '../utils';

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state } = ctx;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accType, setType] = useState('user');

  return (
    <div>
      <div className='flex h-screen flex-col justify-center items-center -mt-16'>
        <div className='w-3/12  p-5 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>
          <div className='mx-auto text-center '>
            <h2 className='p-1 text-lg'>Kindly verify your details</h2>
            <form
              className='p-1 '
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <label className='px-1 py-1 my-1'>Enter your mail id:</label>
              <input
                placholder='Enter your LinkedIn mail id'
                type='text'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className='border-2 border-solid border-black my-1'
                required
              />
              <br />
              <label className='px-2 py-1'>Enter your name:</label>
              <input
                placholder='Enter name'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className='border-2 border-solid border-black my-1'
                required
              />
              <br />
              <br />
              <select
                className='p-2 bg-white border-2 border-black rounded-sm'
                value={accType}
                onChange={(e) => {
                  setType(e.target.value);
                }}>
                <option value='user' className='p-2'>
                  user
                </option>
                <option value='company' className='p-2'>
                  company
                </option>
              </select>
              <button
                onClick={async () => {
                  if (state.connected) {
                    console.log(email, name, accType);
                    if (await signUp(ctx, email, name, accType))
                      history.push('/');
                    else alert('signup error');
                  } else {
                    connectToWallet(ctx);
                  }
                }}
                className='bg-gray-900 mx-auto text-white rounded-lg hover:text-white-300 block px-4 py-2 m-2 text-sm'>
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Verify;
