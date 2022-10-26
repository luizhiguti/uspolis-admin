export default interface Allocation {
  class_code: string;
  subject_code: string;
  start_period: string;
  end_period: string;
  week_day: string;
  start_time: string;
  end_time: string;
  classroom: string;
  building: string;
  professor?: string;
}
