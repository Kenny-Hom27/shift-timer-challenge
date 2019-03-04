import React from "react";

const IndividualTime = ({ time, resetSplit, highlightedSplit }) => {
  return (
    <div
      className={
        highlightedSplit === time
          ? `timer__list__item--selected`
          : `timer__list__item`
      }
      onClick={() => resetSplit(time)}
    >
      {time} ms
    </div>
  );
};

export default IndividualTime;
