import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { ProjectTag } from "./ProjectTag";
import { CharacterTag } from "./CharacterTag";

export interface ProjectCardProps {
  thumbnail: string;
  title: string;
  projectTag: string;
  characterTags: string[];
  projectOwner: string;
  projectOwnerAvatar: string;
}

const TEXT_MAP: Record<string, string> = {
  REQUIRE_POSITION_1: "徵",
  REQUIRE_POSITION_2: "求｜",
  PROJECT_OWNER: "發起人｜",
  CHECK: "查看專案",
};

export const ProjectCard = ({
  projectCard,
}: {
  projectCard: ProjectCardProps;
}) => {
  const {
    thumbnail,
    title,
    projectTag,
    characterTags,
    projectOwner,
    projectOwnerAvatar,
  } = projectCard;
  const renderCharacterTag = () =>
    characterTags.map((tag: string) => (
      <CharacterTag key={tag} character={tag} />
    ));

  return (
    <Card
      className="project-card"
      sx={{ width: "380px", borderRadius: "20px" }}
    >
      <CardMedia
        component="img"
        src={thumbnail}
        sx={{ height: "190px", width: "100%" }}
      />
      <CardContent sx={{ padding: "24px" }}>
        <ProjectTag projectTag={projectTag} />
        <Typography
          component="h2"
          sx={{ fontSize: "24px", fontWeight: "700", margin: "16px 0" }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              width: "65px",
              fontSize: "16px",
              color: "#4F4F4F",
              fontWeight: "700",
              marginRight: "4px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{TEXT_MAP.REQUIRE_POSITION_1}</span>
            <span>{TEXT_MAP.REQUIRE_POSITION_2}</span>
          </Typography>
          <Box sx={{ display: "flex" }}>{renderCharacterTag()}</Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
          <Typography
            sx={{
              width: "65px",
              fontSize: "16px",
              color: "#4F4F4F",
              fontWeight: "700",
              marginRight: "4px",
            }}
          >
            {TEXT_MAP.PROJECT_OWNER}
          </Typography>
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
              src={projectOwnerAvatar}
              alt={projectOwner}
              width={32}
              height={32}
            />
          </Box>
          <Typography sx={{ color: "#7C7C7C" }}>{projectOwner}</Typography>
        </Box>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "100%", color: "#FFFFFF" }}
        >
          {TEXT_MAP.CHECK}
        </Button>
      </CardContent>
    </Card>
  );
};
