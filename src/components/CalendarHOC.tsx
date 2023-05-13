import { Calendar, CalendarProps } from "primereact/calendar";

const CalendarHOC = (props: CalendarProps) => (
  <Calendar
    dateFormat="dd/mm/yy"
    showIcon
    showTime
    showSeconds
    showMillisec
    hourFormat="24"
    readOnlyInput
    {...props}
  />
);

export default CalendarHOC;
