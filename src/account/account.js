import { ethers } from "ethers"
import {readJson, readDirJson, writeFileSync} from "../common/utils.js"
import {getProvider} from "../common/common.js"

const app = readJson("config/app.json");

export function create(number, password) {
    for (let i = 0; i < number; i++) {
        const wallet = ethers.Wallet.createRandom();
        const jsonWallet = wallet.encryptSync(password);
        writeFileSync("resources/" + wallet.address + ".json", jsonWallet);
    }
}

export function getWallets() {
    const addrs = [];
    const files = readDirJson("resources");
    for (let i = 0; i < files.length; i++) {
        addrs.push(files[i].substring(0, files[i].indexOf(".")));
    }
    return addrs;
}

export function getWalletSigner(network, account) {
    const files = readDirJson("resources");
    for (let i = 0; i < files.length; i++) {
        const addr = files[i].substring(0, files[i].indexOf("."));
        if (addr.toLocaleLowerCase() == account.toLocaleLowerCase()) {
            const walletJson = readJson("resources/" + files[i]);
            const provider = getProvider(network);
            const walletSigner = ethers.Wallet.fromEncryptedJsonSync(JSON.stringify(walletJson), app.password);
            return walletSigner.connect(provider);
        }
    }
    return null;
}

export function getWalletSigners(network) {
    const files = readDirJson("resources");
    const wallets = [];
    const provider = getProvider(network);
    for (let i = 0; i < files.length; i++) {
        const walletJson = readJson("resources/" + files[i]);
        const walletSigner = ethers.Wallet.fromEncryptedJsonSync(JSON.stringify(walletJson), app.password);
        wallets.push(walletSigner.connect(provider));
    }
    return wallets;
}