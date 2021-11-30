import { useState } from 'react';

function EditTeam() {
  const [team, setTeam] = useState([
    {
      id: 123,
      name: 'Hardik Agarwal ',
      role: 'SDE-1',
    },
    {
      id: 213,
      name: 'Suryashankar Das',
      role: 'SDE-1',
    },
  ]);

  return (
    <div>
      <div>
        {team.map((item, i) => {
          return (
            <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-200 border-solid rounded-lg '>
              <div>
                <p>
                  <h1 className='font-medium text-lg text-blue-700 inline'>
                    {item.name}
                  </h1>{' '}
                  is part of of your Oraganization as {item.role} from Date to
                  Date.
                </p>
              </div>
              <div>
                <button
                  className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default EditTeam;
