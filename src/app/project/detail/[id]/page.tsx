'use client';

import { useState } from 'react';
import theme from "@/styles/theme";
import styles from "../../../page.module.css";
import {
  Box,
  Typography
} from "@mui/material";
import Image from "next/image";
import UserInfoModal from "../../../../components/ProjectDetail/userInfoModal"; // 改為大寫開頭
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";

const TEXT_MAP: Record<string, string> = {
  REQUIRE_TYPE: "專案類型｜",
  REQUIRE_DURATION: "預計時長｜",
  SPONSOR: "發起人 | ",
  // CHECK: "查看專案",
};

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

const projectCardData: ProjectCardProps = { // 改名為 projectCardData 並加上型別註記
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "IMPLEMENTING",
  characterTags: ["PM", "FE", "BE"],
  projectType: "App",
  projectDuration: "6個月以上",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

// 改為 default export 且函式名稱使用大寫開頭
export default function ProjectDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    projectOwner,
    projectOwnerAvatar,
    thumbnail,
    projectType,
    projectDuration
  } = projectCardData; // 使用更名後的變數

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main className={styles.main}>
        <Box sx={{ width: "100%", maxWidth: "1224px" }}>
          <Box sx={{ width: "100%", marginTop: "40px", marginBottom: "44px" }}>
            <div style={{ position: 'relative', width: '100%', height: '449px' }}>
              <Image
                src={thumbnail}
                alt={thumbnail}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', borderRadius: "12px" }}
              />
            </div>
            <Box></Box>
            <Box
              sx={{
                padding: 5,
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'top',
                gap: 2.5,
                marginBottom: 1.5,
                mt: 3
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  width: '50%'
                }}>
                <ProjectTag projectTag={'IMPLEMENTING'} />
                <Typography variant="h4" component="h2" sx={{
                  marginBottom: 0,
                  fontWeight: 'bold'
                }}>
                  尋蔬食者 VegeFinder尋蔬食者 VegeFinder
                </Typography>
              </Box>
              <Box
                sx={{ width: '50%' }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CharacterTag key={'PM'} character={'PM'} />
                  <CharacterTag key={'FE'} character={'FE'} />
                  <CharacterTag key={'BE'} character={'BE'} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#4F4F4F",
                      marginRight: "6px",
                    }}
                  >
                    <span>{TEXT_MAP.REQUIRE_TYPE}</span>
                  </Typography>
                  <Box sx={{ color: "#7C7C7C", fontWeight: "700" }}>{projectType}</Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#4F4F4F",
                      marginRight: "6px",
                    }}
                  >
                    <span>{TEXT_MAP.REQUIRE_DURATION}</span>
                  </Typography>
                  <Box sx={{ color: "#7C7C7C", fontWeight: "700" }}>{projectDuration}</Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#4F4F4F",
                      marginRight: "6px",
                    }}
                  >
                    <span>{TEXT_MAP.REQUIRE_DURATION}</span>
                  </Typography>
                  <Box
                    onClick={handleOpenModal}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer" // 加入游標樣式
                    }}
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
                      }}
                    >
                      <Image
                        src={projectOwnerAvatar}
                        alt={projectOwner}
                        width={32}
                        height={32}
                      />
                    </Box>
                    <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>{projectOwner}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </main>
      <UserInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        {...projectCardData}
      />
    </>
  );
}