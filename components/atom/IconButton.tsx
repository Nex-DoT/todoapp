import React, { ReactNode } from 'react';
import { Button } from '@nextui-org/button';
interface IconProps {
  icon: ReactNode, // Define the prop type as ReactNode to accept any valid React node
  onclick : () => void //define a function to be called when
}

const IconButton: React.FC<IconProps> = ({ icon , onclick }) => {
  return (
    <div>
      <Button
            size='lg'
            onClick={onclick}
            isIconOnly
            variant='clear'
            
            >{icon}</Button>

    </div>
  );
};

export default IconButton;