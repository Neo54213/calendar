window.onload = function(){

//------------------------------- INITIALIZING SECTION -------------------------


// Days in russian initializing
var aWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Data object initializing
var oMonthDate = new Date();

// Month name array initializing
var aMonthName = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
				  "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
				 ];

// People object initializing
var oPeople = [
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
];

// Info object initializing
var oPersonInfo = document.getElementById("infoAboutPerson");

// Table object initializing
var oTable = document.getElementById("calendar");

//-------------------------- FUNCTION SECTION ----------------------------------


// Th drawing function
function drawTh(aData){
	var oTable = document.getElementById("calendar");
	var oTableTr = document.createElement("tr");

    for (key in aData) {
     var oTableTd = document.createElement("th");
     oTableTd.textContent = aData[key];
     oTableTr.appendChild(oTableTd);
    }
    oTable.appendChild(oTableTr);
}

// Getting number of first day of month function
function getNumberOfFirstWeekDay(oMonthDate){
	oMonthDate.setDate(1);
	var oFirstDay = oMonthDate;
	return oFirstDay.getDay();
}

// Calendar drawing function
function drawCalendar(){
	drawTh(aWeekDays);

	// Getting number of first day of month
	var nFirstDay = getNumberOfFirstWeekDay(oMonthDate);

	var nWeek = 1;

	// Getting number of last month day
	var nLastMonthDay = 32 - new Date(oMonthDate.getYear(), oMonthDate.getMonth(), 32)
	.getDate();

	// Set flag to separate non-month days from month days
	var flag = false;

	for(var j = 1; j <= nLastMonthDay; ){
		var oTableTr = document.createElement("tr");
		for(var i = 1; i <= 7; i++){
			if(j > nLastMonthDay || (i < nFirstDay && nWeek == 1) || ((i < 7 &&
				nFirstDay == 0) && nWeek == 1)){
				flag = true;
			}
			var oTableTd = document.createElement("td");
			if(flag){
				oTableTd.className = "non-month";
			}else{
				oTableTd.textContent = j;
			}
			if(!flag){
				j++;
			}
			oTableTr.appendChild(oTableTd);
			flag = false;
		}
		oTable.appendChild(oTableTr);
		nWeek++;
	}
}

// TD click function
function clickDay(target){
	// Searching of oPeople and putting info into textarea
	for(var k in oPeople){
		if(oPeople[k].birthday == target.innerText && oPeople[k].birthmonth == oMonthDate.getMonth()+1){
			oPersonInfo.innerHTML += "Именинник: " +
			oPeople[k].lastName + " " + oPeople[k].firstName + (oPeople[k].fathersName ? " " + oPeople[k].fathersName : "") + "\n"
			+ "Дата рождения: " + ((oPeople[k].birthday < 10)? ("0" + oPeople[k].birthday): (oPeople[k].birthday)) + "." +
			((oPeople[k].birthmonth < 10)? "0" + oPeople[k].birthmonth:
			oPeople[k].birthmonth) + "\n" +
			"Возраст: " + oPeople[k].age + '\n'+
			"Город: " + oPeople[k].city + "\n\n";
		}else{
			oPersonInfo.innerHTML = "Именинников нет.";
		}
	}
}

//---------------------------------- MAIN PART ---------------------------------

drawCalendar();

oTable.onclick = function(event){
	// Clearing previous data in textarea
	oPersonInfo.textContent = "";

	var target = event.target;
	if(target.className != "non-month" && target.tagName == "TD") {
		clickDay(target);
	}
}

document.getElementById("header").innerText += aMonthName[oMonthDate.getMonth()]
	+ ' ' + oMonthDate.getFullYear();
};