"use client";
import theme from "@/styles/theme";

// Emerail: ready to remove
const CHARACTER_STYLES_MAP: Record<string, Record<string, string>> = {
  "Project Manager": {
    name: "PM",
    mainColor: theme.figma.profession_tags.outline_pm,
    bgColor: theme.figma.profession_tags.bg_pm,
  },
  PM: {
    name: "PM",
    mainColor: theme.figma.profession_tags.outline_pm,
    bgColor: theme.figma.profession_tags.bg_pm,
  },
  "Frontend Engineer": {
    name: "前端",
    mainColor: theme.figma.profession_tags.outline_frontend,
    bgColor: theme.figma.profession_tags.bg_frontend,
  },
  Frontend: {
    name: "前端",
    mainColor: theme.figma.profession_tags.outline_frontend,
    bgColor: theme.figma.profession_tags.bg_frontend,
  },
  "Backend Engineer": {
    name: "後端",
    mainColor: theme.figma.profession_tags.outline_backend,
    bgColor: theme.figma.profession_tags.bg_backend,
  },
  Backend: {
    name: "後端",
    mainColor: theme.figma.profession_tags.outline_backend,
    bgColor: theme.figma.profession_tags.bg_backend,
  },
  "(UI/UX)Product Designer": {
    name: "UIUX",
    mainColor: theme.figma.profession_tags.outline_uiux,
    bgColor: theme.figma.profession_tags.bg_uiux,
  },
  "UI/UX": {
    name: "UIUX",
    mainColor: theme.figma.profession_tags.outline_uiux,
    bgColor: theme.figma.profession_tags.bg_uiux,
  },
  UI: {
    name: "UI",
    mainColor: theme.figma.profession_tags.outline_ui,
    bgColor: theme.figma.profession_tags.bg_ui,
  },
  "UX Designer": {
    name: "UX",
    mainColor: theme.figma.profession_tags.outline_ux,
    bgColor: theme.figma.profession_tags.bg_ux,
  },
  UX: {
    name: "UX",
    mainColor: theme.figma.profession_tags.outline_ux,
    bgColor: theme.figma.profession_tags.bg_ux,
  },
};

export const CharacterTag = ({
  character,
  borderRadius = "20px",
  lineHeight = "17px",
  addText = "",
}: {
  character: string;
  borderRadius?: string | number;
  lineHeight?: string | number;
  addText?: string;
}) => {
  return (
    <span
      style={{
        backgroundColor: CHARACTER_STYLES_MAP[character].bgColor,
        padding: "6px 16px",
        borderRadius: borderRadius,
        fontSize: "14px",
        border: `1px solid ${CHARACTER_STYLES_MAP[character].mainColor}`,
        color: CHARACTER_STYLES_MAP[character].mainColor,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        lineHeight: lineHeight
      }}
    >
      {CHARACTER_STYLES_MAP[character].name}
      {addText !== "" && (
        <span style={{ marginLeft: "12px" }}>{addText}</span>
      )}
    </span>
  );
};
