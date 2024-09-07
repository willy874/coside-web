'use client';

import { Box } from "@mui/material";
import { LoginDialog } from "@/components/LoginDialog";
import { useLoginDialog } from "@/contexts/LoginDialogContext";
import React, { useState } from "react";

const Avatar = () => {
    // const [openState, setOpenState] = useState(true);
    const { openState , openDialog, closeDialog } = useLoginDialog();

  return (
    <>
      <Box
        onClick={openDialog}
        sx={{
          height: "60px",
          width: "60px",
          minWidth: "60px",
          marginLeft: "48px",
          borderRadius: "50%",
          backgroundColor: "#ECECEC",
          cursor: "pointer",
        }}
      ></Box>

        <LoginDialog open={openState} onClose={ closeDialog }/>    
    </>
  );
};

export default Avatar;