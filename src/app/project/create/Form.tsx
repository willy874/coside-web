"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  FormikHelpers,
  FormikErrors,
  getIn,
} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { set, z } from "zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import UploadImage from "@/components/UploadImage";
import MDXEditor from "@/components/MDXEditor";
import { jobPosition, projectType, titleType, duration } from "@/constant";
import useArray from "@/hooks/useArray";
// type
// import type { PartnerType } from "./Form.type";
import styles from "./Form.module.scss";
import { convertSelectionToNode$ } from "@mdxeditor/editor";

type PartnerType = {
  // id: string;
  number: number;
  jobPosition: string;
  otherJobPosition: string;
  projectRequirement: string;
  members: string[];
};

type bannerUnsplash = {
  [key: string]: any;
};

type FormValues = {
  title: string;
  projectType: string;
  titleType: string;
  projectDuration: string;
  MKContent: string;
  imageType: string;
  bannerUpload: object | Blob | undefined;
  bannerCoside: string;
  bannerUnsplash: bannerUnsplash | undefined;
  partners: PartnerType[];
  submit: string;
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

  const [mkVariable, setMkVariable] = useState("");
  const { token } = useLoginStore();
  const [previewImage, setPreviewImage] = useState("");
  const [imageType, setImageType] = useState("upload");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [activeCosideIndex, setActiveCosideIndex] = useState<number | null>(-1);
  const [activeUnsplashIndex, setActiveUnsplashIndex] = useState<number | null>(
    -1
  );

  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const currentPage = useRef(1);

  const theme = useTheme();
  const router = useRouter();

  const initialValues: FormValues = {
    titleType: "",
    projectType: "",
    title: "",
    projectDuration: "",
    MKContent: "",
    imageType: "upload",
    bannerUpload: undefined,
    bannerCoside: "",
    bannerUnsplash: undefined,
    partners: [
      {
        // id: uuidv4(),
        number: 1,
        jobPosition: "",
        otherJobPosition: "",
        projectRequirement: "",
        members: [""],
      },
    ],
    submit: "",
  };


  const handleEditorChange = (markdown: string) => {
    setMkVariable(markdown);
  };

  // const partners = useArray<PartnerType>({
  //   defaultValues: [{ id: "1", number: 1 }],
  // });

  const step0ValidationSchema = z
    .object({
      titleType: z.string({required_error: "必選"}).min(1, { message: "必選" }),
      projectType: z.string({required_error: "必選"}).min(1, { message: "必選" }),
      title: z
        .string({required_error: "勿少於3個字"})
        .min(3, { message: "勿少於3個字" })
        .max(40, { message: "不多於40個字" }),
      projectDuration: z.string({message: "必選"}).min(1, { message: "必選" }),
      imageType: z.string(),
      bannerUpload: z.object({}).optional(),
      bannerCoside: z.string().optional(),
      bannerUnsplash: z.object({}).optional(),
    })
    .superRefine((data, ctx) => {
      // 根據 imageType 判斷對應的物件是否存在
      switch (data.imageType) {
        case "upload":
          if (!data.bannerUpload) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "請上傳圖片",
              path: ["bannerUpload"],
            });
          }
          break;
        case "coside":
          if (!data.bannerCoside) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "請選擇圖片",
              path: ["bannerCoside"],
            });
          }
          break;
        case "unsplash":
          if (!data.bannerUnsplash) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "請選擇圖片",
              path: ["bannerUnsplash"],
            });
          }
          break;
      }
    });

  const step1ValidationSchema = z.object({
    MKContent: z.string().trim().min(10, { message: "字數不得小於 10 個字" }),
  });

  const step2ValidationSchema = z.object({
    partners: z
      .array(
        z
          .object({
            jobPosition: z.string().min(1, { message: "必選" }),
            projectRequirement: z.string().optional(),
            members: z.array(
              z
                .string()
                .email({ message: "請輸入有效的 Email 地址" })
                .or(z.literal(""))
                .optional()
            ),
            otherJobPosition: z.string().optional(),
          })
          .superRefine((data, ctx) => {
            if (data.jobPosition === "其他" && !data.otherJobPosition?.trim()) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "請輸入職位名稱",
                path: ["otherJobPosition"],
              });
            }
          })
          
      )
      .min(1, { message: "至少需要一名組員" }),
  });
  const schema = [step0ValidationSchema, step1ValidationSchema, step2ValidationSchema];
  const handlePrevious = () => {
    setActiveStep((preStep) => {
      if (preStep > 0) {
        return preStep - 1
      };
      
      return preStep;
    });
  };

  const doValidate = async (
    values: FormValues,
    validationSchema: any
  ): Promise<object | false> => {
    const formikSchema = toFormikValidationSchema(validationSchema);
    try {
      await formikSchema.validate(values);
      return false;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
  };

  const handleNext = async () => {
    // let validationSchema;
    if (activeStep === 0) {
      // validationSchema = step0ValidationSchema;
      return setActiveStep((preStep) => {
        return preStep + 1;
      });
    } else if (activeStep === 1) {
      return setActiveStep((preStep) => {
        return preStep + 1;
      });
      // validationSchema = step1ValidationSchema;
    } else {
      return setActiveStep((preStep) => {
        return preStep + 1;
      });
    }

    // const validateResult = await doValidate(values, validationSchema);

    // if (validateResult === false) {
    //   setActiveStep((preStep) => {
    //     return preStep + 1;
    //   });
    // } else {
    //   setErrors(validateResult);
    // }
  };

  const uploadImageBeforeSubmit = async (
    formValues: FormValues,
    token: string
  ) => {
    try {
      switch (formValues.imageType) {
        case "upload": {
          if (!formValues.bannerUpload) {
            throw new Error("No file selected for upload");
          }

          const data = new FormData();
          data.append("file", formValues.bannerUpload as Blob);

          const response = await axios.post(`/api/upload?type=images`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data;
        }

        case "coside": {
          return formValues.bannerCoside;
        }

        case "unsplash": {
          // console.log(formValues.bannerUnsplash);

          try {
            if (!formValues.bannerUnsplash) {
              throw new Error("No Unsplash image selected");
            }
            // 原始圖片資訊 
            const imageUrl = formValues.bannerUnsplash.urls.raw;
            const downloadUrl = formValues.bannerUnsplash.links.download_location;

            // 壓縮參數 
            let width = 1920;
            let quality = 80; // 初始品質 
            const minQuality = 60; // 最低品質 
            const fileSizeLimit = 3 * 1024 * 1024; // 3MB 

            // 建立壓縮後的圖片 URL
            const getCompressedUrl = (url: any, width: any, quality: any) => {
              return `${url}?w=${width}&q=${quality}&fm=jpg&fit=max`;
            };

            // 用 axios 獲取圖片 Blob 並檢查大小
            const compressAndGetQuality = async (url: any) => {
              let compressedUrl = getCompressedUrl(url, width, quality);

              while (true) {
                const response = await axios.get(compressedUrl, {
                  responseType: "blob",
                });
                const blob = response.data;

                if (blob.size <= fileSizeLimit || quality <= minQuality) {
                  // 返回確認後的 URL 和品質 
                  return { blob };
                }

                // 若大小不合格且品質未達最低，降低品質再試 
                quality -= 10;
                compressedUrl = getCompressedUrl(url, width, quality);
              }
            };

            // 獲取確認後的壓縮 URL 和品質以及 blob
            const { blob: compressedBlob } =
              await compressAndGetQuality(imageUrl);

            await axios.get(
              `${downloadUrl}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID}`
            );

            // 使用前面已經取得的壓縮後 blob 來建立 File 物件
            const file = new File(
              [compressedBlob],
              `${formValues.bannerUnsplash.id}.jpg`,
              { type: "image/jpeg" }
            );

            // 建立 FormData 並上傳圖片 
            const data = new FormData();
            data.append("file", file);

            const res = await axios.post(`/api/upload?type=images`, data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
            return res.data.data;
          } catch (e) {
            console.error("處理圖片或上傳時發生錯誤:", e);
          }
        }

        default:
          throw new Error("Invalid image type");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {

    if (activeStep === 2) {
      const { setErrors, setSubmitting } = formikHelpers;
      try {
        setSubmitting(true);

        // 1. Validate the form data－
        const validateResult = await doValidate(values, step2ValidationSchema);
        if (validateResult) {
          setErrors(validateResult);
          return;
        }

        // 2. Upload the image
        const imgPath = await uploadImageBeforeSubmit(values, token);

        // 3. Transform members data
        if (!values.partners) {
          throw new Error("No partner");
        }
        const members = values.partners.flatMap((partner) =>
          partner.members.map((member) => ({
            role: partner.jobPosition,
            skill: partner.projectRequirement || "",
            email: member.trim() === "" ? null : member,
            group: partner.jobPosition,
          }))
        );

        // 4. Prepare the request body
        const bodyData = {
          name: values.title,
          type: values.titleType,
          duration: values.projectDuration,
          background_Path: imgPath,
          description: values.MKContent,
          categories: [values.projectType],
          members,
          industry: "未分類",
          tags: ["未分類"],
        };


        // 5. Submit the project
        await axios.post(`/api/project`, bodyData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // 6. Handle success (you might want to add navigation or success message here)
        // console.log("Project created successfully:", response.data);
        router.push("/")
      } catch (error: any) {
        console.error("Submit error:", error);

        // Handle specific error cases
        if (error.response?.status === 401) {
          setErrors({ submit: "請重新登入" });
        } else if (error.response?.status === 413) {
          setErrors({ submit: "圖片檔案過大，請選擇較小的檔案" });
        } else {
          setErrors({ submit: "發生錯誤，請稍後再試" });
        }
      } finally {
        setSubmitting(false);
        router.push("/");
      }
    }else {
      handleNext();
    }
  };

  const currentValidationSchema: any =
  activeStep === 0
    ? step0ValidationSchema
    : activeStep === 1
    ? step1ValidationSchema
    : step2ValidationSchema;

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
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(currentValidationSchema)}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setErrors,
          setFieldValue,
        }) => (
          <FormFormik onSubmit={handleSubmit} className={styles.form}>
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
                    value={values.titleType}
                    onChange={handleChange}
                    name="titleType"
                    fullWidth
                    error={Boolean(touched.titleType && errors?.titleType)}
                    helperText={touched.titleType && errors?.titleType}
                  />
                  <Field
                    as={Select}
                    label="專案類型"
                    color="secondary"
                    value={values.projectType}
                    onChange={handleChange}
                    options={projectType}
                    name="projectType"
                    fullWidth
                    error={Boolean(touched.projectType && errors?.projectType)}
                    helperText={touched.projectType && errors?.projectType}
                  />

                  <Field
                    as={TextField}
                    id="title"
                    label="主題名稱"
                    color="secondary"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    error={Boolean(touched.title && errors?.title)}
                    helperText={touched.title && errors?.title }
                  />
                  {/* <TextField
                    label="主題名稱"
                    color="secondary"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    helperText={errors.title}
                  /> */}
                  {/* <Select label="主題/產業類別" color="secondary" fullWidth /> */}
                  <UploadImage
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    imageType={imageType}
                    setImageType={setImageType}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    activeCosideIndex={activeCosideIndex}
                    setActiveCosideIndex={setActiveCosideIndex}
                    activeUnsplashIndex={activeUnsplashIndex}
                    setActiveUnsplashIndex={setActiveUnsplashIndex}
                    unsplashImages={unsplashImages}
                    setUnsplashImages={setUnsplashImages}
                    currentPage={currentPage}
                    setFieldValue={setFieldValue}
                    errorStatus={Boolean(
                      imageType === "upload"
                        ? errors?.bannerUpload
                        : imageType === "coside"
                          ? errors?.bannerCoside
                          : imageType === "unsplash"
                            ? errors?.bannerUnsplash
                            : false
                    )}
                    helperText={
                      imageType === "upload"
                        ? errors?.bannerUpload
                        : imageType === "coside"
                          ? errors?.bannerCoside
                          : imageType === "unsplash"
                            ? errors?.bannerUnsplash
                            : ""
                    }
                  />
                  <Field
                    as={Select}
                    id="projectDuration"
                    label="專案預計進行時間"
                    color="secondary"
                    value={values.projectDuration}
                    onChange={handleChange}
                    name="projectDuration"
                    options={duration}
                    error={Boolean(touched.projectDuration && errors?.projectDuration)}
                    helperText={touched.projectDuration && errors?.projectDuration}
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
                      setFieldValue("MKContent", markdown);
                      setMkVariable(markdown);
                    }}
                    helperText={touched.MKContent && errors?.MKContent}
                    error={Boolean(touched.MKContent && errors?.MKContent)}
                  />
                </>
              )}

              {activeStep === 2 && (
                <FieldArray name="partners">
                  {(arrayHelpers) => (
                    <>
                      {values.partners.map((partner, index) => (
                        <Card key={index}>
                          <Box alignSelf="flex-end">
                            {values.partners.length > 1 && (
                              <IconButton
                                onClick={() => {
                                  if (values.partners.length > 1)
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
                              value={values.partners[index].jobPosition}
                              onChange={handleChange}
                              name={`partners[${index}].jobPosition`}
                              fullWidth
                            /> */}
                            <Field
                              as={Select}
                              label="組員職位"
                              color="secondary"
                              options={jobPosition}
                              value={values.partners[index].jobPosition}
                              onChange={handleChange}
                              name={`partners[${index}].jobPosition`}
                              fullWidth
                              error={Boolean(
                                getIn(errors, `partners.${index}.jobPosition`)
                              )}
                              helperText={
                                getIn(
                                  errors,
                                  `partners.${index}.jobPosition`
                                ) || ""
                              }
                            />
                          </Box>
                          {values.partners[index].jobPosition === "其他" && (
                            <Box>
                              <Field
                                as={TextField}
                                label="其他職位"
                                placeholder="請輸入職位"
                                color="secondary"
                                value={values.partners[index].otherJobPosition}
                                onChange={handleChange}
                                name={`partners[${index}].otherJobPosition`}
                                fullWidth
                                error={Boolean(
                                  getIn(
                                    errors,
                                    `partners.${index}.otherJobPosition`
                                  )
                                )}
                                helperText={
                                  getIn(
                                    errors,
                                    `partners.${index}.otherJobPosition`
                                  )
                                    ? getIn(
                                        errors,
                                        `partners.${index}.otherJobPosition`
                                      )
                                    : ""
                                }
                              />
                            </Box>
                          )}

                          <TextField
                            label="能力要求"
                            placeholder="若無，可不填"
                            color="secondary"
                            value={values.partners[index].projectRequirement}
                            onChange={handleChange}
                            name={`partners[${index}].projectRequirement`}
                            minRows={3}
                            fullWidth
                            multiline
                          />
                          {/* {values.partners[index].members.map((_ ,emailIndex) => (
                            <TextField
                              key={emailIndex}
                              label="組員Email"
                              placeholder="請輸入Email"
                              value= {values.partners[index].members[emailIndex]}
                              onChange={handleChange}
                              name={`partners[${index}].members[${emailIndex}]`}
                              color="secondary"
                              fullWidth
                            />
                          
                          ))} */}
                          {/* name={`members.${memberIndex}.tasks`} */}
                          <FieldArray name={`partners[${index}].members`}>
                            {(memberArrayHelpers) => (
                              <>
                                {values.partners[index].members.map(
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
                                          values.partners[index].members[
                                            emailIndex
                                          ]
                                        }
                                        onChange={handleChange}
                                        name={`partners.${index}.members[${emailIndex}]`}
                                        color="secondary"
                                        fullWidth
                                        error={Boolean(
                                          getIn(
                                            errors,
                                            `partners.${index}.members.${emailIndex}`
                                          )
                                        )}
                                        helperText={
                                          getIn(
                                            errors,
                                            `partners.${index}.members.${emailIndex}`
                                          ) ?? ""
                                        }
                                      />
                                      {/*                                       
                                      <TextField
                                        // key={emailIndex}
                                        label="組員Email"
                                        placeholder="請輸入Email"
                                        value={
                                          values.partners[index].members[
                                            emailIndex
                                          ]
                                        }
                                        onChange={handleChange}
                                        name={`partners[${index}].members[${emailIndex}]`}
                                        color="secondary"
                                        fullWidth
                                      /> */}
                                      {/* delete icon */}
                                      <IconButton
                                        disabled={
                                          values.partners[index].members
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
                                                values.partners[index].members
                                                  .length > 1
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
                    // onClick={() => handleNext(values, setErrors)}
                    type="submit"
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
                    // onClick={() => handleNext(values, setErrors)}
                    type="submit"
                  >
                    發布
                  </Button>
                )}
              </Box>
            </Box>
            {/* <pre>{JSON.stringify({ values, errors, touched }, null, 2)}</pre> */}
          </FormFormik>
        )}
      </Formik>
    </Box>
  );
}
