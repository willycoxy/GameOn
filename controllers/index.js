const router = require("express").Router();
const forumsRoutes = require("./forums-routes.js");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/forums", forumsRoutes);

router.use((req, res) => {
    res.status(404).end();
});





module.exports = router;