import React from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

/**
 * @typedef {object} ContextType
 * @property {StateType} state
 * @property {React.Dispatch<React.SetStateAction<StateType>>} setState
 */

export const StoreContext = React.createContext(null);

/**
 * @typedef {object} StateType
 * @property {Web3} web3
 * @property {Contract} contract
 * @property {string} account
 * @property {string} accountId
 * @property {boolean} signedIn
 * @property {boolean} loaded
 */

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
