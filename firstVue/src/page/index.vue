<template>
	<div >
		<span style="color:red">index</span> page
		<router-view/>
		<router-link to="/index/foo/post">go to index</router-link>
		<div>User {{ $route.params.id }}</div>
		<router-link to="/">go back</router-link>
	</div>
</template>

<script>
export default {
  name: 'index'
}
</script>
