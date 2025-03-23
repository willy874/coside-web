"use client";

import theme from "@/styles/theme";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { projectGetById } from "@/api/project";
import { Box, Button } from "@mui/material";
import UserInfoModal from "@/components/ProjectDetail/userInfoModal";
import MobileSwipeableDrawer from "@/components/MobileSwipeableDrawer";
import ProjectAccordion from "@/components/ProjectDetail/ProjectAccordion";
import ProjectHeader from "@/components/ProjectDetail/ProjectHeader";
import ProjectInfo from "@/components/ProjectDetail/ProjectInfo";

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
  const [groupedMembers, setGroupedMembers] = useState([]);

  const createMailtoLink = (project, userName) => {
    const subject = `【${project.name}】Side project 合作詢問`;

    const body = `Hi ${project.creator.name}，
  
  我是 {使用者名稱}，是 {使用者主要職位}
  
  我在 CoSide 上看到你發起的專案，對於(專案中感興趣的部分)特別感興趣/有共鳴，想進一步了解～
  
  我能協助的方向：
  （技能＋具體貢獻）
  （例：我有 2 年的資料分析經驗，能協助模型調校與數據視覺化呈現）
  
  方便的時間：
  （可選 2-3 個時間或開放式詢問）
  想請問以上哪個時間對你比較方便呢？或可提供你方便的時間
  
  希望有機會與你進一步交流，期待你的回覆！
  
  Best,
  {使用者名稱}`;

    return `mailto:${project.creator.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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
            const existingMemberIndex = mergedMembers.findIndex(
              (m) => m.role === member.role
            );

            if (existingMemberIndex === -1) {
              // 只保留 role 並設置 count 為 1
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
          });

          console.log(mergedMembers);
          setGroupedMembers(mergedMembers);
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
      <Box sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: {
              xs: "#F1F7FF",
              sm: "#F1F7FF",
              md: "transparent",
            },
            padding: "80px 4% 0",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1224px",
              marginTop: { xs: "28px", sm: "28px", md: "40px" },
            }}
          >
            <ProjectHeader
              project={project}
              handleOpenModal={handleOpenModal}
              groupedMembers={groupedMembers}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: {
              xs: "32px 4% 80px",
              sm: "32px 4% 80px",
              md: "0 4% 80px",
            },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1224px" }}>
            <ProjectInfo project={project} />
          </Box>
        </Box>
        <UserInfoModal
          userId={project.creator.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          {...projectCardData}
        />
        <MobileSwipeableDrawer
          title={"查看徵求職位"}
          content={
            <>
              <ProjectAccordion project={project} />
              <a
                href={createMailtoLink(project, "test")}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: theme.figma.neutral[100],
                    bgcolor: theme.figma.Primary.normal_blue,
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    padding: "10px 16px",
                    fontSize: "16px",
                    lineHeight: "19px",
                    "&:hover": {
                      bgcolor: theme.figma.btn.fill.bg_hover_blue,
                    },
                  }}
                >
                  聯絡發起人
                </Button>
              </a>
            </>
          }
        />
      </Box>
    </>
  );
}
