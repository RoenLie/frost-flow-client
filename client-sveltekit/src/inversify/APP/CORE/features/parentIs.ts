import { Container, interfaces } from "inversify";


export const parentIs = ( parentContainer: Container ) => {
   return ( constraint: interfaces.Request ) => {
      const parentContainerId = constraint.parentContext.container.parent?.id;
      return parentContainerId == parentContainer.id;
   };
};

export const parentIsNot = ( parentContainer: Container[] ) => {
   return ( constraint: interfaces.Request ) => {
      const parentContainerId = constraint.parentContext.container.parent?.id;
      const isNotAny = parentContainer.every( pc => pc.id != parentContainerId );
      return isNotAny;
   };
};