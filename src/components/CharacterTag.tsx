"use client";
import theme from "@/styles/theme";

// Emerail: ready to remove
const CHARACTER_STYLES_MAP: Record<string, Record<string, string>> = {
  PM: {
    name: "PM",
    mainColor: theme.profession_tags.outline_pm,
    bgColor: theme.profession_tags.bg_pm,
  },
  Frontend: {
    name: "前端",
    mainColor: theme.profession_tags.outline_frontend,
    bgColor: theme.profession_tags.bg_frontend,
  },
  Backend: {
    name: "前端",
    mainColor: theme.profession_tags.outline_backend,
    bgColor: theme.profession_tags.bg_backend,
  },
  "UI/UX": {
    name: "UIUX",
    mainColor: theme.profession_tags.outline_uiux,
    bgColor: theme.profession_tags.bg_uiux,
  },
  UI: {
    name: "UI",
    mainColor: theme.profession_tags.outline_ui,
    bgColor: theme.profession_tags.bg_ui,
  },
  "UX Designer": {
    name: "UX",
    mainColor: theme.profession_tags.outline_ux,
    bgColor: theme.profession_tags.bg_ux,
  },
  "UX": {
    name: "UX",
    mainColor: theme.profession_tags.outline_ux,
    bgColor: theme.profession_tags.bg_ux,
  }
};

export const CharacterTag = ({ character }: { character: string }) => {
  return (
    <span
      style={{
        backgroundColor: CHARACTER_STYLES_MAP[character].bgColor,
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        border: `1px solid ${CHARACTER_STYLES_MAP[character].mainColor}`,
        color: CHARACTER_STYLES_MAP[character].mainColor,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {CHARACTER_STYLES_MAP[character].name}
    </span>
  );
};
