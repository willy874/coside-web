"use client";

import styles from "../css/page.module.css";
import { Box, Button, Container, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <main className={styles.main}>
      <Container sx={{
        maxWidth: "1224px", width: "100%", flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: { xs: "80px 0 40px", md: "80px 0" },
      }}>
        <Box sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }}>
          <Image src="/page_error.svg" alt="Page Error"
            width={isMd ? 80 : 200} // 根據螢幕大小改變寬度
            height={isMd ? 80 : 200} // 根據螢幕大小改變高度
            style={{ margin: "0 auto", display: "block" }} />
          <Typography sx={{
            color: "rgba(191, 143, 253, 0.8)",
            mt: { xs: "19px", sm: "19px", md: "32px" },
            fontSize: { xs: "16px", sm: "16px", md: "32px" },
            lineHeight: { xs: "26px", sm: "26px", md: "45px" },
            fontWeight: "bold",
            textAlign: "center",
          }}>
            恩？似乎有股神秘的力量<br />
            試圖讓你看不到任何東西
          </Typography>
          <Box sx={{
            width: "100%",
            mt: "49px",
            display: { xs: "block", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            gap: "16px"
          }}>
            <Button
              onClick={() => router.push("/")}
              color="primary"
              variant="contained"
              sx={{
                display: "block",
                fontWeight: "normal",
                boxShadow: "none",
                maxWidth: "288px",
                width: "100%",
                color: theme.figma.Secondary.normal_purple,
                bgcolor: theme.figma.neutral[100],
                border: `1px solid ${theme.figma.Secondary.normal_purple}`,
                borderRadius: "12px",
                textDecoration: "none",
                padding: "10px 16px",
                fontSize: "16px",
                lineHeight: "19px",
                margin: { xs: "0 auto 16px", md: 0 },
                "&:hover": {
                  boxShadow: "none",
                  bgcolor: theme.figma.Secondary.extra_light_purple,
                },
              }}
            >
              前往探索專案
            </Button>
            <Button
              onClick={() => router.back()}
              color="primary"
              variant="contained"
              sx={{
                display: "block",
                fontWeight: "normal",
                boxShadow: "none",
                maxWidth: "288px",
                width: "100%",
                color: theme.figma.btn.fill.content_default,
                bgcolor: theme.figma.btn.fill.bg_default_purple,
                borderRadius: "12px",
                textDecoration: "none",
                padding: "11px 16px",
                fontSize: "16px",
                lineHeight: "19px",
                margin: { xs: "0 auto", md: 0 },
                "&:hover": {
                  boxShadow: "none",
                  bgcolor: theme.figma.btn.fill.bg_hover_purple,
                },
              }}
            >
              重新整理
            </Button>
          </Box>
        </Box>
      </Container>
    </main>
  )
}