import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../utils/store';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const { state, setState } = useContext(StoreContext);
  const { id } = useParams();
  const [name, setName] = useState('loading');
  const [role, setRole] = useState('Software Developer');
  const [numEmp, setNumEmp] = useState(0);
  const [location, setLocation] = useState('India');
  const history = useHistory();

  const [style, setStyle] = useState('');

  useEffect(() => {
    if (!state.connected) {
      setStyle('authenticated');
    }
    (async () => {
      try {
        let user;
        if (history.location.pathname.includes('company')) {
          user = await state.contract.methods.companies(id).call();
          let res = 0;
          res += (await state.contract.methods.curr_emp_of_company(id).call())
            .length;
          res += (await state.contract.methods.prev_emp_of_company(id).call())
            .length;
          setNumEmp(res);
        } else user = await state.contract.methods.employees(id).call();
        setName(user.name);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id, state.contract, history.location, setState]);

  return (
    <div className='flex flex-row h-full w-full p-3 items-center justify-items-stretch text-gray-600'>
      <div className='w-4/6 h-full'>
        <h1 className='text-2xl text-black'>{name}</h1>
        <div className='text-3xl'>
          {history.location.pathname.includes('user') && role}
        </div>
        <div>
          <h1>{location}</h1>
        </div>
        {history.location.pathname.includes('company') && (
          <div className='pt-5 text-lg'>{numEmp} Employees</div>
        )}
      </div>
      <div className='w-2/6 h-full flex flex-row justify-end'>
        <div className='border-black w-36 h-36 border-solid rounded-full bg-gray-500'>
          <div className='text-7xl text-center p-6'>
            <i className='fas fa-user'></i>
          </div>
        </div>
        <div className={style}>
          <button
            className={
              'bg-red-800 inline text-white active:bg-red-800 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            }
            type='button'
            onClick={() => setShowModal(true)}>
            <i class='fas fa-edit'></i>
          </button>
        </div>
      </div>

      {showModal ? (
        <div>
          {' '}
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h4 className='text-3xl font-semibold text-black text-center'>
                    Profile
                  </h4>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto my-4 text-black text-lg leading-relaxed'>
                  <form className='mx-auto'>
                    <label className='px-1'>Role:</label>
                    <input
                      className='border-solid border-black px-2'
                      type='text'
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}></input>
                    <br />
                    <label className='px-1'>Location:</label>

                    <input
                      className='border-solid border-black px-2'
                      type='text'
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}></input>
                  </form>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button
                    className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => {
                      setShowModal(false);
                    }}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
