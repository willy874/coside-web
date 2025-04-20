"use client";

import styles from "@/app/page.module.css";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function About() {
  const params = useParams(); // 取得動態路由參數

  return (
    <main className={styles.main}>
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{
          width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "87px", mb: "44px"
        }}>
          <Box sx={{ maxWidth: "805px", margin: "69px auto 0", borderRadius: "12px", padding: "32px", border: `1px solid gray` }}>
            <Typography sx={{ mb: "32px", fontWeight: "700", fontSize: "28px", textAlign: "center" }}>編輯專案</Typography>
            <Box>
              <Typography paragraph>
                {params.id}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  )
}