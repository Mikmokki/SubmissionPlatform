<template>
  <div>
		<textarea v-model="code" ></textarea>
	<button @click="createSubmission">Submit code</button>
  <h1>Submissions</h1>
  <h2 v-if="loading">Your submission is being graded, wait a moment</h2>
  <ul :style= "[correct ? {background: 'green'} : {background:'red'}]">
    <li v-for="(sub,i) in submissions">Submission {{i+1}} was {{sub.correct}}<br>
    <code>{{sub.code}}</code>
    </li>
  </ul>
</div>
<ul id="pongs">
</ul>

<a href="/">Back to main page</a>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref, watchEffect } from 'vue';
const props = defineProps<{title: string;}> ()
const submissions = ref<{
  correct:boolean,
  id:number,
  exercise:string,
  code:string
}[]>([])
const code = ref("")
const loading = ref(false)
const user = ref()
watchEffect(()=>{
  user.value=localStorage.getItem("user")
})
const getSubmissions = async ()=>{
  const res = await fetch(`http://localhost:7777/${props.title}?user=${user.value}`)
  const arr = await res.json()
  submissions.value=arr
}
onMounted(async()=>{
 await getSubmissions()
})
const correct = computed(()=>submissions.value.map(s=>s.correct).find(x=>x))
const createSubmission = async(e:Event)=> {
    e.preventDefault()
    if(!user.value) return
    loading.value=true
const userInfo = JSON.stringify({user:user.value,exercise:props.title,code:code.value})
 await fetch('http://localhost:7777', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: userInfo,
})
ws.send(userInfo)
loading.value=true


}
const ws = new WebSocket(`ws://localhost:7777/exercise/${props.title}/user/${user.value}`);
ws.onopen = () => console.log(`Connected to server`);
ws.onmessage = async (m) => {
  const messages =  JSON.parse(m.data)
  loading.value=false
  submissions.value=messages
};
ws.onclose = () => console.log("Disconnected from server");
</script>
<style>
	textarea{
		width:100%;
	}
    </style>




