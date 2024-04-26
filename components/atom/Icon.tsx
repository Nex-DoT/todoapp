import React, { ReactNode } from 'react';
import { Button } from '@nextui-org/button';
interface IconProps {
  icon: ReactNode, // Define the prop type as ReactNode to accept any valid React node
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return (
    <div>
      {icon}
    </div>
  );
};

export default Icon;