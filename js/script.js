window.onload = function(){

// Days in russian initializing
var aWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Data object initializing
var dateOfCurrentMonth = new Date();

// People object initializing
var people = [
	{
		lastName: "Курчатов",
		firstName: "Борис",
		fathersName: "Васильевич",
		birthday: 3,
		age: 111,
		city: "Симский завод"
	},
	{
		lastName: "Хичкок",
		firstName: "Альфред",
		fathersName: "",
		birthday: 13,
		age: 117,
		city: "Лондон"
	},
	{
		lastName: "Сеченов",
		firstName: "Иван ",
		fathersName: "Михайлович",
		birthday: 13,
		age: 187,
		city: "Лондон"
	}
];

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

// Calendar draw function
function drawCalendar(){
	drawTh(aWeekDays);

	// Getting number of first day of month
	dateOfCurrentMonth.setDate(1);
	var firstDayOfCurrentMonth = dateOfCurrentMonth;
	var numberOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay();

	document.getElementById("calendar").innerHTML += "\t\t<tr>\n\t\t";
	var numberOfWeek = 1;
	var date = new Date();
	var numberOfLastDayOfCurrentMonth = 32 - new Date(date.getYear(), date.getMonth(), 32).getDate();
	for(var j = 1; j <= numberOfLastDayOfCurrentMonth; ){
		for(var i = 1; i <= 7; i++){
			if(((numberOfFirstDayOfCurrentMonth == i) || (i == 7 && numberOfFirstDayOfCurrentMonth == 0)) 
			  && numberOfWeek==1
			  && numberOfFirstDayOfCurrentMonth !=1){
				document.getElementsByTagName("tr")[numberOfWeek].innerHTML += "\t\t\t<td colspan=\"" + (i - 1) + "\"></td>\n";
				document.getElementsByTagName("tr")[numberOfWeek].innerHTML += "\t\t\t<td>" + j + "</td>";
				j++;
			}else{
				if(i < numberOfFirstDayOfCurrentMonth && numberOfWeek == 1){
					continue;
				}
				document.getElementsByTagName("tr")[numberOfWeek].innerHTML += "\t\t\t<td>" + j + "</td>";
				j++;
				if(i == 7){
					document.getElementById("calendar").innerHTML += "\t\t</tr>\n\t\t\t\t<tr>\n";
					numberOfWeek++;
				}
				if(j > numberOfLastDayOfCurrentMonth){
					break;
				}
			}
		}
	}
}

// TD click function
function tdClick(){
		// Clearing previous data in texarea
		document.getElementsByTagName("textarea")[0].innerHTML = "";
		
		// Searching of people and put info into textarea
		for(var k in people){
			if(people[k].birthday == this.innerText){
				document.getElementsByTagName("textarea")[0].innerHTML += "Именинник: " + 
				people[k].lastName + " " + people[k].firstName + " " + people[k].fathersName + "\n"
				+ "Дата рождения: " + ((people[k].birthday < 10)? ("0" + people[k].birthday): (people[k].birthday)) + "." + 
				((dateOfCurrentMonth.getMonth() + 1 < 10)? "0" + (dateOfCurrentMonth.getMonth() + 1): 
				(dateOfCurrentMonth.getMonth() + 1)) + "\n" + 
				"Возраст: " + people[k].age + '\n'+
				"Город: " + people[k].city + "\n\n";
			}
		}
		if(document.getElementsByTagName("textarea")[0].innerHTML ==""){
			document.getElementsByTagName("textarea")[0].innerHTML = "Именинников нет.";
		}
	};

//----- MAIN PART

drawCalendar();

for(var i = 0; i < document.getElementsByTagName("td").length; i++){
	document.getElementsByTagName("td")[i].onclick = tdClick;
}


var sMonthName = "";
switch(dateOfCurrentMonth.getMonth()){
	case 0: sMonthName = "январь"; break;
	case 1: sMonthName = "февраль"; break;
	case 2: sMonthName = "март"; break;
	case 3: sMonthName = "апрель"; break;
	case 4: sMonthName = "май"; break;
	case 5: sMonthName = "июнь"; break;
	case 6: sMonthName = "июль"; break;
	case 7: sMonthName = "август"; break;
	case 8: sMonthName = "сентябрь"; break;
	case 9: sMonthName = "октябрь"; break;
	case 10: sMonthName = "ноябрь"; break;
	case 11: sMonthName = "декабрь"; break;
}
document.getElementsByTagName("h1")[0].innerText += sMonthName + ' ' + dateOfCurrentMonth.getFullYear();
document.getElementsByTagName("title")[0].innerText += sMonthName + ' ' + dateOfCurrentMonth.getFullYear();
};