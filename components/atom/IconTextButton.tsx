import React from 'react';
import { Button } from '@nextui-org/button';
import Icon from './Icon';
import { MenuItemType } from '@/types';
const IconTextButton = ({text , icon , name , onClick}:MenuItemType) => {
    return (
        <Button 
                variant='clear'
                className='w-full flex items-center justify-start '
                name={name}
                onClick={onClick}
                startContent={
                    <Icon icon={icon}/>
                }
            >{text}</Button>
    );
};

export default IconTextButton;