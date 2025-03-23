'use client';

import { Dialog, DialogContent, DialogTitle, Button, TextField, Box, Typography } from "@mui/material";
import styles from "./LoginDialog.module.scss";
import Image from "next/image";
export const LoginDialog = ({
  open, onClose
}: { open: boolean, onClose: () => void }) => {

  const handleGoogleLogin = async () => {

    // try{
    //     // body
    //     const res = await axios.get('/api/signup-via-google', 
    //     {
    //         params: {
    //             signUpRedirectUrl: "http://localhost:3000/loginsetting"
    //         }
    //     }
    //     );
    //     console.log(res);
    // }catch(e) {
    //     console.log(e)
    // }
    // https://8d20-13-115-215-106.ngrok-free.app
    // https://139c-18-181-211-61.ngrok-free.app
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth-via-google?signUpRedirectUrl=${process.env.NEXT_PUBLIC_DOMAIN_URL}/loginsetting&signInRedirectUrl=${process.env.NEXT_PUBLIC_DOMAIN_URL}`;
  }

  return (
    <Dialog open={open} onClose={() => { onClose() }} classes={{ paper: styles.dialog }}>
      <DialogTitle className={styles.center}>
        <Image src="/coside_icon.svg" alt="" width={69} height={65} className={styles.image} />
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <h3 className={styles.contentHead}>歡迎來到 Co-Side</h3>
        <p className={styles.contentText}>你尋找 Side Project 的好幫手</p>
        {/* 这里你可以添加表单字段或其他内容 */}
      </DialogContent>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          className={styles.loginButton}
          startIcon={<Image src="/SSOIcon.png" alt="Google Icon" width={24} height={24} className={styles.googleIcon} />}
          onClick={handleGoogleLogin}
        >
          使用 Google 登入
        </Button>
      </div>
    </Dialog>

  );
};

