import { useState, useContext, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../utils/store';

function Requests() {
  const { id } = useParams();
  const { state } = useContext(StoreContext);
  const [reqs, setReq] = useState([]);

  const getRequests = useCallback(async () => {
    const reqids = await state.contract.methods
      .requested_emp_of_company(id)
      .call();
    reqids.forEach(async (rid) => {
      if (!reqs.some(async (req) => req.id === parseInt(rid))) {
        const req = await state.contract.methods.experiences(rid).call();
        setReq([
          ...reqs,
          {
            id: parseInt(rid),
            // name: (await state.contract.methods.companies(rid).call()).name,
            role: req.role,
          },
        ]);
      }
    });
  }, [id, reqs, state.contract]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  return (
    <div>
      <div>
        {reqs.map((item, i) => {
          return (
            <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-200 border-solid rounded-lg '>
              <div>
                <p>
                  <h1 className='font-medium text-lg text-blue-700 inline'>
                    {/* {item.name} */}
                    Person
                  </h1>{' '}
                  has requested to join the team as {item.role} in your
                  Oragnization.
                </p>
              </div>
              <div>
                <button
                  className='bg-gray-800 text-white active:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'>
                  Accept
                </button>
                <button
                  className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'>
                  Deny
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Requests;
