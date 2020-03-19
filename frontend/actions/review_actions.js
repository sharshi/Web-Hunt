import * as ReviewUtil from "../utils/review_util";

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
});

const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});

const reviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
});

export const fetchReview = id => dispatch =>
  ReviewUtil.fetchReview(id).then(
    review => dispatch(receiveReview(review)),
    errors => dispatch(reviewErrors(errors.responseJSON))
  );

export const fetchReviews = productId => dispatch =>
  ReviewUtil.fetchReviews(productId).then(
    reviews => dispatch(receiveReviews(reviews)),
    errors => dispatch(reviewErrors(errors.responseJSON))
  )

export const createReview = review => dispatch => 
ReviewUtil.createReview(review).then(
   review => dispatch(receiveReview(review)),
   errors => dispatch(reviewErrors(errors.responseJSON))
 );
   