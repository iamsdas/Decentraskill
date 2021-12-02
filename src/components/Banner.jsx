import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function Banner() {
  const history = useHistory();
  const idRef = useRef('');

  const [option, setOption] = useState('company');

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

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

          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                {option}
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
                          setOption('user');
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
                          setOption('company');
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
            className='bg-gray-800 text-white rounded-full p-2 mx-1 hover:bg-gray-700 focus:outline-none w-10 h-10 flex items-center justify-center'
            onClick={() => {
              history.push(`/${option}/${idRef.current.value}`);
            }}>
            <i className='material-icons'>search</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
