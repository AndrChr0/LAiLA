const verifyRegisterInput = (req, res, next) => {
    
    if (req.body.email){
        if (!req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return res.status(400).send(`Please use the email format: example@example.com.`)
        } 

        if (req.body.password) {
            if (req.body.password.length < 8 ) {
                return res.status(400).send("Password must contain at minimum eight characters.")
            } 
        } 
    
        next()
    }
}

export default verifyRegisterInput;