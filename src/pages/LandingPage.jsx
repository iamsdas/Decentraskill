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
  return (
    <div>
      <button onClick={login}>login</button>
      <button onClick={signUp}>sign up</button>
    </div>
  );
};

export default LandingPage;
