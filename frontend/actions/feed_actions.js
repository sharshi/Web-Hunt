export const SORT_FEED = 'SORT_FEED';

export const sortFeed = order => {
  return ({
    type: SORT_FEED,
    order
  })
}