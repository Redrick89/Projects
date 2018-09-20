Vue.component('modal', {
	props: ['programsData', 'cruisesData', 'jsonOutput', 'programPrices', 'selected'], 
	data:function(){
		return {
			ticketCategory: null,
			ticketType: null,
			ticketDiscount: null,
			ticketCount: 1,
			basket:[]
		}
	},

	
	computed: {
		selectedCategory: function(){
			if (this.ticketCategory !== null) return( this.programPrices[this.ticketCategory] )
			else return( this.programPrices )
		},

		ticketPrice: function(){
			if (this.ticketDiscount !== null) return( this.selectedCategory[this.ticketType][this.ticketDiscount] )
			else return( 0 )
		},

		ticketSumm: function(){
			return( this.ticketPrice * this.ticketCount )
		}
	},

	methods: {
		addToBasket: function(){
			var chkCount =0;
			for(var i in this.basket){
				chkCount += this.basket[i].count;
			}
			if(chkCount + this.ticketCount <= this.cruisesData[this.selected].available_seats){
				const basketItem = {
					programId: this.programsData[this.selected].id,
					category: this.ticketCategory,
					type: this.ticketType,
					discount: this.ticketDiscount,
					price: this.ticketPrice,
					count: this.ticketCount,
					summ: this.ticketSumm
				}
				this.basket.push(basketItem);
			}
			else{
				var availableSeats = this.cruisesData[this.selected].available_seats - chkCount;
				alert('Осталось мест: ' + availableSeats);
			}
		},

		applyBasket: function(){
			var totalSumm = 0;
			for(var i in this.basket){
				totalSumm += this.basket[i].summ;
			}
			var ok = confirm('В корзине билеты на сумму: ' + totalSumm + 'руб. Оплатить?');

			if(ok){
				this.jsonOutput = JSON.stringify(this.basket);
				alert(this.jsonOutput);
			}
		}
	},

	template: '#modal-template'
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
		jsonOutput: null,
		programPrices: null,
		selected: null,
		showModal: false
	},

	methods:{
		initModal(){
			this.programPrices = this.programsData[this.selected].prices;
			this.showModal = true
		},
		exitModal(){
			this.showModal = false;
			this.ticketCategory = null;
			this.ticketType = null;
			this.ticketDiscount = null;
			this.basket = []
		}
	}
});
