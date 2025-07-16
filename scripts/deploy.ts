import "@nomicfoundation/hardhat-ethers";
import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();
  await lottery.waitForDeployment();

  console.log("Lottery deployed to:", await lottery.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
