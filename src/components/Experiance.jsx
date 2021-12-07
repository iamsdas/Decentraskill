import { useContext, useEffect, useState, useCallback } from 'react';
import { StoreContext } from '../utils/store';
import { useParams } from 'react-router';

function Experiance() {
  const { state, setState } = useContext(StoreContext);
  const [active, setActive] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompanyID, setNewCompanyID] = useState('');
  const { id } = useParams();
  const [style, setStyle] = useState('');

  const [exps, setExps] = useState([]);

  const getExps = useCallback(async () => {
    const expids = await state.contract.methods.exp_of_user(id).call();
    expids.forEach(async (eid) => {
      if (!exps.some(async (exp) => exp.id === parseInt(eid))) {
        const exp = await state.contract.methods.experiences(eid).call();
        setExps([
          ...exps,
          {
            id: parseInt(eid),
            name: (await state.contract.methods.companies(eid).call()).name,
            current: exp.current,
            startDate: exp.starting_date,
            endDate: exp.ending_date,
            role: exp.role,
            approved: exp.is_approved,
          },
        ]);
      }
    });
  }, [id, exps, state.contract]);

  const addExp = useCallback(async () => {
    setState((state) => ({ ...state, loading: true }));
    if (exps.some((exp) => exp.company_id === newCompanyID))
      alert('already exists');
    else {
      try {
        await state.contract.methods
          .add_experience(
            state.accountId,
            newStartDate,
            newEndDate,
            newRole,
            newCompanyID
          )
          .send({ from: state.account });
        setNewStartDate('');
        setNewEndDate('');
        setNewRole('');
        setNewCompanyID('');
        setShowModal(false);
        getExps();
      } catch (e) {
        console.error(e);
      }
    }
    setState((state) => ({ ...state, loading: true }));
  }, [
    state.contract,
    state.account,
    state.accountId,
    exps,
    getExps,
    newCompanyID,
    newRole,
    newEndDate,
    newStartDate,
    setState,
  ]);

  useEffect(() => {
    if (!state.connected) {
      setStyle('authenticated');
    }
    getExps();
  }, [getExps]);

  const ActiveItem = () => {
    switch (active) {
      case -1:
        return <h1>No option selcted</h1>;
      default:
        return company(active);
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
        <div className={style}>
          <button
            className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => setShowModal(true)}>
            Add Experiance
          </button>
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
                      <label>Company id:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newCompanyID}
                        onChange={(e) => {
                          setNewCompanyID(e.target.value);
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
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={addExp}>
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
