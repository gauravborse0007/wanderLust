class ExpressError extends Error {
    constructor(status,err){
        super();
        this.status = status;
        this.err = err;
    }
}

module.exports = ExpressError;