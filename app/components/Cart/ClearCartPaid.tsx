"use client"

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCart } from '@/store/nextSlice'; 
import { useRouter } from 'next/navigation';

const Clearcart = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(resetCart());
      router.push("/profile");
     
    }, 5000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <></>;
};

export default Clearcart;
