// utils/validation.ts
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { FormValues } from "@/hooks/useFormControl"

export const doValidate = async (values: FormValues, validationSchema: any): Promise<object | false> => {
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