import React from 'react';

export const StoreContext = React.createContext(null);
export const initialState = {
  web3: null,
  contract: null,
  email: 'a@b.com',
  account: '',
  accountId: '',
  accountType: '',
  signedIn: false,
  loaded: false,
  skills: [],
};
