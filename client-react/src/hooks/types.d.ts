export { };
import { AxiosRequestConfig } from 'axios';


/* useAxios */
export interface IUseAxiosConfig {
   baseUrl: string;
   params: AxiosRequestConfig;
}

export type TUseAxios = <T>( config: IUseAxiosConfig ) =>
   { response: T, error, loading; };


/* useView */
export interface IComposedView {
   view: IView;
   section: ISection[];
   field: IFields;
   columns: { name: string, type: string; }[];
   validation?: any;
}
export interface IView {
   sys_created_at: string;
   sys_updated_at: string;
   name: string;
   sys_id: string;
   table_name: string;
   view_type: string;
}
export interface ISection {
   sys_id: string;
   sys_created_at: string;
   sys_updated_at: string;
   view_id: string;
   section_id: string;
   name: string;
   grid_width: number;
   grid_height: number;
   grid_x_from: number;
   grid_x_to: number;
   grid_y_from: number;
   grid_y_to: number;
   section_order: number;
}
export interface IFields { [ key: string ]: IField[]; }
export interface IField {
   sys_id: string;
   sys_created_at: string;
   sys_updated_at: string;
   section_id: string;
   column_name: string;
   label: string;
   grid_x_from: number;
   grid_x_to: number;
   grid_y_from: number;
   grid_y_to: number;
}