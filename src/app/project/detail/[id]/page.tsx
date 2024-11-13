'use client';

import { useState } from 'react';
import styles from "../../../page.module.css";
import {
  Box,
  Typography
} from "@mui/material";
import Image from "next/image";
import UserInfoModal from "../../../../components/ProjectDetail/userInfoModal"; // 改為大寫開頭
import LoadingLottie from "../../../../components/LoadingLottie"; // 改為大寫開頭

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
  characterTags: ["PM", "FE"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

// 改為 default export 且函式名稱使用大寫開頭
export default function ProjectDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    projectOwner,
    projectOwnerAvatar,
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
        <Box sx={{ maxWidth: "1280px" }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "start", marginTop: "87px", marginBottom: "44px" }}>
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
              <Typography sx={{ color: "#7C7C7C" }}>{projectOwner}</Typography>
            </Box>
          </Box>
          <LoadingLottie />
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