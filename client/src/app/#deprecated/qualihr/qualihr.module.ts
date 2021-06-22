import { NgModule } from '@angular/core';
import { CommonModule, } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from "./views/new/new.component";
import { ListComponent } from "./views/list/list.component";
import { QualiPortalComponent } from './views/portal/quali-portal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from "@core/guards/auth.guard";
import { AlgoliaService } from "@core/services/algolia.service";


@NgModule( {
   declarations: [
      QualiPortalComponent,
      NewComponent,
      ListComponent
   ],
   imports: [
      RouterModule.forChild( [
         { path: "", redirectTo: "portal" },
         { path: "portal", component: QualiPortalComponent },
         { path: "new", component: NewComponent },
         { path: "list", component: ListComponent, canActivate: [ AuthGuard ] }
      ] ),
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule,
      MatCardModule,
      MatExpansionModule,
   ],
   providers: [
      AlgoliaService
   ]
} )
export class QualihrModule { }