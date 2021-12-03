import React from 'react';
import Web3 from 'web3';
import SmartContract from '../abis/Decentraskill.json';
import { AbiItem } from 'web3-utils';
import type { Contract } from 'web3-eth-contract';

export interface ICtx {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
}

export interface IState {
  web3: Web3 | null;
  contract: Contract | null;
  email: string;
  account: string;
  accountId: number | null;
  accountType: string;
  signedIn: boolean;
  connected: boolean;
  loading: boolean;
  skills: any[];
}

const RPC_URL =
  process.env.REACT_APP_PUBLIC_RPC_URL ??
  'https://rpc-endpoints.superfluid.dev/mumbai';

const NET_ID = 80001;

export const StoreContext = React.createContext<ICtx>({} as any);

const web3 = new Web3(RPC_URL);
const address = SmartContract.networks[NET_ID].address;
const contract = new web3.eth.Contract(SmartContract.abi as AbiItem[], address);

export const initialState: IState = {
  web3: web3,
  contract: contract,
  email: 'a@b.com',
  account: '',
  accountId: null,
  accountType: '',
  signedIn: false,
  connected: false,
  loading: false,
  skills: [],
};
