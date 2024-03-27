import Image from "next/image";

import styles from "./page.module.css";
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";

const mockProjectCard: ProjectCardProps = {
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "IMPLEMENTING",
  characterTags: ["PM", "FE"],
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <ProjectCard projectCard={mockProjectCard} />
    </main>
  );
}
