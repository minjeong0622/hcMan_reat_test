import React from "react";
import { Stepper, Step, StepLabel, Box, StepConnector } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Check from '@mui/icons-material/Check';

// 기본 프로세스 단계
const baseSteps = [
  "발주 생성",   // 0
  "발주 승인",   // 1
  "출고 처리",   // 2
  "배송 완료",   // 3
  "검수 처리",   // 4
  "결제 처리",   // 5
  "최종 완료",   // 6
];

// 상태 문자열을 단계 인덱스로 변환
const statusToStepIndex = (status) => {
  switch (status) {
    case "PENDING":   return 0;
    case "APPROVED":  return 1;
    case "SHIPPED":   return 2;
    case "DELIVERED": return 3;
    case "INSPECTED": return 4;
    case "PAID":      return 5;
    case "COMPLETED": return 6;
    default:          return -1;
  }
};

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

// Custom Step Icon: 취소 모드일 경우 동그라미 배경색을 빨간색으로 설정하고,
// 정상 진행 시 active/completed 여부에 따라 기본 색상 사용
const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.canceled
    ? 'red'
    : (ownerState.active || ownerState.completed
         ? (theme.palette.primary?.main || "#1976d2")
         : (theme.palette.grey?.[400] || "#bdbdbd")),
  color: '#fff',
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

function CustomStepIcon(props) {
  const { active, completed, icon, canceled } = props;
  return (
    <CustomStepIconRoot ownerState={{ active, completed, canceled }}>
      {completed ? <Check fontSize="small" /> : icon}
    </CustomStepIconRoot>
  );
}

/**
 * OrderProcessStepper
 * @param {string} status - 현재 주문 상태
 * @param {boolean} isCanceled - 주문취소 여부
 * @param {string} lastStatus - 주문취소 이전 마지막 정상 상태 (예: "SHIPPED")
 */
const OrderProcessStepper = ({ status, isCanceled = false, lastStatus }) => {
  const theme = useTheme();
  const activeStep = statusToStepIndex(status);
  const lastValidStep = isCanceled && lastStatus ? statusToStepIndex(lastStatus) : -1;

  return (
    <Box>
      <Stepper
        activeStep={isCanceled ? lastValidStep : activeStep}
        orientation="vertical"
        connector={<CustomConnector />}
      >
        {baseSteps.map((label, index) => {
          let completed;
          // 기본 스타일: whiteSpace, marginRight, 그리고 minWidth를 부여하여
          // 라벨의 폭이 일정하게 유지되도록 함
          let labelSx = {
            "& .MuiStepLabel-label": {
              whiteSpace: "nowrap",
              marginRight: "16px",
              minWidth: "150px", // 이 값은 필요에 따라 조정하세요
            },
          };

          if (isCanceled) {
            completed = index < lastValidStep;
            if (index < lastValidStep) {
              labelSx["& .MuiStepLabel-label"].color = "black";
            } else if (index === lastValidStep) {
              labelSx["& .MuiStepLabel-label"].color = "red";
            }
          } else {
            completed = index < activeStep;
            // 현재 진행 단계의 텍스트 색상을 동그라미 배경색(primary.main)과 동일하게 변경
            if (index === activeStep) {
              labelSx["& .MuiStepLabel-label"].color =
                theme.palette.primary?.main || "#1976d2";
            }
          }

          const displayLabel = isCanceled && index === lastValidStep
            ? `${label} (발주취소)`
            : label;

          // 취소 모드인 경우, 취소 단계까지 모두 canceled 플래그 적용
          const canceledProp = isCanceled && index <= lastValidStep;

          return (
            <Step key={index} completed={completed}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                StepIconProps={{ canceled: canceledProp }}
                sx={labelSx}
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

export default OrderProcessStepper;
