import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router';
import { StoreContext } from '../utils';
import ReCAPTCHA from 'react-google-recaptcha';
import Comment from './Comment';

function Skills() {
  const [showModal, setShowModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [newSkill, setNewSkill] = useState();
  const [verified, setVerified] = useState(false);
  const { id } = useParams();
  const { state } = useContext(StoreContext);
  const [active, setActive] = useState(-1);
  const [skills, setSkills] = useState([]);
  const [style, setStyle] = useState('');

  const getSkills = useCallback(async () => {
    const skillids = await state.contract.methods.skills_of_user(id).call();
    const promises = [];
    skillids.forEach(async (skid) => {
      if (!skills.some((skill) => skill.id === parseInt(skid)))
        promises.push(state.contract.methods.skills(skid).call());
    });
    if (promises.length > 0) {
      const newSkills = (await Promise.all(promises)).map((skill) => ({
        id: parseInt(skill.id),
        name: skill.name,
        verified: skill.verified,
      }));
      setSkills((skills) => [...skills, ...newSkills]);
    }
  }, [id, skills, state.contract]);

  const addSkill = useCallback(async () => {
    if (skills.some((skill) => skill.name === newSkill.name))
      alert('Already a skill, Please add some different skill name');
    else {
      setNewSkill('');
      setShowModal(false);
      try {
        await state.contract.methods
          .add_skill(state.accountId, newSkill)
          .send({ from: state.account });
        getSkills();
      } catch (e) {
        console.error(e);
      }
    }
  }, [state, skills, newSkill, getSkills]);

  useEffect(() => {
    if (!state.connected) {
      setStyle('authenticated');
    }
    getSkills();
  }, [getSkills]);

  const ActiveItem = useCallback(() => {
    switch (active) {
      case -1:
        return <h1>No option selcted</h1>;
      default:
        return <Comment skid={active} />;
    }
  }, [active]);

  function check(value) {
    console.log('Captcha value: ' + value);
    setVerified(true);
  }

  function deleteSkill() {
    if (verified) {
      // var temp = skills;
      // const filteredSkills = temp.filter((skill) => skill.id !== active - 1);
      // console.log(filteredSkills);
      setCheckModal(false);
      setVerified(false);
    } else {
      alert('Please check the captcha');
    }
  }

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
                            <ReCAPTCHA
                              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                              onChange={check}
                            />
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
                            type='button'
                            onClick={deleteSkill}>
                            Yes
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
        <div className={style}>
          <button
            className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm mx-6 px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => setShowModal(true)}>
            Add Skill
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
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={addSkill}>
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
