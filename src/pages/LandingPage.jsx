import { useContext } from 'react';
import { StoreContext } from '../utils/store';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const LandingPage = () => {
  const ctx = useContext(StoreContext);
  const { state } = ctx;

  const approveEmployee = async (experienceId, companyId) => {
    try {
      await state.contract.methods.approve_experience(experienceId, companyId);
    } catch (e) {
      console.error(e);
    }
  };

  const approveManager = async (empId) => {
    try {
      await state.contract.methods.approve_manager(empId);
    } catch (e) {
      console.error(e);
    }
  };

  const endorseSkill = async (empId, skillId, comment) => {
    const date = new Date();
    try {
      await state.contract.methods.endorse_skill(
        empId,
        skillId,
        `${date.getMonth()} ${date.getFullYear()}`,
        comment
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='bg-white h-full'>
      <Banner />
      <Footer />
    </div>
  );
};

export default LandingPage;
