import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { AuthInterceptorServiceService } from './services/auth-interceptor-service.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
