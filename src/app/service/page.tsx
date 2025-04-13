'use client';

import styles from "../page.module.css";
import theme from "@/styles/theme";
import { Container, Box, Link, Typography } from "@mui/material";

export default function Privacy() {
  return (
    <main className={styles.main}>
      <Container sx={{ maxWidth: "1280px" }}>
      <Typography sx={{ display: { xs: "block", md: "none" }, margin: "24px auto 16px", fontWeight: "700", fontSize: "24px", lineHeight: "28px", textAlign: "center", color: "#1E88E5" }}>服務條款</Typography>
        <Box sx={{ maxWidth: "805px", margin: { xs: "0 auto", md: "69px auto 0" }, borderRadius: "12px", padding: "32px", border: `1px solid ${theme.palette.grey[200]}` }}>
          <Typography sx={{ display: { xs: "none", md: "block" },mb: "32px", fontWeight: "700", fontSize: "28px", textAlign: "center" }}>服務條款</Typography>
          <Box>
            <Typography paragraph>
              歡迎來到Co-Side！以下是使用本平台的服務條款（以下簡稱“本條款”）。請仔細閱讀，因為這些條款將構成您與Co-Side之間的法律協議。
            </Typography>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>一、接受條款</Typography>
              <Typography>
                使用本平台，即表示您同意遵守本條款。如果您不同意這些條款，請勿使用本平台。
              </Typography>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>二、服務描述</Typography>
              <Typography>Co-Side是一個以媒合、利益大眾、行善、分享、合作與永續作為初衷的side project媒合平台，旨在幫助用戶尋找合作機會。通過本平台，您可以發布和查找專案，並與其他用戶聯繫，但不包含徵才。</Typography>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>三、用戶註冊</Typography>
              <Box component="ol" sx={{ mb: 0, listStylePosition: "inside", display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="li">
                  <strong>註冊要求：</strong>
                  <Typography sx={{ ml: 2 }}>
                    您必須年滿18歲才能註冊並使用本平台。
                  </Typography>
                </Box>
                <Box component="li">
                  <strong>帳號安全：</strong>
                  <Typography sx={{ ml: 2 }}>
                    您有責任保護您的帳號信息。任何使用您的帳號進行的活動將視為您本人所為。
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>四、用戶內容</Typography>
              <Box component="ol" sx={{ mb: 0, listStylePosition: "inside", display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="li">
                  <strong>內容所有權：</strong>
                  <Typography sx={{ ml: 2 }}>
                    您發布的內容（如專案描述、聯繫信息等）仍歸您所有，但您授予Co-Side全球性的、非排他的、免版稅的許可，以展示和使用這些內容。
                  </Typography>
                </Box>
                <Box component="li">
                  <strong>禁止內容：</strong>
                  <Box sx={{ ml: 2 }}>
                    <Typography>
                      嚴禁發布博弈、色情、詐欺等不適當的專案或內容。如果發現此類行為，我們將隱藏相關專案並停止該帳號的使用權。</Typography>
                    <Box component="ol" sx={{ mb: 0, listStylePosition: "inside", listStyleType: "lower-alpha" }}>
                      <Box component="li">
                        <strong>博弈相關項目：</strong>
                        <Typography sx={{ ml: 2 }}>
                          為了維護平台健康和用戶舒適的環境，與避免可能帶來的法律風險，平台禁止發布任何與博弈相關的專案。
                        </Typography>
                      </Box>
                      <Box component="li">
                        <strong>色情相關項目：</strong>
                        <Typography sx={{ ml: 2 }}>
                          為了維護平台健康和用戶舒適的環境，與避免可能帶來的法律風險，平台禁止發布任何與色情相關的專案。
                        </Typography>
                      </Box>
                      <Box component="li">
                        <strong>Web3金融相關項目：</strong>
                        <Typography sx={{ ml: 2 }}>
                          為了保障用戶的安全和利益，平台目前不接受涉及Web3金融（如加密貨幣投資、ICO等）的專案。如果您發布了此類專案，我們會先進行審核，如確定存在風險或詐欺嫌疑，將會隱藏該專案並通知您。重複違規的帳號將被暫停或終止使用權。
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>五、隱私政策</Typography>
              <Typography>我們非常重視您的隱私。請參閱我們的<Link href="/privacy" sx={{
                color: `${theme.palette.primary.main}`, textDecoration: "none",
                "&:hover": {
                  color: `${theme.palette.primary.dark}`
                }
              }}>《隱私權政策》</Link>以了解更多信息。</Typography>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>六、責任限制</Typography>
              <Box component="ol" sx={{ mb: 0, listStylePosition: "inside", display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="li">
                  <strong>服務提供：</strong>
                  <Typography sx={{ ml: 2 }}>
                    Co-Side按「現狀」和「可用」基礎提供服務，不作任何形式的保證。平台僅提供媒合服務。
                  </Typography>
                </Box>
                <Box component="li">
                  <strong>責任範圍：</strong>
                  <Typography sx={{ ml: 2 }}>
                    在法律允許的範圍內，Co-Side不對任何間接、偶然、特殊或後果性損害負責。
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>七、修改和終止</Typography>
              <Box component="ol" sx={{ mb: 0, listStylePosition: "inside", display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="li">
                  <strong>條款修改：</strong>
                  <Typography sx={{ ml: 2 }}>
                    Co-Side保留隨時修改本條款的權利。任何修改將在平台上公告，並即時生效。
                  </Typography>
                </Box>
                <Box component="li">
                  <strong>服務終止：</strong>
                  <Typography sx={{ ml: 2 }}>
                    Co-Side有權在任何時候，無需通知地暫停或終止您的帳號和使用權。
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>八、法律適用</Typography>
              <Typography>本條款受中華民國法律管轄。如有任何爭議，您同意接受中華民國法院之管轄。</Typography>
            </Box>

            <Box my={2}>
              <Typography variant="h6" fontWeight={"bold"}>九、聯絡方式</Typography>
              <Typography>
                如有任何疑問，請聯絡我們：
              </Typography>
              <Box component="ul" sx={{ listStylePosition: "inside" }}>
                <Box component="li">
                  電子郵件：<Link href="mailto:coside.service@gmail.com" sx={{
                    color: `${theme.palette.primary.black}`,
                    textDecoration: "none",
                    "&:hover": {
                      color: `${theme.palette.primary.main}`
                    }
                  }}>coside.service@gmail.com</Link>
                </Box>
              </Box>
            </Box>

          </Box>
          <Typography sx={{ marginTop: "32px" }} textAlign={"right"}>
            更新日期：2024/06/xx
          </Typography>
        </Box>
      </Container >
    </main >
  );
}
