import { Injectable } from "@angular/core";

interface WidthElement {
   element: Element;
   width: number;
}


@Injectable( { providedIn: "platform" } )
export class ResizeService {
   hostRect: DOMRect;
   widthElements: WidthElement[] = [];
   constructor () { }
}