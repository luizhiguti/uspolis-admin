import { AxiosResponse } from 'axios';
import Classroom from 'models/classroom.model';
import HttpService from './http.service';

const USPOLIS_SERVER_URL = 'http://localhost:5000/api'; // TODO: environment variable

export default class ClassroomsService extends HttpService {
  constructor() {
    super(`${USPOLIS_SERVER_URL}/classrooms`);
  }

  list(): Promise<AxiosResponse<Array<Classroom>>> {
    return this.http.get('');
  }

  create(data: any): Promise<AxiosResponse<any>> {
    return this.http.post('', data);
  }

  delete(name: string): Promise<AxiosResponse<any>> {
    return this.http.delete(name);
  }

  update(name: string, data: any): Promise<AxiosResponse<any>> {
    return this.http.put(name, data);
  }
}
