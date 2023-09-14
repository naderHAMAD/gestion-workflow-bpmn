import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from 'src/app/entities/Form.entity';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = `${environment.baseUrl}/form`;

  constructor(private http: HttpClient) {}

  saveFormJson(form: Form) {
    return this.http.post<Form>(`${this.apiUrl}/save/json`, form);
  }

  getAllForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/get/all`);
  }

  deleteFormById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateFormJson(form: Form): Observable<Form> {
    const url = `${this.apiUrl}/update/${form.id}`;
    return this.http.put<Form>(url, form);
  }

  getFormContent(formKey: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/content/${formKey}`);
  }

  saveFormData(formKey: string, formDataJson: string): Observable<any> {
    const url = `${this.apiUrl}/form-data/${formKey}`;
    const body = { data: formDataJson };
    return this.http.post(url, body);
  }
  
}