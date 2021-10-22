import { useContext, useEffect, useCallback } from 'react';
import { StoreContext } from '../utils/store';
import Web3 from 'web3';
import SmartContract from '../abis/Decentraskill.json';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

const LandingPage = () => {
  const { state, setState } = useContext(StoreContext);

  const signUp = useCallback(async () => {
    if (state.loaded) {
      try {
        await state.contract.methods
          .sign_up(state.email, 'name', 'user')
          .send({ from: state.account });
        alert('login to continue');
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('still loading');
    }
  }, [state]);

  const login = useCallback(async () => {
    const accountType = await state.contract.methods.login(state.email).call({
      from: state.account,
    });
    const accountId = await state.contract.methods
      .address_to_id(state.account)
      .call();
    setState({ ...state, accountType, accountId });
  }, [setState, state]);

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

  const initWeb3 = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const account = (await web3.eth.getAccounts())[0];
      const netId = await web3.eth.net.getId();
      const address = SmartContract.networks[netId].address;
      const contract = new web3.eth.Contract(SmartContract.abi, address);

      setState((state) => ({
        ...state,
        web3,
        account,
        contract,
        loaded: true,
      }));
    } else {
      alert('web3 not detected');
    }
  }, [setState]);

  useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  return (
    <div className='bg-white h-full'>
      <Navbar connected={0} login={login} signup={signUp} />
      <Banner />
    </div>
  );
};

export default LandingPage;
