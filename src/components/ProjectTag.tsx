import { Box } from "@mui/material";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
interface ProjectTagProps {
  name: string;
  icon: JSX.Element;
  bgColor: string;
}

const PROJECT_STYLES_MAP: Record<string, ProjectTagProps> = {
  IMPLEMENTING: {
    name: "專案落地",
    icon: (
      <LocalFireDepartmentOutlinedIcon
        sx={{ width: "18px", marginRight: "4px" }}
      />
    ),
    bgColor: "#FF5D5D",
  },
  INPROGRESS: {
    name: "有主題 實作練習",
    icon: (
      <EmojiObjectsIcon
        sx={{ width: "18px", marginRight: "4px" }}
      />
    ),
    bgColor: "#93DC70",
  },
};

export const ProjectTag = ({ projectTag }: { projectTag: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: PROJECT_STYLES_MAP[projectTag].bgColor,
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        color: "#FFFFFF",
        width: "fit-content",
        display: "flex",
        alignItems: "center",
      }}
    >
      {PROJECT_STYLES_MAP[projectTag].icon}
      {PROJECT_STYLES_MAP[projectTag].name}
    </Box>
  );
};
