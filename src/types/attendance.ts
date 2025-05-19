export interface Attendance {
  id: number;
  departmentCode: string;
  departmentName: string;
  employeeCode: string;
  employeeName: string;
  positionCode: string;
  positionName: string;
  date: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  startHourStr: string;
  startMinuteStr: string;
  endHourStr: string;
  endMinuteStr: string;
  in01: string;
  in02: string;
  in03: string;
  in04: string;
  in05: string;
  baseDate: string;
  time: string;
  user: string;
  documentPath: string;
}
