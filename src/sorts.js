import sortBy from "ramda/src/sortBy";

export const sorts = peer => ({
  new: sortBy(id => -1 * peer.getTimestamp(id)),
  old: sortBy(id => peer.getTimestamp(id)),
  active: sortBy(id => -1 * peer.getLastActive(id)),
  top: sortBy(id => -1 * peer.getScore(id)),
  comments: sortBy(id => -1 * peer.getVoteCount(id, "comment")),
  hot: sortBy(id => {
    const ups = peer.getVoteCount(id, "up");
    const downs = peer.getVoteCount(id, "down");
    const timestamp = peer.getTimestamp(id);
    const score = ups - downs;
    const seconds = (timestamp/1000) - 1134028003;
    const order = Math.log10(Math.max(Math.abs(score), 1));
    let sign = 0;
    if (score > 0) { sign = 1; } else if (score < 0) { sign = -1; }
    return -1 * (sign * order + seconds / 45000);
  }),
  best: sortBy(id => {
    const ups = peer.getVoteCount(id, "up");
    const downs = peer.getVoteCount(id, "down");
    const n = ups + downs;
    if (n === 0) return 0;
    const z = 1.281551565545; // 80% confidence
    const p = ups / n;
    const left = p + 1/(2*n)*z*z;
    const right = z*Math.sqrt(p*(1-p)/n + z*z/(4*n*n));
    const under = 1+1/n*z*z;
    return -1 * ((left - right) / under);
  }),
  controversial: sortBy(id => {
    const ups = peer.getVoteCount(id, "up");
    const downs = peer.getVoteCount(id, "down");
    if (ups <= 0 || downs <= 0) return 0;
    const magnitude = ups + downs;
    const balance = (ups > downs)
      ? downs / ups
      : ups /downs;
    return -1 * (magnitude ** balance);
  }),
});
