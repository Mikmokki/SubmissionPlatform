<template>
		<p class="instructions">
			Non-completed exercises
		</p>
<ul role="list" class="link-card-grid">
	<Card v-for="e in props.exercises.filter(e=>!correct.includes(e.title)).slice(0,3)" :title="e.title" :correct="false"
						body="Learn how Astro works and explore the official API docs." :href="(e.url as string)" 
					/>		
</ul>
<p class="instructions">
			Completed exercises
		</p>
		<ul role="list" class="link-card-grid">
	<Card v-for="e in props.exercises.filter(e=>correct.includes(e.title))" :title="e.title" :correct="true"
						body="Learn how Astro works and explore the official API docs." :href="(e.url as string)" 
					/>		
</ul>
</template>
<script lang="ts" setup>
import type { AstroInstance } from 'astro';
import { onMounted, ref, watchEffect } from 'vue';
import Card from './Card.vue';
interface Page extends AstroInstance{
	title:string;
}
const props = defineProps<{exercises:Page[];}>()
const correct = ref<string[]>([])

const user = ref()
watchEffect(()=>{
  user.value=localStorage.getItem("user")
})
onMounted(async ()=>{
const res = await fetch(`http://localhost:7777/?user=${user.value}`)
const arr = await res.json()  as {exercise:string}[]
correct.value=arr.map(e=>e.exercise)
}) 
</script>
<style>
	.link-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
		gap: 1rem;
		padding: 0;
	}
	
	.instructions {
		line-height: 1.6;
		margin: 1rem 0;
		border: 1px solid rgba(var(--accent), 25%);
		background-color: white;
		padding: 0.5rem;
		border-radius: 0.4rem;
	}
	</style>