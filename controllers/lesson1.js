const codyRoute = (req, res) => {
    res.send("Cody Karl");
};

const koaRoute = (req, res) => {
    res.send("Nakoa Karl");
};

const kaiRoute = (req, res) => {
    res.send("Makai Karl");
};

const emRoute = (req, res) => {
    res.send("Emily Karl");
};

module.exports = {
    codyRoute,
    koaRoute,
    kaiRoute,
    emRoute
};