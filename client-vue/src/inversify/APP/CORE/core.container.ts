import { Container } from "inversify";
import { containerModule } from "~/inversify/APP/CORE/modules/core.query-service";


export const container = new Container();
export const loader = () => {
   container.load( containerModule );
};
export const unload = () => {
   container.unload( containerModule );
};