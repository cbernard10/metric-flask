import React from "react";

function CoordinatesForm({ coordinates, setCoordinates }) {
  return (
    <form className="bg-black flex flex-row gap-6 items-center w-fit">
      {/* <label>Coordinates</label> */}
      <div className="flex flex-row">
        {coordinates.map((coordinate, index) => {
          return (
            <input
              className="w-16 border-[1px] py-2 border-neutral-600 bg-neutral-900 flex justify-center items-center text-center font-mono outline-none
              focus:border-violet-700 focus:bg-violet-950
              "
              key={index}
              type="text"
              value={coordinate}
              onChange={(e) => {
                const newCoordinates = [...coordinates];
                newCoordinates[index] = e.target.value;
                setCoordinates(newCoordinates);
              }}
            ></input>
          );
        })}
      </div>
    </form>
  );
}

export default CoordinatesForm;
