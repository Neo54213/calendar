/*------------------------------begin model-----------------------------------*/
function Model() {
	var aWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
	var aMonthNames = [
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
	];
    var oMonthDate = new Date();
    var aPeople = [
		{
			lastName: "Курчатов",
			firstName: "Борис",
			fathersName: "Васильевич",
			birthday: 3,
			birthmonth: 9,
			age: 111,
			city: "Симский завод"
		},
		{
			lastName: "Хичкок",
			firstName: "Альфред",
			fathersName: "",
			birthday: 13,
			birthmonth: 9,
			age: 117,
			city: "Лондон"
		},
		{
			lastName: "Сеченов",
			firstName: "Иван",
			fathersName: "Михайлович",
			birthday: 13,
			birthmonth: 9,
			age: 187,
			city: "Лондон"
		}
	];
    
	return {
        getPersonByBirthday: function(nDay){
            var iItemIdx = -1;

            var aData = this.getPeople();

            // iterate through all data and find the item which meets the requirements, in our case, the
            // requirements is a proper "birthday" attribute
            for (var i = 0; i < aData.length; i++) {
                if (aData[i]["birthday"] === nDay) {
                    iItemIdx = i;
                    break;
                }
            }

            return iItemIdx !== -1 ? aData[i] : null;
        },
		getWeekDays: function(){
			return aWeekDays;
		},
        getPeople: function() {
            return aPeople;
        },
        getMonthNames: function(){
            return aMonthNames;
        },
        getMonthDate: function(){
            return oMonthDate;
        }
	}
};

/*------------------------------end model-------------------------------------*/


/*------------------------------begin view------------------------------------*/

	function View() {        
        var oTable = document.getElementById("calendar");
        var oHeader = document.querySelector("h1");	
        var oPersonInfo = document.querySelector("#infoAboutPerson");
        
		return {
			attachTableClick: function(fnCallback) {
				oTable.addEventListener("click", fnCallback);
			},

            // Clear previous data in textarea
			clearInfoSide: function(){
				oPersonInfo.textContent = "";
			},
            putInfo: function(oPerson){
				if(oPerson === null){
					oPersonInfo.textContent = "Именинников нет.";
					return;
				}
				oPersonInfo.textContent += "Именинник: " +
					oPerson.lastName + " " + oPerson.firstName + (oPerson.fathersName ? " " + oPerson.fathersName : "") + "\n"
					+ "Дата рождения: " + ((oPerson.birthday < 10)? ("0" + oPerson.birthday): (oPerson.birthday)) + "." +
					((oPerson.birthmonth < 10)? "0" + oPerson.birthmonth:
						oPerson.birthmonth) + "\n" +
					"Возраст: " + oPerson.age + '\n'+
					"Город: " + oPerson.city;
            },

			/**
			 * Render table
			 * @param {Array} aData Source data
			 */
			renderTable: function(aData, oDate, aMonthNames) {
                var oTableTr = document.createElement("tr");

                for (key in aData) {
                    var oTableTh = document.createElement("th");
                    oTableTh.textContent = aData[key];
                    oTableTr.appendChild(oTableTh);
                }
                oTable.appendChild(oTableTr);
                  
                var nWeek = 1;
                var oMonthDate = oDate;
                var nLastMonthDay = 32 - new Date(oMonthDate.getYear(), oMonthDate.getMonth(), 32).getDate();
                oMonthDate.setDate(1);
                var oFirstDay = oMonthDate;
                var nFirstDay = oFirstDay.getDay();

                for(var j = 1; j <= nLastMonthDay; ){
                    var oTableTr = document.createElement("tr");
                    for(var i = 1; i <= 7; i++){
                        var oTableTd = document.createElement("td");
                        if(j > nLastMonthDay || (i < nFirstDay && nWeek == 1) || ((i < 7 &&
                            nFirstDay == 0) && nWeek == 1)){
                            oTableTd.className = "non-month";
                        }else{
                            oTableTd.textContent = j;
                            j++;
                        }
                        oTableTr.appendChild(oTableTd);
                    }
                    oTable.appendChild(oTableTr);
                    nWeek++;
                }
                oHeader.textContent = aMonthNames[oMonthDate.getMonth()] + ' ' + oMonthDate.getFullYear();
			},
		}
	};

/*------------------------------end view--------------------------------------*/


/*------------------------------begin controller------------------------------*/

	function Controller() {
		return {
			initialize: function () {
				this.oView = new View();
				this.oModel = new Model();

				this.oView.renderTable(this.oModel.getWeekDays(), this.oModel.getMonthDate(), this.oModel.getMonthNames());

				this.oView.attachTableClick(this.onTableClick.bind(this));
			},
			onTableClick: function (oEvent) {
                this.oView.clearInfoSide();

				
				var oTarget		= oEvent.target;
				var sNodeName	= oTarget.nodeName;
				if (sNodeName !== "TD") {
					return;
				}
                
                // name of the selected menu item
				var nDay				= oTarget.textContent;

				// the object representation of the selected menu item
				var oPerson	= this.oModel.getPersonByBirthday(nDay);

				this.oView.putInfo(oPerson);
                
			}
		}
	}

/*------------------------------end controller--------------------------------*/

var oController = new Controller();
oController.initialize();

/*------------------------------anonymous initializing function---------------*/

	(function() {
		var app = {
			init: function(){
			},

			main: function(){

			},

			event: function(){
			}
		};
	}());
/*------------------------------anonymous initializing function---------------*/

