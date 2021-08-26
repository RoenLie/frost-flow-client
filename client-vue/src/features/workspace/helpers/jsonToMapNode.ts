
export type JsonNodeTree = Array<JsonNode>;
export type JsonNode = { k: string; v: Array<JsonNode>; };
export type MapNodeTree = Map<string, MapNode>;
export type MapNode = Map<string, MapNodeTree>;

export const jsonToMapNodeTree = ( json: JsonNodeTree ) => {
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
};