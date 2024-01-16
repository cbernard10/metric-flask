import React from "react";

function Entries({ entries }) {
  return (
    <>
      {entries.map((entry, index) => {
        return (
          <div
            key={index}
            className="border-2 border-neutral-700 bg-neutral-950 flex flex-row items-center justify-center font-mono break-all text-center text-sm"
          >
            {entry}
          </div>
        );
      })}
    </>
  );
}

function MiniArray({ entries }) {
  const shape = entries.length;
  return (
    <>
      {shape === 4 ? (
        <div className="grid grid-cols-2 grid-rows-2 w-[500px] h-[500px] border-2 border-neutral-600">
          <Entries entries={entries} />
        </div>
      ) : shape === 9 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-[500px] h-[500px] border-2 border-neutral-600">
          <Entries entries={entries} />
        </div>
      ) : shape === 16 ? (
        <div className="grid grid-cols-4 grid-rows-4 w-[500px] h-[500px] border-2 border-neutral-600">
          <Entries entries={entries} />
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default MiniArray;
