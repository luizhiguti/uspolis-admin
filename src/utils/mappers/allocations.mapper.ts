import Allocation from 'models/allocation.model';
import Classroom from 'models/classroom.model';
import { WeekDays } from 'models/enums/weekDays.enum';

export function AllocationEventsMapper(allocation: Allocation[]) {
  return allocation.map((it) => ({
    title: it.subject_code,
    daysOfWeek: [weekDayInt(it.week_day)],
    startTime: it.start_time,
    endTime: it.end_time,
    startRecur: it.start_period,
    endRecur: it.end_period,
    resourceId: it.classroom,
    extendedProps: {
      building: it.building,
      classCode: classCodeText(it.class_code),
      professor: it.professor,
    },
  }));
}

function weekDayInt(weekDay: string) {
  switch (weekDay) {
    case WeekDays.Sunday:
      return 0;
    case WeekDays.Monday:
      return 1;
    case WeekDays.Tuesday:
      return 2;
    case WeekDays.Wednesday:
      return 3;
    case WeekDays.Thursday:
      return 4;
    case WeekDays.Friday:
      return 5;
    case WeekDays.Saturday:
      return 6;
  }
}

function classCodeText(classCode: string) {
  const classCodeInt = parseInt(classCode.slice(-2));
  return `Turma ${classCodeInt}`;
}

export function AllocationResourcesMapper(classrooms: Classroom[]) {
  return classrooms.map((it) => ({
    id: it.classroom_name,
    building: it.building,
  }));
}

export function AllocationResourcesFromEventsMapper(allocation: Allocation[]) {
  return Array.from(new Set(allocation.map((it) => ({ id: it.classroom, building: it.building }))));
}
