import * as submissionService from "../../services/submissionService.js";
import { grade } from "../../grade.js";
import { connect } from "../../deps.js";
const cache = await connect({
  hostname: "redis",
  port: 6379,
})

const getDoneExercises = async({request,response})=>{
  const submissions = await submissionService.getDoneExercises(
    request.url.searchParams.get('user')
)
await cache.set(`exercises/user:${request.url.searchParams.get('user')}`,JSON.stringify(submissions))
  response.body= submissions
}

const getSubmissionsByExercise = async ({request,response,params}) => {
  const cacheSubmissions = JSON.parse(await cache.get(`exercise:${params.exerciseName}&user:${request.url.searchParams.get('user')}`));
  if(cacheSubmissions &&cacheSubmissions.length>0){
    response.body= cacheSubmissions
    return
  }
  const submissions= await submissionService.getSubmissionsByExercise(
    request.url.searchParams.get('user'),params.exerciseName
)
  await cache.set(`exercise:${params.exerciseName}&user:${request.url.searchParams.get('user')}`, JSON.stringify(submissions));
   response.body= submissions
}

const submissionQueue=[]

   const createSubmission = async ({ request,response }) => {
    const {user,exercise,code} = await request.body().value
    submissionQueue.push({user,exercise,code:code})
    gradeSubmission()
    response.body=true
}
let sockets= []
const sleep =(time) => {
  return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
  });
}

const testSockets=(ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }

  const ws = ctx.upgrade();
  ws.onopen = () => {
    sockets.push({exercise:ctx.params.exercise,user:ctx.params.user,socket:ws})
  };
  
  ws.onmessage =async (e) => {
 
  };
  ws.onclose = () => sockets=sockets.filter(s=>s.socket!=ws)
};
let taken= false

const gradeSubmission =async ()=>{
  try {
    while(submissionQueue.length>0){
      while(taken){
        await sleep(2000)
      }
      taken=true
      const head = submissionQueue.shift()
      if(!head || !head.user || !head.exercise || !head.code){
        console.log("problem with the queue item", head)
        return
      }
      
      const {user,exercise,code} = head
      const cacheSubmissions = JSON.parse(await cache.get(`exercise:${exercise}&user:${user}`));
      if (cacheSubmissions && cacheSubmissions.length>0 && cacheSubmissions.find(s=>s.code==code) ){
        const correct = cacheSubmissions.find(s=>s.code==code).correct
        await submissionService.createSubmission(
        user,exercise,code,correct
      );
      cacheSubmissions.push({user,exercise,code,correct})
      await cache.set(`exercise:${exercise}&user:${user}`,JSON.stringify(cacheSubmissions))
    } else {
      const result = await grade(code);
      const correct = result==="PASS"
      await submissionService.createSubmission(
        user,exercise,code,correct
      );
      cacheSubmissions.push({user,exercise,code,correct})
      await cache.set(`exercise:${exercise}&user:${user}`,JSON.stringify(cacheSubmissions))
    }
      sockets.filter(s=>s.exercise===exercise && user=== s.user).forEach(ws=>ws.socket.send(JSON.stringify(cacheSubmissions)));
      taken=false
}}
catch(e){
  console.log(e)

}
}
  export { createSubmission, getSubmissionsByExercise,getDoneExercises, testSockets};