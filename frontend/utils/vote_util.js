//  POST /api/upvotes api/upvotes#create
/**
 * #upvote
 */
export const upvote = upvote => (
  $.ajax({
    method: 'post',
    url: `api/upvotes/`,
    data: { upvote }
  })
)
  

//  DELETE /api/upvotes/:id api/upvotes#destroy
/**
 * #unvote
 */
export const unvote = id => (
  $.ajax({
    method: 'delete',
    url: `api/upvotes/${id}`
  })
)