import { useState } from "react";
import { useRouter } from "next/navigation";
import theme from "@/styles/theme";
import {
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CharacterTag } from "@/components/CharacterTag";
import { CustomDialog } from "@/components/Dialog/CustomDialog";

const ContactButton = ({ project }: {
  project: any;
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const isPause = project.status === "pause";
  console.log(isPause, "isPause"); // 確認狀態

  const handleClick = () => {
    if (isPause) {
      setOpenModal(true); // 顯示提示 modal
    } else {
      window.location.href = createMailtoLink(project);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="primary"
        variant="contained"
        fullWidth
        sx={{
          color: "white",
          bgcolor: theme.figma.btn.fill.bg_default_blue,
          opacity: isPause ? 0.5 : 1,
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "19px",
          padding: "10px 16px",
          "&:hover": {
            bgcolor: theme.figma.btn.fill.bg_hover_blue,
          },
        }}
      >
        聯絡發起人
      </Button>

      <CustomDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={<>
          此專案暫停尋找夥伴<br />
          先看看其他專案吧～
        </>}
        buttons={[
          {
            text: '關閉',
            onClick: () => setOpenModal(false),
            variant: 'outline',
          },
          {
            text: '探索其他專案',
            onClick: () => router.push('/'),
            variant: 'fill',
          },
        ]}
      />
    </>
  );
};

// 原本的 createMailtoLink 可以保留
const createMailtoLink = (project) => {
  const subject = `【${project.name}】Side project 合作詢問`;

  const body = `Hi ${project.creator.name}，

我是 {使用者名稱}，是 {使用者主要職位}

我在 CoSide 上看到你發起的專案，對於(專案中感興趣的部分)特別感興趣/有共鳴，想進一步了解～

我能協助的方向：
（技能＋具體貢獻）
（例：我有 2 年的資料分析經驗，能協助模型調校與數據視覺化呈現）

方便的時間：
（可選 2-3 個時間或開放式詢問）
想請問以上哪個時間對你比較方便呢？或可提供你方便的時間

希望有機會與你進一步交流，期待你的回覆！

Best,
{使用者名稱}`;

  return `mailto:${project.creator.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function ProjectAccordion({ project }) {
  const groupedMembers = project.members.reduce((acc, member) => {
    // 只處理有缺人的職位（email 為 null）
    if (member.email === null) {
      const key = `${member.role}-${member.skill}`;
      const existingMember = acc.find((item) => item.key === key);

      if (existingMember) {
        existingMember.people += 1;
      } else {
        acc.push({
          key, // 唯一標識
          role: member.role,
          skill: member.skill,
          people: 1,
        });
      }
    }

    return acc;
  }, []);

  return (
    <>
      {groupedMembers.length === 0 ?
        <Typography sx={{
          fontSize: "20px",
          lineHeight: "23px",
          color: theme.figma.form.placeholder_input,
          fontWeight: "bold",
          textAlign: "center",
        }}>暫無缺額</Typography> :
        <>
          {groupedMembers.map((member, index) => (
            member.skill ? (
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
                  <CharacterTag key={member.role} character={member.role} type="detailInfo" />
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
                      backgroundColor: theme.figma.Primary.extra_light_blue,
                      borderRadius: "12px",
                    }}
                  >
                    {member.skill}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : (
              <Box
                sx={{
                  boxShadow: "none",
                  border: `1px solid ${theme.figma.neutral[80]}`,
                  borderRadius: "12px",
                  margin: "0 0 16px",
                  padding: "23px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                }}
                key={member.key}
              >
                <CharacterTag character={member.role} type="detailInfo" />
                <Typography component="span" fontWeight="bold">
                  {member.people}名
                </Typography>
              </Box>
            )
          ))}
          <ContactButton
            project={project}
          />
        </>
      }
    </>
  );
}
