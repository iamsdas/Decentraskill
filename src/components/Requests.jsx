import { useState } from 'react';

function Requests() {
  const [req, setReq] = useState([
    {
      id: 123,
      name: 'Hardik Agarwal ',
      role: 'SDE-1',
    },
  ]);

  return (
    <div>
      <div>
        {req.map((item, i) => {
          return (
            <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-200 border-solid rounded-lg '>
              <div>
                <p>
                  <h1 className='font-medium text-lg text-blue-700 inline'>
                    {item.name}
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
