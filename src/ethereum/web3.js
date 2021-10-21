import { ethers } from 'ethers'
let provider;
let signer;
let address;
let balance;

const init = async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        try {
            // Request account access if needed
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner()
            address = await provider.getSigner().getAddress()
        } catch (error) {
            
        }
    }
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        provider = new ethers.providers.Web3Provider(window.web3.currentProvider, "any");

       await provider.send("eth_requestAccounts", []);
        await window.ethereum.enable();
        signer = provider.getSigner()
        address = await provider.getSigner().getAddress()
        console.log("Injected web3 detected.");
    }
    // show an alert tho them
    else {
        alert("Please install metamask to browser");
        
    }

    balance = await provider.getBalance(address)

    
    return {provider, signer, address, balance: (balance/ Math.pow(10, 18)).toFixed(2)}
}
export {init as connectMetamask}
export default init;
