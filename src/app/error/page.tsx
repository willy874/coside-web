"use client";

import { useRouter } from "next/navigation";
import RedirectAlert from "@/components/RedirectAlert";
import { Container } from "@mui/material";

export default function Error() {
  const router = useRouter();

  return (
    <main>
      <Container sx={{
        maxWidth: "1224px",
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: { xs: "80px 4% 40px", md: "80px 4%" },
      }}>
        <RedirectAlert
          themeColor="purple"
          imageSrc="/page_error.svg"
          imageAlt="Page Error"
          title={<>
            恩？似乎有股神秘的力量<br />
            試圖讓你看不到任何東西
          </>}
          buttons={[
            {
              text: "前往探索專案",
              onClick: () => router.push("/"),
              variant: "outline",
            },
            {
              text: "重新整理",
              onClick: () => router.back(),
              variant: "fill",
            },
          ]}
        />
      </Container>
    </main >
  )
}