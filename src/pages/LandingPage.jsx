import { useContext } from 'react';
import { StoreContext } from '../utils/store';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const LandingPage = () => {
  const ctx = useContext(StoreContext);
  const { state, setState } = ctx;

  const approveEmployee = async (experienceId, companyId) => {
    try {
      await state.contract.methods.approve_experience(experienceId, companyId);
    } catch (e) {
      console.error(e);
    }
  };

  const updateWallet = async (newAddress) => {
    try {
      await state.contract.methods.update_wallet_address(
        state.email,
        newAddress
      );
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
      <Navbar connected={0} />
      <Banner />
      <Footer />
    </div>
  );
};

export default LandingPage;
