import React from 'react'
import Card2 from './Card2'
import axios from 'axios';

const CardList2 = () => {

    const courses=JSON.parse(localStorage.getItem('coursesList'))
    const user=JSON.parse(localStorage.getItem('user'))

    const newcourses=courses.filter(course =>
        !(user.coursesEnrolled.some(enrolledCourse => enrolledCourse.courseName === course.name))
      );

    console.log(newcourses)

  return (
    <>
    <div class="flex justify-around mx-32 mt-8 ">

        {
              courses.map((newcourse)=>(
                     <div key={newcourse.id} >

                        <Card2 course={newcourse} />
                    </div> 
              ))
        }
         
    </div>
    
    </>
  )
}

export default CardList2