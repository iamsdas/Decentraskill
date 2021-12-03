import { useRef, useState, useContext, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { StoreContext, signUp, connectToWallet } from '../utils';

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state, setState } = ctx;
  const emailRef = useRef('');
  const nameRef = useRef('');

  const [option, setOption] = useState('Company');

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const [accType, setType] = useState('company');

  return (
    <div>
      <div className='flex h-screen flex-col justify-center items-center -mt-16'>
        <div className='w-3/12  p-5 border-2 drop-shadow-sm border-solid border-gray-100 rounded-3xl '>
          <div className='mx-auto text-center '>
            <h2 className='p-1 text-lg'>Kindly verify your details</h2>
            <form classname='p-1 '>
              <label className='px-1 py-1 my-1'>Enter your mail id:</label>
              <input
                placholder='Enter your LinkedIn mail id'
                type='text'
                ref={emailRef}
                className='border-2 border-solid border-black my-1'
                required
              />
              <br />
              <label className='px-2 py-1'>Enter your name:</label>
              <input
                placholder='Enter name'
                type='text'
                ref={nameRef}
                className='border-2 border-solid border-black my-1'
                required
              />
              <br />
              <br />
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                    {accType}
                    <ChevronDownIcon
                      className='-mr-1 ml-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setType('User');
                            }}
                            className='w-full text-left'>
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm w-full'
                              )}>
                              User
                            </a>
                          </button>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type='submit'
                            onClick={() => {
                              setType('Company');
                            }}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block w-full text-left px-4 py-2 text-sm'
                            )}>
                            Company
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                onClick={async () => {
                  setState({ ...state, loading: true });
                  if (state.connected) {
                    if (emailRef.current !== '') {
                      if (
                        await signUp(
                          ctx,
                          emailRef.current.value,
                          nameRef.current.value,
                          accType
                        )
                      )
                        history.push('/');
                      else alert('signup error');
                    } else {
                      alert('Something is wrong, Please Try Again!!');
                    }
                  } else {
                    connectToWallet(ctx);
                  }
                  setState((state) => ({ ...state, loading: false }));
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
