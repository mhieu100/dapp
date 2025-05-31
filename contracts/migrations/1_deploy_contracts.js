const VaccineAppointment = artifacts.require("VaccineAppointment");

module.exports = function(deployer) {
  deployer.deploy(VaccineAppointment);
}; 

// npx truffle migrate
// npx truffle compile