import React from "react";
import { Stepper, Step, StepLabel, Box, StepConnector } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";

const baseSteps = [
  "발주 생성",
  "발주 승인",
  "출고 처리",
  "배송 완료",
  "검수 처리",
  "결제 처리",
  "최종 완료",
];

function statusToIndex(status) {
  switch (status) {
    case "PENDING":
      return 0;
    case "APPROVED":
      return 1;
    case "SHIPPED":
      return 2;
    case "DELIVERED":
      return 3;
    case "INSPECTED":
      return 4;
    case "PAID":
      return 5;
    case "COMPLETED":
      return 6;
    default:
      return -1;
  }
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "&.MuiStepConnector-vertical": {
    marginLeft: "0.8rem",
  },
  "& .MuiStepConnector-line": {
    borderColor: theme.palette.divider,
    borderLeftWidth: 1,
    minHeight: 10,
  },
}));

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.canceled
    ? "red"
    : ownerState.active || ownerState.completed
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  color: "#fff",
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
}));

function CustomStepIcon(props) {
  const { active, completed, icon, canceled } = props;
  return (
    <CustomStepIconRoot ownerState={{ active, completed, canceled }}>
      {completed ? <Check fontSize="small" /> : icon}
    </CustomStepIconRoot>
  );
}

const PurchaseOrderProcessStepper = ({ status, isCanceled, lastStatus }) => {
  const theme = useTheme();
  const activeStep = statusToIndex(status);
  const lastValidStep = isCanceled && lastStatus ? statusToIndex(lastStatus) : -1;

  return (
    <Box>
      <Stepper
        activeStep={isCanceled ? lastValidStep : activeStep}
        orientation="vertical"
        connector={<CustomConnector />}
      >
        {baseSteps.map((label, index) => {
          const completed = isCanceled
            ? index < lastValidStep
            : index < activeStep;
          const canceledProp = isCanceled && index <= lastValidStep;
          let displayLabel = label;
          if (isCanceled && index === lastValidStep) {
            displayLabel += " (발주취소)";
          }
          return (
            <Step key={index} completed={completed}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                StepIconProps={{ canceled: canceledProp }}
                sx={{
                  "& .MuiStepLabel-label": {
                    whiteSpace: "nowrap",
                    marginRight: "16px",
                    minWidth: "120px",
                    color:
                      index === activeStep && !isCanceled
                        ? theme.palette.primary.main
                        : "inherit",
                  },
                }}
              >
                {displayLabel}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default PurchaseOrderProcessStepper;
