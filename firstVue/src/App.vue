<template>
  <div id="app">
		<NavMenu :items="items"></NavMenu>
		<Container></Container>
  </div>
</template>

<script>
import './page/style.scss'
import NavMenu from './page/NavMenu'
import Container from './page/Container'


export default {
  name: 'app',
  data: function(){
		return {
			items:[
				{
					index: '5',
					link:'/',
					name:'首页5'
				},{
					index: '6',
					link:'/',
					name:'首页6'
				}
			]
		}
	},
	components:{
		NavMenu,
		Container
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
