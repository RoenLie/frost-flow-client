import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Catch, CatchAll } from "@shared/utilities/catchMethodDecorator";
import { AgGridAngular } from "ag-grid-angular";


@Component( {
   selector: "epi-big-list",
   templateUrl: "big-list.component.html",
   styleUrls: [ "big-list.component.scss" ]
} )
export class BigListComponent implements OnInit, AfterViewInit {
   @ViewChild( 'agGrid' ) agGrid: AgGridAngular;

   gridApi: any;
   gridColumnApi: any;
   animateRows: boolean = true;
   suppressDragLeaveHidesColumns: boolean = true;
   columnDefs: any;
   rowBuffer = 0;
   rowSelection = 'multiple';
   rowModelType = 'infinite';
   paginationPageSize = 100;
   cacheOverflowSize = 2;
   maxConcurrentDatasourceRequests = 1;
   infiniteInitialRowCount = 1000;
   maxBlocksInCache = 10;
   rowData: any = [];
   defaultColDef: any = {
      minWidth: 100,
      sortable: true,
      resizable: true,
   };

   constructor ( private http: HttpClient ) {
      this.columnDefs = [
         {
            headerName: "",
            checkboxSelection: true,
            sortable: false,
            width: 50,
            minWidth: 50,
            lockPosition: true,
            lockVisible: true,
            suppressMovable: true,
            suppressNavigable: true,
            suppressSizeToFit: true,
            resizable: false,
            menuTabs: [ 'columnsMenuTab' ],
         },
         {
            field: 'athlete',
            filter: 'agTextColumnFilter',
            filterParams: {
               buttons: [ "reset" ],
               debounceMs: 500,
               trimInput: false
            },
         },
         {
            field: 'country',
            filter: 'agTextColumnFilter',
            filterParams: {
               buttons: [ "reset" ],
               debounceMs: 500,
               trimInput: false
            },
         },
         {
            field: 'sport',
            filter: 'agTextColumnFilter',
            filterParams: {
               buttons: [ "reset" ],
               debounceMs: 500,
               trimInput: false
            },
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
      var countryFilterModel = this.gridApi.getFilterModel()[ 'country' ];
      var selected = countryFilterModel && countryFilterModel.values;
      if ( !areEqual( selectedCountries, selected ) ) {
         selectedCountries = selected;
         console.log( 'Refreshing filter' );
         // var sportFilter = this.gridApi.getFilterInstance( 'sport' );
         // sportFilter.refreshFilterValues();
      }
   }

   onGridReady( params: any ) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      var datasource: any = { getRows: this.getRowsAsync };
      this.agGrid.api.setDatasource( datasource );
   }

   @CatchAll( ( error, ctx, args ) => args.failCallback() )
   async getRowsAsync( params: any ) {
      const response = await ( await fetch( 'http://localhost:8025/mysql/olympicWinners', {
         method: 'post',
         body: JSON.stringify( params ),
         headers: { "Content-Type": "application/json; charset=utf-8" }
      } ) ).json();

      params.successCallback( response.rows || [], response.lastRow || 0 );
   }
}

var selectedCountries: any = null;
function areEqual( a: any, b: any ) {
   if ( a == null && b == null ) return true;
   if ( a != null || b != null ) return false;

   return (
      a.length === b.length &&
      a.every( ( v: any, i: any ) => b[ i ] === v )
   );
}