import theme from "@/styles/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CharacterTag } from "@/components/CharacterTag";

export default function ProjectAccordion({ project }) {
  const groupedMembers = project.members.reduce((acc, member) => {
    // 用 role 和 skill 作為唯一標識
    const key = `${member.role}-${member.skill}`;
    const existingMember = acc.find((item) => item.key === key);

    if (existingMember) {
      existingMember.people += 1;
    } else {
      acc.push({
        key, // 用來確保組合的唯一性
        role: member.role,
        skill: member.skill,
        people: 1,
      });
    }

    return acc;
  }, []);

  return (
    <>
      {groupedMembers.map((member, index) => (
        <Accordion
          sx={{
            boxShadow: "none",
            border: `1px solid ${theme.figma.neutral[80]}`,
            borderRadius: "12px",
            marginBottom: "16px",
            "&:first-of-type": {
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            },
            "&:last-of-type": {
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            },
            "&.MuiAccordion-root": {
              padding: 0,
              "&:before": {
                display: "none",
              },
            },
            "& .MuiAccordionSummary-root.Mui-expanded": {
              minHeight: "auto",
            },
            "&.Mui-expanded:last-of-type": {
              marginBottom: "16px",
            },
          }}
          key={member.key}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              padding: "0 32px",
              ".MuiAccordionSummary-content": {
                alignItems: "center",
                gap: "24px",
                margin: "24px 0",
              },
              ".MuiAccordionSummary-content.Mui-expanded": {
                margin: "24px 0",
              },
            }}
          >
            <CharacterTag key={member.role} character={member.role} />
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
              }}
            >
              {member.people}名
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "0 32px 24px",
            }}
          >
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              能力要求
            </Typography>
            <Typography
              sx={{
                padding: "16px 12px",
                backgroundColor: theme.figma.primary.extra_light_blue,
                borderRadius: "12px",
              }}
            >
              {member.skill}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
