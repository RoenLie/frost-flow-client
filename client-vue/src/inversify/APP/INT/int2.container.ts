import { Container } from "inversify";
import { containerModule } from "~/inversify/APP/INT/modules/int2.query-service.module";

export const container = new Container();
export const loader = () => {
   container.load( containerModule );
};
export const unload = () => {
   container.unload( containerModule );
};