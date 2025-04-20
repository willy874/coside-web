"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import { projectGetById } from "@/api/project";
import { Box, Container, CircularProgress } from "@mui/material";
import UserInfoModal from "@/components/ProjectDetail/userInfoModal";
import MobileSwipeableDrawer from "@/components/MobileSwipeableDrawer";
import ProjectAccordion from "@/components/ProjectDetail/ProjectAccordion";
import ProjectHeader from "@/components/ProjectDetail/ProjectHeader";
import ProjectInfo from "@/components/ProjectDetail/ProjectInfo";
import RedirectAlert from "@/components/RedirectAlert";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams(); // 取得動態路由參數
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupedMembers, setGroupedMembers] = useState([]);

  useEffect(() => {
    const fetchData = async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await projectGetById(id);
        if (data.success) {
          setProject(data.data);
          console.log(data.data);

          const mergedMembers = [];
          const roleCount = {};

          data.data.members.forEach((member) => {
            if (member.email === null) {
              const existingMemberIndex = mergedMembers.findIndex(
                (m) => m.role === member.role
              );

              if (existingMemberIndex === -1) {
                // 只保留有缺人的 role 並設置 count 為 1
                roleCount[member.role] = 1;
                mergedMembers.push({
                  role: member.role,
                  count: 1,
                });
              } else {
                // 增加已存在角色的計數
                roleCount[member.role]++;
                mergedMembers[existingMemberIndex].count = roleCount[member.role];
              }
            }
          });

          console.log(mergedMembers);
          setGroupedMembers(mergedMembers);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    const id = Array.isArray(params.id) ? params.id[0] : params.id; // 確保 id 是 string

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

  return (
    <>
      <main className={styles.main}>
        {isLoading ?
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: { xs: "28px", md: "40px" },
            }}
          >
            <CircularProgress color="warning" />
          </Box>
          :
          project.status === "close" ?
            <Container sx={{
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}>
              <RedirectAlert
                themeColor="blue"
                imageSrc="/project_close.svg"
                imageAlt="Project Close"
                title={<>
                  你好像太晚報到了！<br />
                  這個專案已啟航，嶄開他全新的冒險
                </>}
                buttons={[
                  {
                    text: "探索其他專案",
                    onClick: () => router.push("/"),
                    variant: "fill",
                  }
                ]}
              />
            </Container > :
            <>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "1224px",
                  marginTop: { xs: "28px", md: "40px" },
                }}
              >
                <ProjectHeader
                  project={project}
                  handleOpenModal={handleOpenModal}
                  groupedMembers={groupedMembers}
                />
              </Box>
              <Box sx={{
                width: "100%", maxWidth: "1224px",
                marginBottom: { xs: groupedMembers.length > 0 ? "70px" : "0", md: "0" },
              }}>
                <ProjectInfo project={project} />
              </Box>
              <UserInfoModal
                creatorId={project.creator.id}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
              {groupedMembers.length > 0 && (
                <MobileSwipeableDrawer
                  title={"查看徵求職位"}
                  content={
                    <ProjectAccordion project={project} />
                  }
                />
              )}
            </>
        }
      </main>

    </>
  );
}
