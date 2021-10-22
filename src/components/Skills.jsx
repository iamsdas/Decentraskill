import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../utils/store';
function Skills() {
  const { state } = useContext(StoreContext);
  const [active, setActive] = useState(1);
  const [skills, setSkills] = useState([]);

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
        return <h1>Certificate 1</h1>;
      case 2:
        return <h1>Certificate 2</h1>;
      case 3:
        return <h1>Certificate 3</h1>;
      default:
        return <h1>No option selcted</h1>;
    }
  };

  return (
    <div className='flex mx-auto p-0  h-full'>
      <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
        {skills.map((item, i) => {
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
      </sidebar>
      <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
        {ActiveItem()}
      </main>
    </div>
  );
}

export default Skills;
