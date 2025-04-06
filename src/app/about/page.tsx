import styles from "../css/page.module.css";
import { Box, Container, Typography } from "@mui/material";

export default function About() {
  return (
    <main className={styles.main}>
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{
          width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "87px", mb: "44px"
        }}>
          <Box sx={{ maxWidth: "805px", margin: "69px auto 0", borderRadius: "12px", padding: "32px", border: `1px solid gray` }}>
            <Typography sx={{ mb: "32px", fontWeight: "700", fontSize: "28px", textAlign: "center" }}>關於我們</Typography>
            <Box>
              <Typography paragraph>
                Co-Side
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  )
}