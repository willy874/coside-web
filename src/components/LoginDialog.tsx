'use client';

import { Dialog, DialogContent, DialogTitle, Button, TextField, Box, Typography } from "@mui/material";
import React from "react";
import styles from "./LoginDialog.module.scss"
import axios from "axios";

export const LoginDialog = ({
    open, onClose
}) => {
    // const { open, closeDialog } = useLoginDialog();
    // google 登入按鈕
    
    


    const handleGoogleLogin = async() => {
        
        const bodyData = new FormData();
        bodyData.append('postBody', 'id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODg5MjMyNTksImF1ZCI6Ijc0Nzg0MjU2MTQzNi0wMmVjcTZnbmJuZ2xqbW5nYWlqMnRncWdra2E4MHV1di5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzc1OTk4Mzk1NTgzOTgxNTYxNyIsImVtYWlsIjoiY3JhenljamhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijc0Nzg0MjU2MTQzNi0wMmVjcTZnbmJuZ2xqbW5nYWlqMnRncWdra2E4MHV1di5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJDaHVuSGFvIENoZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZVQwZnJrMDJ0R1lwM3FYMlVKSDJmTmVEMGxwYzJ4cWZoSGpOODZyRXRSV1JNPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkNodW5IYW8iLCJmYW1pbHlfbmFtZSI6IkNoZW4iLCJpYXQiOjE2ODg5MjM1NTksImV4cCI6MTY4ODkyNzE1OSwianRpIjoiNjRkNDhkN2QyNWE2OTNjM2U1ZjM4YmIxNzVhNTA1ZmQ5YWMyZjkxYiJ9.ltUKvIZh_fSI22ZNrmWQHreUG9v2ScXauPF2nuLmT37JNz9iFSXWB-fGOe16vy0tL51rxH2A1fD3VXHZ3Q3rMUxbBTw77ADrh7OhhDtrPLVt2nRo36NCo8ao-ZZWe3YgW3W4eB5aq4kJS_eIsBcRMlNRSAhNzFX68U3HaIJKgXj3vXBBE1-3io9sRI4j90X8NOVeBmG4cnNPA5OF4IXmGJDOkuUl7RlbC-PVC1DR-nIVUhhlznA_8Ca1OxOxc_OLq68La-qtjx-Pf8N_pdPbZ-onnfz3eqceoIjRRm-ysuK4VVUzvNdbVpHKGpDULqNYyKJxe0V9K3S-pf0ucmzA-A&providerId=google.com')
        bodyData.append('requestUri', 'http://localhost')
        bodyData.append('returnIdpCredential', 'true')
        bodyData.append('returnSecureToken', 'true')



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
        window.location.href = 'https://8d20-13-115-215-106.ngrok-free.app/signup-via-google?signUpRedirectUrl=http://localhost:3000/loginsetting&signInRedirectUrl=http://localhost:3000/';
    }
    

    return (
        <Dialog open={open} onClose={()=> {onClose()}}  classes={{ paper: styles.dialog }}>
            <DialogTitle className={styles.center}>
                <img src="/Co-Side.png" alt=""  className={styles.image}/>
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
                    startIcon={<img src="/SSOIcon.png" alt="Google Icon" className={styles.googleIcon} />}
                    onClick= {handleGoogleLogin}
                    >
                        使用 Google 登入
                </Button>
            </div>
        </Dialog>
        
    );
};

