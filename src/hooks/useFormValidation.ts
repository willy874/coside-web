// hooks/useFormValidation.ts
import { z } from 'zod';

// Validation Schemas
const step0ValidationSchema = z
  .object({
    titleType: z
      .string({ required_error: "必選" })
      .min(1, { message: "必選" }),
    projectType: z
      .string({ required_error: "必選" })
      .min(1, { message: "必選" }),
    title: z
      .string({ required_error: "勿少於3個字" })
      .min(3, { message: "勿少於3個字" })
      .max(40, { message: "不多於40個字" }),
    projectDuration: z
      .string({ message: "必選" })
      .min(1, { message: "必選" }),
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

export const step2ValidationSchema = z.object({
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

const validationSchema = [
  step0ValidationSchema,
  step1ValidationSchema,
  step2ValidationSchema,
];

export const useFormValidation = (activeStep: number) => {
  const currentValidationSchema = validationSchema[activeStep];
  return { currentValidationSchema };
};