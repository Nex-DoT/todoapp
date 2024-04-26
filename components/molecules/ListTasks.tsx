import React from 'react';
import Title from '../atom/Title';
import { Button } from '@nextui-org/button';
import Icon from '../atom/Icon';
import { FaPlus } from "react-icons/fa";
import ListTask from '../atom/ListTask';
import IconTextButton from '../atom/IconTextButton';
const ListTasks = () => {
    return (
        <div>
            <Title text='LIST' size={4}/>
            <ListTask name='Profile' color='#e6f263'/>
            <IconTextButton text='Add New List' icon={<FaPlus/>}/>
        </div>
    );
};

export default ListTasks;