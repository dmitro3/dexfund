import {WalletAccountWrapper}  from  '@ngeni-we-do/radar-protocol'

const walletWrapper = async (web3Provider, address) => {
    const wallet  = new WalletAccountWrapper()
    await wallet.connect(web3Provider, address)
    return wallet
}

export default walletWrapper;