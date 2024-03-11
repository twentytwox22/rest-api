const pool = require('../../db');
const queries = require('./quries');

const getStudents = (req,res) => {
    pool.query(queries.getStudents, (error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows); 
    })
}
const getStudentById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id],(error, results)=> {
        if (error) throw error;
        res.status(200).json(results.rows); 
    })
}
const addStudent = (req,res) =>{
    const {name,email,age,dob} = req.body;
    //check if email exists
    pool.query(queries.checkEmailExsts, [email],(error,results)=>{
        if (results.rows.length) { 
            res.send("email already exists"); 
        }
        //add student to db 
        pool.query(queries.addStudent, [name, email,age,dob], (error,results)=>{
            if (error) throw error;
            res.status(201).send("student created successfully")
        })
    })
};
const removeStudent = (req,res) => {
    
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentByID, [id], (error,results)=>{
        const noStudentFound = !results.rows.length
        if (noStudentFound){
            res.send("student does not exist in database");
        }
        pool.query(queries.removeStudent,[id], (error,results)=>{
            if(error) throw error
            res.status(200).send("student removed successfully")
        })
    })
}

const updateStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name} = req.body;

    // check if student exists
    pool.query(queries.getStudentByID, [id], (error,results)=>{
        const noStudentFound = !results.rows.length
        if (noStudentFound){
            res.send("student does not exist in database");
        }
        pool.query(queries.updateStudent,[name, id], (error,results)=>{
            if(error) throw error
            res.status(200).send("student name updated successfully")
        })
    })
}


module.exports={
    getStudents, 
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
    
};