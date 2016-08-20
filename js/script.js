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
		firstName: "Иван ",
		fathersName: "Михайлович",
		birthday: 13,
		birthmonth: 8,
		age: 187,
		city: "Лондон"
	}
];

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

// Calendar drawing function
function drawCalendar(){
	drawTh(aWeekDays);

	// Getting number of first day of month
	oMonthDate.setDate(1);
	var oFirstDay = oMonthDate;
	var nFirstDay = oFirstDay.getDay();

	document.getElementById("calendar").innerHTML += "\t\t<tr>\n\t\t";
	var nWeek = 1;
	var date = new Date();
	var nLastMonthDay = 32 - new Date(date.getYear(), date.getMonth(), 32)
																     .getDate();
	for(var j = 1; j <= nLastMonthDay; ){
		for(var i = 1; i <= 7; i++){
			if(((nFirstDay == i) || (i == 7 && nFirstDay == 0)) 
			  && nWeek==1 && nFirstDay !=1){
				document.getElementsByTagName("tr")[nWeek].innerHTML += "\t\t\t<td colspan=\"" + (i - 1) + "\"></td>\n";
				document.getElementsByTagName("tr")[nWeek].innerHTML += "\t\t\t<td>" + j + "</td>";
				j++;
			}else{
				if(i < nFirstDay && nWeek == 1){
					continue;
				}
				if(j > nLastMonthDay){
					var flag = true;
				}
				document.getElementsByTagName("tr")[nWeek].innerHTML += "\t\t\t<td>" + (flag ? "": j) + "</td>";
				if(j <= nLastMonthDay){
					j++;
				}
				if( i == 7 && j < nLastMonthDay ){
					document.getElementById("calendar").innerHTML += "\t\t</tr>\n\t\t\t\t<tr>\n";
					nWeek++;
				}
			}
		}
	}
}

// TD click function
function clickDay(){
	// Clearing previous data in texarea
	var oPersonInfo = document.getElementById("infoAboutPerson");
	oPersonInfo.innerHTML = "";
	
	// Searching of oPeople and putting info into textarea
	for(var k in oPeople){
		if(oPeople[k].birthday == this.innerText && oPeople[k].birthmonth == oMonthDate.getMonth()+1){
			oPersonInfo.innerHTML += "Именинник: " + 
			oPeople[k].lastName + " " + oPeople[k].firstName + " " + oPeople[k].fathersName + "\n"
			+ "Дата рождения: " + ((oPeople[k].birthday < 10)? ("0" + oPeople[k].birthday): (oPeople[k].birthday)) + "." + 
			((oPeople[k].birthmonth < 10)? "0" + oPeople[k].birthmonth:
			oPeople[k].birthmonth) + "\n" +
			"Возраст: " + oPeople[k].age + '\n'+
			"Город: " + oPeople[k].city + "\n\n";
		}
	}
	if(oPersonInfo.innerHTML == ""){
		oPersonInfo.innerHTML = "Именинников нет.";
	}
}

//---------------------------------- MAIN PART ---------------------------------

drawCalendar();

for(var i = 0; i < document.getElementsByTagName("td").length; i++){
	if(document.getElementsByTagName("td")[i].textContent !== ""){
		document.getElementsByTagName("td")[i].onclick = clickDay;
	}
}

document.getElementById("header").innerText += aMonthName[oMonthDate.getMonth()] + ' ' + oMonthDate.getFullYear();
};