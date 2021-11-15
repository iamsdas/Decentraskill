import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../utils/store';
import Comment from './comment.jsx';

function Skills() {
  const [showModal, setShowModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [newSkill, setNewSkill] = useState();

  /** @type {import('../utils/store').StateType} */
  const { state } = useContext(StoreContext);
  const [active, setActive] = useState(1);
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'Skill 1',
      review: [{ username: 'dfgt', comment: 'sedrty' }],
    },
    { id: 2, name: 'Skill 2', review: [{ username: 'asdf', comment: 'grew' }] },
    {
      id: 3,
      name: 'Skill 3',
      review: [{ username: 'sdfgh', comment: 'sdfgh' }],
    },
  ]);

  const addSkill = async (skillName) => {
    try {
      await state.contract.methods.add_skill(state.accountId, skillName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (state.loaded) {
      state.contract.methods
        .skills_of_user(state.accountId)
        .call()
        .then((skillIdx) => {
          skillIdx.forEach(async (id) => {
            const skill = await state.contract.skills(id).call();
            setSkills((skls) => ({ ...skls, skill }));
          });
        });
    }
  }, [state]);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return <Comment skills={skills[0]} />;
      case 2:
        return <Comment skills={skills[1]} />;
      case 3:
        return <Comment skills={skills[2]} />;
      default:
        return <h1>No option selcted</h1>;
    }
  };

  const skillAdded = () => {
    var flag = 0;
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].name === newSkill) {
        alert('Already a skill, Please add some different skill name');
        setNewSkill('');
        flag = 1;
      }
    }
    if (flag === 0) {
      setSkills((prevskills) => [
        ...prevskills,
        { id: skills.length + 1, name: newSkill },
      ]);
      setNewSkill('');
      setShowModal(false);
    }
  };

  return (
    <div className='flex mx-auto p-0  h-full'>
      <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
        {skills.map((item, i) => {
          return (
            <div
              key={i}
              className={`m-2 p-2 flex flex-row text-l justify-around hover:bg-gray-300 hover:text-gray-800 w-full`}
              onClick={(i) => {
                setActive(item.id);
              }}>
              {item.name}
              {item.id === active ? (
                <button
                  className=' text-l hover:bg-gray-400'
                  onClick={() => {
                    setCheckModal(true);
                  }}>
                  ×
                </button>
              ) : (
                <div></div>
              )}
              {checkModal ? (
                <div>
                  {' '}
                  <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                      {/*content*/}
                      <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/*header*/}
                        <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                          <h5 className='text-3xl font-semibold text-black'>
                            Are u sure, you wanna delete{' '}
                            {skills[active - 1].name}?
                          </h5>
                          <button
                            className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                            onClick={() => setShowModal(false)}>
                            <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className='relative p-6 flex-auto'>
                          <p className='my-4 text-black text-lg leading-relaxed'>
                            <h1>Capcha</h1>
                          </p>
                        </div>
                        {/*footer*/}
                        <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                          <button
                            className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={() => setCheckModal(false)}>
                            Close
                          </button>
                          <button
                            className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            type='button'>
                            Check
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
        })}

        <button
          className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm mx-6 px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={() => setShowModal(true)}>
          Add Skill
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
                      Add New Skill
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
                  <div className='relative p-6 flex-auto'>
                    <p className='my-4 text-black text-lg leading-relaxed'>
                      <h1>Name Skill</h1>
                      <label>Enter Skill:</label>
                      <input
                        placeholder='Eg:JavaScript'
                        className='border-solid border-black px-2'
                        value={newSkill}
                        onChange={(e) => {
                          setNewSkill(e.target.value);
                        }}></input>
                    </p>
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
                      onClick={skillAdded}>
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

export default Skills;
