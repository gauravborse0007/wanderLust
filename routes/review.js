const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedin} = require ("../middleware.js")



const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
  
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errMsg);
    } else{
      next();
    }
  };

// Review Route 
router.post("/", 
    validateReview, 
    isLoggedin,
    wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; //in "author" field (which is inside the review model), the new review is stored by it's id
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success","Review added!");
    res.redirect(`/listings/${listing._id}`);
  }));
  
  // Delete route for reviews
  router.delete("/:reviewId",
    wrapAsync(async(req,res)=>{
      let {id,reviewId} = req.params;
      
      await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); //pull operator removes from an array all insatances of a value that match condition 
      await Review.findByIdAndDelete(reviewId);
      req.flash("success","Review Deleted!");
      res.redirect(`/listings/${id}`);
    })
  );

  module.exports = router;