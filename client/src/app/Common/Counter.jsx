import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Counter = ({ limit }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= limit) {
          clearInterval(intervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [limit]);

  return (
    <Typography
      variant="span"
      sx={{
        color: "#1976d2",
        marginRight: "5px",
        borderBottom: "1px solid",
      }}
    >
      {count}
    </Typography>
  );
};

export default Counter;
