import React from "react";

function CoordinatesForm({ coordinates, setCoordinates }) {
  return (
    <form className="bg-black flex flex-row gap-6 items-center w-fit">
      <div className="flex flex-row gap-[2px]" >
        {coordinates.map((coordinate, index) => {
          return (
            <input
              className="w-10 py-2  bg-neutral-900 flex justify-center items-center text-center font-mono outline-none
              focus:border-violet-800 focus:bg-violet-800
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
