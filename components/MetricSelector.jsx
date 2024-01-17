"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

function MetricSelector({ userMetrics, setEntries, setCoordinates, setShape }) {
  const [collapsed, setCollapsed] = useState(true);
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const _options = userMetrics.map((metric) => {
      return { value: metric, label: metric.name };
    });
    setOptions(_options);
  }, [userMetrics]);

  const handleClick = (selected) => {
    setSelected(selected);
    console.log(selected);
    const metric = selected.value;
    const shape = metric.coordinates.length;
    setEntries(metric.value);
    setCoordinates(metric.coordinates);
    setShape(shape);
  };

  return (
    <div className="flex flex-col justify-end items-end">
      <Select
        options={options}
        onChange={handleClick}
        defaultValue={selected}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: "200px",
            height: "50px",
            borderRadius: "0rem",
            backgroundColor: "var(--color-neutral-800)",
            color: "var(--color-neutral-100)",
            border: "2px solid #222",
            "&:hover": {
              borderColor: "#42a",
            },
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--color-neutral-800)",
            color: "var(--color-neutral-100)",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#000" : "#000",
            "&:hover": {
              backgroundColor: "#42a",
            },
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: "var(--color-neutral-100)",
          }),
          placeholder: (provided, state) => ({
            ...provided,
            color: "var(--color-neutral-100)",
          }),
          input: (provided, state) => ({
            ...provided,
            color: "#333",
          }),
        }}
      />
    </div>
  );
}

export default MetricSelector;
