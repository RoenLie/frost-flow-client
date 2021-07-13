import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'core';
import './main.css';
import { svgIconService } from 'core';


svgIconService.svgs = {
   not_found: React.lazy( () => import( 'assets/svg/404-error.svg?component' ) ),
   frostbite_logo: React.lazy( () => import( 'assets/svg/frostbite_logo.svg?component' ) ),
   bars_solid: React.lazy( () => import( 'assets/svg/bars-solid.svg?component' ) ),
   box_open_solid: React.lazy( () => import( 'assets/svg/box-open-solid.svg?component' ) ),
   calendar_alt_regular: React.lazy( () => import( 'assets/svg/calendar-alt-regular.svg?component' ) ),
   calendar_plus_regular: React.lazy( () => import( 'assets/svg/calendar-plus-regular.svg?component' ) ),
   check_circle_regular: React.lazy( () => import( 'assets/svg/check-circle-regular.svg?component' ) ),
   chevron_up_solid: React.lazy( () => import( 'assets/svg/chevron-up-solid.svg?component' ) ),
   chevron_down_solid: React.lazy( () => import( 'assets/svg/chevron-down-solid.svg?component' ) ),
   chevron_left_solid: React.lazy( () => import( 'assets/svg/chevron-left-solid.svg?component' ) ),
   chevron_right_solid: React.lazy( () => import( 'assets/svg/chevron-right-solid.svg?component' ) ),
   chevron_up_double_solid: React.lazy( () => import( 'assets/svg/chevron-up-double-solid.svg?component' ) ),
   chevron_down_double_solid: React.lazy( () => import( 'assets/svg/chevron-down-double-solid.svg?component' ) ),
   chevron_left_double_solid: React.lazy( () => import( 'assets/svg/chevron-left-double-solid.svg?component' ) ),
   chevron_right_double_solid: React.lazy( () => import( 'assets/svg/chevron-right-double-solid.svg?component' ) ),
   cog_solid: React.lazy( () => import( 'assets/svg/cog-solid.svg?component' ) ),
   dice_d6_solid: React.lazy( () => import( 'assets/svg/dice-d6-solid.svg?component' ) ),
   dolly_flatbed_solid: React.lazy( () => import( 'assets/svg/dolly-flatbed-solid.svg?component' ) ),
   edit_regular: React.lazy( () => import( 'assets/svg/edit-regular.svg?component' ) ),
   ellipsis_h_solid: React.lazy( () => import( 'assets/svg/ellipsis-h-solid.svg?component' ) ),
   ellipsis_v_solid: React.lazy( () => import( 'assets/svg/ellipsis-v-solid.svg?component' ) ),
   es_logo: React.lazy( () => import( 'assets/svg/es-logo.svg?component' ) ),
   eye_regular: React.lazy( () => import( 'assets/svg/eye-regular.svg?component' ) ),
   eye_slash_regular: React.lazy( () => import( 'assets/svg/eye-slash-regular.svg?component' ) ),
   favicon: React.lazy( () => import( 'assets/svg/favicon.svg?component' ) ),
   file_regular: React.lazy( () => import( 'assets/svg/file-regular.svg?component' ) ),
   font_solid: React.lazy( () => import( 'assets/svg/font-solid.svg?component' ) ),
   home_solid: React.lazy( () => import( 'assets/svg/home-solid.svg?component' ) ),
   keyboard_solid: React.lazy( () => import( 'assets/svg/keyboard-solid.svg?component' ) ),
   list_solid: React.lazy( () => import( 'assets/svg/list-solid.svg?component' ) ),
   logo: React.lazy( () => import( 'assets/svg/logo.svg?component' ) ),
   minus_square_regular: React.lazy( () => import( 'assets/svg/minus-square-regular.svg?component' ) ),
   paper_plane_solid: React.lazy( () => import( 'assets/svg/paper-plane-solid.svg?component' ) ),
   plus_square_regular: React.lazy( () => import( 'assets/svg/plus-square-regular.svg?component' ) ),
   question_solid: React.lazy( () => import( 'assets/svg/question-solid.svg?component' ) ),
   save_solid: React.lazy( () => import( 'assets/svg/save-solid.svg?component' ) ),
   search_solid: React.lazy( () => import( 'assets/svg/search-solid.svg?component' ) ),
   signal_solid: React.lazy( () => import( 'assets/svg/signal-solid.svg?component' ) ),
   sync_alt_solid: React.lazy( () => import( 'assets/svg/sync-alt-solid.svg?component' ) ),
   times_circle_regular: React.lazy( () => import( 'assets/svg/times-circle-regular.svg?component' ) ),
   times_solid: React.lazy( () => import( 'assets/svg/times-solid.svg?component' ) ),
   trash_alt_regular: React.lazy( () => import( 'assets/svg/trash-alt-regular.svg?component' ) ),
   undo_solid: React.lazy( () => import( 'assets/svg/undo-solid.svg?component' ) ),
   user_solid: React.lazy( () => import( 'assets/svg/user-solid.svg?component' ) ),
   wave_square_solid: React.lazy( () => import( 'assets/svg/wave-square-solid.svg?component' ) ),
   wind_solid: React.lazy( () => import( 'assets/svg/wind-solid.svg?component' ) ),
   wpexplorer_brands: React.lazy( () => import( 'assets/svg/wpexplorer-brands.svg?component' ) ),
};


ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById( 'root' )
);
