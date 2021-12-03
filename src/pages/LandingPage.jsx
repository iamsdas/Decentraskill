import { useContext } from 'react';
import { StoreContext } from '../utils/store';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const LandingPage = () => {
  const ctx = useContext(StoreContext);
  const { state } = ctx;

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
