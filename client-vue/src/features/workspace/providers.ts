import { Ref } from "vue";

export interface Injected<T> {
   get: Ref<T>;
   set: ( v: T ) => void;
}

export const WORKFLOW_PROVIDERS = {
   Domains: Symbol( 'domains' ),
   Domain: Symbol( 'domain' ),
   Modules: Symbol( 'modules' ),
   Module: Symbol( 'module' )
};