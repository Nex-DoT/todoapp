'use client';

import { useSession } from 'next-auth/react';
import { useTransition, useEffect, useState } from 'react';
import Dashboard from '@/components/pages/Dashboard';
import { dataFetch } from '@/lib/serverActions';
import {Spinner} from "@nextui-org/spinner";
import { useRouter } from 'next/navigation';
import { context } from '@/context/context';
const Page = () => {
  const {state , dispatch} = context();
  const { data: session, status }= useSession();
  const email = session?.user?.email;
  console.log(session);
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState([]);

  useEffect(() => {
    if(status === 'unauthenticated') router.push('/')
    if (email) {
      startTransition(() => {
        dataFetch(email).then((fetchedData) => {
          setData(fetchedData as any);
          console.log(fetchedData);
          dispatch({type:'SETDATA' , payload:fetchedData});
          
        }).catch((error) => {
          console.error("Failed to fetch data", error);
        });
      });
    }
  }, [email]);

  if (status === 'loading') {
    return (
    <div className='w-full h-full flex items-center justify-center'>
      <Spinner size='lg' color='primary'/>
    </div>)
  }

  if (!session) {
    return <div>Please sign in</div>;
  }

  return (
    <Dashboard/>
  );
};

export default Page;
