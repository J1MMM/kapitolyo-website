import { Button, Typography } from "@mui/material";
import React from "react";

const ContainedButton = ({ onClick, icon, title, disable }) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      disableFocusRipple
      disabled={disable}
    >
      {icon}
      <Typography component={"span"} pr={1} variant="caption" color="#FFF">
        {title}
      </Typography>
    </Button>
  );
};

export default ContainedButton;
