import React, { useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Button,
  Paper,
  Fade,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import theme from "@/styles/theme";

const FilterComponent = ({ onFilterApply }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // State for selected filters
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter dropdown visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for mobile drawer

  // Position options
  const positions = [
    { label: "PM", value: "pm" },
    { label: "UI/UX", value: "uiux" },
    { label: "UI", value: "ui" },
    { label: "UX", value: "ux" },
    { label: "前端", value: "frontend" },
    { label: "後端", value: "backend" },
    { label: "全端", value: "fullstack" },
    { label: "其他", value: "other_position" },
  ];

  // Project type options
  const projectTypes = [
    { label: "App", value: "app" },
    { label: "Web", value: "web" },
    { label: "其他", value: "other_type" },
  ];

  // Toggle selection for positions
  const handlePositionToggle = (value) => {
    if (selectedPositions.includes(value)) {
      setSelectedPositions(selectedPositions.filter((item) => item !== value));
    } else {
      setSelectedPositions([...selectedPositions, value]);
    }
  };

  // Toggle selection for project types
  const handleProjectTypeToggle = (value) => {
    if (selectedProjectTypes.includes(value)) {
      setSelectedProjectTypes(
        selectedProjectTypes.filter((item) => item !== value)
      );
    } else {
      setSelectedProjectTypes([...selectedProjectTypes, value]);
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedPositions([]);
    setSelectedProjectTypes([]);
  };

  // Apply filters
  const handleApplyFilter = () => {
    const filters = {
      roles: selectedPositions,
      categories: selectedProjectTypes,
    };

    console.log("Applied filters:", filters);

    // Call the callback function from parent with filter data
    if (onFilterApply) {
      onFilterApply(filters);
    }

    // Close the filter UI
    setIsFilterOpen(false);
    setIsDrawerOpen(false);
  };

  // Toggle filter dropdown visibility for desktop
  const toggleFilterDropdown = () => {
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsFilterOpen(!isFilterOpen);
    }
  };

  // Filter content - reused for both desktop dropdown and mobile drawer
  const filterContent = (
    <>
      <Box
        sx={{
          display: isMobile ? "none" : "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: "10px 0",
        }}
      >
        <Typography
          onClick={handleClearAll}
          sx={{
            cursor: "pointer",
            fontSize: "16px",
            lineHeight: "19px",
            color: theme.primary.normal_blue,
            textTransform: "none",
            "&:hover": {
              color: theme.primary.dark_blue
            }
          }}
        >
          全部清除
        </Typography>
      </Box>

      {/* Job positions */}
      <Box sx={{ mb: "24px" }}>
        <Typography variant="body2" sx={{ fontSize: "16px", lineHeight: "19px", fontWeight: 700, mb: "16px", color: theme.form.text_default }}>
          徵求職位
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {positions.map((position) => (
            <Chip
              key={position.value}
              label={position.label}
              clickable
              onClick={() => handlePositionToggle(position.value)}
              sx={{
                fontSize: "16px",
                lineHeight: "19px",
                height: "auto",
                borderRadius: "20px",
                p: "11px 31px",
                color: selectedPositions.includes(position.value)
                  ? theme.primary.extra_light_blue
                  : theme.primary.normal_blue,
                bgcolor: selectedPositions.includes(position.value)
                  ? theme.primary.normal_blue
                  : theme.primary.extra_light_blue,
                border: `1px solid ${theme.primary.normal_blue}`,
                span: {
                  padding: "0",
                },
                "&:hover": {
                  bgcolor: selectedPositions.includes(position.value)
                    ? theme.btn.fill_bg_hover_blue
                    : theme.primary.light_blue + " !important",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Project type */}
      <Box>
        <Typography variant="body2" sx={{ fontSize: "16px", lineHeight: "19px", fontWeight: 700, mb: "16px", color: theme.form.text_default }}>
          專案種類
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {projectTypes.map((type) => (
            <Chip
              key={type.value}
              label={type.label}
              clickable
              onClick={() => handleProjectTypeToggle(type.value)}
              sx={{
                fontSize: "16px",
                lineHeight: "19px",
                height: "auto",
                borderRadius: "20px",
                p: "11px 31px",
                color: selectedProjectTypes.includes(type.value)
                  ? theme.primary.light_purple
                  : theme.primary.dark_purple,
                bgcolor: selectedProjectTypes.includes(type.value)
                  ? theme.primary.dark_purple
                  : theme.primary.light_purple,
                border: `1px solid ${theme.primary.dark_purple}`,
                span: {
                  padding: "0",
                },
                "&:hover": {
                  bgcolor: selectedProjectTypes.includes(type.value)
                    ? "#8351c4"
                    : "#ded0f2 !important",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: isMobile ? "block" : "none",
          alignItems: "center",
          p: "10px 0",
        }}
      >
        <Typography
          onClick={handleClearAll}
          sx={{
            cursor: "pointer",
            fontSize: "16px",
            lineHeight: "19px",
            color: theme.primary.normal_blue,
            textTransform: "none",
            "&:hover": {
              color: theme.primary.dark_blue
            },
            mt: "24px"
          }}
        >
          全部清除
        </Typography>
      </Box>

      {/* Apply filter button */}
      <Button
        variant="outlined"
        fullWidth
        onClick={handleApplyFilter}
        sx={{
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: 400,
          borderRadius: "12px",
          py: "10px",
          textTransform: "none",
          color: theme.primary.normal_blue,
          border: `1px solid ${theme.primary.normal_blue}`,
          marginTop: isMobile ? "36px" : "32px"
        }}
      >
        篩選
      </Button>
    </>
  );

  return (
    <>
      {isMobile ? <Button
        variant="outlined"
        sx={{
          borderRadius: "12px",
          padding: "10px 16px",
          color: theme.form.placeholder_dropdown,
          borderColor: theme.form.border_default,
          backgroundColor: theme.form.bg,
          textTransform: "none",
          minWidth: "auto",
          "&:hover": {
            color: theme.form.border_hover_blue,
            borderColor: theme.form.border_hover_blue,
            bgcolor: theme.form.bg,
          },
        }}
        onClick={toggleFilterDropdown}
      >
        <FilterAltOutlinedIcon
          sx={{ fontSize: "24px", lineHeight: "24px", display: "block" }}
        />
      </Button>
        :
        <Button
          variant="outlined"
          sx={{
            borderRadius: "12px",
            padding: "16px",
            color: theme.form.placeholder_dropdown,
            borderColor: theme.form.border_default,
            backgroundColor: theme.form.bg,
            textTransform: "none",
            minWidth: "167px",
            gap: "8px",
            "&:hover": {
              color: theme.form.border_hover_blue,
              borderColor: theme.form.border_hover_blue,
              bgcolor: theme.form.bg,
            },
          }}
          onClick={toggleFilterDropdown}
        >
          <FilterAltOutlinedIcon
            sx={{ fontSize: "24px", lineHeight: "24px", display: "block" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "24px",
              marginRight: "auto",
            }}
          >
            篩選
          </Typography>
          <ArrowDropDownIcon
            sx={{ fontSize: "24px", lineHeight: "24px", display: "block" }}
          />
        </Button>
      }

      {/* Desktop dropdown panel */}
      {!isMobile && (
        <Fade in={isFilterOpen}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 594,
              width: "100%",
              p: "24px",
              borderRadius: "12px",
              position: "absolute",
              top: "calc(100% + 4px)",
              right: 0,
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
              zIndex: 100,
            }}
          >
            {filterContent}
          </Paper>
        </Fade>
      )}

      {/* Mobile drawer */}
      <Drawer
        anchor="bottom"
        open={isMobile && isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: "36px 20px",
            maxHeight: "90vh",
          }
        }}
      >
        {filterContent}
      </Drawer>
    </>
  );
};

export default FilterComponent;