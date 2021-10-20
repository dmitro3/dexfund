import { ethers } from 'ethers'
let provider;
let signer;
let accounts;

const init = async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
            // Modern dapp browsers
            if (window.ethereum) {
                provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Accounts now exposed
                    accounts = await provider.send("eth_requestAccounts", []);
                    signer = provider.getSigner()
                    resolve({provider, signer, accounts});
                } catch (error) {
                    reject(error);
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Use Mist/MetaMask's provider.
                provider = new ethers.providers.Web3Provider(window.web3.currentProvider, "any");
                accounts = await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner()
                console.log("Injected web3 detected.");
                resolve({provider, signer, accounts});
            }
            // show an alert tho them
            else {
                alert("Please install metamask to browser");
            }
            // send to get accounts


            // get signer 
        });
    })
}
export {init as connect}
export default init;
