const exceptions = {
    "weth": "eth.svg",
    "adai": "aave.svg",
    "ceth": "comp.svg",
    "cuni": "comp.svg",
    "paraswap v4": "paraswap.png"
}

export const getIconSource = (asset) => {
    asset = asset.toLowerCase();
    if (Object.keys(exceptions).includes(asset)) {
        return `/icons/${exceptions[asset]}`;
    }
    try{
        require(`%PUBLIC_URL%/icons/${asset}.svg`);
        return `/icons/${asset}.svg`;
    } catch {
        try{
            require(`./../public/icons/${asset}.png`)
            return `/icons/${asset}.png`;
        } catch {
            return '/icons/eth.svg'
        }
    }
}