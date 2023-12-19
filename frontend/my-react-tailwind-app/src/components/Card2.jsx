import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Card2 = ({course}) => {
    

    const navigate = useNavigate()
    const token=localStorage.getItem('token')
    console.log(token)
    const onClickHandler=async()=>{


        try{
            const response=await axios.get(`http://localhost:5173/buy-course/${course.id}`,{
                headers: {
                   'Authorization': `${token}`,
                   'Content-Type': 'application/json',
                   // Add any other headers as needed
                 },
           
   
               })

            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data.updatedUser))
            navigate('/home')

               
        }catch(err){
            console.error('Error creating user:', err);
        }
            

    }
  return (
    <div class="space-x-4">
    <div
  class=" relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full max-w-[20rem] p-8">
  <div
    class="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
    <p class="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
      {course.name}
    </p>
    <h1 class="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
      <span class="mt-2 text-4xl">Rs.</span>500
      <span class="self-end text-4xl">/mo</span>
    </h1>
  </div>
  <div class="p-0">
    <ul class="flex flex-col gap-4">
      <li class="flex items-center gap-4">
        <span class="p-1 border rounded-full border-white/20 bg-white/20"><svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg></span>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
          Timing from {course.timing}
        </p>
      </li>
      <li class="flex items-center gap-4">
        <span class="p-1 border rounded-full border-white/20 bg-white/20"><svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg></span>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
          From age {course.age.minAge} to {course.age.maxAge}
        </p>
      </li>
      <li class="flex items-center gap-4">
        <span class="p-1 border rounded-full border-white/20 bg-white/20"><svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg></span>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
            Just at Rs.500
        </p>
      </li>
      
    </ul>
  </div>
  <div class="p-0 mt-12">
    <button
    onClick={onClickHandler}
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
      type="button">
      Buy Now
    </button>
  </div>
</div> 
    </div>
  )
}

export default Card2