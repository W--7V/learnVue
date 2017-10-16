<template>
  <div id="app">
		<NavMenu></NavMenu>
		<router-view/>
  </div>
</template>

<script>
import './page/style.scss'
import NavMenu from './page/NavMenu'


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
		NavMenu
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
  margin-top: 60px;
}
</style>
