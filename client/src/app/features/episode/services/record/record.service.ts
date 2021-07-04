import { environment } from "@/environments/environment";
import { Injectable } from '@angular/core';
import { ValidatorFn } from "@angular/forms";
import { asyncRes } from "@shared/utilities/asyncRes";
import { type } from "@shared/utilities/type";
import { BehaviorSubject } from "rxjs";
import { pairwise } from "rxjs/operators";


@Injectable( { providedIn: "root" } )
export class RecordService {
   #tableAndId = new BehaviorSubject<TableAndId>( { table: "", id: "" } );

   form = new BehaviorSubject<RecordForm | null>( null );

   get tableAndId() { return this.#tableAndId.value; }
   set tableAndId( value ) { this.#tableAndId.next( value ); }

   data: any;

   constructor () {
      this.#tableAndId.pipe( pairwise() ).subscribe( async ( [ prev, cur ] ) => {
         if ( !cur.id || !cur.table || prev.id === cur.id ) return;
         this.data = ( await this.getRecordData( cur.table, cur.id ) ).data[ 0 ];

         const form = formCombined;
         form.data = this.data;

         for ( const key in form.groupConfig ) {
            if ( !form.data[ key ] ) continue;

            if ( type( form.groupConfig[ key ][ 0 ] ) == "Object" ) {
               form.groupConfig[ key ][ 0 ] = {
                  ...form.groupConfig[ key ][ 0 ],
                  value: form.data[ key ]
               };
            } else {
               form.groupConfig[ key ][ 0 ] = form.data[ key ];
            }
         }

         this.form.next( form );
      } );
   }

   async getRecordData( table: string, id: string ) {
      if ( !table || !id ) return;

      const url: RequestInfo = `${ environment.serverIp }/postgres/get/${ table }/${ id }`;
      const request: RequestInit = {
         method: "get",
         headers: { "Content-Type": "application/json; charset=utf-8" }
      };

      const [ res, err ] = await asyncRes( fetch( url, request ) );
      if ( err ) return null;

      return await res.json();
   }
}


export interface TableAndId {
   table: string;
   id: string;
}

export interface RecordForm {
   data: any;
   formConfig: any;
   controlConfig: any;
   groupConfig: GroupConfig;
}

export interface GroupConfig {
   [ key: string ]: GroupControlConfig;
}
export type GroupControlConfig = [ any, ValidatorFn | ValidatorFn[] | null ];


const formConfig = {
   name: "Athelete Form",
   disabled: false
};

const formData = {
   sys_id: 13,
   sys_created_at: 123,
   sys_updated_at: 123,
   athlete: 123,
   age: 123,
   country: 123,
   country_group: 123,
   gold: 123,
   silver: 123,
   bronze: 123,
   total: 123,
   sport: 123,
   date: 123,
   year: 123
};

const controlInfo = {
   sys_id: {
      label: "Id",
      order: 10
   },
   sys_created_at: {
      label: "Created at",
      order: 20
   },
   sys_updated_at: {
      label: "Updated at",
      order: 30
   },
   athlete: {
      label: "Athlete",
      order: 40
   },
   age: {
      label: "Age",
      order: 50
   },
   country: {
      label: "Country",
      order: 60
   },
   country_group: {
      label: "Country group",
      order: 70
   },
   gold: {
      label: "Gold",
      order: 80
   },
   silver: {
      label: "Silver",
      order: 90
   },
   bronze: {
      label: "Bronze",
      order: 100
   },
   total: {
      label: "Total",
      order: 110
   },
   sport: {
      label: "Sport",
      order: 120
   },
   date: {
      label: "Date",
      order: 130
   },
   year: {
      label: "Year",
      order: 140
   }
};

const groupInfo: GroupConfig = {
   sys_id: [ { value: "", disabled: true }, [] ],
   sys_created_at: [ { value: "", disabled: true }, [] ],
   sys_updated_at: [ { value: "", disabled: true }, [] ],
   athlete: [ "", [] ],
   age: [ "", [] ],
   country: [ "", [] ],
   country_group: [ "", [] ],
   gold: [ "", [] ],
   silver: [ "", [] ],
   bronze: [ "", [] ],
   total: [ "", [] ],
   sport: [ "", [] ],
   date: [ "", [] ],
   year: [ "", [] ]
};

const formCombined: RecordForm = {
   data: formData,
   formConfig: formConfig,
   controlConfig: controlInfo,
   groupConfig: groupInfo
};