const express=require('express');
const { z } = require("zod");
const User =require('./userSchema.js')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule');
const coursesList = require('./courses.js');
const cors=require('cors')
const JWT_SECRET = 'supratik project'

app=express();

const port=5173;





const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));

app.use(express.json());
const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    age: z.number().min(15).max(100)
  });




const validateUser = (req,res,next) => {
    try {
   
      userSchema.parse(req.body);
      next()
      
    } catch (err) {
        return res.status(400).json({
            messsage:err.errors[0].message
        });
    }
  };

const authenticateUser = (req, res, next) => {
    console.log('I love you');
    const token = req.headers.authorization || req.query.token || req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
  
      // Attach the user information to the request object for further use in routes
      req.user = decoded;
      console.log(req.user)
      next();
    });
  };


  const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://ayushmanpaul007:5MN2dbg1MHV1JTL8@cluster0.l5mcqqq.mongodb.net/?retryWrites=true&w=majority');
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };
   

  connectDB()


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.post('/sign-up',validateUser, async(req, res) => {

    try {
        const { username, email, password,age } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
          if (existingUser) {
              return res.status(400).json({ 
                error: 'User with the same username or email already exists' 
            });
         }
        const user = new User({ username, email, password,age });
        await user.save();
        res.json({ user });
      } catch (error) {
        console.error('Error creating user:', error.message);   
        res.status(500).send('Server Error');
      }

     
  });


app.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
  
   
      const user = await User.findOne({ username });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3h' });

      // Send the token in the response headers
      res.header('Authorization', `${token}`).json({ user,coursesList });
  
   
    } catch (error) {
      console.error('Error signing in:', error.message);
      res.status(500).send('Server Error');
    }
  });

app.get('/coursesList', (req, res) => {
    return res.json({coursesList})
})

schedule.scheduleJob('0 0 * * *', async () => {
    try {
      
      const usersWithEnrolledCourses = await User.find({ 'coursesEnrolled.0': { $exists: true } });
  
   
      await Promise.all(
        usersWithEnrolledCourses.map(async (user) => {
          user.coursesEnrolled = user.coursesEnrolled.filter((course) => {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return course.enrollmentDate >= oneMonthAgo;
          });
  
          await user.save();
        })
      );
  
      console.log('Enrollment cleanup completed');
    } catch (error) {
      console.error('Error during enrollment cleanup:', error.message);
    }
});


app.get('/buy-course/:id',authenticateUser, async(req, res) => {
   

    try{

    
    const user=await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    const courseId = parseInt(req.params.id, 10);

    const course = coursesList.find(obj => obj.id === courseId);
    const courseName=course.name
   

    user.coursesEnrolled.push( {courseName} );
    const updatedUser=await user.save();

    res.json({ message: 'Course added successfully', updatedUser });

    } catch (error) {
        console.error('Error adding course:', error.message);
        res.status(500).send('Server Error');
      }

})


app.use((err,req, res) => {
        res.json({
            mssg:"Something's wrong"
        })
})
  
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })