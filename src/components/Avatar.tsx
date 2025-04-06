"use client";

import React, { useState } from "react";
import {
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Button,
  Typography,
  Box
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginStore from "@/stores/loginStore"; // 你的登入狀態 store
import { useLoginDialog } from "@/contexts/LoginDialogContext"; // 開啟登入 dialog
import { LoginDialog } from "@/components/LoginDialog"; // 登入 dialog
import theme from "@/styles/theme";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Avatar = () => {
  const { token, userInfo, clearUserInfo } = useLoginStore(); // 你自己的登入 store
  const { openState, closeDialog, openDialog } = useLoginDialog(); // 呼叫登入對話框
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    clearUserInfo(); // 清除登入狀態
    handleClose();
  };

  if (!token) {
    return (
      <>
        <Button
          onClick={openDialog}
          sx={{
            marginLeft: "48px",
            textTransform: "none",
            fontWeight: 600,
          }}
          variant="outlined"
        >
          登入
        </Button>
        <LoginDialog open={openState} onClose={closeDialog} />
      </>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ marginLeft: "48px", cursor: "pointer" }} onClick={handleClick}>
        {userInfo?.avatar ? (
          <MuiAvatar
            src={`https://6181-13-115-215-106.ngrok-free.app/${userInfo.avatar}`}
            alt={userInfo.name}
            sx={{ width: 48, height: 48 }}
          />
        ) : (
          <MuiAvatar sx={{ bgcolor: theme.figma.neutral[90], color: "#656565", width: 48, height: 48 }}>
            {userInfo?.name?.charAt(0).toUpperCase()}
          </MuiAvatar>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        marginThreshold={0}
        slotProps={{
          paper: {
            sx: {
              mt: '26px', // Move the menu 26px below the avatar
              borderRadius: "20px",
              bgColor: theme.figma.Primary.white,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              padding: "24px",
              minWidth: "220px",
            },
          },
        }}
        sx={{
          '& .MuiMenu-list': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            gap: "20px",
          }}
        >
          {userInfo?.avatar ? (
            <MuiAvatar
              src={`https://6181-13-115-215-106.ngrok-free.app/${userInfo.avatar}`}
              alt={userInfo.name}
              sx={{ width: 76, height: 76 }}
            />
          ) : (
            <MuiAvatar sx={{ bgcolor: theme.figma.neutral[90], color: "#656565", width: 48, height: 48 }}>
              {userInfo?.name?.charAt(0).toUpperCase()}
            </MuiAvatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{
              fontSize: "24px",
              lineHeight: "28px",
              fontWeight: "bold",
              color: theme.figma.neutral[30],
              mb: "12px"
            }}>
              {userInfo?.name}
            </Typography>
            <Typography variant="body2" sx={{
              fontSize: "16px",
              lineHeight: "19px",
              color: theme.figma.neutral[30],
            }}>
              {userInfo?.email}
            </Typography>
          </Box>
        </Box>
        <hr style={{
          border: "none",
          borderTop: `1px solid ${theme.figma.neutral[80]}`,
          margin: "24px 0",
        }} />
        <MenuItem onClick={() => { router.push("/profile"); handleClose(); }} sx={{
          borderRadius: "12p x",
          color: theme.figma.Primary.black,
          padding: "12px",
          marginBottom: "4px",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            color: theme.figma.Primary.normal_blue,
            backgroundColor: theme.figma.Primary.extra_light_blue,
          }
        }}>
          <AccountCircleOutlinedIcon sx={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }} />個人資料
        </MenuItem>
        <MenuItem onClick={() => { router.push("/my-projects"); handleClose(); }} sx={{
          borderRadius: "12px",
          color: theme.figma.Primary.black,
          padding: "12px",
          marginBottom: "4px",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            color: theme.figma.Primary.normal_blue,
            backgroundColor: theme.figma.Primary.extra_light_blue,
          }
        }}>
          <WebOutlinedIcon sx={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }} />我的專案
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{
          borderRadius: "12px",
          color: theme.figma.status.darker_red,
          padding: "12px",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            backgroundColor: "#FFEDED",
          },
        }}>
          <LogoutOutlinedIcon sx={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }} />登出
        </MenuItem>
        <hr style={{
          border: "none",
          borderTop: `1px solid ${theme.figma.neutral[80]}`,
          margin: "24px 0",
        }} />
        <Box sx={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", color: theme.figma.neutral[50], fontSize: "16px", lineHeight: "19px",
        }}>
          <Link href="/service" onClick={handleClose}>服務條款</Link>
          <span>•</span>
          <Link href="/privacy" onClick={handleClose}>隱私權政策</Link>
        </Box>
      </Menu>
    </Box>
  );
};

export default Avatar;