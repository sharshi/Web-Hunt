import * as VoteUtil from "../utils/vote_util";

export const RECEIVE_VOTE = "UPVOTE";

export const receiveVote = (vote) => {
  return {
    type: RECEIVE_VOTE,
    vote
  };
};

export const vote = vote => dispatch =>
         VoteUtil.vote(vote).then(
           (vote) => dispatch(receiveVote(vote)),
           errors => dispatch(productErrors(errors.responseJSON))
         );