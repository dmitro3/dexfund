const exceptions = {
    "weth": "eth",
    "adai": "aave",
    "ceth": "comp",
    "cuni": "comp"
}

export const getIconSource = (asset) => {
    asset = asset.toLowerCase();
    if (Object.keys(exceptions).includes(asset)) {
        return `/icons/${exceptions[asset]}.svg`;
    }
    try{
        require(`./../public/icons/${asset}.svg`);
        return `/icons/${asset}.svg`;
    } catch {
        return '/icons/eth.svg'
    }
}