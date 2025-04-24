// Form.tsx (修改後，使用 Context)
"use client";

import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  FormControlProvider,
  useFormControlContext,
} from "@/contexts/FormControlContext";
import FormStepper from "./FormStepper";
import StepInfo from "./StepInfo";
import StepDescription from "./StepDescription";
import StepMember from "./StepMember";
import NavigationButtons from "./NavigationButtons";
import useLoginStore from "@/stores/loginStore";
import { Box } from "@mui/material";
import { Form as FormFormik } from "formik";

function FormContent() {
  const formControl = useFormControlContext();

  return (
    <Formik
      initialValues={formControl.initialValues}
      validationSchema={toFormikValidationSchema(
        formControl.currentValidationSchema
      )}
      onSubmit={formControl.handleSubmit}
    >
      {({ handleSubmit }) => (
        <FormFormik onSubmit={handleSubmit}>
          <Box
            maxWidth="600px"
            width="100%"
            mx="auto"
            mb={10}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            <FormStepper /> {/* 從 Context 獲取 activeStep */}
            {formControl.activeStep === 0 && <StepInfo />}
            {formControl.activeStep === 1 && <StepDescription />}
            {formControl.activeStep === 2 && <StepMember />}
            <NavigationButtons />
          </Box>
        </FormFormik>
      )}
    </Formik>
  );
}

export default function Form() {
  const { token } = useLoginStore();

  return (
    <FormControlProvider token={token}>
      <FormContent />
    </FormControlProvider>
  );
}
