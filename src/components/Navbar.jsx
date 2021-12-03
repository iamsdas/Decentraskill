import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import DS_LOGO from '../assets/DS_LOGO.png';
import { useHistory } from 'react-router-dom';
import { StoreContext, login, connectToWallet, updateWallet } from '../utils';

function Navbar() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state, setState } = ctx;
  const connected = state.signedIn;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const BeforeNav = (
    <Disclosure as='nav' className='sticky top-0 bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-9xl mx-1'>
            <div className='relative flex items-center  h-16'>
              <div className='absolute top-0 right-0 justify-items-end pt-3 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center  p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-start sm:items-stretch sm:justify-start'>
                <button
                  onClick={() => {
                    history.push('/');
                  }}
                  className='hover:text-white block px-3 py-2 rounded-md text-base font-medium onhover:bg-gray-900 onhover: text-white'>
                  <div className='flex-shrink-0 flex  items-center'>
                    <img
                      className='block lg:hidden h-8 w-auto '
                      src={DS_LOGO}
                      alt='Decentraskill'
                    />
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src={DS_LOGO}
                      alt='Decentraskill'
                    />
                    <span className='font-Bebas text-white text-md rounded-md tracking-widest'>
                      Decentraskill
                    </span>
                  </div>
                </button>

                <div className='hidden sm:block mr-0 pt-3 absolute top-0 right-0 items-center justify-end'>
                  <div className='flex space-x-4'>
                    <button
                      className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium onhover:bg-gray-900 '
                      onClick={async () => {
                        setState({ ...state, loading: true });
                        if (state.connected) {
                          const email =
                            localStorage.getItem('email') ??
                            prompt('enter email address: ');
                          localStorage.setItem('email', email);
                          const success = await login(ctx, email);
                          if (success) alert('welcome back');
                        } else connectToWallet(ctx);
                        setState((state) => ({ ...state, loading: false }));
                      }}>
                      Login
                    </button>
                    <button
                      className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium onhover:bg-gray-900 '
                      onClick={() => {
                        history.push('/verify');
                      }}>
                      SignUp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Menu
                as='div'
                className='relative inline-block text-left onhover:bg-gray-700 '>
                <div>
                  <Menu.Button className='inline-flex justify-center w-full rounded-md  shadow-sm px-3 py-2 bg-gray-800 text-md font-medium text-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                    SignUp
                    <ChevronDownIcon
                      className='-mr-1 ml-2 h-5 w-5 mt-1.5'
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
                          <a
                            href='/company'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Company
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='/user'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            User
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  const AfterNav = (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-9xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <button
                  onClick={() => {
                    history.push('/');
                  }}
                  className='hover:text-white block px-3 py-2 rounded-md text-base font-medium onhover:bg-gray-900 onhover: text-white'>
                  <div className='flex-shrink-0 flex  items-center'>
                    <img
                      className='block lg:hidden h-8 w-auto '
                      src={DS_LOGO}
                      alt='Decentraskill'
                    />
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src={DS_LOGO}
                      alt='Decentraskill'
                    />
                    <span className='font-Bebas text-white text-md rounded-md tracking-widest'>
                      Decentraskill
                    </span>
                  </div>
                </button>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button
                  type='button'
                  className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
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
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                            <div>
                              <button
                                onClick={() => {
                                  setState({ ...state, signedIn: false });
                                }}
                                className='bg-gray-100 hover:bg-gray-200 w-full py-2 px-1'>
                                Sign out
                              </button>
                            </div>
                            <div>
                              <button
                                className='bg-gray-100 hover:bg-gray-200 w-full p-2'
                                onClick={async () => {
                                  history.push(
                                    `/${state.accountType}/${state.accountId}`
                                  );
                                }}>
                                {state.accountType.toLowerCase() === 'user'
                                  ? 'Profile'
                                  : 'Dashboard'}
                              </button>
                            </div>
                            <div>
                              <button
                                className='bg-gray-100 hover:bg-gray-200 w-full p-2'
                                onClick={() => {
                                  const newAddr = prompt(
                                    'enter wallet address'
                                  );
                                  updateWallet(ctx, newAddr);
                                }}>
                                change connected wallet
                              </button>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <a
                href='/'
                className='hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium onhover:bg-gray-900 onhover: text-white'>
                Home
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  return <>{connected ? AfterNav : BeforeNav}</>;
}

export default Navbar;
