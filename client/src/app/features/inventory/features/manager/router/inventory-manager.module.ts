import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FlowActionSelectorComponent } from "@features/inventory/features/manager/components/flow-action-selector/flow-action-selector.component";
import { FlowActionComponent } from "@features/inventory/features/manager/components/flow-action/flow-action.component";
import { FlowDetailsComponent } from "@features/inventory/features/manager/components/flow-details/flow-details.component";
import { FlowFormComponent } from "@features/inventory/features/manager/components/flow-form/flow-form.component";
import { FlowItemComponent } from "@features/inventory/features/manager/components/flow-item/flow-item.component";
import { FlowSelectorComponent } from "@features/inventory/features/manager/components/flow-selector/flow-selector.component";
import { ItemSelectorComponent } from "@features/inventory/features/manager/components/item-selector/item-selector.component";
import { ListItemComponent } from "@features/inventory/features/manager/components/list-item/list-item.component";
import { SubflowItemComponent } from "@features/inventory/features/manager/components/subflow-item/subflow-item.component";
import { SubflowSelectorComponent } from "@features/inventory/features/manager/components/subflow-selector/subflow-selector.component";
import { SortByOrderPipe } from "@features/inventory/features/manager/pipes/sortby-order.pipe";
import { InventoryManagerGridComponent } from "@features/inventory/features/manager/views/grid/inv-mng-grid.component";
import { FlInputModule } from "@shared/components/fl-input/fl-input.module";
import { ResizableFrModule } from "@shared/directives/resizefr/resize.module";
import { AngularSvgIconModule } from "angular-svg-icon";


const routes: Routes = [
   { path: "", component: InventoryManagerGridComponent },
];


@NgModule( {
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild( routes ),
      AngularSvgIconModule,
      ResizableFrModule,
      FlInputModule
   ],
   declarations: [
      InventoryManagerGridComponent,
      ItemSelectorComponent,
      FlowSelectorComponent,
      FlowItemComponent,
      FlowDetailsComponent,
      ListItemComponent,
      FlowActionSelectorComponent,
      FlowActionComponent,
      FlowFormComponent,
      SubflowSelectorComponent,
      SubflowItemComponent,
      SortByOrderPipe
   ],
} )
export class InventoryManagerModule { };