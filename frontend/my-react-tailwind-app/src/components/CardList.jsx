import React from 'react'
import Card from './Card'

const CardList = () => {
     console.log('I love you')
    const user=JSON.parse(localStorage.getItem('user')).coursesEnrolled
    console.log(user)

    
  return (
    <>

    <div class="flex mx-8 mt-8 ">
       {user.map((course)=>(
        <div key={course._id}>
            <Card course={course}/>
        </div>
       ))}
    </div>
    </>
  )
}

export default CardList