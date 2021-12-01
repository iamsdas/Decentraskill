import { ICtx } from './store';

export const connectToWallet = async (ctx: ICtx): Promise<void> => {
  const { state, setState } = ctx;
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const isUnlocked = await window.ethereum._metamask.isUnlocked();
      if (!isUnlocked) throw new Error('Wallet Locked!');
      state.web3?.setProvider(window.ethereum);
      const account = ((await state.web3?.eth.getAccounts()) ?? [''])[0];
      setState((state) => ({ ...state, account, connected: true }));
      const netId = await state.web3?.eth.net.getId();
      if (netId !== 80001) alert('wrong network');
    } catch (e) {
      console.error(e);
      alert('connection error');
    }
  } else alert('wallet not detected');
};

export const login = async (ctx: ICtx, email: string): Promise<boolean> => {
  const { state, setState } = ctx;
  console.log('logging in');
  const accountType = await state.contract?.methods.login(email).call({
    from: state.account,
  });
  try {
    const accountId = await state.contract?.methods
      .address_to_id(state.account)
      .call();
    setState({ ...state, accountType, accountId, email, signedIn: true });
    console.log('logged in with id:' + accountId);
    return true;
  } catch (e) {
    console.error(e);
    alert('account does not exist');
    return false;
  }
};

export const signUp = async (
  ctx: ICtx,
  email: string,
  name: string,
  account: string
): Promise<boolean> => {
  const { state } = ctx;
  console.log('requesting sign up');
  try {
    await state.contract?.methods
      .sign_up(email, name, account)
      .send({ from: state.account });
    alert('login to continue');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateWallet = async (
  ctx: ICtx,
  newAddress: string
): Promise<boolean> => {
  const { state } = ctx;
  try {
    await state.contract?.methods.update_wallet_address(
      state.email,
      newAddress
    );
    alert('address updated');
    return true;
  } catch (e) {
    console.error(e);
    alert('address update failed');
    return false;
  }
};
