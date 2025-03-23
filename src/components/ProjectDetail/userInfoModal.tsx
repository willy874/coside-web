"use client";

import { useEffect } from "react";
import { Box, Typography, Modal, Grid, Button } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import theme from "@/styles/theme";
import Image from "next/image";
import UserInfoProjectList from "@/components/ProjectDetail/UserInfoProjectList";
import Link from "next/link";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface ProjectCardModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

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
  // 改名為 projectCardData 並加上型別註記
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "專案落地",
  characterTags: ["PM", "Frontend"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan Lee",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

const ProjectCardModal = ({ userId, isOpen, onClose }: ProjectCardModalProps) => {
  const { thumbnail, title, projectOwner, projectOwnerAvatar } =
    projectCardData;
  const muiTheme = useTheme();
  const isBelowMd = useMediaQuery(muiTheme.breakpoints.down("md"));
  let userData = null;

  const links = [
    { icon: "/email.svg", link: "google@gmail.com" },
    { icon: "/instagram.svg", link: "instagram.com" },
    { icon: "/facebook.svg", link: "facebook.com" },
    { icon: "/website.svg", link: "website.com" },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="project-modal"
      aria-describedby="project-details"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.3)", // 這裡設定背景色，黑色透明 50%
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 820,
          width: "calc(100% - 40px)",
          maxHeight: "calc(100% - 88px)",
          bgcolor: theme.figma.neutral[100],
          borderRadius: "12px",
          boxShadow: 24,
          overflow: "hidden",
          outline: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // 啟用滾動
          }}
        >
          <Box
            sx={{
              background: `
            linear-gradient(
              to bottom right,
              rgba(109, 80, 242, 0.5) 0%,
              rgba(186, 89, 235, 0.5) 50%,
              rgba(232, 107, 233, 0.5) 100%
            )`,
              height: isBelowMd ? "93px" : "135px",
              position: "relative",
            }}
          >
            <Image
              src={projectOwnerAvatar}
              alt={projectOwner}
              width={isBelowMd ? 86 : 110}
              height={isBelowMd ? 86 : 110}
              style={{
                marginRight: "0.75rem",
                position: "absolute",
                bottom: "0",
                left: isBelowMd ? "50%" : "48px",
                transform: isBelowMd
                  ? "translate(-50%, 50%)"
                  : "translateY(50%)",
                outline: "4px solid #fff",
                borderRadius: "50%",
              }}
              priority
            />
            <Box
              onClick={onClose}
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "24px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              ✕
            </Box>
          </Box>
          <Box
            sx={{
              pl: isBelowMd ? "16px" : "48px",
              pr: isBelowMd ? "16px" : "48px",
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "flex-end",
                pt: isBelowMd ? "60px" : "18px",
                pb: "20px",
                minHeight: "200px",
              }}
              rowSpacing="26px"
              columnSpacing="49px"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  textAlign: isBelowMd ? "center" : "left",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    marginBottom: "12px",
                    fontSize: "24px",
                    lineHeight: "29px",
                    fontWeight: "bold",
                  }}
                >
                  {projectOwner}
                </Typography>
                <Typography
                  sx={{
                    color: theme.figma.profession_tags.outline_uiux,
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontWeight: "bold",
                    mb: "20px",
                  }}
                >
                  UIUX/Product Designer
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isBelowMd ? "center" : "flex-start",
                    gap: 2,
                  }}
                >
                  {/* social media */}
                  {links.map((link, index) => (
                    <Link href={link.link} key={index}>
                      <Image
                        src={link.icon}
                        alt={link.link}
                        width={24}
                        height={24}
                        style={{ display: "block" }}
                      />
                    </Link>
                  ))}
                </Box>
                <Button
                  component="a"
                  href="#"
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: "#FFFFFF",
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: isBelowMd ? "none" : "block",
                    textAlign: "center",
                    mt: "20px",
                  }}
                >
                  編輯個人檔案
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                sx={{
                  textAlign: isBelowMd ? "center" : "left",
                }}
              >
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    display: "inline-block",
                    fontSize: "14px",
                    lineHeight: "17px",
                    padding: "6px 12px",
                    marginBottom: "13px",
                    borderRadius: "100px",

                    bgcolor: theme.figma.Primary.light_gray,
                    color: theme.figma.neutral[50],
                  }}
                >
                  參與專案 2
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    padding: 2,
                    backgroundColor: "#F1F7FF",
                    borderRadius: "12px",
                    minHeight: "158px",
                    mb: 0,
                    textAlign: "left",
                  }}
                >
                  於新創軟體社企
                  <br />
                  擔任的Product Designer & Manager
                  <br />
                  <br />
                  持續關注永續議題
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  display: isBelowMd ? "block" : "none",
                  mb: "10px",
                }}
              >
                <Button
                  component="a"
                  href="#"
                  color="primary"
                  variant="contained"
                  sx={{
                    color: theme.figma.Primary.white,
                    bgcolor: theme.figma.Primary.normal_blue,
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "8px",
                    "&:hover": {
                      bgcolor: theme.figma.btn.fill.bg_hover_blue,
                    },
                  }}
                >
                  <EditOutlinedIcon
                    sx={{
                      fontSize: "20px",
                      lineHeight: "20px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "24px",
                    }}
                  >
                    編輯個人檔案
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pt: "32px",
                pb: "48px",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  color: theme.figma.Primary.dark_gray,
                  marginBottom: 1.5,
                  fontWeight: "bold",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                參與專案
              </Typography>
              <UserInfoProjectList />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectCardModal;
