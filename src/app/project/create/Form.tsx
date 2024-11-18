"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useLoginStore from "@/stores/loginStore";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import TextField from "@mui/material/TextField";
import Select from "@/components/Select";

import { Formik, FieldArray } from "formik";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import UploadImage from "@/components/UploadImage";
import MDXEditor from "@/components/MDXEditor";
import { jobPosition, projectType, titleType } from "@/constant";
import useArray from "@/hooks/useArray";
// type
import type { PartnerType } from "./Form.type";
import styles from "./Form.module.scss";

const steps = ["專案基本資訊", "專案說明", "組員需求"];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 30,
    left: "max(-155px, calc(-50vw + 9rem))",
    right: "100%",
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[200],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const Card = styled("div")(({ theme }) => ({
  position: "relative",
  padding: "24px 32px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: "12px",
}));

const partnerNumberOption = Array.from({ length: 5 }, (_, index) => ({
  label: index + 1,
  value: index + 1,
}));

export default function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState({
    title: "",
    titleType: "",
    projectType: "",
  });

  const [mkVariable, setMkVariable] = useState('aa11');
  const { token } = useLoginStore();

  useEffect(() => {
    console.log(mkVariable);
  }, [mkVariable])

  const handleEditorChange = (markdown: string) => {
    console.log(JSON.stringify(markdown))
    
    setMkVariable(markdown);
  }

  const partners = useArray<PartnerType>({
    defaultValues: [{ id: "1", number: 1 }],
  });

  const handlePrevious = () => {
    setActiveStep((preStep) => {
      if (preStep > 0) return preStep - 1;
      return preStep;
    });
  };

  const handleNext = () => {
    setActiveStep((preStep) => {
      if (preStep < 2) return preStep + 1;
      return preStep;
    });
  };

  const getImgPath = (path: string) => {
    console.log(path, ' 路徑')
  }

  // 使用 useEffect
  // useEffect(() => {
  //   console.log(formState);
  // }, [formState]);

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mb={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
    >
      <Box width="100%" mb={4.5}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}
          sx={{ justifyContent: "space-between" }}
        >
          {steps.map((label) => (
            <Step
              key={label}
              sx={{
                p: 0,
                flex: "0 0 6rem",
                ".MuiStepLabel-root .Mui-completed": {
                  color: "secondary.dark",
                  opacity: 0.8,
                },
                ".MuiStepLabel-root .Mui-active": {
                  color: "secondary.dark",
                  fontWeight: "bold",
                },
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Formik
        initialValues={{
          titleType: "",
          projectType: "",
          title: "",
          projectRequirement: "",
          partnerNumber: "",
          projectDuration: "",
          imgPath: "",
          MKContent: "",
          partners: [
            { id: uuidv4(), number: 1, jobPosition: '', projectRequirement: '', members: [''] },
          ],
        }}
        onSubmit={async(values) => {
          const {
            title,
            projectType,
            titleType,
            projectDuration,
            MKContent,
            imgPath,
            partners,
          } = values;
          const members = partners.flatMap((partner) => partner.members.map((member) =>( {
            role: partner.jobPosition,
            skill: partner.projectRequirement,
            email :member,
            group: partner.jobPosition
          })));
          const bodyData = {
            name: title,
            type: titleType,
            duration: projectDuration,
            backgroundimage: imgPath,
            description: MKContent,
            categories: [projectType],
            members,
            industry: "未分類",
            tags: ["未分類"]
            
          }
          console.log(bodyData, 'bodyData')
          try {
            await axios.post( `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/project`,
              bodyData,
              {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
              }
            )
          }catch(e) {
            console.error(e, 'error');
          }


        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={styles.form}>
            <Box
              width="100%"
              mx="auto"
              mb={10}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={4}
            >
              {activeStep === 0 && (
                <>
                  <Select
                    label="發起類型"
                    color="secondary"
                    options={titleType}
                    value={props.values.titleType}
                    onChange={props.handleChange}
                    name="titleType"
                    fullWidth
                  />
                  <Select
                    label="專案類型"
                    color="secondary"
                    value={props.values.projectType}
                    onChange={props.handleChange}
                    options={projectType}
                    name="projectType"
                    fullWidth
                  />
                  <TextField
                    label="主題名稱"
                    color="secondary"
                    fullWidth
                    value={props.values.title}
                    onChange={props.handleChange}
                    name="title"
                  />
                  {/* <Select label="主題/產業類別" color="secondary" fullWidth /> */}
                  <UploadImage onData={(path: string) => {
                    props.setFieldValue('imgPath', path)
                  }}/>
                  <TextField
                    label="專案預計進行時間"
                    helperText="未填寫則自動帶入未定"
                    color="secondary"
                    value={props.values.projectDuration}
                    onChange={props.handleChange}
                    name="projectDuration"
                    fullWidth
                  />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Box
                    width="100%"
                    py={1.5}
                    px={3}
                    bgcolor="secondary.light"
                    border="1px solid"
                    borderColor="secondary.dark"
                    borderRadius="12px"
                  >
                    請盡量將構想 <b>有架構的描述</b>，讓其他人更了解你的想法
                  </Box>
                  {/* 取得Editor的值 */}
                  <MDXEditor label="專案構想" markdown={mkVariable} onChange={(markdown: string) => {
                    props.setFieldValue('MKContent', markdown)
                  }}/>
                </>
              )}

              {activeStep === 2 && (
                <FieldArray name="partners">
                {(arrayHelpers) => (
                  <>
                    {props.values.partners.map((partner, index) => (
                        <Card key={index}>
                          <Box alignSelf="flex-end">
                            <IconButton onClick={() => {
                              if(props.values.partners.length > 1) arrayHelpers.remove(index)
                              }}>
                              <Image
                                src="/delete.svg"
                                alt="delete icon"
                                width={24}
                                height={24}
                              />
                            </IconButton>
                          </Box>
                          <Box display="flex" gap={2.5}>
                            <Select
                              label="組員職位"
                              color="secondary"
                              options={jobPosition}
                              value={props.values.partners[index].jobPosition}
                              onChange={props.handleChange}
                              name={`partners[${index}].jobPosition`} 
                              fullWidth
                            />
                            <Select
                              label="人數"
                              color="secondary"
                              options={partnerNumberOption}
                              value={props.values.partners[index].number.toString()} 
                              onChange={(e) => {
                                props.handleChange(e);
                                const updateNumber = parseInt(e.target.value, 10);
                                const updateMembers = Array(updateNumber).fill('');
                                props.setFieldValue(`partners[${index}].members`, updateMembers); 
                              }}
                              name= {`partners[${index}].number`}
                              fullWidth
                            />
                          </Box>
                          <TextField
                            label="能力要求"
                            placeholder="若無，可不填"
                            color="secondary"
                            value={props.values.partners[index].projectRequirement}
                            onChange={props.handleChange}
                            name={`partners[${index}].projectRequirement`}
                            minRows={3}
                            fullWidth
                            multiline
                          />
                              {props.values.partners[index].members.map((_ ,emailIndex) => (
                                <TextField
                                  key={emailIndex}
                                  label="組員Email"
                                  placeholder="請輸入Email"
                                  value= {props.values.partners[index].members[emailIndex]}
                                  onChange={props.handleChange}
                                  name={`partners[${index}].members[${emailIndex}]`}
                                  color="secondary"
                                  fullWidth
                                />
                              
                              ))}
                        </Card>
                      ))}
                    <Button
                      size="large"
                      variant="outlined"
                      color="secondary"
                      startIcon={<AddCircleOutlineIcon />}
                      fullWidth
                      onClick={() => arrayHelpers.push({ id: uuidv4(),jobPosition: "", number: 1, projectRequirement: "", members: [""] })}
                    >
                      新增職位
                    </Button>
                  </>

                )}
                </FieldArray>
              )}
              <Box display="flex" width="100%" gap={2.5}>
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handlePrevious}
                >
                  {activeStep === 0 ? "取消" : "上一步"}
                </Button>
                {activeStep !== 2 && (<Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white" }}
                  endIcon={<ChevronRightIcon />}
                  fullWidth
                  onClick={handleNext}
                  type="button"
                >
                  下一步     
                </Button>)}
                {activeStep === 2 && (<Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white" }}
                  fullWidth
                  onClick={handleNext}
                  type="submit"
                >
                  發布
                </Button>)}
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
