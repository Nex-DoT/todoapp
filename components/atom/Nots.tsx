import React from 'react';

const Nots = ({data}:any) => {
    console.log(data);
    
    return (
        <div style={{ backgroundColor: `#${data.color}` }} className={` w-60 h-60 flex justify-start bg-[#${data.color}] hover:opacity-80 transition-opacity cursor-pointer relative  rounded-xl`}>
            <div className='w-4 h-4 bg-background1 absolute top-3 right-3 rounded-full'></div>
            <div className='w-4 h-4 bg-background1 absolute top-3 left-3 rounded-full'></div>
            <div className='mt-10 ml-4'>
                Title: {data.name}
                <p className=' text-xs'>{data.description}</p>
            </div>
        </div>
    );
};

export default Nots;