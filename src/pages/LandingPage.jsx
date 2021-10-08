import { useContext } from 'react';
import { Web3Context } from '../utils/web3';

const LandingPage = () => {
  const { state, setState } = useContext(Web3Context);

  const login = async () => {
    try {
      const accountType = await state.contract.methods.login(state.email).call({
        from: state.account,
      });
      console.log('account type:', accountType);
      setState({ ...state, signedIn: true });
    } catch (e) {
      console.error(e);
    }
  };

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
        skillName,
        `${date.getMonth()} ${date.getFullYear()}`,
        comment
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={login}>login</button>
      <button onClick={signUp}>sign up</button>
    </div>
  );
};

export default LandingPage;
