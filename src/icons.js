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
        var icon = require(`./assets/icons/${exceptions[asset]}`);
        // return `${process.env.PUBLIC_URL}/icons/${exceptions[asset]}`;
        return icon.default;
    }
    try{
        var icon = require(`./assets/icons/${asset}.svg`);
        console.log('icon: ', icon);
        // return `${process.env.PUBLIC_URL}/icons/${asset}.svg`;
        return icon.default;
    } catch {
        try{
            var icon = require(`./assets/icons/${asset}.png`)
            console.log('icon: ', icon);
        // return `${process.env.PUBLIC_URL}/icons/${asset}.png`;
            return icon.default;
        } catch {
            return `${process.env.PUBLIC_URL}/icons/eth.svg`
        }
    }
}