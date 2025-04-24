import { useFormikContext } from "formik";
import { Box } from "@mui/material";
import { FormValues } from "@/hooks/useFormControl";
import { useFormControlContext } from "@/contexts/FormControlContext";
import MDXEditor from "@/components/Form/MDXEditor";

export default function StepDescription() {
  const { touched, errors, setFieldValue } =
    useFormikContext<FormValues>();
  const formControl = useFormControlContext();

  return (
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
        markdown={formControl.mkVariable}
        onChange={(markdown: string) => {
          setFieldValue("MKContent", markdown);
          formControl.setMkVariable(markdown);
        }}
        helperText={touched.MKContent && errors?.MKContent}
        error={Boolean(touched.MKContent && errors?.MKContent)}
      />
    </>
  );
}
