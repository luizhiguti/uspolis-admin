export default interface Allocation {
  id: string;
  classes: ClassAllocation[];
}

export interface ClassAllocation {
  class_code: string;
  subject_code: string;
  start_period: string;
  end_period: string;
  events: ClassEvent[];
}

export interface ClassEvent {
  week_day: string;
  start_time: string;
  end_time: string;
  classroom: string;
  building: string;
}

export interface AllocationByWeekDays {
  sunday?: ClassEventByWeekDay;
  monday?: ClassEventByWeekDay;
  tuesday?: ClassEventByWeekDay;
  wednesday?: ClassEventByWeekDay;
  thursday?: ClassEventByWeekDay;
  friday?: ClassEventByWeekDay;
  saturday?: ClassEventByWeekDay;
}

export interface ClassEventByWeekDay {
  start_time: string;
  end_time: string;
  classroom: string;
  building: string;
}
