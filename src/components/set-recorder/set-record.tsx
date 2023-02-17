import React, { useState } from "react";

export const SetRecorder: React.FC = () => {
  const [setCount, setSetCount] = useState<number>(1);
  return <h1>{`Set ${setCount}:`}</h1>;
};
