import theme from "@/styles/theme";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material"; // 引入 Grid
import Image from "next/image";
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";

interface ProjectCardProps {
  thumbnail: string;
  title: string;
  projectTag: string;
  characterTags: string[];
  projectType: string;
  projectDuration: string;
  projectOwner: string;
  projectOwnerAvatar: string;
}

const projectCardData: ProjectCardProps = {
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder 尋蔬食者 VegeFinder 尋蔬食者 VegeFinder",
  projectTag: "專案落地",
  characterTags: ["PM", "Frontend"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

const UserInfoProjectList = () => {
  const { thumbnail, title, projectOwner, projectOwnerAvatar } =
    projectCardData;

  const list = [1, 2, 3];
  const muiTheme = useTheme();
  const isBelowMd = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <Grid container rowSpacing="11px" columnSpacing="11px">
      {list.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Box
            sx={{
              cursor: "pointer",
              border: `1px solid ${theme.palette.grey[200]}`,
              borderRadius: 3,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              "&:hover": {
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              width={100}
              height={isBelowMd ? 151 : 98}
              style={{
                display: "block",
                borderRadius: "0.5rem",
                objectFit: "cover",
                width: "100%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <ProjectTag projectTag={"專案落地"} />
              <Typography
                variant="body1"
                paragraph
                sx={{
                  marginBottom: 0,
                  color: "#FF5D5D",
                }}
              >
                發起人
              </Typography>
            </Box>
            <Typography
              variant="body1"
              component="h4"
              sx={{
                marginBottom: 0,
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "21px", // 控制行高
                height: "42px", // 確保正好 2 行
                display: "-webkit-box", // 讓 ellipsis 適用於多行
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // 限制最多 2 行
                overflow: "hidden",
                textOverflow: "ellipsis", // 必須搭配 -webkit-box 才能生效
              }}
            >
              {title}
            </Typography>
            <CharacterTag key={1} character={"UI/UX"} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserInfoProjectList;
