import { ContainerModule, injectable } from "inversify";


export const IDocumentService = Symbol( 'IDocumentService' );
export interface IDocumentService {
   documentTitle: string;
   randomdata?: any[];
}


@injectable()
export class CoreDocumentService implements IDocumentService {
   documentTitle = 'Core Document Service';
}


export const module = new ContainerModule( ( bind ) => {
   bind<IDocumentService>( IDocumentService ).to( CoreDocumentService ).inSingletonScope();
} );