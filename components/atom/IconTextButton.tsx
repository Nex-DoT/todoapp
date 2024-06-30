import React from 'react';
import { Button } from '@nextui-org/button';
import Icon from './Icon';
const IconTextButton = ({text , icon , name , onClick}:any) => {
    return (
        <Button 
                variant='light'
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