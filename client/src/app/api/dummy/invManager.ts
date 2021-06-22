import { FormGroup, Validators } from "@angular/forms";
import { Flow } from "@features/inventory/features/manager/services/flow/inv-manager-flow.service";
import { Form } from "@features/inventory/features/manager/services/form/inv-manager-form.service";
import { Item } from "@features/inventory/features/manager/services/item/inv-manager-item.service";
import { Subflow } from "@features/inventory/features/manager/services/subflow/inv-manager-subflow.service";
import { GUID } from "@shared/utilities/guid";


type AsyncSubflowAndForm = Promise<[ Subflow | undefined, Form | undefined ]>;
type SubflowAndForm = [ Subflow | undefined, Form | undefined ];


export const api_getItems = async () => items;
export const api_getFlows = async ( itemID: GUID ) => flows.filter( i => i.itemId == itemID );
export const api_getSubflows = async ( flowID: GUID ) => subflows.filter( sf => sf.flowId == flowID );
export const api_getSubflowByID = async ( subflowID: GUID ) => subflows.find( sf => sf.id == subflowID );
export const api_getForm = async ( subflowID: GUID ) => forms.find( f => f.subflowID == subflowID );
export const api_getFormByID = async ( formID: GUID ) => forms.find( f => f.id == formID );
export const api_saveForm = async ( subflowId: GUID, formId: GUID, formGroup: FormGroup ) => {
   const [ subflow, form ] = await getSubflowAndForm( subflowId, formId );
   if ( !( subflow && form ) ) return false;

   for ( const key in formGroup.controls ) {
      form.formData[ key ] = formGroup.controls[ key ].value;
   }

   if ( formGroup.status == "INVALID" ) subflow.status = "error";
   if ( formGroup.status == "VALID" ) subflow.status = "ongoing";

   return true;
};
export const api_submitForm = async ( subflowId: GUID, formId: GUID, formGroup: FormGroup ): Promise<Boolean> => {
   const [ subflow, form ] = await getSubflowAndForm( subflowId, formId );
   if ( !( subflow && form ) ) return false;

   await api_saveForm( subflowId, formId, formGroup );

   form.formInfo.disabled = true;
   subflow.status = "complete";

   return true;
};
const getSubflowAndForm = async ( subflowID: GUID, formID: GUID ): AsyncSubflowAndForm =>
   await Promise.all( [ api_getSubflowByID( subflowID ), api_getFormByID( formID ) ] );


const items: Item[] = [
   {
      id: 1,
      name: "item1"
   },
   {
      id: 2,
      name: "item2"
   },
   {
      id: 3,
      name: "item3"
   },
   {
      id: 4,
      name: "item4"
   },
   {
      id: 5,
      name: "item5"
   }
];

const flows: Flow[] = [
   {
      id: 1,
      itemId: 1,
      name: "flow1"
   },
   {
      id: 2,
      itemId: 1,
      name: "flow2"
   },
   {
      id: 3,
      itemId: 2,
      name: "flow3"
   },
   {
      id: 4,
      itemId: 2,
      name: "flow4"
   },
   {
      id: 5,
      itemId: 3,
      name: "flow5"
   },
   {
      id: 6,
      itemId: 3,
      name: "flow6"
   },
   {
      id: 7,
      itemId: 4,
      name: "flow7"
   },
   {
      id: 8,
      itemId: 4,
      name: "flow8"
   },
   {
      id: 9,
      itemId: 5,
      name: "flow9"
   },
   {
      id: 10,
      itemId: 5,
      name: "flow10"
   }
];

const subflows: Subflow[] = [
   {
      id: 1,
      flowId: 1,
      name: "subflow1",
      status: "ongoing",
      iconPath: "assets/svg/wind-solid.svg"
   },
   {
      id: 2,
      flowId: 1,
      name: "subflow2",
      status: "ongoing",
      iconPath: "assets/svg/wind-solid.svg"
   },
   {
      id: 3,
      flowId: 2,
      name: "subflow3",
      status: "ongoing",
      iconPath: "assets/svg/wind-solid.svg"
   },
   {
      id: 4,
      flowId: 2,
      name: "subflow4",
      status: "ongoing",
      iconPath: "assets/svg/wind-solid.svg"
   }
];

const forms: Form[] = [
   {
      id: 1,
      subflowID: 1,
      name: "form1",
      formInfo: {
         disabled: false
      },
      formControlsInfo: {
         name: {
            label: "Name",
            order: 10
         },
         age: {
            label: "Age",
            order: 20
         },
      },
      formData: {
         name: "Kristoffer",
         age: 29
      },
      formGroup: {
         name: [ { value: "", disabled: true }, [
            Validators.pattern( "[a-zA-Z\-]*" ),
            Validators.required
         ] ],
         age: [ null, [
            Validators.pattern( "[0-9]*" ),
            Validators.min( 1 ),
            Validators.max( 99 ),
            Validators.required
         ] ]
      }
   },
   {
      id: 2,
      subflowID: 2,
      name: "form2",
      formInfo: {},
      formControlsInfo: {
         height: {
            label: "Height",
            order: 10
         },
         weight: {
            label: "Weight",
            order: 20
         },
      },
      formData: {
         height: 180,
         weight: 90
      },
      formGroup: {
         height: [ null, [
            Validators.pattern( "[0-9]*" ),
            Validators.required
         ] ],
         weight: [ null, [
            Validators.pattern( "[0-9]*" ),
            Validators.min( 1 ),
            Validators.max( 99 ),
            Validators.required
         ] ]
      }
   }
];