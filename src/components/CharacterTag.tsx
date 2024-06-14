const CHARACTER_STYLES_MAP: Record<string, Record<string, string>> = {
  PM: { name: "PM", mainColor: "#9747FF", bgColor: "#DCC1FF" },
  FE: { name: "前端", mainColor: "#007DC3", bgColor: "#A9D1FF" },
  BE: { name: "後端", mainColor: "#54B153", bgColor: "#D1F1C2" },
};

export const CharacterTag = ({ character }: { character: string }) => {
  return (
    <span
      style={{
        backgroundColor: CHARACTER_STYLES_MAP[character].bgColor,
        padding: "6px 16px",
        marginRight: "6px",
        borderRadius: "20px",
        fontSize: "14px",
        border: `1px solid ${CHARACTER_STYLES_MAP[character].mainColor}`,
        color: CHARACTER_STYLES_MAP[character].mainColor,
        display: "flex",
        alignItems: "center",
      }}
    >
      {CHARACTER_STYLES_MAP[character].name}
    </span>
  );
};
