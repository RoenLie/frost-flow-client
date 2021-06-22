import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { WorkspaceListPage } from "@features/episode/experiences/workspace/pages/list/workspace-list.page";
import { ListSelectorComponent } from "@features/episode/components/list-selector/list-selector.component";
import { SplitContainerComponent } from "@features/episode/components/split-container/split-container.component";
import { RecordTabsComponent } from "@features/episode/components/record-tabs/record-tabs.component";
import { BigListComponent } from "@features/episode/components/big-list-enterprise/big-list.component";
// import { BigListComponent } from "@features/episode/components/big-list-community/big-list.component";
import { RecordPreviewComponent } from "@features/episode/components/record-preview/record-preview.component";
import { AgGridModule } from "ag-grid-angular";
import { BigListHeaderComponent } from "@features/episode/components/big-list-header/big-list-header.component";
import { OpenRecordRenderer } from "@features/episode/ag-grid-components/cell-renderers/list-open-record/list-open-record";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ActionHeader } from "@features/episode/ag-grid-components/header-components/list-action-header";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SideNavComponent } from "@features/episode/shells/side-nav/side-nav.component";
import { ListTabsComponent } from "@features/episode/components/list-tabs/list-tabs.component";
import { ListTabsHomeComponent } from "@features/episode/components/list-tabs-home/list-tabs-home.component";
import { WorkspaceRecordPage } from "@features/episode/experiences/workspace/pages/record/workspace-record.page";
import { RecordComponent } from "@features/episode/components/record/record.component";
import { FlInputModule } from "@shared/components/fl-input/fl-input.module";
import { SortByOrderPipe } from "@shared/pipes/sortby-order.pipe";


const routes: Routes = [
   {
      path: "list", component: WorkspaceListPage
   },
   {
      path: "record", component: WorkspaceRecordPage
   },
   {
      path: "**", redirectTo: "list",
   },
];


@NgModule( {
   imports: [
      CommonModule,
      RouterModule.forChild( routes ),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AgGridModule.withComponents( [ OpenRecordRenderer, ActionHeader ] ),
      AngularSvgIconModule,
      FlInputModule
   ],
   declarations: [
      ListSelectorComponent,
      SplitContainerComponent,
      WorkspaceListPage,
      WorkspaceRecordPage,
      ListTabsComponent,
      ListTabsHomeComponent,
      RecordTabsComponent,
      BigListHeaderComponent,
      BigListComponent,
      RecordPreviewComponent,
      OpenRecordRenderer,
      RecordComponent,
      ActionHeader,
      SideNavComponent,
      SortByOrderPipe
   ],
   exports: [
      RouterModule
   ]
} )
export class WorkspaceModule { };