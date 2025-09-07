import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect running");

    return () => {
      console.log("Cleanup called");
    };
  }, [count]);

  return (
    <div className="w-6/12 mx-auto mt-10 text-center">
      <button
        className="px-3 py-2 bg-red-400 text-white"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Counter {count}
      </button>
    </div>
  );
}

export default Counter;
