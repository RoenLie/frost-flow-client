import { ContainerModule, injectable } from "inversify";
import { CoreDocumentService, IDocumentService } from "~/inversify/APP/CORE/modules/core.document.module";


@injectable()
export class CustomDocumentService extends CoreDocumentService {
   override documentTitle = 'Custom Document Service';
   randomdata = new Array( 9999999 ).fill( {} );
}


export const module = new ContainerModule( ( bind ) => {
   bind<IDocumentService>( IDocumentService ).to( CustomDocumentService ).inSingletonScope();
} );