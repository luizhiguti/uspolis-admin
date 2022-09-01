export default interface Class {
  class_code: string;
  subject_code: string;
  subject_name: string;
  professors: string[];
  start_period: string;
  end_period: string;
  start_time: string[];
  end_time: string[];
  week_days: string[];
  class_type: string;
  vacancies: number;
  subscribers: number;
  pendings: number;
}
