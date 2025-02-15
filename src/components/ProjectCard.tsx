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
    <Grid item xs={1} sm={1} md={1} lg={1}>
      <Link href={`/project/detail/${project.id}`}>
        <Card
          className="project-card"
          sx={{ borderRadius: "20px", minWidth: "320px" }}
        >
          <CardMedia
            component="img"
            src={"https://c105-13-115-215-106.ngrok-free.app/images/default/banner_coside_1.png"}
            sx={{ height: "190px", width: "100%", borderBottom: `1px solid ${theme.neutral[80]}` }}
          />
          <CardContent sx={{ padding: "24px" }}>
            <ProjectTag projectTag={project.type} />
            <Typography
              component="h2"
              sx={{ fontSize: "24px", fontWeight: "700", margin: "16px 0" }}
            >
              {project.name}
            </Typography>
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
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                  fontWeight: "700",
                  marginRight: "6px",
                }}
              >
                <span>{TEXT_MAP.REQUIRE_TYPE}</span>
              </Typography>
              <Box sx={{ color: "#7C7C7C" }}>{project.industry}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                  fontWeight: "700",
                  marginRight: "6px",
                }}
              >
                <span>{TEXT_MAP.REQUIRE_DURATION}</span>
              </Typography>
              <Box sx={{ color: "#7C7C7C" }}>{project.duration}</Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <Image
                  src={`https://c105-13-115-215-106.ngrok-free.app/${project.creator.avatar}`}
                  alt={project.creator.name}
                  width={32}
                  height={32}
                />
              </Box>
              <Typography sx={{ color: "#7C7C7C" }}>{project.creator.name}</Typography>
            </Box>
            {/* <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%", color: "#FFFFFF", borderRadius: "12px"}}
          >
            {TEXT_MAP.CHECK}
          </Button> */}
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};
