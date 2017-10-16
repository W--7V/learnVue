<template>
	<div>
		content page
		<div>User {{ $route.params.id }}</div>
		<router-link to="/redirectToIndex">go to index</router-link><br/>
		<router-link to="/">go back</router-link>
	</div>
</template>

<script>
export default {
  name: 'content',
}
</script>