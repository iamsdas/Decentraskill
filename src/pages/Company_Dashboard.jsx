import { useState, lazy, useEffect, useContext } from 'react';
import { StoreContext } from '../utils/store';
import Requests from '../components/Requests';
import EditTeam from '../components/EditTeam';
import '../styles/App.css';

const Profile = lazy(() => import('../components/Profile'));

function Company_Dashboard() {
  const items = [
    { id: 1, name: 'Requests' },
    { id: 2, name: 'Team' },
  ];
  const { state, setState } = useContext(StoreContext);
  const [style, setStyle] = useState('');

  const [active, setActive] = useState(2);

  useEffect(() => {
    if (!state.connected) {
      setStyle('authenticated');
    }
  }, [state.contract, setState]);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return (
          <div className={style}>
            <Requests />
          </div>
        );
      case 2:
        return <EditTeam />;
      default:
        return <h1>No option selcted</h1>;
    }
  };

  return (
    <div className='h-screen'>
      <header className='bg-white shadow'>
        <div className='max-w-9xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {items.find((item) => item.id === active).name}
          </h1>
        </div>
      </header>

      <div className='flex mx-auto py-6 sm:px-6 lg:px-8 h-4/5'>
        <sidebar className=' w-1/4 bg-gray-800 mx-auto sm:px-6 lg:px-8  float-left text-gray-300'>
          {state.connected ? (
            <>
              {items.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`m-2 p-2 text-xl hover:bg-gray-300 hover:text-gray-800 w-full`}
                    onClick={(i) => {
                      setActive(item.id);
                    }}>
                    {item.name}
                  </div>
                );
              })}
            </>
          ) : (
            <div
              className={`m-2 p-2 text-xl hover:bg-gray-300 hover:text-gray-800 w-full`}>
              Team
            </div>
          )}
        </sidebar>
        <main className='w-3/4 lg:px-8 sm:px-6 mx-auto inline-block float-right h-full '>
          <div className='border-4 border-solid border-gray-200 rounded-lg h-2/6 mx-5 mt-0 mb-1'>
            <Profile />
          </div>
          <div className='border-4 border-solid border-gray-200 rounded-lg h-4/6 mx-5 mt-2'>
            {ActiveItem()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Company_Dashboard;
