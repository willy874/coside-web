"use client";

import MDXRenderer from "./MDXRenderer";
import theme from "@/styles/theme";
import { Box, Grid, Typography } from "@mui/material";
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
          color: theme.figma.Primary.normal_blue,
          mb: 2,
        }}
      >
        專案說明
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Box
            sx={{
              border: `1px solid ${theme.figma.Primary.normal_gray}`,
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
              border: `1px solid ${theme.figma.Primary.normal_gray}`,
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectInfo;
