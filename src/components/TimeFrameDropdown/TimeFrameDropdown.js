import React from "react";
import Select from "react-select";
import BtfxConsts from "consts/BtfxConsts";

export default ({ selectedTimeFrame, setSelectedTimeFrame }) => {
  return (
    <Select
      value={selectedTimeFrame}
      onChange={setSelectedTimeFrame}
      styles={{ menu: base => ({ ...base, zIndex: 2 }) }}
      options={Object.values(BtfxConsts.timeFrame).map(timeFrame => ({
        value: timeFrame,
        label: timeFrame
      }))}
    />
  );
};
