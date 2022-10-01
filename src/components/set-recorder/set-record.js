import { useState } from "react";

export const SetRecorder = () => {
  const [setCount, setSetCount] = useState(1);
  return <h1>{`Set ${setCount}:`}</h1>;
};
