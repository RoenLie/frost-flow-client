import React from 'react';

export const Modal = ( { onClose }: any ) => {
   return (
      <div onClick={ onClose }>MODAL</div>
   );
};