"use client";

import MDXRenderer from "./MDXRenderer";
import theme from "@/styles/theme";
import { Box, Button, Grid, Typography } from "@mui/material";
import ProjectAccordion from "@/components/ProjectDetail/ProjectAccordion";

const ProjectInfo = ({ project }) => {
  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          fontWeight: "bold",
          width: "100%",
          color: theme.primary.normal_blue,
          mb: 2,
        }}
      >
        專案說明
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Box
            sx={{
              border: `1px solid ${theme.primary.normal_gray}`,
              borderRadius: { xs: "12px", sm: "12px", md: "20px" },
              padding: { xs: "32px", sm: "32px", md: "32px 24px" },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                fontWeight: "bold",
                mb: 1.5,
              }}
            >
              專案說明
            </Typography>
            <Box>
              <MDXRenderer content={project.description} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              border: `1px solid ${theme.primary.normal_gray}`,
              borderRadius: "20px",
              padding: "32px 24px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              徵求職位
            </Typography>
            <ProjectAccordion project={project} />

            <Button
              component="a"
              href={`mailto:${project.creator.email}?
              subject=${encodeURIComponent(`【${project.name}】Side project 合作詢問`)}&
              body=${encodeURIComponent(`Hi ${project.creator.name}，

              我是 {使用者名稱}，是{使用者主要職位}

              我在 CoSide 上看到你發起的專案，對於(專案中感興趣的部分)特別感興趣/有共鳴，想進一步了解～

              我能協助的方向：
              （技能＋具體貢獻）
              （例：我有 2 年的資料分析經驗，能協助模型調校與數據視覺化呈現）

              方便的時間：
              （可選 2-3 個時間或開放式詢問）
              想請問以上哪個時間對你比較方便呢？或可提供你方便的時間

              希望有機會與你進一步交流，期待你的回覆！

              Best,
              {使用者名稱}`)}`}
              color="primary"
              variant="contained"
              sx={{
                width: "100%",
                color: theme.primary.white,
                bgcolor: theme.primary.normal_blue,
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
                padding: "10px 16px",
                fontSize: "16px",
                lineHeight: "19px",
                "&:hover": {
                  bgcolor: theme.btn.fill_bg_hover_blue,
                },
              }}
            >
              聯絡發起人
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectInfo;
