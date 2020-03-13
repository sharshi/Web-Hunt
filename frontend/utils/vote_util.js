//  POST /api/upvotes api/upvotes#vote
/**
 * #upvote
 */
export const vote = vote => (
  $.ajax({
    method: 'post',
    url: `api/upvotes/`,
    data: { vote }
  })
)