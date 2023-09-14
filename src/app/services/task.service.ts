import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError,Observable } from 'rxjs';
import { SendTask } from 'src/app/entities/SendTask.entity';
import { ServiceTask } from 'src/app/entities/ServiceTask.entity';
import { UserTask } from 'src/app/entities/UserTask.entity';
import { ActiveTask } from 'src/app/entities/ActiveTask.entity';
import { environment } from '../../environments/environment';

import { GatewaySequenceFlow } from 'src/app/entities/GatewaySequenceFlow.entity';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.baseUrl}/task`;  
  constructor(private http: HttpClient) { }

  getUserTasks(deploymentId: string) {
    return this.http.get<UserTask[]>(`${this.apiUrl}/get/process/user-tasks/${deploymentId}`)
      .pipe(
        catchError(error => {
          console.error('Failed to get user tasks', error);
          return throwError('Failed to get user tasks. Please try again later.');
        })
      );
  }

  getServiceTasks(deploymentId: string) {
    return this.http.get<ServiceTask[]>(`${this.apiUrl}/get/process/service-tasks/${deploymentId}`)
      .pipe(
        catchError(error => {
          console.error('Failed to get service tasks', error);
          return throwError('Failed to get service tasks. Please try again later.');
        })
      );
  }

  getSendTasks(deploymentId: string) {
    return this.http.get<SendTask[]>(`${this.apiUrl}/get/process/send-tasks/${deploymentId}`)
      .pipe(
        catchError(error => {
          console.error('Failed to get send tasks', error);
          return throwError('Failed to get send tasks. Please try again later.');
        })
      );
  }

  getGatewaySequenceFlows(deploymentId: string) {
    return this.http.get<GatewaySequenceFlow[]>(`${this.apiUrl}/get/process/gateway/outgoing/${deploymentId}`)
      .pipe(
        catchError(error => {
          console.error('Failed to get gateway sequence flows', error);
          return throwError('Failed to get gateway sequence flows. Please try again later.');
        })
      );
  }

  updateUserTask(deploymentId: string, userTaskId: string,formKey: string , assignee: string) {
    return this.http.put(`${this.apiUrl}/update/process/user-tasks/${deploymentId}/${userTaskId}?formKey=${formKey}&assignee=${assignee}`, null, {responseType: 'text'})
      .pipe(
        catchError(error => {
          console.error('Failed to update user task', error);
          return throwError('Failed to update user task. Please try again later.');
        })
      );
  }

  getActiveTasks() {
    return this.http.get<ActiveTask[]>(`${this.apiUrl}/get/active`)
      .pipe(
        catchError(error => {
          console.error('Failed to get active tasks', error);
          return throwError('Failed to get active tasks. Please try again later.');
        })
      );
  }

  getSimpleUserActiveUserTasks(): Observable<ActiveTask[]> {
    return this.http.get<ActiveTask[]>(`${this.apiUrl}/get/active/user`)
      .pipe(
        catchError(error => {
          console.error('Failed to get simple user active tasks', error);
          return throwError('Failed to get simple user active tasks. Please try again later.');
        })
      );
  }

  getValidatorActiveTasks(): Observable<ActiveTask[]> {
    return this.http.get<ActiveTask[]>(`${this.apiUrl}/get/active/validator`)
      .pipe(
        catchError(error => {
          console.error('Failed to get validator active tasks', error);
          return throwError('Failed to get validator active tasks. Please try again later.');
        })
      );
  }



  completeTask(taskId: string, input: number): Observable<void> {
    const url = `${this.apiUrl}/complete/${taskId}`;
    const requestBody = { input };
    return this.http.post<void>(url, requestBody);
  }
}