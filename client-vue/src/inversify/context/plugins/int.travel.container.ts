import { injectable } from "inversify";
import { travelContainer } from "~/inversify/context/containers/travel.container";
import { Travel } from "~/inversify/context/entities";
import { ITravelContext } from "~/inversify/context/interfaces";
import { TYPES } from "~/inversify/context/types";


@injectable()
export class TravelIntegration extends Travel implements ITravelContext {
   doTravelMethod = () => console.log( 'random travel method' );
   module = "travelintegration";
}

export const install = () => {
   travelContainer.bind<TravelIntegration>( TYPES.Workflow ).to( TravelIntegration );
};