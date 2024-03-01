import { ethers } from "ethers"
import {getProvider, getFeeData, executeTx} from "../common/common.js"
import {readJson} from "../common/utils.js"

export async function transferEth(network, signer, ethAmount, receivers) {
    for (let i = 0; i < receivers.length; i++) {
        const feeData = await getFeeData(network);
        const tx = await signer.sendTransaction({
            to: receivers[i],
            value: ethers.parseEther(ethAmount),
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            gasLimit: 21000
        });
        await signer.provider.waitForTransaction(tx.hash);
        console.log(ethAmount + " --> " + receivers[i] + " : ", tx.hash);
    }
    console.log("finished");
}

export async function transferAllEth(network, signer, receiver) {
    const feeData = await getFeeData(network);
    const provider = getProvider(network);
    const bal = await provider.getBalance(signer.address);
    const cost = 21000n * (feeData.gasPrice * 150n / 100n);
    const value = bal - cost;
    const tx = await signer.sendTransaction({
        to: receiver,
        value: value,
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        gasLimit: 21000
    });
    await signer.provider.waitForTransaction(tx.hash);
    console.log(ethers.formatEther(value) + " --> " + receiver + " : ", tx.hash);
    console.log("finished");
}

export async function transferErc20(network, signer, contractAddress, tokenAmount, receivers) {
    const ERC20 = readJson("abi/ERC20.json");
    for (let i = 0; i < receivers.length; i++) {
        await executeTx(network, contractAddress, ERC20.abi, "transfer", "0", signer, receivers[i], tokenAmount);
    }
    console.log("finished");
}

export async function transferAllErc20(network, signer, contractAddress, receiver) {
    const ERC20 = readJson("abi/ERC20.json");
    const contract = new ethers.Contract(contractAddress, ERC20.abi, signer);
    const bal = await contract.balanceOf(signer.address);
    await executeTx(network, contractAddress, ERC20.abi, "transfer", "0", signer, receiver, bal);
    console.log("finished");
}

export async function transferErc721(network, signer, contractAddress, receiver, tokenIds) {
    const ERC721 = readJson("abi/ERC721.json");
    for (let i = 0; i < tokenIds.length; i++) {
        await executeTx(network, contractAddress, ERC721.abi, "safeTransferFrom", "0", signer, signer.address, receiver, tokenIds[i]);
    }
    console.log("finished");
}

export async function transferAllErc721(network, signer, contractAddress, receiver) {
    const ERC721 = readJson("abi/ERC721.json");
    const contract = new ethers.Contract(contractAddress, ERC721.abi, signer);
    const bal = await contract.balanceOf(signer.address);
    const tokenIds = [];
    for (let i = 0; i < bal; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(signer.address, i);
        tokenIds.push(tokenId);
    }

    for (let i = 0; i < tokenIds.length; i++) {
        const tokenId = tokenIds[i];
        await executeTx(network, contractAddress, ERC721.abi, "safeTransferFrom", "0", signer, signer.address, receiver, tokenId);
    }
    
    console.log("finished");
}