import { Type, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ɵComponentDef as ComponentDef, ɵDirectiveDef as DirectiveDef, ɵPipeDef as PipeDef } from '@angular/core';


export function getComponentDef<T>(t: Type<T> | any): ComponentDef<T> {
  if (t['ɵcmp']) {
    return t['ɵcmp'] as ComponentDef<T>;
  }

  throw new Error('No Angular definition found for ' + t.name);
}

export function getDirectiveDef<T>(t: Type<T> | any): DirectiveDef<T> {

  if (t['ngDirectiveDef']) {
    return t['ngDirectiveDef'] as DirectiveDef<T>;
  }

  if (t['ɵdir']) {
    return t['ɵdir'] as DirectiveDef<T>;
  }

  // A Component(Def) is also a Directive(Def)
  if (t['ɵcmp']) {
    return t['ɵcmp'] as ComponentDef<T>;
  }

  throw new Error('No Angular definition found for ' + t.name);
}

export function getPipeDef<T>(t: Type<T> | any): PipeDef<T> {

  if (t['ngPipeDef']) {
    return t['ngPipeDef'] as PipeDef<T>;
  }

  throw new Error('No Angular definition found for ' + t.name);
}

export function getDirectiveDefs(types: Type<any>[]): DirectiveDef<any>[] {
  return types.map(t => getDirectiveDef(t));
}

export function getPipeDefs(types: Type<any>[]): PipeDef<any>[] {
  return types.map(t => getPipeDef(t));
}

export interface ComponentDepsConfig {
  directives?: Type<any>[] | any;
  pipes?: Type<any>[];
}

export function ComponentDeps(config: ComponentDepsConfig) {
  return (component: any) => {
    const def = getComponentDef(component);
    def.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    let directiveDefs: Array<any> = [];
    if (typeof def.directiveDefs === 'function') {
      directiveDefs = def.directiveDefs();
    }

    def.directiveDefs = [
      ...(directiveDefs),
      ...getDirectiveDefs(config.directives || []),
    ];

    def.pipeDefs = [
      ...getPipeDefs(config.pipes || [])
    ];
  };
}

export function sleep(miliseconds: number) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) { }
}