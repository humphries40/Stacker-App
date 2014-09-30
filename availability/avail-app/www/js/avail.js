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

	findOpen: function(events, filters) {
		var events = new Array(
			[7, 7, 2014, "1:00 PM", "2:00 PM"],
			[7, 7, 2014, "5:00 PM", "6:00 PM"],
			[7, 7, 2014, "8:00 PM", "9:00 PM"],
			[7, 8, 2014, "10:00 AM", "2:00 PM"],
			[7, 8, 2014, "4:00 PM", "5:00 PM"],
			[7, 8, 2014, "7:00 PM", "11:00 PM"],
			)
		var filters = new Array(
			[7, 7, 2014, "12:00 AM", "Start Day"],
			[7, 8, 2014, "11:59 PM", "End Day"])
		var freetime = new Array();
		var count = 0;
		var curTime = filters[1];
		var startFreeTime = filters[1];
		//While events isn't empty or past our filter values we want to keep iterating
		while(count < events.length && dayCompare(filters[1], events[count]) < 1 && dayCompare[filters[2], events[count] > -1])
		{
			//
			while(compareDay(curTime, events[count]) < 1)
			{
				startFreeTime = curTime;
				var curTimeHour = curTime[4].substring(0,2);
				var curTimeMinute = curTime[4].substring(3,5);
				var curTimeAM = false;
				if(curTime[4].substring(5,7) == "AM") {
					curTimeAM = true;
				}
				curTimeMinute++;
				if (curTimeMinute == 60) {
					curTimeMinute == 0;
					curTimeHour++;
					if (curTimeHour == 12) {
						curTimeAM = !curTimeAM;
						if(curTimeAM == true)
						{
							curTime[2] = curTime[2]++;
							if(curTime[2] == 29 && curTime[1] == 2 && curTime[3]%4 == 0 && (curTime%100 != 0 || (curTime%100 == 0 && curTime%400 == 0)))
							{
								curTime[2] = 1;
								curTime[1] = 3;
							}
							//Need to add checks for other months
							else if (curTime[2] = 31 && (curTime[1] )) {}
							//need to add rollover for year

						}

					}
				}
			}
			//add a free time event that start free time is startfreetime and end freetime is cur time
			//then increment cur time to end of event
			

		}
		//add a check for curTime and add free time = time till filter end day

	}

	//This returns -1 if dayOne is before dayTwo
	// 0 if they are the same day
	// 1 if dayOne is after dayTwo

	//dayOne is an element from the events array
	compareDay: function(dayOne, dayTwo) {
		dayCompare = -1
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
						if (((dayOneAM = true && dayTwoAM = false) || (dayOneAM == dayTwoAM))  && dayOneHour <= dayTwoHour && dayOneMinute <= dayTwoMinute) {
							if(dayOneAM = dayTwoAM && dayOneHour == dayTwoHour && dayOneMinute == dayTwoMinute) {
								dayCompare == 0;
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



}