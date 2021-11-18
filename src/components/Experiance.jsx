import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../utils/store';

function Experiance() {
  /** @type {import('../utils/store').StateType} */
  const { state } = useContext(StoreContext);
  const [active, setActive] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStartDate, setNewStartDate] = useState();
  const [newEndDate, setNewEndDate] = useState();
  const [newRole, setNewRole] = useState('');
  const [newCompanyID, setNewCompanyID] = useState();
  const [newexp, setNewExp] = useState([
    {
      id: null,
      name: ' ',
      startDate: null,
      endDate: null,
      role: ' ',
      companyId: null,
    },
  ]);
  const [exps, setExps] = useState([
    {
      id: 1,
      name: 'Google',
      startDate: 1 - 2 - 2001,
      endDate: 2 - 2 - 2005,
      role: 'Software enginner',
      companyId: 1001,
    },
  ]);

  const requestCompany = async (startDate, endDate, role, companyId) => {
    try {
      await state.contract.methods.add_experience(
        state.accountId,
        startDate,
        endDate,
        role,
        companyId
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (state.loaded) {
      state.contract.methods
        .exp_of_user(state.accountId)
        .call()
        .then((skillIdx) => {
          skillIdx.forEach(async (id) => {
            const exp = await state.contract.experiences(id).call();
            setExps((exps) => ({ ...exps, exp }));
          });
        });
    }
  }, [state]);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return company(0);
      case 2:
        return company(1);
      case 3:
        return company(2);
      default:
        return <h1>No option selcted</h1>;
    }
  };

  const ExpAdded = () => {
    var flag = 0;
    for (var i = 0; i < exps.length; i++) {
      if (exps[i].name === newexp) {
        alert('Already a skill, Please add some different skill name');
        setNewExp(0);
        flag = 1;
      }
    }
    if (flag === 0) {
      setExps((prevexp) => [
        ...prevexp,
        {
          id: exps.length + 1,
          name: newName,
          startDate: newStartDate,
          endDate: newEndDate,
          role: newRole,
          companyId: 100,
        },
      ]);
      setNewExp('');
      setNewName('');
      setNewStartDate();
      setNewEndDate('');
      setNewRole('');
      setNewCompanyID();
      setShowModal(false);
    }
  };

  const company = (i) => {
    return (
      <div>
        <h1>{exps[i].name}</h1>
        <h2>
          Start Date: {exps[i].startDate}, End Date: {exps[i].endDate}
        </h2>

        <h2>{exps[i].role}</h2>
      </div>
    );
  };

  return (
    <div className='flex mx-auto p-0  h-full'>
      <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
        {exps.map((item, i) => {
          return (
            <div
              key={i}
              className={`m-2 p-2 text-l hover:bg-gray-300 hover:text-gray-800 w-full`}
              onClick={(i) => {
                setActive(item.id);
              }}>
              {item.name}
            </div>
          );
        })}
        <button
          className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={() => setShowModal(true)}>
          Add Experiance
        </button>
        {showModal ? (
          <div>
            {' '}
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                    <h3 className='text-3xl font-semibold text-black'>
                      Add New Work Experiance
                    </h3>
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
                    <form>
                      <label>Company Name:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newName}
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}></input>
                      <br />
                      <label>Start Date:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newStartDate}
                        onChange={(e) => {
                          setNewStartDate(e.target.value);
                        }}></input>

                      <label>End Date:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newEndDate}
                        onChange={(e) => {
                          setNewEndDate(e.target.value);
                        }}></input>
                      <br />
                      <label>Role:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newRole}
                        onChange={(e) => {
                          setNewRole(e.target.value);
                        }}></input>
                      <br />
                    </form>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={ExpAdded}>
                      Add
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
      </sidebar>
      <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
        {ActiveItem()}
      </main>
    </div>
  );
}
export default Experiance;
