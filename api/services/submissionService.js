import { executeQuery } from "../database/database.js";

const getDoneExercises = async (token) => {
  const res = await executeQuery(
    "SELECT exercise FROM submission WHERE token=$token AND correct=true;",{token})  
    return res.rows
};

const createSubmission= async (  token,
  exercise,code,
  correct
) => {
 const res = await executeQuery(
    "INSERT INTO submission (token,exercise,code,correct) VALUES ($token, $exercise, $code, $correct);",
    { token,
      exercise,
      code,
      correct }
  );
      return res.rows

};
const getSubmissionsByExercise = async (token,exercise) => {
    const res = await executeQuery(
      "SELECT * FROM submission WHERE token=$token AND exercise=$exercise;",{token,exercise})  
  return res.rows

};


export {createSubmission,getSubmissionsByExercise, getDoneExercises}