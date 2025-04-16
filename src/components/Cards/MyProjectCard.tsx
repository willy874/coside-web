import theme from "@/styles/theme";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { ProjectTag } from "../ProjectTag";
import { CharacterTag } from "../CharacterTag";
import useLoginStore from "@/stores/loginStore";

export interface MyProjectCardProps {
  background_Path: string;
  categories: string[];
  duration: string;
  id: string;
  is_Creator: boolean;
  name: string;
  type: string;
}

export const MyProjectCard = ({
  project,
}: {
  project: MyProjectCardProps;
}) => {
  const { userInfo } = useLoginStore(); // 你自己的登入 store

  return (
    <Grid item sx={{ height: "100%" }}>
      <Link href={`/project/${project.is_Creator ? "edit/" + project.id : project.id}`} style={{ display: "block", height: "100%" }}>
        <Card
          className="project-card"
          sx={{
            border: `solid 1px ${theme.figma.Primary.normal_gray}`, boxShadow: "none", borderRadius: "20px", minWidth: { xs: "auto", sm: "320px" }, width: "100%", height: "100%", display: "flex", flexDirection: "column"
            , "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }
          }}
        >
          <CardMedia
            component="img"
            src={project.background_Path
              ? `https://6181-13-115-215-106.ngrok-free.app/${project.background_Path}`
              : `/images/default/banner_coside_1.png`}
            sx={{ height: "190px", width: "100%", borderBottom: `1px solid ${theme.figma.neutral[80]}` }}
            onError={(e) => {
              e.currentTarget.src = `https://6181-13-115-215-106.ngrok-free.app/images/default/banner_coside_1.png`;
            }}
          />

          <CardContent sx={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: 1 }}>
            <Box sx={{ marginBottom: "auto", width: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <ProjectTag projectTag={project.type} />
                {project.is_Creator ?
                  <Typography sx={{ color: theme.figma.project_tags.sideproject_implement, fontSize: "16px", lineHeight: "19px", fontWeight: "bold" }}>發起人</Typography>
                  :
                  <Typography sx={{ color: theme.figma.neutral[60], fontSize: "16px", lineHeight: "19px" }}>參與者</Typography>
                }
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "20px 0",
                  lineHeight: "27px", // 控制行高
                  height: "54px", // 確保正好 2 行
                  display: "-webkit-box", // 讓 ellipsis 適用於多行
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // 限制最多 2 行
                  overflow: "hidden",
                  textOverflow: "ellipsis", // 必須搭配 -webkit-box 才能生效
                }}
              >
                {project.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: `${theme.figma.neutral[60]}`,
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                <span>{project.categories.join(" / ")}・{project.duration}</span>
              </Typography>
            </Box>
            <CharacterTag character={userInfo.role} />
          </CardContent>
        </Card>
      </Link>
    </Grid >
  );
};
