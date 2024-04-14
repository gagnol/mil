"use client"
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCart } from '@/store/nextSlice'; 

const Clearcart = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
   
      dispatch(resetCart());
        
    }, [dispatch]);    
  

  return <></>;
};

export default Clearcart;
