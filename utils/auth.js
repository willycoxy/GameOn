const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect("/register");
    } else {
        next();
    }
};




module.exports = withAuth;