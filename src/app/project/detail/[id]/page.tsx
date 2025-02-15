"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import theme from "@/styles/theme";
import styles from "../../../page.module.css";
import { projectGetById } from "@/api/project";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import UserInfoModal from "@/components/ProjectDetail/UserInfoModal";
import ProjectInfo from "@/components/ProjectDetail/ProjectInfo";
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";

const TEXT_MAP: Record<string, string> = {
  REQUIRE_TYPE: "專案類型｜",
  REQUIRE_DURATION: "預計時長｜",
  SPONSOR: "發  起  人｜",
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

const projectCardData: ProjectCardProps = {
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "專案落地",
  characterTags: ["PM", "Frontend", "Backend"],
  projectType: "App",
  projectDuration: "6個月以上",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

export default function ProjectDetailPage() {
  const params = useParams(); // 取得動態路由參數
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await projectGetById(id);
        if (data.success) {
          setProject(data.data);
          console.log(data.data)
        } else {
          setError(data.message || "Failed to fetch project");
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    const id = params.id; // 從 params.id 取得專案 ID

    if (id) {
      fetchData(id);
    } else {
      console.warn("Project ID not found in URL.");
      setError("Project ID not found.");
      setIsLoading(false);
    }
  }, [params]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <div className={styles.main}>
        <Box sx={{ width: "100%", maxWidth: "1224px" }}>
          <Box sx={{ width: "100%", marginTop: "40px", marginBottom: "44px" }}>
            <div
              style={{ position: "relative", width: "100%", height: "449px" }}
            >
              <Image
                src={`https://c105-13-115-215-106.ngrok-free.app/${project.background_path}`}
                alt={project.name}
                fill
                sizes="100vw"
                style={{ objectFit: "cover", borderRadius: "12px", border: `1px solid ${theme.neutral[80]}` }}
              />
            </div>
            <Box
              sx={{
                padding: 5,
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "top",
                gap: 2.5,
                marginBottom: 1.5,
                mt: 3,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  width: "50%",
                }}
              >
                <ProjectTag projectTag={project.type} />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    marginBottom: 0,
                    fontWeight: "bold",
                  }}
                >
                  {project.name}
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {project.members.map((member, index) => (
                    <CharacterTag key={index} character={member.role} />
                  ))}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography sx={{ fontSize: "16px", color: "#4F4F4F", marginRight: "6px" }}>
                    <span>{TEXT_MAP.REQUIRE_TYPE}</span>
                  </Typography>
                  <Box sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                    {project.industry}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography sx={{ fontSize: "16px", color: "#4F4F4F", marginRight: "6px" }}>
                    <span>{TEXT_MAP.REQUIRE_DURATION}</span>
                  </Typography>
                  <Box sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                    {project.duration}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                  <Typography sx={{ fontSize: "16px", color: "#4F4F4F", marginRight: "6px" }}>
                    <span>{TEXT_MAP.SPONSOR}</span>
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
                    <Typography sx={{ color: "#7C7C7C", fontWeight: "700" }}>
                      {project.creator.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <ProjectInfo />
        </Box>
      </div>
      <UserInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        {...projectCardData}
      />
    </>
  );
}
