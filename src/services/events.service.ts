import { AxiosResponse } from 'axios';
import Event from 'models/event.model';
import HttpService from './http.service';

const USPOLIS_SERVER_URL = 'http://localhost:5000/api'; // TODO: environment variable

export default class EventsService extends HttpService {
  constructor() {
    super(`${USPOLIS_SERVER_URL}/events`);
  }
  list(): Promise<AxiosResponse<Array<Event>>> {
    return this.http.get('');
  }
}
