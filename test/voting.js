const Voting = artifacts.require("./Voting.sol");
const { expect } = require('chai');
const truffleAssert = require('truffle-assertions');

contract("Voting", accounts => {
  it("...should register accounts[1].", async () => {
    const VotingInstance = await Voting.deployed();

    // Register accounts[1]
    let tx = await VotingInstance.registerVoters(accounts[1], { from: accounts[0] });

    // Get stored value
    const registeredVoter = await VotingInstance.getVoter(accounts[1], { from: accounts[0] });

    assert.equal(registeredVoter.isRegistered, true, "accounts[1] was not registered.");
    
    // VoterAdded event should be emitted
    truffleAssert.eventEmitted(tx, 'VoterAdded', (evt) => {
      return evt.voter === accounts[1];
    });

    // there should be no WorkflowStatusChange event
    truffleAssert.eventNotEmitted(tx, 'WorkflowStatusChange');

  });

  it("...should NOT register twice accounts[1].", async () => {
    const VotingInstance = await Voting.deployed();

  // try to register account[1] twice
    await truffleAssert.reverts(VotingInstance.registerVoters(accounts[1], { from: accounts[0] }), "The address is already registered!");
  });

  it("...should NOT be possible to start Proposals Registration without a minimum of 3 registered accounts", async () => {
    const VotingInstance = await Voting.deployed();

    // try to start proposals registration
    await truffleAssert.reverts(VotingInstance.startProposalsRegistration({ from: accounts[0] }), "You should register some voters first (at least 3)");
  });

  it("...should be possible to start Proposals Registration with 3 registered accounts", async () => {
    const VotingInstance = await Voting.deployed();

    // Register accounts[2]
    await VotingInstance.registerVoters(accounts[2], { from: accounts[0] });
    // Register accounts[3]
    await VotingInstance.registerVoters(accounts[3], { from: accounts[0] });
    
    // Start Proposals Registration
    await VotingInstance.startProposalsRegistration({ from: accounts[0] })

    // get current workflow status   
    const workflowStatus = await VotingInstance.getCurrentWorkflowStatus({ from: accounts[0] });
    assert.equal(workflowStatus.toString(), Voting.WorkflowStatus.ProposalsRegistrationStarted.toString(), "Wrong current workflow status");
  });
});
