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
        return `${process.env.PUBLIC_URL}/icons/${exceptions[asset]}`;
    }
    try{
        require(`${process.env.PUBLIC_URL}/icons/${asset}.svg`);
        return `${process.env.PUBLIC_URL}/icons/${asset}.svg`;
    } catch {
        try{
            require(`./../public/icons/${asset}.png`)
            return `${process.env.PUBLIC_URL}/icons/${asset}.png`;
        } catch {
            return `${process.env.PUBLIC_URL}/icons/eth.svg`
        }
    }
}