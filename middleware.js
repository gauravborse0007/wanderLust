// for each of the CRUD opertions we need to loggedin so we had created another file miidleware.js 
// and we had passed it all routes CRUD

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in to create a New Listing!");
        return res.redirect("/login");
      }
      next();  
};




