"use client";

import { useEffect, useState, useRef, useCallback, use } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";
import HandleToken from "@/components/Auth/HandleToken";
import FilterDropdownList from "@/components/FilterDropdownList";
import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { projectGetByFilter } from "@/api/project";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [nowPage, setNowPage] = useState(1);
  const [size, setSize] = useState(12);
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterParams, setFilterParams] = useState(null); // 

  // 參考元素，用於觀察何時滾動到底部
  const observer = useRef<IntersectionObserver>();
  // 用於觀察的最後一個項目
  const lastProjectElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setNowPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const data = await projectGetByFilter(page, size, filterParams);
      console.log(data);

      // Check if the response is null or if there's no data
      if (!data || !data.success || !data.data || !data.data.projects) {
        setHasMore(false);
        return;
      }

      setProjects((prevProjects) => {
        const newProjects = data.data.projects.filter(
          (newProject) =>
            !prevProjects.some(
              (existingProject) => existingProject.id === newProject.id
            )
        );

        // If no new projects were added, we've reached the end
        if (newProjects.length === 0) {
          setHasMore(false);
        }

        return [...prevProjects, ...newProjects];
      });

      // If fewer projects than requested size, we've reached the end
      if (data.data.projects.length < size) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
      setHasMore(false); // On error, also stop loading more
    } finally {
      setLoading(false);
    }
  }, [size, filterParams]);

  const handleFilterApply = (filters) => {
    setFilterParams(filters);
  };

  useEffect(() => {
    if (loading || !hasMore) return;
    console.log(nowPage)
    fetchData(nowPage);
  }, [nowPage, fetchData, hasMore, loading]); // 當頁碼變化時重新獲取數據

  useEffect(() => {
    setNowPage(1);
    setProjects([]);
    setHasMore(true);
    fetchData(1);
  }, [filterParams, fetchData]);

  return (
    <main className={styles.main}>
      <Box sx={{ maxWidth: "1224px", width: "100%" }}>
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
              margin: "9px 0",
              fontWeight: "700",
              fontSize: { xs: "24px", sm: "24px", md: "32px" },
            }}
          >
            探索新專案
          </Typography>
          <FilterDropdownList onFilterApply={handleFilterApply} />
        </Box>
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
          rowSpacing={{ sm: 2.5, xs: 2.5, md: 4 }}
          columnSpacing={3}
        >
          {projects.map((project, index) => {
            if (projects.length === index + 1) {
              // 為最後一個項目添加 ref
              return (
                <Grid
                  item
                  xs={1}
                  key={project.id || index}
                  ref={lastProjectElementRef}
                >
                  <ProjectCard project={project} />
                </Grid>
              );
            } else {
              return (
                <Grid item xs={1} key={project.id || index}>
                  <ProjectCard project={project} />
                </Grid>
              );
            }
          })}
        </Grid>

        {loading && (
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

        <Box position="fixed" bottom="5vh" right="4vw">
          <Button
            LinkComponent={Link}
            variant="contained"
            href="/project/create"
            color="warning"
            startIcon={<AddIcon />}
            sx={{
              padding: "20px 37px",
              borderRadius: "32px",
              fontSize: "20px",
              lineHeight: 1,
              boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            發起專案
          </Button>
        </Box>
      </Box>
      <Suspense>
        <HandleToken />

      </Suspense>
      {/* <ServerHandleToken searchParams={searchParams}/> */}
    </main>
  );
}
