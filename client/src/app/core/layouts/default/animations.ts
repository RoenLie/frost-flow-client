import { trigger, state, style, animate, transition, animateChild, group, query } from '@angular/animations';


export const slideInAnimation = trigger( 'routeAnimations', [
   transition( '* <=> *', [
      style( { position: 'relative' } ),
      query( ':enter, :leave', [ style( { position: 'absolute', top: 0, left: 0, width: '100%' } ) ] ),
      query( ':enter', [ style( { left: '-100%' } ) ] ),
      query( ':leave', animateChild(), { optional: true } ),
      group( [
         query( ':leave', [ animate( '300ms ease-out', style( { left: '100%' } ) ) ], { optional: true } ),
         query( ':enter', [ animate( '300ms ease-out', style( { left: '0%' } ) ) ] )
      ] ),
      query( ':enter', animateChild() ),
   ] ),
   transition( '* <=> FilterPage', [
      style( { position: 'relative' } ),
      query( ':enter, :leave', [ style( { position: 'absolute', top: 0, left: 0, width: '100%' } ) ], { optional: true } ),
      query( ':enter', [ style( { left: '-100%' } ) ], { optional: true } ),
      query( ':leave', animateChild() ),
      group( [
         query( ':leave', [ animate( '200ms ease-out', style( { left: '100%' } ) ) ], { optional: true } ),
         query( ':enter', [ animate( '300ms ease-out', style( { left: '0%' } ) ) ], { optional: true } )
      ] ),
      query( ':enter', animateChild() ),
   ] )
] );


export const fadeAnimation = trigger( 'routeAnimations', [
   transition( '* <=> *', [
      query( ':enter',
         [ style( { opacity: 0 } ) ],
         { optional: true } ),
      query( ':leave',
         [ style( { opacity: 1 } ), animate( '0.3s', style( { opacity: 0 } ) ) ],
         { optional: true } ),
      query( ':enter',
         [ style( { opacity: 0 } ), animate( '0.3s', style( { opacity: 1 } ) ) ],
         { optional: true } )
   ] )
] );

export const bounce = trigger( 'routeAnimations', [
   transition( '* <=> *', [
      // Set a default  style for enter and leave
      query( ':enter, :leave', [
         style( {
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
         } ),
      ] ),
      // Animate the new page in
      query( ':enter', [
         animate( '600ms ease', style( { opacity: 1, transform: 'scale(1) translateY(0)' } ) ),
      ] )
   ] ),
] );


export const toggleLeft = trigger( 'toggleLeft', [
   transition( ':enter', [
      style( { transform: "translateX(-100%)", opacity: 0.5 } ),
      animate( '0.25s linear', style( { transform: "!", opacity: "!" } ) )
   ]
   ),
   transition( ':leave', [
      animate( '0.25s linear', style( { transform: "translateX(-100%)", opacity: 0.5 } ) )
   ]
   )
] );


export const toggleRight = trigger( 'toggleRight', [
   transition( ':enter', [
      style( {
         "min-width": "0px",
         "width": "0px",
         opacity: 0,
         overflow: "hidden"
      } ),
      animate( "0.25s linear", style( { width: "!", opacity: 1 } ) )
   ] ),
   transition( ':leave', [
      animate( "0.25s ease-in",
         style( {
            "min-width": "0px",
            width: "0px",
            opacity: 0,
            overflow: "hidden"
         } )
      )
   ] )
] );