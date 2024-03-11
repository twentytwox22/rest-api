const express = require('express');

//16:30
const studentRoutes = require('./src/student/routes')
const app = express();
const port = 3000

//middle ware
app.use(express.json());

app.listen(port, ()=> console.log(`app listening on port ${port}`));

app.use('/api/v1/students',studentRoutes);

app.get('/', (req,re)=> {
    res.send("hello world");                
})
