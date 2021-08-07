import { LazyJSXElement } from "features";

interface IReactRoute {
   path: string;
   component?: LazyJSXElement | JSX.Element;
   label?: string;
   icon?: string;
   layout?: string;
   exact?: boolean;
   redirect?: {
      from?: string[];
      to: string;
   };
   routes?: IReactRoute[];
}