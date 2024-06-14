import Image from "next/image";

import styles from "./page.module.css";
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";
import { Box, Grid, Typography } from "@mui/material";

const mockProjectCard: ProjectCardProps[] = [
{
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "IMPLEMENTING",
  characterTags: ["PM", "FE"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
},
{
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder2",
  projectTag: "IMPLEMENTING",
  characterTags: ["PM", "FE", "BE"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
},
{
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder3",
  projectTag: "IMPLEMENTING",
  characterTags: ["PM", "FE"],
  projectType: "app",
  projectDuration: "3 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
},
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Box sx={{ maxWidth: "1280px" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "start", marginTop: "87px", marginBottom: "44px" }}>
        <Typography color="black" sx={{ margin: "9px 0", fontWeight: "500", fontSize: "32px" }}>探索新專案</Typography>
      </Box>
      <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} spacing={1}>
      {mockProjectCard.map((card) => <ProjectCard projectCard={card} key={card.title}/>)}
      </Grid>
      </Box>
    </main>
  );
}
