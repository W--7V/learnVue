<template>
	<div>
		content page
		<div>User {{ $route.params.id }}</div>
		<router-link to="/redirectToIndex">go to index</router-link>
	</div>
</template>

export default {
  name: 'content',
}