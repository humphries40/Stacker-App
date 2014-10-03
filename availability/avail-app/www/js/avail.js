/*
* This javascript file contains the implementation of the 
* javascript for the availability reporting features
*
*
*
*/
var availreport {

	//This function would compare schedules and return possible meeting times
	compareTimes: function() {

	}

	//this function would find open times in a person's schedule and return it as some form
	//Events is an arry containing all of the events for that persons calendar
	//what will be returned is an array with all the open times
	//events is ordered

	//filters is an array containing the filtering elements to be applied

	//events is an array of items various fields these are
	//["Month", "day", "Year", "Starttime", "Endtime"]	

	function findOpen(events, filters) {
		events = new Array(
			[7, 7, 2014, "1:00 PM", "2:00 PM"],
			[7, 7, 2014, "5:00 PM", "6:00 PM"],
			[7, 7, 2014, "8:00 PM", "9:00 PM"],
			[7, 8, 2014, "10:00 AM", "2:00 PM"],
			[7, 8, 2014, "4:00 PM", "5:00 PM"],
			[7, 8, 2014, "7:00 PM", "11:00 PM"]
			);
		filters = new Array(
			[7, 7, 2014, "12:00 AM", "Start Day"],
			[7, 8, 2014, "11:59 PM", "End Day"]);
		var freeTime = [];
		var count = 0;
		var curTime = filters[1];
		curTime[5] = "Current Time";
		var startFreeTime = filters[1];
		//While events isn't empty or past our filter values we want to keep iterating
		while(count < events.length && compareDay(filters[1], events[count]) < 1 && compareDay(filters[2], events[count]) > -1)
		{			
			startFreeTime = curTime;
			while(compareDay(curTime, events[count]) < 1)
			{
				curTime = incrementTime(curTime);
			}			
			//push event to freeTime
			startFreeTime[5] = "Start Free Time";
			freeTime.push(startFreeTime);
			curTime[5] = "End Free Time";
			freeTime.push(curTime);
			//then increment curTime to end of event
			curTime = events[count];
			curTime[4] = curTime[5];
			curTime[5] = "Current Time";
			count++;
		}
		//add a check for curTime and add free time = time till filter end day
		if(count > events.length && compareDay(curTime, filters[2]) < 1)
		{
			//push event to freeTime
			startFreeTime = curTime;
			startFreeTime[5] = "Start Free Time";
			freeTime.push(startFreeTime);
			curTime = filters[2];
			curTime[5] = "End Free Time";
			freeTime.push(curTime);
		}
		return freeTime;
	}
	//This returns -1 if dayOne is before dayTwo
	// 0 if they are the same time
	// 1 if dayOne is after dayTwo
	//dayOne is an element from the events array
	function compareDay(dayOne, dayTwo) {
		var dayCompare = -1;
		//compare years
		if (dayOne[3] <= dayTwo[3]) {
			//compare months
			if (dayOne[1] <= dayTwo[1]) {
				//compare days
				if (dayOne[2] <= dayTwo[2]) {
					if (dayOne[2] == dayTwo[2]) {
						var dayOneHour = dayOne[4].substring(0,2);
						var dayOneMinute = dayOne[4].substring(3,5);
						var dayOneAM = false;
						if(dayOne[4].substring(5,7) == "AM") {
							dayOneAM = true;
						}
						var dayTwoHour = dayTwo[4].substring(0,2);
						var dayTwoMinute = dayTwo[4].substring(2,4);
						var dayTwoAM = false;
						if(dayOne[4].substring(5,7) == "AM") {
							dayTwoAM = true;
						}		
						if (((dayOneAM == true && dayTwoAM == false) || (dayOneAM == dayTwoAM))  && dayOneHour <= dayTwoHour && dayOneMinute <= dayTwoMinute) {
							if(dayOneAM == dayTwoAM && dayOneHour == dayTwoHour && dayOneMinute == dayTwoMinute) {
								dayCompare = 0;
							}
						}
					}
				}
				else{
					dayCompare = 1;
				}
			}
			else {
				dayCompare = 1;
			}
		}
		else{
			dayCompare = 1;
		}
		return dayCompare;
	}
	
	function incrementTime(curTime) 	{
		var curTimeHour = curTime[4].substring(0,2);
		var curTimeMinute = curTime[4].substring(3,5);
		var curTimeAM = false;
		if(curTime[4].substring(5,7) == "AM") {
			curTimeAM = true;
		}
		//Incrementing curTime
		curTimeMinute++;
		minsOfFreeTime++;
		if (curTimeMinute == 60) {
			curTimeMinute = 0;
			curTimeHour++;
			if (curTimeHour == 12) {
				curTimeAM = !curTimeAM;
				if(curTimeAM){
					curTime[2] = curTime[2]++;
					//check for leap year
					if(curTime[2] == 29 && curTime[1] == 2 && curTime[3]%4 == 0 && (curTime%100 != 0 || (curTime%100 == 0 && curTime%400 == 0))) {
						curTime[2] = 1;
						curTime[1] = 3;
					}
					else if (curTime[2] == 31 && (curTime[1] == (4 || 6 || 9 || 11)) ){
						curtime[1]++;
						curtime[2] = 1;
					}
					else if (curtime[2] == 32) {
						curtime[1]++;
						curtime[2] = 1;
					}
					if(curtime[1] == 13) {
						curtime[1] = 1;
						curtime[3]++;
					}
				}
			}
		}
		curTime[4] = curTimeHour + ":" + curTimeMinute + " " + curTimeAM;
		return curTime;
	}
}