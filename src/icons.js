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
        return `${window.location.origin}/icons/${exceptions[asset]}`;
    }
    try{
        require(`/icons/${asset}.svg`);
        return `${window.location.origin}/icons/${asset}.svg`;
    } catch {
        try{
            require(`./../public/icons/${asset}.png`)
            return `${window.location.origin}/icons/${asset}.png`;
        } catch {
            return `${window.location.origin}/icons/eth.svg`
        }
    }
}