import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OpenRecordRenderer } from "@features/episode/ag-grid-components/cell-renderers/list-open-record/list-open-record";
import { ActionHeader } from "@features/episode/ag-grid-components/header-components/list-action-header";
import { ListTabsService } from "@features/episode/services/list-tabs/list-tabs.service";
import { AgGridAngular } from "ag-grid-angular";
import 'ag-grid-enterprise';


@Component( {
   selector: "epi-big-list",
   templateUrl: "big-list.component.html",
   styleUrls: [ "big-list.component.scss" ]
} )
export class BigListComponent implements OnInit, AfterViewInit {
   @ViewChild( 'agGrid' ) agGrid: AgGridAngular;

   gridApi: any;
   gridColumnApi: any;
   frameworkComponents: any = {
      epiOpenRecordRenderer: OpenRecordRenderer,
      epiActionHeader: ActionHeader
   };

   suppressRowClickSelection: boolean = true;
   suppressMenuHide: boolean = true;
   animateRows: boolean = true;
   enableRangeSelection: boolean = true;
   rowSelection = 'multiple';
   rowGroupPanelShow: string = "always";
   autoGroupColumnDef: any = { minWidth: 200 };
   groupMultiAutoColumn: boolean = false;
   groupUseEntireRow: boolean = true;
   groupRowRendererParams: any = { checkbox: false };
   rowModelType: string = "serverSide";
   serverSideStoreType: string = "partial";
   cacheBlockSize: number = 50;
   maxBlocksInCache: number = 10;
   rowData: any = [];
   columnDefs: any;
   defaultColDef: any = {
      minWidth: 100,
      sortable: true,
      resizable: true,
   };

   selectedCountries: any;

   constructor ( private listTabs: ListTabsService ) {
      this.columnDefs = [
         {
            headerName: "",
            checkboxSelection: true,
            sortable: false,
            width: 120,
            minWidth: 50,
            lockPosition: true,
            lockVisible: true,
            suppressMovable: true,
            suppressNavigable: true,
            suppressSizeToFit: true,
            resizable: false,
            menuTabs: [ 'columnsMenuTab' ],
            cellRenderer: "epiOpenRecordRenderer",
            headerComponent: "epiActionHeader"
         },
         {
            field: 'athlete',
            filter: 'agTextColumnFilter',
            filterParams: {
               buttons: [ "reset" ],
               debounceMs: 500,
               trimInput: true
            },
            editable: true
         },
         {
            field: 'country',
            filter: 'agSetColumnFilter',
            filterParams: { values: this.getSetFilter },
            enableRowGroup: true,
         },
         {
            field: 'sport',
            filter: 'agSetColumnFilter',
            filterParams: { values: this.getSetFilter },
            enableRowGroup: true,
         },
         {
            field: 'sys_id',
            filter: 'agSetColumnFilter',
            hide: true,
            filterParams: { values: this.getSetFilter },
         },
      ];
   }

   ngOnInit(): void { }

   ngAfterViewInit(): void { }

   getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();

      console.log( selectedNodes );
   }

   onFilterChanged( e: Event ) {
      // var countryFilterModel = this.gridApi.getFilterModel()[ 'country' ];
      // var selected = countryFilterModel && countryFilterModel.values;
      // if ( !areEqual( this.selectedCountries, selected ) ) {
      //    this.selectedCountries = selected;
      //    console.log( 'Refreshing filter' );
      //    // var sportFilter = this.gridApi.getFilterInstance( 'sport' );
      //    // sportFilter.refreshFilterValues();
      // }
   }

   onGridReady( params: any ) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      var datasource: any = { getRows: this.getRowsAsync };
      this.agGrid.api.setServerSideDatasource( datasource );
   }

   async getRowsAsync( params: any ) {
      const url: RequestInfo = "http://localhost:8025/postgres/olympic_winners";
      const request: RequestInit = {
         method: "post",
         body: JSON.stringify( params.request ),
         headers: { "Content-Type": "application/json; charset=utf-8" }
      };

      try {
         var response: any = await fetch( url, request );
         response = await response.json();
      } catch ( error ) {
         console.error( error );
         params.fail();
         return;
      }

      // console.log( response );

      params.success( {
         rowData: response.rows || [],
         rowCount: response.lastRow || 0,
      } );
   }

   async getSetFilter( params: any ) {
      const url: RequestInfo = "http://localhost:8025/postgres/getsetfilter";
      const request: RequestInit = {
         method: "post",
         body: JSON.stringify( params.colDef ),
         headers: { "Content-Type": "application/json; charset=utf-8" }
      };

      try {
         var response = await fetch( url, request );
         response = await response.json();
      } catch ( error ) {
         console.error( error );
         return;
      }

      params.success( response || [] );
   }
}

function areEqual( a: any, b: any ) {
   if ( a == null && b == null ) return true;
   if ( a != null || b != null ) return false;

   return (
      a.length === b.length &&
      a.every( ( v: any, i: any ) => b[ i ] === v )
   );
}