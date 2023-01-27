/* eslint-disable no-undef */
const Decentraskill = artifacts.require('Decentraskill');

contract('Decentraskill', (accounts) => {
  let contract;
  before(async () => {
    contract = await Decentraskill.deployed();
  });

  it('Should support login', async () => {
    await contract.sign_up('abc@cd.com', 'User Name', 'user');
    const user_type = await contract.login('abc@cd.com');
    assert.equal(user_type, 'user');
  });
});
