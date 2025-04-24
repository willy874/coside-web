import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useFormControlContext } from "@/contexts/FormControlContext";
import CustomDialog from "@/components/Dialog/CustomDialog";

export default function NavigationButtons() {
  const formControl = useFormControlContext();
  const router = useRouter();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleCancelClick = () => {
    if (formControl.activeStep === 0) {
      setOpenCancelDialog(true);
    } else {
      formControl.handlePrevious();
    }
  };

  const handleCancelConfirm = () => {
    setOpenCancelDialog(false);
    formControl.resetForm();
    router.push("/");
  };

  const handleCancelClose = () => {
    setOpenCancelDialog(false);
  };

  return (
    <Box display="flex" width="100%" gap={2.5}>
      <Button
        size="large"
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleCancelClick}
      >
        {formControl.activeStep === 0 ? "取消" : "上一步"}
      </Button>

      {formControl.activeStep === 2 ? (
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
      ) : (
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

      <CustomDialog
        themeColor="red"
        open={openCancelDialog}
        onClose={handleCancelClose}
        title="確定要取消發布嗎？"
        description="你當前所填寫的內容將全部消失"
        buttons={[
          { text: "我再想想", onClick: handleCancelClose, variant: "outline" },
          {
            text: "取消發布",
            onClick: handleCancelConfirm,
            variant: "fill",
          },
        ]}
      />
    </Box>
  );
}
