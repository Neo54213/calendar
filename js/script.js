/*------------------------------begin model-----------------------------------*/
var Model = {
	aWeekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
	aMonthNames:[
		"январь",
		"февраль",
		"март",
		"апрель",
		"май",
		"июнь",
		"июль",
		"август",
		"сентябрь",
		"октябрь",
		"ноябрь",
		"декабрь"
	],
	oTable: document.getElementById("calendar"),
	oMonthDate: new Date(),
	nFirstDay: -1,
	getNumberOfFirstWeekDay: function (){
		this.oMonthDate.setDate(1);
		var oFirstDay = this.oMonthDate;
		this.nFirstDay = oFirstDay.getDay();
	},
	nLastMonthDay: -1,
	getNumberOfLastMonthDay: function(){
		this.nLastMonthDay = 32 - new Date(Model.oMonthDate.getYear(), Model.oMonthDate.getMonth(), 32)
			.getDate();
	},
	oPeople: [
		{
			lastName: "Курчатов",
			firstName: "Борис",
			fathersName: "Васильевич",
			birthday: 3,
			birthmonth: 8,
			age: 111,
			city: "Симский завод"
		},
		{
			lastName: "Хичкок",
			firstName: "Альфред",
			fathersName: "",
			birthday: 13,
			birthmonth: 8,
			age: 117,
			city: "Лондон"
		},
		{
			lastName: "Сеченов",
			firstName: "Иван",
			fathersName: "Михайлович",
			birthday: 13,
			birthmonth: 8,
			age: 187,
			city: "Лондон"
		}
	],
	oPersonInfo: document.querySelector("#infoAboutPerson")
};

/*------------------------------end model-------------------------------------*/


/*------------------------------begin view------------------------------------*/

	var View = {
		// Calendar drawing function
		drawCalendar: function (){
			// Th drawing function
			function drawTh(aData) {
				var oTable = document.getElementById("calendar");
				var oTableTr = document.createElement("tr");

				for (key in aData) {
					var oTableTh = document.createElement("th");
					oTableTh.textContent = aData[key];
					oTableTr.appendChild(oTableTh);
				}
				oTable.appendChild(oTableTr);
			}

			// Getting number of first day of month function

			drawTh(Model.aWeekDays);

			var nWeek = 1;

			for(var j = 1; j <= Model.nLastMonthDay; ){
				var oTableTr = document.createElement("tr");
				for(var i = 1; i <= 7; i++){
					var oTableTd = document.createElement("td");
					if(j > Model.nLastMonthDay || (i < Model.nFirstDay && nWeek == 1) || ((i < 7 &&
						Model.nFirstDay == 0) && nWeek == 1)){
						oTableTd.className = "non-month";
					}else{
						oTableTd.textContent = j;
						j++;
					}
					oTableTr.appendChild(oTableTd);
				}
				Model.oTable.appendChild(oTableTr);
				nWeek++;
			}
		},
		tableClick: function(event) {
			// Clearing previous data in textarea
			Model.oPersonInfo.textContent = "";

			var target = event.target;
			if (target.tagName == "TD") {
				View.clickDay(target);
			}
		},
		clickDay: function(target){
			// Searching of oPeople and putting info into textarea
			for(var k in Model.oPeople){
				if(Model.oPeople[k].birthday == target.innerText && Model.oPeople[k].birthmonth == Model.oMonthDate.getMonth()+1){
					Model.oPersonInfo.innerHTML += "Именинник: " +
						Model.oPeople[k].lastName + " " + Model.oPeople[k].firstName + (Model.oPeople[k].fathersName ? " " + Model.oPeople[k].fathersName : "") + "\n"
						+ "Дата рождения: " + ((Model.oPeople[k].birthday < 10)? ("0" + Model.oPeople[k].birthday): (Model.oPeople[k].birthday)) + "." +
						((Model.oPeople[k].birthmonth < 10)? "0" + Model.oPeople[k].birthmonth:
							Model.oPeople[k].birthmonth) + "\n" +
						"Возраст: " + Model.oPeople[k].age + '\n'+
						"Город: " + Model.oPeople[k].city + "\n\n";
				}else{
					Model.oPersonInfo.textContent = "Именинников нет.";
				}
			}
		}
	};

/*------------------------------end vied--------------------------------------*/


/*------------------------------begin controller------------------------------*/

	var Controller = {
		handleClick: function(event){
			View.tableClick(event);
		}
	};

/*------------------------------end controller--------------------------------*/

/*------------------------------anonymous initializing function---------------*/
	(function() {
		var app = {
			init: function(){
				this.main();
				this.event();
			},

			main: function(){
				Model.getNumberOfFirstWeekDay();
				Model.getNumberOfLastMonthDay();
				View.drawCalendar();
				var oHeader = document.querySelector("h1");
				oHeader.textContent = Model.aMonthNames[Model.oMonthDate.getMonth()] + ' ' + Model.oMonthDate.getFullYear();
			},

			event: function(){
				Model.oTable.onclick = Controller.handleClick;
			}
		};
		app.init();
	}());
/*------------------------------anonymous initializing function---------------*/