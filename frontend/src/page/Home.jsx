import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/CardFeature'
import { GrNext, GrPrevious } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';

function Home() {
  const productData=useSelector((state)=>state.product.productList)
  const homeProductCartList = productData.slice(1,5);
  const homeProductCartListVegetables=productData.filter(el=>el.category==='vegetable');

  const loadingArray= new Array(4).fill(null);
  const loadingArrayFeature= new Array(10).fill(null);

  const slideProductRef=useRef()
  const nextProduct=()=>{
    slideProductRef.current.scrollLeft +=200
  }
  const prevProduct=()=>{
    slideProductRef.current.scrollLeft -=200
  }
 


  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 rounded-full items-center'>
            <p className='text-sm font-medium text-slate-900 p-1'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/128/562/562008.png' className='h-6'/>
          </div>
          <h2 className='text-4xl font-bold md:text-7xl py-3'>The Fasted Delivery in <span className='text-red-500'>Your Home</span></h2>
          <p className='py-3 text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, dolorem aspernatur placeat numquam sequi culpa deleniti sunt minima perspiciatis ipsam!</p>
          <button className='font-bold bg-red-500 text-white rounded-full py-2 px-4'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-4 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el=>{
              return (
                <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}/>
              )
            }) : loadingArray.map((el,index)=>{
              return (
                <HomeCard
                key={index}
                loading={"Loading..."}/>
              )
})
          }
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-slate-800  text-2xl mb-4'>Fresh Vegetables</h2>
        <div className='ml-auto flex gap-3'>
          <button className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' onClick={prevProduct}><GrPrevious /></button>
          <button className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded' onClick={nextProduct}><GrNext/></button>
        </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el=>{
              return (
                <CardFeature
                key={el._id}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
                />
              )
            })
            :
            loadingArrayFeature.map(el => <CardFeature loading="Loading...."/>)
          }
        </div>
      </div>
      <AllProduct heading={'Your Product'}/>
    </div>
  )
}

export default Home
