import Allocation from 'models/allocation.model';
import HttpService from './http.service';

const USPOLIS_SERVER_URL = 'http://localhost:5000/api'; // TODO: environment variable

export default class AllocationService extends HttpService {
  constructor() {
    super(`${USPOLIS_SERVER_URL}/classes`);
  }
  getById(id: string) {
    const allocationMock: Allocation = {
      id: id,
      classes: [
        {
          class_code: '2022301',
          subject_code: 'PCS3858',
          start_period: '29/08/2022',
          end_period: '16/12/2022',
          events: [
            {
              week_day: 'ter',
              start_time: '14:00',
              end_time: '17:40',
              classroom: 'C1-49',
              building: 'Elétrica',
            },
          ],
        },
        {
          class_code: '2022301',
          subject_code: 'PCS3xxx',
          start_period: '29/08/2022',
          end_period: '16/12/2022',
          events: [
            {
              week_day: 'seg',
              start_time: '14:00',
              end_time: '17:40',
              classroom: 'C1-49',
              building: 'Elétrica',
            },
          ],
        },
        {
          class_code: '2022301',
          subject_code: 'PCS3xxx',
          start_period: '29/08/2022',
          end_period: '16/12/2022',
          events: [
            {
              week_day: 'seg',
              start_time: '08:00',
              end_time: '12:00',
              classroom: 'C1-49',
              building: 'Elétrica',
            },
          ],
        },
        {
          class_code: '2022301',
          subject_code: 'PCS3xxx',
          start_period: '29/08/2022',
          end_period: '16/12/2022',
          events: [
            {
              week_day: 'seg',
              start_time: '08:00',
              end_time: '12:00',
              classroom: 'C1-49',
              building: 'Elétrica',
            },
          ],
        },
      ],
    };
    return Promise.resolve(allocationMock);
  }
}
