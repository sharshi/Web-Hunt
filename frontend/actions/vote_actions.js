import * as VoteUtil from "../utils/vote_util";

export const RECEIVE_VOTE = "UPVOTE";
export const RECEIVE_VOTE_ERRORS = "RECEIVE_VOTE_ERRORS";

const voteErrors = errors => ({
  type: RECEIVE_VOTE_ERRORS,
  errors
});

export const receiveVote = (vote) => {
  return {
    type: RECEIVE_VOTE,
    vote
  };
};

export const vote = vote => dispatch =>
         VoteUtil.vote(vote).then(
           vote => dispatch(receiveVote(vote)),
           errors => dispatch(voteErrors(errors.responseJSON))
         );