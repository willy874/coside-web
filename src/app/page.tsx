"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";
import HandleToken from "@/components/Auth/HandleToken";
import FilterDropdownList from "@/components/FilterDropdownList";
import BackToTopButton from "@/components/BackToTopButton";
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { projectGetByFilter } from "@/api/project";
import { Suspense } from "react";
import theme from "@/styles/theme";

export default function Home() {
  const [nowPage, setNowPage] = useState(1);
  const [size, setSize] = useState(12);
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterParams, setFilterParams] = useState(null);
  const [initialLoaded, setInitialLoaded] = useState(false); // 新增狀態來追蹤初始載入是否完成
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const fetchData = useCallback(async (page: number) => {
    if (loading) return; // Prevent multiple simultaneous requests

    setLoading(true);
    try {
      console.log(filterParams, "filterParams"); // Check filterParams
      const data = await projectGetByFilter(page, size, filterParams);

      // Set initialLoaded to true after first fetch completes
      setInitialLoaded(true);

      // Check if the response is null or if there's no data
      if (!data || !data.success || !data.data || !data.data.projects) {
        setHasMore(false);
        return;
      }

      setProjects((prevProjects) => {
        // Only merge with previous projects if we're not on page 1
        const baseProjects = page === 1 ? [] : prevProjects;

        const newProjects = data.data.projects.filter(
          (newProject) =>
            !baseProjects.some(
              (existingProject) => existingProject.id === newProject.id
            )
        );

        // If no new projects were added, we've reached the end
        if (newProjects.length === 0) {
          setHasMore(false);
        }

        return [...baseProjects, ...newProjects];
      });

      // If fewer projects than requested size, we've reached the end
      if (data.data.projects.length < size) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
      setHasMore(false); // On error, also stop loading more
      setInitialLoaded(true); // 即使出錯也標記為已載入完成
    } finally {
      setLoading(false);
    }
  }, [loading, size, filterParams]);

  // Effect to handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Trigger when close to bottom
      if (scrollTop + windowHeight >= fullHeight - 300 && !loading && hasMore) {
        setNowPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleFilterApply = (filters) => {
    // Reset page and fetch with new filters
    setProjects([]);
    setHasMore(true);
    setFilterParams(filters);
    setNowPage(1);
    setInitialLoaded(false); // 重置初始載入狀態，因為我們要重新搜索
  };

  // Effect to fetch data when page changes
  useEffect(() => {
    fetchData(nowPage); // Fetch data for the current page
  }, [nowPage, filterParams]); // Trigger fetch when either page or filters change

  return (
    <main className={styles.main}>
      <Box sx={{
        maxWidth: "1224px", width: "100%", flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: { xs: "40px", sm: "40px", md: "87px" },
            marginBottom: { xs: "20px", sm: "20px", md: "44px" },
          }}
        >
          <Typography
            sx={{
              margin: "8px 0",
              fontWeight: "700",
              fontSize: { xs: "24px", sm: "24px", md: "32px" },
              lineHeight: { xs: "28px", sm: "28px", md: "38px" },
            }}
          >
            探索新專案
          </Typography>
          <FilterDropdownList onFilterApply={handleFilterApply} />
        </Box>
        
        {/* 初始加載狀態 */}
        {!initialLoaded && (
          <Box sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50vh"
          }}>
            <CircularProgress color="warning" />
          </Box>
        )}
        
        {/* 已加載但沒有項目 */}
        {initialLoaded && projects.length === 0 && (
          <Box sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%"
          }}>
            <Image src="/project_empty.svg" alt="No Projects"
              width={isMd ? 80 : 200} // 根據螢幕大小改變寬度
              height={isMd ? 80 : 200} // 根據螢幕大小改變高度
              style={{ margin: "0 auto", display: "block" }} />
            <Typography sx={{
              color: "rgba(0, 125, 195, 0.5)",
              mt: { xs: "19px", sm: "19px", md: "32px" },
              fontSize: { xs: "16px", sm: "16px", md: "32px" },
              lineHeight: { xs: "26px", sm: "26px", md: "45px" },
              fontWeight: "bold",
              textAlign: "center",
            }}>
              這裡還沒有專案<br />
              或許你的想法可以成為第一個！
            </Typography>
          </Box>
        )}
        
        {/* 有項目時顯示項目列表 */}
        {initialLoaded && projects.length > 0 && (
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
            rowSpacing={{ sm: 2.5, xs: 2.5, md: 4 }}
            columnSpacing={3}
          >
            {projects.map((project) => (
              <Grid item xs={1} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 載入更多的指示器（只在有專案且正在加載時顯示） */}
        {loading && initialLoaded && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "20px",
            }}
          >
            <CircularProgress color="warning" />
          </Box>
        )}

        {/* 沒有更多項目的提示 */}
        {initialLoaded && !hasMore && projects.length > 0 && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              lineHeight: "23px",
              mt: "66px",
            }}
          >你已經看完所有專案</Typography>
        )}

        <Box position="fixed" sx={{
          bottom: { xs: "32px", sm: "32px", md: "5vh" },
          right: { xs: "32px", sm: "32px", md: "4vw" },
          zIndex: 999,
        }}>
          <Button
            LinkComponent={Link}
            variant="contained"
            href="/project/create"
            color="warning"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: { xs: "14px", sm: "14px", md: "20px 33px" },
              borderRadius: { xs: "50%", sm: "50%", md: "40px" },
              boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.2)",
              color: theme.figma.form.text_default,
              bgcolor: theme.figma.Tertiary.yellow,
            }}
          >
            <AddIcon sx={{
              width: { xs: "40px", sm: "40px", md: "24px" },
              height: { xs: "40px", sm: "40px", md: "24px" },
              marginRight: { xs: 0, sm: 0, md: "10px" },
            }} />
            <Typography sx={{
              display: { xs: "none", sm: "none", md: "block" },
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "400",
            }}>發起專案</Typography>
          </Button>
        </Box>
      </Box>
      <Suspense>
        <HandleToken />
      </Suspense>
      <BackToTopButton />
    </main >
  );
}