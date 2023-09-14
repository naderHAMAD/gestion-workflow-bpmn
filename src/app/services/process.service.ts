import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowProcessInstance } from 'src/app/entities/WorflowProcessInstance.entity';
import { HistoricActivityInstance } from '../entities/HistoricActivityInstance.entity';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private apiUrl = `${environment.baseUrl}/process`;

  constructor(private http: HttpClient) { }

  getProcessInstances() {
    return this.http.get<WorkflowProcessInstance[]>(`${this.apiUrl}/get/process-instances`);
  }

  deleteProcessInstance(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/process-instance/${id}`);
  }

  suspendProcessInstance(id: string) {
    return this.http.post(`${this.apiUrl}/suspend/process-instances/${id}`, "", { responseType: 'text' });
  }

  restartProcessInstance(id: string) {
    return this.http.put(`${this.apiUrl}/restart/${id}`, "", { responseType: 'text' });
  }

  resumeProcessInstance(id: string) {
    return this.http.post(`${this.apiUrl}/resume/${id}`, "", { responseType: 'text' });
  }

  getExecutionHistory(processInstanceId: string): Observable<HistoricActivityInstance[]> {
    const url = `${this.apiUrl}/get/${processInstanceId}/execution-history`;
    return this.http.get<HistoricActivityInstance[]>(url);
  }
  startProcess(deploymentId: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/start/deployement/${deploymentId}`, "", { responseType: 'text' });
  }

}