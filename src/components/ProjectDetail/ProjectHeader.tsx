"use client";

import theme from "@/styles/theme";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";

const TEXT_MAP: Record<string, string> = {
  REQUIRE_TYPE: "專案類型",
  REQUIRE_DURATION: "預計時長",
  SPONSOR: "發起人",
};

export default function ProjectHeader({
  project,
  handleOpenModal,
  groupedMembers,
}) {
  const muiTheme = useTheme();
  const isBelowMd = useMediaQuery(muiTheme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "217px", sm: "217px", md: "449px" },
        }}
      >
        <Image
          src={
            project.background_Path
              ? `https://6181-13-115-215-106.ngrok-free.app/${project.background_Path}`
              : `/images/default/banner_coside_1.png`
          }
          alt={project.name}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.figma.neutral[80]}`,
          }}
          onError={(e) => {
            e.currentTarget.src =
              `https://6181-13-115-215-106.ngrok-free.app/images/default/banner_coside_1.png`;
          }}
        />
      </Box>
      <Box
        sx={{
          padding: { xs: 0, sm: 0, md: 5 },
          border: {
            xs: "none",
            sm: "none",
            md: `1px solid ${theme.palette.grey[200]}`,
          },
          borderRadius: "20px",
          display: { xs: "block", sm: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "top",
          gap: 2.5,
          mt: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            alignItems: "center",
            cursor: "pointer",
            mb: 1.5,
          }}
          onClick={handleOpenModal}
        >
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
              backgroundColor: theme.figma.neutral[100],
            }}
          >
            <Image
              src={`https://6181-13-115-215-106.ngrok-free.app/${project.creator.avatar}`}
              alt={project.creator.name}
              width={32}
              height={32}
            />
          </Box>
          <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>
            {project.creator.name}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "column",
            },
            gap: { xs: 1.5, sm: 1.5, md: 2.5 },
            width: { xs: "100%", sm: "100%", md: "50%" },
            mb: { xs: 1.5, sm: 1.5, md: 0 },
          }}
        >
          <ProjectTag projectTag={project.type} />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "36px", // 預設值
              lineHeight: "42px",
              height: "84px", // 2 行高度 = lineHeight * 2
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              [theme.breakpoints.down("md")]: {
                fontSize: "24px",
                lineHeight: "27px",
                height: "54px",
              },
            }}
          >
            {project.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "column",
            },
            width: { xs: "100%", sm: "100%", md: "50%" },
            gap: {
              xs: "14px",
              sm: "14px",
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                padding: "20px",
                backgroundColor: theme.figma.neutral[100],
                border: `1px solid ${theme.figma.neutral[80]}`,
                borderRadius: "12px",
              },
            }}
          >
            <Typography
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
                fontSize: "16px",
                color: "#4F4F4F",
                mb: "14px",
              }}
            >
              徵求
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {groupedMembers.map((member, index) => (
                <CharacterTag
                  key={`member-${member.role}-${index}`}
                  character={member.role}
                  type={isBelowMd ? "square" : "detailInfo"}
                  addText={isBelowMd ? `${member.count}名` : ""}
                />
              ))}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: { xs: 0, sm: 0, md: 2 },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                  marginRight: "6px",
                }}
              >
                {TEXT_MAP.REQUIRE_TYPE}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                }}
              >
                ｜
              </Typography>
              <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                {project.categories.map((category) => category).join(" / ")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                  marginRight: "6px",
                }}
              >
                {TEXT_MAP.REQUIRE_DURATION}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#4F4F4F",
                }}
              >
                ｜
              </Typography>
              <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                {project.duration}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#4F4F4F",
                marginRight: "6px",
                letterSpacing: "0.5em",
                textWrap: "nowrap",
                maxWidth: "4em",
              }}
            >
              {TEXT_MAP.SPONSOR}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#4F4F4F",
              }}
            >
              ｜
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleOpenModal}
            >
              <Box
                sx={{
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <Image
                  src={`https://6181-13-115-215-106.ngrok-free.app/${project.creator.avatar}`}
                  alt={project.creator.name}
                  width={24}
                  height={24}
                />
              </Box>
              <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                {project.creator.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
