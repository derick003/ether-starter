import { ethers } from "ethers"
import 'dotenv/config';

export function getProvider(network) {
    let chainRpc = "";
    if (network == "mainnet") {
		chainRpc = process.env.MAINNET_NETWORK;
	} else if (network == "holesky") {
        chainRpc = process.env.HOLESKY_NETWORK;
    } else if (network == "sepolia") {
        chainRpc = process.env.SEPOLIA_NETWORK;
    } else {
		chainRpc = process.env.GOERLI_NETWORK;
	}
	return new ethers.JsonRpcProvider(chainRpc);
}

export function getSigner(network) {
	const provider = getProvider(network);
	const signer = new ethers.Wallet(process.env.PRIVATEKEY, provider);
	return signer;
}

export async function getFeeData(network) {
    const provider = getProvider(network);
    const feeData = await provider.getFeeData();
    const baseFee = feeData.gasPrice - feeData.maxPriorityFeePerGas;
    const maxFeePerGas = baseFee * 160n / 100n + feeData.maxPriorityFeePerGas;
    return new ethers.FeeData(feeData.gasPrice, maxFeePerGas, feeData.maxPriorityFeePerGas);
}

export async function executeTx(network, contractAddress, abi, methodName, value, signer, ...args) {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let tempArgs = [...args];
    tempArgs.push({
        value: ethers.parseEther(value)
    });
    const estimatedGas = await contract[methodName].estimateGas(...tempArgs);
    const feeData = await getFeeData(network);
    const provider = getProvider(network);
    const costLimit = {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        value: ethers.parseEther(value),
        gasLimit: estimatedGas * 110n / 100n
    };
    args.push(costLimit);
    console.log(`---------execute ${methodName}`);
    const tx = await contract[methodName](...args);
    await provider.waitForTransaction(tx.hash);
    console.log(`---------execute ${methodName}:`, tx.hash);
}

export async function cancelTransaction(network, signer) {
   const provider = getProvider(network);
   const nonce = await provider.getTransactionCount(signer.address);
   const feeData = await getFeeData(network);
   const tx = await signer.sendTransaction({
        to: signer.address,
        maxFeePerGas: feeData.maxFeePerGas * 2n,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas * 2n,
        nonce: nonce,
        gasLimit: 21000
    });
    await signer.provider.waitForTransaction(tx.hash);
    console.log("canceled");
}