import React, { ReactNode } from 'react';
import { Button } from '@nextui-org/button';
interface IconProps {
  icon: ReactNode, // Define the prop type as ReactNode to accept any valid React node
  onclick : (e?: React.MouseEvent<HTMLButtonElement>) => void, //define a function to be called when
  name?:string
}

const IconButton: React.FC<IconProps> = ({ icon ,name , onclick }) => {
  return (
    <div>
      <Button
            size='lg'
            onClick={onclick}
            isIconOnly
            name={name}
            variant='clear'
            > {icon}</Button>

    </div>
  );
};

export default IconButton;