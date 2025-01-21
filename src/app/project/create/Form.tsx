"use client";

import { useState, useEffect, useRef } from "react";
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
import { useTheme } from "@mui/material/styles";

import Select from "@/components/Select";

import {
  Formik,
  Field,
  Form as FormFormik,
  FieldArray,
  ErrorMessage,
} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import UploadImage from "@/components/UploadImage";
import MDXEditor from "@/components/MDXEditor";
import { jobPosition, projectType, titleType, duration } from "@/constant";
import useArray from "@/hooks/useArray";
// type
import type { PartnerType } from "./Form.type";
import styles from "./Form.module.scss";
import { convertSelectionToNode$ } from "@mdxeditor/editor";

type FormValues = {
  title: string;
  projectType: string;
  titleType: string;
  projectDuration: string;
  MKContent: string;
  imgPath: string;
  partners: object;
};

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

  const [mkVariable, setMkVariable] = useState("aa11");
  const { token } = useLoginStore();
  const [previewImage, setPreviewImage] = useState('');
  const [imageType, setImageType] = useState('upload');
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const currentPage = useRef(1)

  const theme = useTheme();

  useEffect(() => {
    console.log(mkVariable);
  }, [mkVariable]);

  const handleEditorChange = (markdown: string) => {
    console.log(JSON.stringify(markdown));

    setMkVariable(markdown);
  };

  const partners = useArray<PartnerType>({
    defaultValues: [{ id: "1", number: 1 }],
  });

  const step0ValidationSchema = z.object({
    titleType: z.string().min(1, { message: "必選" }),
    projectType: z.string().min(1, { message: "必選" }),
    title: z.string().min(3, { message: "勿少於3個字" }).max(40, { message: "不多於40個字" }),
    projectDuration: z.string().min(1, { message: "必選" }),
  });

  const step1ValidationSchema = z.object({
    MKContent: z.string().trim().min(10, { message: "必填" }),
  });


  const step2ValidationSchema = z.object({
    partners: z
      .array(
        z.object({
          jobPosition: z.string().min(1, { message: "必選" }),
          projectRequirement: z.string().optional(),
          // member: z
          // .array(z.string().email({message: "請輸入正確的電子郵件地址"})),
          members: z.array(
            z.string().email({ message: "請輸入有效的 Email 地址" })
          ),
        })
      )
      .min(1, { message: "至少需要一名組員" }),
  });

  const handlePrevious = () => {
    setActiveStep((preStep) => {
      if (preStep > 0) return preStep - 1;
      return preStep;
    });
  };

  const doValidate = async (
    values: FormValues,
    validationSchema: any
  ): Promise<object | boolean> => {
    const formikSchema = toFormikValidationSchema(validationSchema);
    // const formikSchemaTest = validationSchema.safeParse(values);
    // if(!formikSchemaTest.success) {
    //   console.log('error 新嘗試', formikSchemaTest.error);
    //   // return formikSchemaTest.error;
    // }
    try {
      await formikSchema.validate(values);
      return false;
    } catch (error) {
      const errors: object = {};
      error.inner.forEach((e) => {
        console.log("舊的", error);
        errors[e.path] = e.message;
      });
      console.log("errors: ", errors);
      return errors;
    }
  };

  const goNextOrErrors = (validateResult, setErrors) => {
    console.log("validateResult", validateResult);
    if (validateResult === false) {
      if (activeStep === 2) {
      }
      setActiveStep((preStep) => {
        return preStep + 1;
      });
    } else {
      setErrors(validateResult);
    }
  };

  const handleNext = async (values, setErrors) => {
    if (activeStep === 0) {
      const validateResult = await doValidate(values, step0ValidationSchema);
      goNextOrErrors(validateResult, setErrors);
    } else if (activeStep === 1) {
      const validateResult = await doValidate(values, step1ValidationSchema);
      console.log(validateResult);
      goNextOrErrors(validateResult, setErrors);
    } else if (activeStep === 2) {
      const validateResult = await doValidate(values, step2ValidationSchema);
      goNextOrErrors(validateResult, setErrors);
    }
  };
  const getImgPath = (path: string) => {
    console.log(path, " 路徑");
  };

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
            {
              id: uuidv4(),
              number: 1,
              jobPosition: "",
              projectRequirement: "",
              members: [""],
            },
          ],
        }}
        onSubmit={async (values, {setErrors}) => {
          const {
            title,
            projectType,
            titleType,
            projectDuration,
            MKContent,
            imgPath,
            partners,
          } = values;

          const validateResult = await doValidate(
            values,
            step2ValidationSchema
          );
          console.log("validateResult submit step", validateResult);
          if (validateResult) {
            setErrors(validateResult); // 設定錯誤，Formik 會自動更新 UI
            return;
          }
          const members = partners.flatMap((partner) =>
            partner.members.map((member) => ({
              role: partner.jobPosition,
              skill: partner.projectRequirement,
              email: member,
              group: partner.jobPosition,
            }))
          );
          const bodyData = {
            name: title,
            type: titleType,
            duration: projectDuration,
            backgroundimage: imgPath,
            description: MKContent,
            categories: [projectType],
            members,
            industry: "未分類",
            tags: ["未分類"],
          };
          console.log(bodyData, ":bodyData ", token, ":token");
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/project`,
              bodyData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (e) {
            console.error(e, "error");
          }
        }}
      >
        {(props) => (
          <FormFormik onSubmit={props.handleSubmit} className={styles.form}>
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
                  <Field
                    as={Select}
                    label="發起類型"
                    color="secondary"
                    options={titleType}
                    value={props.values.titleType}
                    onChange={props.handleChange}
                    name="titleType"
                    fullWidth
                    error={Boolean(props.errors?.titleType ?? false)}
                    helperText={props.errors?.titleType ?? ""}
                  />
                  <Field
                    as={Select}
                    label="專案類型"
                    color="secondary"
                    value={props.values.projectType}
                    onChange={props.handleChange}
                    options={projectType}
                    name="projectType"
                    fullWidth
                    error={Boolean(props.errors?.projectType ?? false)}
                    helperText={props.errors?.projectType ?? ""}
                  />

                  <Field
                    as={TextField}
                    id="title"
                    label="主題名稱"
                    color="secondary"
                    fullWidth
                    value={props.values.title}
                    onChange={props.handleChange}
                    name="title"
                    error={Boolean(props.errors?.title ?? false)}
                    helperText={props.errors?.title ?? ""}
                  />
                  {/* <TextField
                    label="主題名稱"
                    color="secondary"
                    fullWidth
                    value={props.values.title}
                    onChange={props.handleChange}
                    name="title"
                    helperText={props.errors.title}
                  /> */}
                  {/* <Select label="主題/產業類別" color="secondary" fullWidth /> */}
                  <UploadImage
                    onData={(path: string) => {
                      props.setFieldValue('imgPath', path)
                    }}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    imageType={imageType}
                    setImageType={setImageType}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    unsplashImages={unsplashImages}
                    setUnsplashImages={setUnsplashImages}
                    currentPage={currentPage}
                  />
                  <Field
                    as={Select}
                    id="projectDuration"
                    label="專案預計進行時間"
                    color="secondary"
                    value={props.values.projectDuration}
                    onChange={props.handleChange}
                    name="projectDuration"
                    options={duration}
                    error={Boolean(props.errors?.projectDuration ?? false)}
                    helperText={props.errors?.projectDuration ?? ""}
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
                  <MDXEditor
                    label="專案構想"
                    markdown={mkVariable}
                    onChange={(markdown: string) => {
                      props.setFieldValue("MKContent", markdown);
                    }}
                    helperText={props.errors?.MKContent ?? ""}
                    error={Boolean(props.errors?.MKContent ?? false)}
                  />
                </>
              )}

              {activeStep === 2 && (
                <FieldArray name="partners">
                  {(arrayHelpers) => (
                    <>
                      {props.values.partners.map((partner, index) => (
                        <Card key={index}>
                          <Box alignSelf="flex-end">
                            {props.values.partners.length > 1 && (
                              <IconButton
                                onClick={() => {
                                  if (props.values.partners.length > 1)
                                    arrayHelpers.remove(index);
                                  else {
                                  }
                                }}
                              >
                                <Image
                                  src="/delete.svg"
                                  alt="delete icon"
                                  width={24}
                                  height={24}
                                />
                              </IconButton>
                            )}
                          </Box>
                          <Box display="flex" gap={2.5}>
                            {/* <Select
                              label="組員職位"
                              color="secondary"
                              options={jobPosition}
                              value={props.values.partners[index].jobPosition}
                              onChange={props.handleChange}
                              name={`partners[${index}].jobPosition`}
                              fullWidth
                            /> */}
                            <Field
                              as={Select}
                              label="組員職位"
                              color="secondary"
                              options={jobPosition}
                              value={props.values.partners[index].jobPosition}
                              onChange={props.handleChange}
                              name={`partners[${index}].jobPosition`}
                              fullWidth
                              error={Boolean(props.errors[`partners.${index}.jobPosition`] ?? false)}
                              helperText={props.errors[`partners.${index}.jobPosition`] ?? ""}
                            />
                          </Box>
                          <TextField
                            label="能力要求"
                            placeholder="若無，可不填"
                            color="secondary"
                            value={
                              props.values.partners[index].projectRequirement
                            }
                            onChange={props.handleChange}
                            name={`partners[${index}].projectRequirement`}
                            minRows={3}
                            fullWidth
                            multiline
                          />
                          {/* {props.values.partners[index].members.map((_ ,emailIndex) => (
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
                          
                          ))} */}
                          {/* name={`members.${memberIndex}.tasks`} */}
                          <FieldArray name={`partners[${index}].members`}>
                            {(memberArrayHelpers) => (
                              <>
                                {props.values.partners[index].members.map(
                                  (_, emailIndex) => (
                                    <div
                                      key={emailIndex}
                                      className={styles.emailInput}
                                    >
                                      <Field
                                        as={TextField}
                                        label="組員Email"
                                        placeholder="請輸入Email"
                                        value={
                                          props.values.partners[index].members[
                                            emailIndex
                                          ]
                                        }
                                        onChange={props.handleChange}
                                        name={`partners[${index}].members[${emailIndex}]`}
                                        color="secondary"
                                        fullWidth
                                        error={Boolean(props.errors[`partners.${index}.members.${emailIndex}`] ?? false)}
                                        helperText={props.errors[`partners.${index}.members.${emailIndex}`] ?? ""}
                                      />
{/*                                       
                                      <TextField
                                        // key={emailIndex}
                                        label="組員Email"
                                        placeholder="請輸入Email"
                                        value={
                                          props.values.partners[index].members[
                                            emailIndex
                                          ]
                                        }
                                        onChange={props.handleChange}
                                        name={`partners[${index}].members[${emailIndex}]`}
                                        color="secondary"
                                        fullWidth
                                      /> */}
                                      {/* delete icon */}
                                      <IconButton
                                        disabled={
                                          props.values.partners[index].members
                                            .length < 2
                                        }
                                        onClick={() => {
                                          memberArrayHelpers.remove(emailIndex);
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <mask
                                            id="mask0_757_2444"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="24"
                                            height="24"
                                          >
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="#D9D9D9"
                                            />
                                          </mask>
                                          <g mask="url(#mask0_757_2444)">
                                            <path
                                              d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
                                              fill={
                                                props.values.partners[index]
                                                  .members.length > 1
                                                  ? "#FF5D5D"
                                                  : theme.palette.grey[100]
                                              }
                                            />
                                          </g>
                                        </svg>
                                      </IconButton>
                                    </div>
                                  )
                                )}
                                <Box
                                  display="flex"
                                  sx={{ justifyContent: "center" }}
                                >
                                  <AddCircleOutlineIcon
                                    color="secondary"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                      console.log(
                                        props.values.partners[index].members
                                      );
                                      memberArrayHelpers.push("");
                                    }}
                                  />
                                </Box>
                              </>
                            )}
                          </FieldArray>
                        </Card>
                      ))}
                      <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        startIcon={<AddCircleOutlineIcon />}
                        fullWidth
                        onClick={() =>
                          arrayHelpers.push({
                            id: uuidv4(),
                            jobPosition: "",
                            number: 1,
                            projectRequirement: "",
                            members: [""],
                          })
                        }
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
                {activeStep !== 2 && (
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white" }}
                    endIcon={<ChevronRightIcon />}
                    fullWidth
                    onClick={() => handleNext(props.values, props.setErrors)}
                    type="button"
                  >
                    下一步
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white" }}
                    fullWidth
                    // onClick={() => handleNext(props.values, props.setErrors)}
                    type="submit"
                  >
                    發布
                  </Button>
                )}
              </Box>
            </Box>
          </FormFormik>
        )}
      </Formik>
    </Box>
  );
}