import { ContainerModule, injectable } from "inversify";


type JsonNodeTree = Array<JsonNode>;
type JsonNode = { k: string; v: Array<JsonNode>; };
type MapNodeTree = Map<string, MapNode>;
type MapNode = Map<string, MapNodeTree>;


export const IQueryService = Symbol( 'IQueryService' );
export interface IQueryService {
   defaultModule: string;
   defaultDomain: string;
   jsonToMapNodeTree: ( json: JsonNodeTree ) => MapNodeTree;
   flattenMapNodeTree: ( nodeTree: MapNodeTree ) => string[];
   ensureMandatoryQueriesExist: ( query: any,
      availableModules: string[],
      availableDomains: string[] ) => { [ key: string ]: string; };
   queryCompare: ( ...args: any[] ) => boolean;
};


@injectable()
export class QueryService implements IQueryService {
   defaultModule = "costinvoice";
   defaultDomain = "SYS";

   jsonToMapNodeTree( json: JsonNodeTree ) {
      const nodeTree: MapNodeTree = new Map();

      const setNode = ( jsonNode: JsonNode ) => {
         const node = new Map();
         if ( !jsonNode.v.length ) return node;

         jsonNode.v.forEach( n => {
            node.set( n.k, setNode( n ) );
         } );

         return node;
      };

      json.forEach( j => {
         nodeTree.set( j.k, setNode( j ) );
      } );

      return nodeTree;
   }

   flattenMapNodeTree( nodeTree: MapNodeTree ) {
      const returnValues = ( map: MapNode ) => {
         const values = [] as any[];
         if ( !map.size ) return values;

         const keys = map.keys();
         for ( const key of keys ) {
            values.push( [ key ] );
         }

         map.forEach( m => {
            values.push( returnValues( m ) );
         } );

         return values;
      };

      const nodeList = returnValues( nodeTree );
      const flatDomains: string[] = nodeList.flat( Infinity );

      return flatDomains;
   }

   ensureMandatoryQueriesExist(
      query: { [ key: string ]: string; },
      availableModules: string[],
      availableDomains: string[]
   ) {
      const _query = JSON.parse( JSON.stringify( query ) );

      const existingModuleQuery = _query[ 'module' ] || '';
      const existingDomainQuery = _query[ 'domain' ] || '';

      const moduleIsValid = availableModules.includes( existingModuleQuery as string );
      const domainIsValid = availableDomains.includes( existingDomainQuery );

      if ( !moduleIsValid ) _query[ 'module' ] = this.defaultModule;
      if ( !domainIsValid ) _query[ 'domain' ] = this.defaultDomain;

      return _query;
   };

   queryCompare( ...args: any[] ) {
      const stringified = args.map( a => JSON.stringify( a ) );
      const allEqual = stringified.every( ( val, i, arr ) => val === arr[ 0 ] );
      return allEqual;
   }
}

export const module = new ContainerModule( ( bind ) => {
   bind<IQueryService>( IQueryService ).to( QueryService );
} );