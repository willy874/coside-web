'use client';

import styles from "../css/page.module.css";
import theme from "@/styles/theme";
import { Container, Box, Link, Typography } from "@mui/material";

export default function Privacy() {
  return (
    <main className={styles.main}>
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{
          width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "87px", marginBottom: "44px"
        }}>
          <Box sx={{ maxWidth: "805px", margin: "69px auto 0", borderRadius: "12px", padding: "32px", border: `1px solid ${theme.palette.grey[200]}` }}>
            <Typography sx={{ mb: "32px", fontWeight: "700", fontSize: "28px", textAlign: "center" }}>隱私權政策</Typography>
            <Box>
              <Typography paragraph>
                歡迎使用Co-Side（以下簡稱“本平台”）。我們非常重視您的隱私權，並致力於保護您的個人資料。請仔細閱讀以下隱私權政策，了解我們如何收集、使用和保護您的個人資料。
              </Typography>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>一、收集的資料類型</Typography>
                <Typography>
                  我們可能會通過Google第三方登入收集以下類型的個人資料：
                </Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }} mb={2} fontWeight={"bold"}>
                  <li>Google帳號的電子郵件地址</li>
                  <li>使用者名稱</li>
                </Typography>
                <Typography>
                  此外，我們將<strong>自動收集</strong>以下資料：
                </Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }} mb={2}>
                  <li>
                    <strong>IP地址：</strong><br />
                    <Box component="p" sx={{ ml: 2 }}>
                      IP地址用於識別連接到網絡的設備，以提供更好的服務和安全保護。我們不會將IP地址與特定用戶的身份信息相關聯，並且將遵守相關的隱私政策和法律法規，保護您的隱私和數據安全。
                    </Box>
                  </li>
                </Typography>

                <Typography>
                  您也可以選擇<strong>自行揭露</strong>以下公開資料：
                </Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }} mb={2} fontWeight={"bold"}>
                  <li>個人Facebook連結</li>
                  <li>個人Instagram連結</li>
                  <li>主要職位</li>
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>二、資料使用方式</Typography>
                <Typography>我們收集的資料將用於以下目的：</Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }}>
                  <li>提供和改進本平台的服務</li>
                  <li>允許其他使用者聯繫您，以促進合作項目</li>
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>三、資料分享</Typography>
                <Typography>
                  我們不會將您的個人資料出售或出租給第三方。您自行揭露的聯絡方式（如電子郵件、Facebook連結、Instagram連結）及主要職位將成為公開資訊，供其他使用者查看和聯繫。
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>四、資料保護</Typography>
                <Typography>
                  我們將在AWS平台上存儲和保護您的個人資料，並採取適當的技術和組織措施，防止您的資料遭到未經授權的存取、披露、變更或破壞。
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>五、用戶權利</Typography>
                <Typography>您對於您的個人資料擁有以下權利：</Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }}>
                  <li>查詢和請求查看您的資料</li>
                  <li>
                    您發布的專案內容將供其他用戶查詢和查看，但無法由其他用戶更正或刪除
                  </li>
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>六、政策更新</Typography>
                <Typography>
                  我們可能會不時更新本隱私權政策。任何更新將發布在本平台上，並且會標明更新日期。
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="h6" fontWeight={"bold"}>七、聯絡方式</Typography>
                <Typography>
                  如有任何隱私問題，請聯絡我們：
                </Typography>
                <Typography component="ul" sx={{ listStylePosition: "inside" }}>
                  <li>電子郵件：<Link href="mailto:coside.service@gmail.com" sx={{
                    color: `${theme.palette.primary.black}`, textDecoration: "none",
                    "&:hover": {
                      color: `${theme.palette.primary.main}`
                    }
                  }}>coside.service@gmail.com</Link></li>
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ marginTop: "32px" }} textAlign={"right"}>
              更新日期：2024/06/xx
            </Typography>
          </Box>
        </Box>
      </Container >
    </main >
  );
}
