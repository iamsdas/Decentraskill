import { useContext } from 'react';
import { StoreContext } from '../utils/store';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

const LandingPage = () => {
  const { state } = useContext(StoreContext);

  const signUp = async () => {
    try {
      await state.contract.methods
        .sign_up(state.email, 'name', 'user')
        .send({ from: state.account });
      alert('signed up');
    } catch (e) {
      console.error(e);
    }
  };

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

  const addCertificate = async (
    certUrl,
    issueDate,
    validTill,
    certName,
    issuer,
    linkedSkill
  ) => {
    try {
      await state.contract.methods.add_certification(
        state.accountId,
        certUrl,
        issueDate,
        validTill,
        certName,
        issuer,
        linkedSkill
      );
    } catch (e) {
      console.error(e);
    }
  };

  const addSkill = async (skillName) => {
    try {
      await state.contract.methods.add_skill(state.accountId, skillName);
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
      <Navbar login={() => {}} connected={0} />
      <Banner />
    </div>
  );
};

export default LandingPage;
