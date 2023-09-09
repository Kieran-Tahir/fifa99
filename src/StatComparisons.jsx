import React from "react";

function StatComparisons({ thisPlayer, otherPlayer }) {
  function determineBGC() {
    if (thisPlayer?.rating > otherPlayer?.rating) {
      return "rgb(11, 115, 11)";
    } else if (thisPlayer?.rating === otherPlayer?.rating) {
      return "rgb(108 108 108)";
    } else {
      return "rgb(171 171 171)";
    }
  }

  function determineBGCforStats(i) {
    if (thisPlayer.stats[i].value > otherPlayer?.stats[i].value) {
      return "rgb(11, 115, 11)";
    } else if (thisPlayer.stats[i].value === otherPlayer?.stats[i].value) {
      return "rgb(108 108 108)";
    } else {
      return "rgb(171 171 171)";
    }
  }

  return (
    <>
      <div className="active-player-property-container">
        <div className="active-player-property">
          Rating
        </div>
        <div className="rating-graph-container bulge">
          <div className="rating-graph">
            <span
              className="rating-percent"
              style={{
                width: `${(thisPlayer?.rating)}%`,
                backgroundColor: determineBGC(),
              }}
            >{thisPlayer?.rating}</span>
          </div>
        </div>
      </div>
      {thisPlayer?.stats.map((stat, i) => (
        <div className="active-player-property-container" key={i}>
          <div className="active-player-property">
            {stat.name}
          </div>
          <div className="rating-graph-container bulge">
            <div className="rating-graph">
              <span
                className="rating-percent"
                style={{
                  width: `${(stat.value)}%`,
                  backgroundColor: determineBGCforStats(i),
                }}
              >{stat.value}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default StatComparisons;
