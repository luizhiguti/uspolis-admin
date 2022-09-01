import { AxiosResponse } from 'axios';
import Class from 'models/class.model';
import HttpService from './http.service';

const USPOLIS_SERVER_URL = 'http://localhost:5000/api'; // TODO: environment variable

export default class ClassesService extends HttpService {
  constructor() {
    super(`${USPOLIS_SERVER_URL}/classes`);
  }

  list(): Promise<AxiosResponse<Array<Class>>> {
    return this.http.get('');
  }

  createMany(data: string[]): Promise<AxiosResponse<any>> {
    return this.http.post('many', data);
  }

  delete(subject_code: string, class_code: string) {
    return this.http.delete(`${subject_code}/${class_code}`);
  }
}