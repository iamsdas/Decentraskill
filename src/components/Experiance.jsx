import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../utils/store';

function Experiance() {
  /** @type {import('../utils/store').StateType} */
  const { state } = useContext(StoreContext);
  const [exps, setExps] = useState([]);

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

  return (
    <div>
      <h1>Experience</h1>
      {exps.forEach((exp) => (
        <div>{exp}</div>
      ))}
    </div>
  );
}
export default Experiance;
