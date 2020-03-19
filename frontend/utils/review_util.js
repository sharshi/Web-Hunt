export const fetchReviews = productId =>
  $.ajax({
    method: "get",
    url: `api/reviews/?productId=${productId}`
  });