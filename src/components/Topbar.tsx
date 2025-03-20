import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import dynamic from "next/dynamic";
import { LoginDialogProvider } from "@/contexts/LoginDialogContext";
const Avatar = dynamic(() => import("./Avatar"), { ssr: false });

const TEXT_MAP: Record<string, string> = {
  EXPLORE: "探索新專案",
  MY_PROJECTS: "我的專案",
};

export const Topbar = () => {
  // const { openDialog } = useLoginDialog();

  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        padding: "0 11%",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        backgroundColor: "#FFFFFF",
        zIndex: 10,
      }}
    >
      <Link href="/">
        <Image src="/theme-logo.svg" alt="Co-Side" width={174} height={40} priority />
      </Link>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Typography>{TEXT_MAP.EXPLORE}</Typography>
        </Link>
        <Link href="/">
          <Typography sx={{ marginLeft: "48px" }}>
            {TEXT_MAP.MY_PROJECTS}
          </Typography>
        </Link>
        <LoginDialogProvider>
          <Avatar />
        </LoginDialogProvider>
        {/* <Box
            // onClick={() => openDialog()}
            sx={{
              height: "60px",
              width: "60px",
              marginLeft: "48px",
              borderRadius: "50%",
              backgroundColor: "#ECECEC",
            }}
          ></Box> */}
      </Box>
    </Box>
  );
};
