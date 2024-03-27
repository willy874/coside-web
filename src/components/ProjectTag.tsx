import { Box } from "@mui/material";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";

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
