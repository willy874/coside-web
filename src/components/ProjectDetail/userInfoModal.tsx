'use client';

import { Box, Typography, Modal } from "@mui/material";
import theme from "@/styles/theme";
import Image from "next/image";
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";

interface ProjectCardModalProps {
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

const projectCardData: ProjectCardProps = { // 改名為 projectCardData 並加上型別註記
  thumbnail: "/project-card-thumbnail.png",
  title: "尋蔬食者 VegeFinder",
  projectTag: "專案落地",
  characterTags: ["PM", "Frontend"],
  projectType: "app",
  projectDuration: "2 個月",
  projectOwner: "Alan",
  projectOwnerAvatar: "/project-card-owner-avatar.png",
};

const ProjectCardModal = ({
  isOpen,
  onClose
}: ProjectCardModalProps) => {
  const {
    thumbnail,
    title,
    projectOwner,
    projectOwnerAvatar
  } = projectCardData;

  const links = [
    { icon: '/email.svg', text: 'google@gmail.com' },
    { icon: '/instagram.svg', text: 'instagram.com' },
    { icon: '/facebook.svg', text: 'facebook.com' },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="project-modal"
      aria-describedby="project-details"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        pt: 7.5,
        pr: 5,
        pb: 5,
        pl: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Box sx={{
            display: 'flex',
            width: '50%',
          }}>
            <Image
              src={projectOwnerAvatar}
              alt={projectOwner}
              width={110}
              height={110}
              style={{
                marginRight: '0.75rem',
              }}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              minWidth: 0,
            }}>
              <Typography variant="h5" component="h2" sx={{
                marginBottom: 0,
                fontWeight: 'bold'
              }}>
                {projectOwner}
              </Typography>
              <CharacterTag key={2} character={'UI/UX'} />
              <Typography variant="body1" paragraph sx={{
                marginBottom: 0
              }}>
                參與專案 2
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {links.map((link, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image src={link.icon} alt={link.text} width={20} height={20} />
                <Typography variant="body1">{link.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="h3" sx={{
            marginBottom: 1.5,
            fontWeight: 'bold'
          }}>
            個人簡介
          </Typography>
          <Box
            sx={{
              padding: 2.5,
              backgroundColor: '#F1F7FF',
              borderRadius: 3,
            }}
          >
            <Typography variant="body1" paragraph sx={{
              marginBottom: 0
            }}>
              於新創軟體社企<br />
              擔任的Product Designer & Manager<br />
              <br />
              持續關注永續議題
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="h3" sx={{
            marginBottom: 1.5,
            fontWeight: 'bold'
          }}>
            參與專案
          </Typography>
          <Box
            sx={{
              padding: 2.5,
              border: `1px solid ${theme.palette.grey[200]}`,
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2.5,
              marginBottom: 1.5
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              width={131}
              height={100}
              style={{
                display: 'block',
                borderRadius: '0.5rem',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
              <ProjectTag projectTag={'專案落地'} />
              <Typography variant="body1" component="h4" sx={{
                marginBottom: 0,
                fontWeight: 'bold'
              }}>
                尋蔬食者 VegeFinder
              </Typography>
              <Typography variant="body1" paragraph sx={{
                marginBottom: 0,
                color: '#FF5D5D'
              }}>
                發起人
              </Typography>
            </Box>
            <CharacterTag key={1} character={'UI/UX'} />
          </Box>
          <Box
            sx={{
              padding: 2.5,
              border: `1px solid ${theme.palette.grey[200]}`,
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2.5,
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              width={131}
              height={100}
              style={{
                display: 'block',
                borderRadius: '0.5rem',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minWidth: 0,
              }}>
              <ProjectTag projectTag={'純作品集'} />
              <Typography variant="body1" component="h4" sx={{
                marginBottom: 0,
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                救救我的作品集15 - 透過遊戲畫再設計，打造旅遊APP新靈魂
              </Typography>
              <Typography variant="body1" paragraph sx={{
                marginBottom: 0,
                color: theme.palette.grey[100]
              }}>
                參與者
              </Typography>
            </Box>
            <CharacterTag key={3} character={'UI/UX'} />
          </Box>
        </Box>
        <Box
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#1C1B1F'
          }}
        >
          ✕
        </Box>
      </Box>
    </Modal >
  );
};

export default ProjectCardModal;