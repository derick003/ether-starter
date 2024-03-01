import {getSigner, getProvider, getFeeData, cancelTransaction} from "./common/common.js"
import {create, getWallets, getWalletSigner} from "./account/account.js"
import {transferEth, transferErc20, transferAllEth, transferAllErc20, transferAllErc721, transferErc721} from "./transfer/transfer.js"
import { ethers } from "ethers";


async function main() {
    create(1, "123456");
    // const addrs = getWallets()
    
    // const feeData = await getFeeData("goerli");
    // console.log(feeData);
    // const signer = getSigner("goerli");
    // await transferEth("goerli", signer, "0.01", addrs);

    // const provider = getProvider("goerli");
    // let wallet = getWalletSigner("0x53657d6fe31f64c3ff6bf467cee7c2e30b6bf6c8");
    // wallet = wallet.connect(provider);
    // await transferEth("goerli", wallet, "0.01", ["0x87a59A7216c7aCcFc6eC5227d9eb556741E961Ed"]);
    
    // const signer = getSigner("goerli");
    // await transferErc20("goerli", signer, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", ethers.parseEther("0.01"), addrs);

    // const provider = getProvider("goerli");
    // let wallet = getWalletSigner("0x53657d6fe31f64c3ff6bf467cee7c2e30b6bf6c8");
    // wallet = wallet.connect(provider);
    // await transferErc20("goerli", wallet, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", ethers.parseEther("0.01"), ["0x87a59A7216c7aCcFc6eC5227d9eb556741E961Ed"]);

    // const signer = getSigner("goerli");
    // await transferAllErc20("goerli", signer, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", addrs[0]);

    // const provider = getProvider("goerli");
    // let wallet = getWalletSigner("0x53657d6fe31f64c3ff6bf467cee7c2e30b6bf6c8");
    // wallet = wallet.connect(provider);
    // await transferAllErc20("goerli", wallet, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", "0x87a59A7216c7aCcFc6eC5227d9eb556741E961Ed");

    // const signer = getSigner("goerli");
    // await transferAllErc20("goerli", signer, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", addrs[0]);

    // const provider = getProvider("goerli");
    // let wallet = getWalletSigner("0x53657d6fe31f64c3ff6bf467cee7c2e30b6bf6c8");
    // wallet = wallet.connect(provider);
    // await transferAllEth("goerli", wallet, "0x87a59A7216c7aCcFc6eC5227d9eb556741E961Ed");

    // const signer = getSigner("goerli");
    // await transferAllErc721("goerli", signer, "0xC4dd909FDC7a1dC48F195715c1cD9B0f9B01705f", "0x53657D6Fe31f64c3fF6BF467cee7C2E30b6BF6C8");

    // let wallet = getWalletSigner("goerli", "0x53657d6fe31f64c3ff6bf467cee7c2e30b6bf6c8");
    // await transferErc721("goerli", wallet, "0xC4dd909FDC7a1dC48F195715c1cD9B0f9B01705f", "0x87a59A7216c7aCcFc6eC5227d9eb556741E961Ed", [1228, 907]);

    // const signer = getSigner("goerli");
    // await cancelTransaction("goerli", signer);
}
main()