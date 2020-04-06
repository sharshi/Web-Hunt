export const fetchReviews = productId =>
  $.ajax({
    method: "get",
    url: `api/products/${productId}/reviews`
  });

export const fetchReview = id =>
  $.ajax({
    method: "get",
    url: `api/reviews/${id}`
  });

export const createReview = review =>
  $.ajax({
    method: "post",
    url: `api/reviews/`,
    data: { review }
  });