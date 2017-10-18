<template>
  <div id="app">
		<NavMenu></NavMenu>
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
					label: 'coding',
					isFinished: true
				},{
					label: 'walking',
					isFinished: true
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
