import { ContainerModule, injectable } from "inversify";
import { CoreDocumentService, IDocumentService } from "~/inversify/APP/CORE/modules/core.document.module";


@injectable()
export class CustomDocumentService {
   documentTitle = 'Custom Document Service';
   randomdata: any[];

   constructor () {
      this.randomdata = new Array( 19999999 ).fill( {} );
   }
}

export const module = new ContainerModule( ( bind ) => {
   bind<IDocumentService>( IDocumentService ).to( CustomDocumentService );
} );