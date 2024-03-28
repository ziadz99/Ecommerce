import React from "react";

export default function ViewAsButton({ oneCols, twoCols, threeCols }) {
  return (
    <div className="flex space-x-4">
      <span className="mr-3 mt-3 text-lg font-medium">View As</span>
      <button
        className="bg-white border border-black text-black px-4 py-2 rounded"
        onClick={twoCols}
      >
        2
      </button>
      <button
        className="bg-white border border-black text-black px-4 py-2 rounded"
        onClick={threeCols}
      >
        3
      </button>
    </div>
  );
}
