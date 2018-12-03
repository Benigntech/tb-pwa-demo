
function Permit(...allowed) {

    const isAllowed = role => allowed.indexOf(role) > -1;

    // return a middleware
    return (req, res, next) => {
        console.log(req.user.role, allowed, allowed.indexOf(req.user.role));
        if (req.user && isAllowed(req.user.role))
            next(); // role is allowed, so continue on the next middleware
        else {
            res.status(403)
                .send({
                    status:"error",
                    message: "Forbidden"
                });
        }
    }
}

module.exports = Permit;