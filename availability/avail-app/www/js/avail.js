
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var eventsarr;
  var filterarr;
  res.write(" " + compareTimes());
  res.end('Hello World\n');
}).listen(80);
console.log('Server listening on port 80');



/*
Things to think about and add. 

Current Goal: This works for all U.S time zones. 


Figuring out how to compare an arbitrary number of calendars to find the free time

*/

/*
* This javascript file contains the implementation of the 
* javascript for the availability reporting features
*
*

*/

	//This function would compare schedules and return possible meeting times
	function compareTimes() {
		var filters = new Array(
			[7, 7, 2014, "12:00 AM", "Start Day"],
			[7, 8, 2014, "11:59 PM", "End Day"]);
			
		var person1Events = new Array(
			[7, 7, 2014, "01:00 PM", "02:00 PM"],
			[7, 7, 2014, "05:00 PM", "06:00 PM"],
			[7, 7, 2014, "08:00 PM", "09:00 PM"],
			[7, 8, 2014, "10:00 AM", "02:00 PM"],
			[7, 8, 2014, "04:00 PM", "05:00 PM"],
			[7, 8, 2014, "07:00 PM", "11:00 PM"]
			);
		var person2Events = new Array(
			[7, 7, 2014, "03:00 PM", "05:00 PM"],
			[7, 7, 2014, "06:00 PM", "07:00 PM"],
			[7, 7, 2014, "10:00 PM", "11:00 PM"],
			[7, 8, 2014, "06:00 AM", "12:00 PM"],
			[7, 8, 2014, "04:00 PM", "05:00 PM"],
			[7, 8, 2014, "07:00 PM", "11:00 PM"]
			);
		var person3Events = new Array(
			[7, 7, 2014, "04:00 PM", "08:00 PM"],
			[7, 8, 2014, "01:00 PM", "07:00 PM"]
			);
		console.log(filters);
		console.log("hellor");
		var openTimes = new Array (
			findOpen(person1Events, filters),
			findOpen(person2Events, filters),
			findOpen(person3Events, filters)
			);
	
		var meetingTimes = new Array();
		
		var curTime = filters[0].slice();
		console.log(curTime)
		
		var startMeetingTime = curTime.slice();
		var endMeetingTime = curTime.slice();
		while(compareDay(curTime, filters[1]) <= 1) {
			var canMeet = true;
			var allCouldMeet = false;
			var count = 0;
			var curEventCount = 1;
			startFreeTime = curTime.slice();
			console.log(curTime);
			while(canMeet && openTimes.length < count)
			{
				//This while loop increments us to the current free time block in the current calendar.
				// If the current free time blocks ending is before the current time then we want to increment to the next block. 
				while(curEventCount %2 == 1 && curEventCount < openTimes[count].length && compareDay(curTime, openTimes[count][curEventCount]) > 0)
				{
					curEventCount += 2;
				}
				//This means the current time is after all of the free time in this calendar.
				if(curEventCount > openTimes[count].length)
				{
					if(allCouldMeet)
					{
					  meetingTimes.push(startMeetingTime.slice());
					  endMeetingTime[4] = "Poop";
						meetingTimes.push(endMeetingTime.slice());
						allCouldMeet = false;
					}
					canMeet = false;
				}		
				//if the current time is before the start of free time that means they can't meet
				if(compareDay(curTime, openTimes[count][curEventCount-1]) < 0)
				{
					if(allCouldMeet)
					{
					  endMeetingTime[4] = "Balls";
						meetingTimes.push(endMeetingTime.slice());
						allCouldMeet = false;
					}
					canMeet = false;
					startMeetingTime = curTime;
				}
				//The current time works in this calendar. It's possible for them to meet. 
				else if (compareDay(curTime, openTimes[count][curEventCount-1]) >= 0 && compareDay(curTime, openTimes[count][curEventCount]) <= 0){
					count++;
					curEventCount = 1;
				}
				
				//we have gone through all the calendars and all can meet so we start over
				if(count > openTimes.length && canMeet){
					count = 0;
					allCouldMeet = true;
					endMeetingTime = curTime.slice();
					endMeetingTime[4] = "End Meeting Time";
					
				}
		  	curTime = incrementTime(curTime);
		  	console.log(curTime);
		  	console.log("bitches")
			}
			curTime = incrementTime(curTime);
		}
		return meetingTimes;	
}

function convertToStandardTime(time)
	{
		//switch statement/if statements to determine what timezone/calendar is being used.	
	}

function findOpen(events, filters) {
		/*events = new Array(
			[7, 7, 2014, "01:00 PM", "02:00 PM"],
			[7, 7, 2014, "05:00 PM", "06:00 PM"],
			[7, 7, 2014, "08:00 PM", "09:00 PM"],
			[7, 8, 2014, "10:00 AM", "02:00 PM"],
			[7, 8, 2014, "04:00 PM", "05:00 PM"],
			[7, 8, 2014, "07:00 PM", "11:00 PM"]
			);
		filters = new Array(
			[7, 7, 2014, "12:00 AM", "Start Day"],
			[7, 8, 2014, "11:59 PM", "End Day"]);
			*/
		console.log(filters);
		var freeTime = [];
		var count = 0;
		var curTime = filters[0].slice();
		curTime[4] = "Current Time";
		var startFreeTime = filters[0].slice();
		//While events isn't empty or past our filter values we want to keep iterating
		while(count < events.length && compareDay(filters[0], events[count]) < 1 && compareDay(filters[1], events[count]) > -1)
		{		
			while(compareDay(curTime, events[count]) < 0)
			{
				curTime = incrementTime(curTime);
			}			
			//push event to freeTime
			startFreeTime[4] = "Start Free Time";
			freeTime.push(startFreeTime.slice());
			curTime[4] = "End Free Time";
			freeTime.push(curTime.slice());
			//then increment curTime to end of event
			curTime = events[count];
			curTime[3] = curTime[4];
			curTime[4] = "Current Time";
			startFreeTime = curTime.slice();
			startFreeTime[4] = "Free Time";
			count++;
		}
		//add a check for curTime and add free time = time till filter end day
		if(count >= events.length && compareDay(curTime, filters[1]) < 1)
		{
			//push event to freeTime
			startFreeTime = curTime.slice();
			startFreeTime[4] = "Start Free Time";
			freeTime.push(startFreeTime.slice());
			curTime = filters[1].slice();
			curTime[4] = "End Free Time";
			freeTime.push(curTime.slice());
			
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
		if (dayOne[2] <= dayTwo[2]) {
			//compare months
			if (dayOne[0] <= dayTwo[0]) {
				//compare days
				if (dayOne[1] <= dayTwo[1]) {
					if (dayOne[1] == dayTwo[1]) {
						var dayOneHour = dayOne[3].substring(0,2);
						dayOneHour = parseInt(dayOneHour);
						if(dayOneHour == 12){
						  dayOneHour = 0;
						}
						var dayOneMinute = dayOne[3].substring(3,5);
						dayOneMinute = parseInt(dayOneMinute);
						var dayOneAM = false;
						if(dayOne[3].substring(dayOne[3].length-2,dayOne[3].length) == "AM") {
							dayOneAM = true;
						}

						var dayTwoHour = dayTwo[3].substring(0,2);
						dayTwoHour = parseInt(dayTwoHour);
						if(dayTwoHour == 12){
						  dayTwoHour = 0;
						}
						var dayTwoMinute = dayTwo[3].substring(3,5);
						dayTwoMinute = parseInt(dayTwoMinute);
						var dayTwoAM = false;
						if(dayTwo[3].substring(dayTwo[3].length-2,dayTwo[3].length) == "AM") {
							dayTwoAM = true;
						}	
						if (dayOneAM == dayTwoAM){
						  if(dayOneHour <= dayTwoHour ){
						    if(dayOneHour == dayTwoHour){
						      if(dayOneMinute <= dayTwoMinute) {
							       if(dayOneMinute == dayTwoMinute) {
							        	dayCompare = 0;
							      }
						      }
						      else{
						        dayCompare = 1;
						      }
						   }
						  }
							else {
							  dayCompare = 1;
							}
						}
						else if(!dayOneAM && dayTwoAM) {
						  dayCompare = 1;
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
		var curTimeHour = curTime[3].substring(0,2);
		curTimeHour = parseInt(curTimeHour);
		var curTimeMinute = curTime[3].substring(3,5);
		curTimeMinute = parseInt(curTimeMinute);
		var curTimeAM = false;
		if(curTime[3].substring(curTime[3].length-2,curTime[3].length) == "AM") {
			curTimeAM = true;
		}
		//Incrementing curTime
		curTimeMinute += 15;
		if (curTimeMinute >= 60) {
			curTimeMinute %= 60;
			curTimeHour++;
			if(curTimeHour == 13)	{
			  curTimeHour = 1 ;
			}
			if (curTimeHour == 12) {
				curTimeAM = !curTimeAM;
				if(curTimeAM){
					curTime[1] = curTime[1] + 1;
					//check for leap year
					if(curTime[1] == 29 && curTime[0] == 2 && curTime[2]%4 == 0 && (curTime%100 != 0 || (curTime%100 == 0 && curTime%400 == 0))) {
						curTime[1] = 1;
						curTime[0] = 3;
					}
					else if (curTime[1] == 31 && (curTime[0] == (4 || 6 || 9 || 11)) ){
						curTime[0]++;
						curTime[1] = 1;
					}
					else if (curTime[1] == 32) {
						curTime[0]++;
						curTime[1] = 1;
					}
					if(curTime[0] == 13) {
						curTime[0] = 1;
					}
				}
			}
		}
		if(curTimeAM)	{
		  curTimeAM = "AM";
		}
		else{
		  curTimeAM = "PM";
		}
		if(curTimeHour < 10){
		  curTimeHour = "0"+ curTimeHour;
		}
		if(curTimeMinute < 10){
		  curTimeMinute = "0" + curTimeMinute;
		}
		
		curTime[3] = curTimeHour + ":" + curTimeMinute + " " + curTimeAM;
		return curTime;
	}
