"use strict";
/*------------------------------begin model-----------------------------------*/
function Model() {
	var aWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        aMonthNames = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        oMonthDate = new Date();
    
	return {
        getPeopleByBirthday: function (nDay) {
            var aPersons;
            $.ajax({
                type: "POST",
                url: "index.php",
                async: false,
                data: "birthday="+nDay,
                success: function(data){
                            if(data === "no info"){
                                aPersons = undefined;
                            }else{
                                aPersons = JSON.parse(data);
                            }
                        }
            });

            return aPersons;
        },
		getWeekDays: function(){
			return aWeekDays;
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
        var oTable = document.querySelector("#calendar");
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
            putInfo: function(aPersons, nDay){
				if(aPersons === undefined){
					oPersonInfo.textContent = "Именинников нет.";
					return;
				}
                oPersonInfo.innerHTML = nDay+" числа свой день рождения празднуют: <br/>";
                aPersons.forEach(function(item, i, arr){
                    var fathersName = item.fathers_name ? " " + item.fathers_name : '';
                    $('#infoAboutPerson').html($('#infoAboutPerson').html() + item.last_name + " " + item.first_name +
                        fathersName + '. Исполняется ' + item.age + ' лет. Поздравляем!  <br/>'
                    );
                });
            },

			/**
			 * Render table
			 * @param {Array} aData Source data
			 */
			renderTable: function(aData, oDate, aMonthNames) {
                var oTableTr = document.createElement("tr");

                for (var key in aData) {
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
                            var nDay = oTarget.textContent;
                            var aPeople = this.oModel.getPeopleByBirthday(nDay);
                            this.oView.putInfo(aPeople, nDay);
			}
		}
	}

/*------------------------------end controller--------------------------------*/

var oController = new Controller();
oController.initialize();