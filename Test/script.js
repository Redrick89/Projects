Vue.component('modal', {
	props: ['programsData', 'cruisesData', 'selectedData', 'selected', 'select1', 'select2', 'select3'], 
	template: '#modal-template',
	computed: {
		selectedData1: function(){
			if (this.select1 !== null) return( this.selectedData[this.select1] )
			else return( this.selectedData )
		}
	}
});

var app = new Vue({
	el: '#app',
	data: {
		cruisesData: [
			{
				id: 1, 
				date: "20-09-2018", 
				time: "14:40", 
				program_id: 1, 
				total_seats: 100, 
				available_seats: 30
			}, 
			{
				id: 2, 
				date: "21-09-2018", 
				time: "15:50", 
				program_id: 2, 
				total_seats: 100, 
				available_seats: 45
			}],
		programsData: [
			{
				id: 1, 
				name: "Северная венеция",  
				prices: {
					Deck: {
						Adult: {Free: 0, Half: 50, Full: 50, Corp: 100}, 
						Kid: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Benefit: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Special: {Free: 0, Half: 50, Full: 50, Corp: 100}
					},
					Bow: {
						Adult: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Kid: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Benefit: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Special: {Free: 0, Half: 50, Full: 50, Corp: 100}
					}
				}
			}, 
			{
				id: 2, 
				name: "Восточная венеция",
				prices: {
					Deck: {
						Adult: {Free: 0, Half: 50, Full: 50, Corp: 100}, 
						Kid: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Benefit: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Special: {Free: 0, Half: 50, Full: 50, Corp: 100}
					},
					Bow: {
						Adult: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Kid: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Benefit: {Free: 0, Half: 50, Full: 50, Corp: 100},
						Special: {Free: 0, Half: 50, Full: 50, Corp: 100}
					}
				}
			}],
		selectedData: null,
		selected: null,
		select1: null,
		select2: null,
		select3: null,
    	showModal: false
	},

	methods:{
		initModal(){
			this.selectedData = this.programsData[this.selected].prices;
			this.showModal = true
		},
		exitModal(){
			this.showModal = false;
			this.select1 = null;
			this.select2 = null;
			this.select3 = null
		}
	}
});
