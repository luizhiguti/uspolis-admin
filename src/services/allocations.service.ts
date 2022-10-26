import Allocation from 'models/allocation.model';
import HttpService from './http.service';
import allocationMock from './allocationMock.json';

const USPOLIS_SERVER_URL = 'http://localhost:5000/api'; // TODO: environment variable

export default class AllocationService extends HttpService {
  constructor() {
    super(`${USPOLIS_SERVER_URL}/classes`);
  }
  getById(id: string) {
    const data: Allocation[] = allocationMock;
    return Promise.resolve(data);
  }
}
