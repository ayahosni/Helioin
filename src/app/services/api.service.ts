// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Finish {
  _id?: string;
  name: string;
  properties: string[];
  image: string;
}

export interface ProcessStep {
  _id?: string;
  name: string;
  icon_image: string;
  description: string;
}

export interface ApiResponse {
  finishies: Finish[];
  main_image: string;
  main_image_2: string;
  main_image_3: string;
  main_image_4: string;
  process: ProcessStep[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://akarat-six.vercel.app/app/dashboard';

  constructor(private http: HttpClient) {}

  // ------------------ Auth ------------------ //
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }, {
      withCredentials: true
    });
  }

  registerAdmin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      withCredentials: true
    });
  }

  // ------------------ Neighborhood APIs ------------------ //
  createNeighborhood(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_neighborhood`, formData, {
      withCredentials: true
    });
  }

  getAllNeighborhoods(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_neighborhoods`, {
      withCredentials: true
    });
  }

  getNeighborhoodById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_neighborhood/${id}`, {
      withCredentials: true
    });
  }

  editNeighborhood(id: string, formData: FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}/edit_neighborhood/${id}`, formData, {
      withCredentials: true
    });
  }

  deleteNeighborhood(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_neighborhood/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Department APIs ------------------ //
 createDepartment(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/create_department`, formData, {
    withCredentials: true
  });
}


  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_departments`, {
      withCredentials: true
    });
  }

  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_department/${id}`, {
      withCredentials: true
    });
  }

  editDepartment(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit_department/${id}`, formData, {
      withCredentials: true
    });
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_department/${id}`, {
      withCredentials: true
    });
  }

  getAllDepartmentsInNeighborhood(neighborhoodId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_departments_in_neighborhood/${neighborhoodId}`, {
      withCredentials: true
    });
  }

  // ------------------ Booking APIs ------------------ //
  getAllBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_bookings`, {
      withCredentials: true
    });
  }

  editBooking(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit_booking/${id}`, data, {
      withCredentials: true
    });
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_booking/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Requests APIs ------------------ //
  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_requests`, {
      withCredentials: true
    });
  }

  getRequestById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_request/${id}`, {
      withCredentials: true
    });
  }

  editRequest(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit_request/${id}`, data, {
      withCredentials: true
    });
  }



  deleteRequest(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_request/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Partners APIs ------------------ //
  createPartner(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_partner`, formData, {
      withCredentials: true
    });
  }

  getAllPartners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_partners`, {
      withCredentials: true
    });
  }

  editPartner(partnerId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit_partner/${partnerId}`, formData, {
      withCredentials: true
    });
  }

  deletePartner(partnerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_partner/${partnerId}`, {
      withCredentials: true
    });
  }

  // ------------------ Finishes APIs ------------------ //
  getFinishes(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.baseUrl}/get_all_finishes`, {
      withCredentials: true
    });
  }

  // الحصول على تشطيب واحد بالـ ID
  getFinishById(id: string): Observable<Finish> {
    return this.http.get<Finish>(`${this.baseUrl}/get_finish/${id}`, {
      withCredentials: true
    });
  }

  // إنشاء تشطيب جديد
  createFinish(finish: Omit<Finish, '_id'>): Observable<Finish> {
    return this.http.post<Finish>(`${this.baseUrl}/create_finish`, finish, {
      withCredentials: true
    });
  }

  // تحديث تشطيب موجود
  updateFinish(id: string, finish: Partial<Finish>): Observable<Finish> {
    return this.http.post<Finish>(`${this.baseUrl}/edit_finish/${id}`, finish, {
      withCredentials: true
    });
  }

  // حذف تشطيب
  deleteFinish(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete_finish/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Finish Forms APIs ------------------ //
  getAllFinishForms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_finish_forms`, {
      withCredentials: true
    });
  }

  deleteFinishForm(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_finish_form/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Contacts APIs ------------------ //
  getAllContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_contacts`, { withCredentials: true });
  }

  createContact(contactData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_contact`, contactData, { withCredentials: true });
  }
 getContactById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_contact/${id}`, {
      withCredentials: true
    });
  }
updateContact(id: string, contactData: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/contacts/${id}`, contactData, { withCredentials: true });
}


  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_contact/${id}`, { withCredentials: true });
  }

  // ------------------ Realestate Forms APIs ------------------ //
  getAllRealestateForms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_realestate_forms`, {
      withCredentials: true
    });
  }

  deleteRealestateForm(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_realestate_form/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Decorations APIs ------------------ //
  getAllDecorations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_decorations`, {
      withCredentials: true
    });
  }

  createDecoration(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_decoration`, formData, {
      withCredentials: true
    });
  }

  updateDecoration(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit_decoration/${id}`, formData, {
      withCredentials: true
    });
  }

  deleteDecoration(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_decoration/${id}`, {
      withCredentials: true
    });
  }

  // ------------------ Image Upload APIs ------------------ //
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload_image`, formData, {
      withCredentials: true
    });
  }

  // ------------------ Bulk Update API ------------------ //
  updateAllFinishesData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update_all_finishes`, data, {
      withCredentials: true
    });
  }

  getAllFormDecorations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_form_decorations`, {
      withCredentials: true
    });
  }

  deleteFormDecoration(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_form_decoration/${id}`, {
      withCredentials: true
    });
  }
  // ------------------ Notifications APIs ------------------ //
getNotifications(): Observable<any> {
  return this.http.get(`${this.baseUrl}/get_notifications`, {
    withCredentials: true
  });
}

createNotification(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/create_notification`, data, {
    withCredentials: true
  });
}

markNotificationAsRead(id: string): Observable<any> {
  return this.http.patch(`${this.baseUrl}/read_notification/${id}`, {}, {
    withCredentials: true
  });
}
getAllStats(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/get_all_number_of_services`, { withCredentials: true });
}


}
