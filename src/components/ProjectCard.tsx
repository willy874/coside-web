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

import { ProjectTag } from "./ProjectTag";
import { CharacterTag } from "./CharacterTag";
import { useEffect } from "react";

export interface ProjectCardProps {
  categories: string[];
  creator: {
    name: string;
    avatar: string;
  };
  duration: string;
  id: string;
  industry: string;
  name: string;
  roles: string[];
  type: string;
  background_Path: string;
}

const TEXT_MAP: Record<string, string> = {
  REQUIRE_POSITION: "徵求｜",
  REQUIRE_TYPE: "類型｜",
  REQUIRE_DURATION: "時長｜",
};

export const ProjectCard = ({
  project,
}: {
  project: ProjectCardProps;
}) => {
  const renderCharacterTag = () =>
    project.roles.map((tag: string) => (
      <CharacterTag key={tag} character={tag} />
    ));

  return (
    <Grid item sx={{ height: "100%" }}>
      <Link href={`/project/detail/${project.id}`} style={{ display: "block", height: "100%" }}>
        <Card
          className="project-card"
          sx={{
            border: `solid 1px ${theme.figma.primary.normal_gray}`, boxShadow: "none", borderRadius: "20px", minWidth: { xs: "auto", sm: "320px" }, width: "100%", height: "100%", minHeight: { xs: "474px", sm: "474px", md: "482px" }, display: "flex", flexDirection: "column"
            , "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }
          }}
        >
          <CardMedia
            component="img"
            src={project.background_Path
              ? `https://c105-13-115-215-106.ngrok-free.app/${project.background_Path}`
              : "https://c105-13-115-215-106.ngrok-free.app/images/default/banner_coside_1.png"}
            sx={{ height: "190px", width: "100%", borderBottom: `1px solid ${theme.figma.neutral[80]}` }}
            onError={(e) => {
              e.currentTarget.src = "https://c105-13-115-215-106.ngrok-free.app/images/default/banner_coside_1.png";
            }}
          />

          <CardContent sx={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Box sx={{ marginBottom: "auto" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ProjectTag projectTag={project.type} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={`https://c105-13-115-215-106.ngrok-free.app/${project.creator.avatar}`}
                    alt={project.creator.name}
                    width={24}
                    height={24}
                    style={{
                      display: "block",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                  <Typography sx={{ color: "#7C7C7C" }}>{project.creator.name}</Typography>
                </Box>
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "24px 0",
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
                  marginBottom: "24px",
                }}
              >
                <span>{project.categories.join(" / ")}・{project.duration}</span>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                  fontWeight: "700",
                  marginRight: "6px",
                }}
              >
                <span>{TEXT_MAP.REQUIRE_POSITION}</span>
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {renderCharacterTag()}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid >
  );
};
