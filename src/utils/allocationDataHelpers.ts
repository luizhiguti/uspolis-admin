import { AllocationByWeekDays, ClassAllocation } from 'models/allocation.model';
import { WeekDays } from 'models/enums/weekDays.enum';

export function AllocationByWeekDaysMapper(classesAllocation: ClassAllocation[]) {
  let data: AllocationByWeekDays[] = [];
  classesAllocation.forEach((group) => {
    group.events.forEach((event) => {
      switch (event.week_day) {
        case WeekDays.Sunday:
          data.push({
            sunday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Monday:
          data.push({
            monday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Tuesday:
          data.push({
            tuesday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Wednesday:
          data.push({
            wednesday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Thursday:
          data.push({
            thursday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Friday:
          data.push({
            friday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
        case WeekDays.Saturday:
          data.push({
            saturday: {
              start_time: event.start_time,
              end_time: event.end_time,
              classroom: event.classroom,
              building: event.building,
            },
          });
          break;
      }
    });
  });
  return data;
}
