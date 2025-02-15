"use client";

import theme from "@/styles/theme";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { CharacterTag } from "@/components/CharacterTag";
import { ProjectTag } from "@/components/ProjectTag";
import { People } from "@mui/icons-material";

interface AccordionInfo {
  role: string;
  people: number;
  require: string;
}

const AccordionInfoList: AccordionInfo[] = [
  {
    role: "Frontend",
    people: 2,
    require: "切版",
  },
  {
    role: "UI/UX",
    people: 1,
    require: "設計",
  },
  {
    role: "PM",
    people: 2,
    require: "管理進度",
  },
];

const ProjectInfo = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Box
            sx={{
              border: `1px solid ${theme.primary.normal_gray}`,
              borderRadius: "20px",
              padding: "32px 24px",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              專案說明
            </Typography>
            <Box sx={{ minHeight: "50vh" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nobis at, provident, quidem quisquam deserunt, autem ipsum vel hic minus quas reiciendis repellat dolor blanditiis ea nihil beatae doloribus ab.
              Praesentium deleniti veniam eligendi neque, architecto blanditiis, beatae quidem debitis voluptate, libero quis sed voluptatum pariatur fugit! Aspernatur, ex? Quo, modi temporibus? Rem facere ipsam fuga suscipit officiis assumenda numquam.
              Quasi, tempore. Dicta nemo sunt quae saepe neque iure, impedit temporibus voluptatum tempore in sapiente aliquam fugiat necessitatibus doloribus rem pariatur quasi optio. Consequuntur a laboriosam officiis harum. Soluta, blanditiis?
              Nam, optio ab aut unde expedita recusandae vitae odio ullam nemo. Maxime accusantium sit itaque. Esse asperiores, unde eaque ducimus, aspernatur sint consequuntur assumenda quia veniam, eligendi autem odit deserunt.
              Adipisci porro iste facere, neque nulla dolorem minus error rerum cumque dicta at sit iusto quidem praesentium voluptatum laudantium odio ipsam inventore accusamus, deserunt nobis! Necessitatibus eius harum quia ab.
              Ullam facilis, vitae ipsa soluta harum repellat nulla? Ratione laudantium dolore a. Perspiciatis deserunt magni repellat, totam, molestias minima sequi provident necessitatibus harum repellendus, velit quasi hic doloremque voluptatibus labore?
              Veniam architecto perferendis reiciendis ad molestiae dolores placeat vitae harum. Nostrum dignissimos quis cupiditate blanditiis, voluptatem quod. Dolores, voluptas. Placeat odit in cum aliquam dignissimos tempore pariatur necessitatibus eaque mollitia.
              Quo, iste. Possimus quas, distinctio dolorum non vitae commodi officia voluptatum! Fugiat tenetur autem qui distinctio laboriosam non! Laudantium error, harum facilis assumenda veritatis culpa neque possimus soluta mollitia repellat.
              Qui libero ratione nisi doloremque maiores. Quos ab fuga rem. Minus impedit magnam nostrum mollitia unde provident quo numquam, accusamus facilis laboriosam. Eveniet vel necessitatibus, nihil omnis quas obcaecati itaque?
              Id, magnam? Nesciunt similique eos voluptatem, id voluptatum at, tempore a quidem assumenda incidunt ab aspernatur adipisci! Alias nisi, exercitationem soluta modi eligendi provident sint fuga ut, asperiores voluptatum doloremque.
              Unde asperiores reiciendis quaerat inventore exercitationem accusamus, necessitatibus nobis! Rem tempora expedita dolor molestiae error enim minima ducimus, esse eveniet deserunt ut ullam eius voluptates. Tempore ab dignissimos alias iste!
              Voluptates sequi dolore distinctio, voluptatum incidunt sed quasi quam impedit quo et nemo. Magni suscipit in odit libero. Consectetur cumque dolor explicabo ullam maxime sint excepturi cum modi voluptas magnam?
              Suscipit sit impedit repellendus delectus fuga corrupti, voluptas ab nesciunt inventore minima, quam iusto fugiat eveniet, tempore vitae. Ipsa, molestias inventore laboriosam minus aspernatur nesciunt! Soluta eligendi ut optio sapiente.
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box
            sx={{
              border: `1px solid ${theme.primary.normal_gray}`,
              borderRadius: "20px",
              padding: "32px 24px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              徵求職位
            </Typography>
            {AccordionInfoList.map((info, index) => (
              <Accordion
                sx={{
                  boxShadow: "none",
                  border: `1px solid ${theme.neutral[80]}`,
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

                  // Target the Accordion root
                  "&.MuiAccordion-root": {
                    padding: 0,
                    "&:before": {
                      display: "none",
                    },
                  },

                  // Target the expanded summary root
                  "& .MuiAccordionSummary-root.Mui-expanded": {
                    minHeight: "auto",
                  },

                  "&.Mui-expanded:last-of-type": {
                    marginBottom: "16px",
                  }
                }}
                key={info.role}
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
                  <CharacterTag key={info.role} character={info.role} />
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {info.people}名
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
                      backgroundColor: theme.primary.extra_light_blue,
                      borderRadius: "12px",
                    }}
                  >
                    {info.require}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            <Button
              color="primary"
              variant="contained"
              sx={{ width: "100%", color: "#FFFFFF", borderRadius: "12px" }}
            >
              聯絡發起人
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectInfo;
