import React from 'react'

const Card = ({course}) => {

   
    const formattedDate = course.enrollmentDate
    ? new Date(course.enrollmentDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';
      console.log(course)

  return (
    <>
    <div
  class="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mx-4">
  <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
      alt="ui/ux review check" />
  </div>
  <div class="p-6">
    <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {course.courseName}
    </h4>
    <p class="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
      Because it&apos;s about motivating the doers. Because I&apos;m here to
      follow my dreams and inspire others.
    </p>
  </div>
  <div class="flex items-center justify-between p-6">
    <div class="flex items-center -space-x-3">
      
        
    </div>
    <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
      {formattedDate}
    </p>
  </div>
</div> 
    
    </>
  )
}

export default Card