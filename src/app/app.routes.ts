import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Neighborhood Components
import { CreateNeighborhoodComponent } from './pages/neighborhoods/create-neighborhood/create-neighborhood.component';
import { AllNeighborhoodsComponent } from './pages/neighborhoods/all-neighborhoods/all-neighborhoods.component';
import { EditNeighborhoodComponent } from './pages/neighborhoods/edit-neighborhood/edit-neighborhood.component';

// Department Components
import { CreateDepartmentComponent } from './pages/departments/create-department/create-department.component';
import { AllDepartmentsComponent } from './pages/departments/all-departments/all-departments.component';
import { EditDepartmentComponent } from './pages/departments/edit-department/edit-department.component';

// Booking Components
import { AllBookingsComponent } from './pages/bookings/all-bookings/all-bookings.component';
import { EditBookingComponent } from './pages/bookings/edit-booking/edit-booking.component';


import { RequestsComponent } from './pages/Requests/requests/requests.component';
import { EditRequestComponent } from './pages/Requests/edit-request/edit-request.component';

import { AllPartnersComponent } from './pages/partners/all-partners/all-partners.component';
import { CreatePartnerComponent } from './pages/partners/create-partner/create-partner.component';
import { EditPartnerComponent } from './pages/partners/edit-partner/edit-partner.component';


import { FinishesListComponent } from './pages/finshes/finishes-list/finishes-list.component'; 
import { CreateFinishComponent } from './pages/finshes/create-finish/create-finish.component';
import { EditFinishComponent } from './pages/finshes/edit-finish/edit-finish.component';
import { FinishFormsListComponent } from './pages/finshes/finish-forms-list/finish-forms-list.component'; 

import { ContactsListComponent } from './pages/contacts/contacts-list/contacts-list.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactEditComponent } from './pages/contacts/contact-edit/contact-edit.component';

import { RealestateFormsListComponent } from './pages/realstate/realestate-forms-list/realestate-forms-list.component';


import { DecorationsListComponent } from './pages/decorations/decorations-list/decorations-list.component';
import { AddDecorationComponent } from './pages/decorations/add-decoration/add-decoration.component';


import { FormDecorationsListComponent } from './pages/decorations/form-decorations-list/form-decorations-list.component';



export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Neighborhood Routes
  { path: 'neighborhoods/create', component: CreateNeighborhoodComponent },
  { path: 'neighborhoods', component: AllNeighborhoodsComponent },
  { path: 'neighborhoods/edit/:id', component: EditNeighborhoodComponent },

  // Department Routes
{ path: 'departments/create', component: CreateDepartmentComponent },
  { path: 'departments', component: AllDepartmentsComponent },
  { path: 'departments/edit/:id', component: EditDepartmentComponent },

  // Booking Routes
  { path: 'bookings', component: AllBookingsComponent },
  { path: 'bookings/edit/:id', component: EditBookingComponent },
   { path: 'requests', component: RequestsComponent },
  { path: 'requests/edit/:id', component: EditRequestComponent },
   { path: 'partners', component: AllPartnersComponent },
  { path: 'partners/create', component: CreatePartnerComponent },
  { path: 'partners/edit/:id', component: EditPartnerComponent },
    { path: 'finishes', component: FinishesListComponent },
  { path: 'finishes/create', component: CreateFinishComponent },
{ path: 'finishes/edit/:id', component: EditFinishComponent },
    { path: 'finish-forms', component: FinishFormsListComponent },

 { path: 'contacts', component: ContactsListComponent },
    { path: 'contacts/edit/:id', component: ContactEditComponent },  // مهم

  { path: 'contacts/create', component: ContactFormComponent },
    { path: 'realestate-forms', component: RealestateFormsListComponent },
     { path: 'decorations', component: DecorationsListComponent },
  { path: 'decorations/add', component: AddDecorationComponent }, 
  { path: 'form-decorations', component: FormDecorationsListComponent }


];
