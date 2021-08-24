import { injectable } from "inversify";
import { travelContainer } from "~/inversify/context/containers/travel.container";
import { Travel } from "~/inversify/context/entities";
import { ITravelContext } from "~/inversify/context/interfaces";
import { TYPES } from "~/inversify/context/types";


@injectable()
export class TravelCustom extends Travel implements ITravelContext {
   doTravelMethod = () => console.log( 'random travel method' );
   module = "travelcustom";
}

export const install = () => {
   travelContainer.bind<TravelCustom>( TYPES.Workflow ).to( TravelCustom );
};