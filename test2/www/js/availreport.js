/*
Things to think about and add. 

Current Goal: This works for all U.S time zones. 

Note: Inorder to finding meeting times when 2 people are available run compareTimes on subset of calendars.
Then you can return those meeting times plus the users who are available for those times.

*/

/*
* This javascript file contains the implementation of the 
* javascript for the availability reporting features
*
*
*/

	//This function would compare schedules and return possible meeting times
function incrementTime(curTime) 	
{
	curTime.setMinutes(curTime.getMinutes() + 1);
	return curTime.valueOf();
}
	
//This returns -1 if dayOne is before dayTwo
// 0 if they are the same time
// 1 if dayOne is after dayTwo
//dayOne is an element from the events array
function compareDay(dayOne, dayTwo) {
	if (!(dayOne instanceof Date)) {
		console.log(dayOne);
		dayOne = new Date(dayOne);
		console.log(dayOne);
	}
	if (!(dayTwo instanceof Date)) {
		console.log(dayTwo);
		dayOne = new Date(dayTwo);
		console.log(dayTwo);
	}
	try {
		if (dayOne.getTime() < dayTwo.getTime()) {
			return -1;
		}
		else if(dayOne.getTime() === dayTwo.getTime()) {
			return 0;
		}
		else{
			return 1;
		}
	} catch(e) {
		console.log(e);
		console.log(dayOne);
		console.log(dayTwo);
	}
}


function findOpen(events, filters) {

	var freeTime = [];
	var count = 0;
	var curTime = new Date(filters[0].valueOf());
	var startFreeTime = new Date(filters[0].valueOf());
	//While events isn't empty or past our filter values we want to keep iterating
	while(count < events.length) {
		if(compareDay(curTime, events[count]) < 1) {
			while(compareDay(curTime, events[count]) < 0 ) {
				curTime = new Date(incrementTime(curTime));
			}			
			//push event to freeTime1
			freeTime.push(new Date(startFreeTime));
			//push end of free Time to array
			freeTime.push(new Date(curTime));
			//then increment curTime to end of event
			if(count+1 < events.length)
			{
				curTime = new Date(events[count+1]);
				startFreeTime = new Date(curTime.getTime());
			}
		}
		else{	
				curTime = new Date(events[count+1]);
		}
		count += 2;
	}
	//add a check for curTime and add free time = time till filter end day
	if(count >= events.length && compareDay(curTime, filters[1]) < 1)
	{
		//push event to freeTime
		startFreeTime = curTime;
		freeTime.push(new Date(startFreeTime));
		curTime = filters[1];
		freeTime.push(new Date(curTime));
		
	}
	return freeTime;
}



//Filters is an array that has the various filter elements required for our meeting search time.
//Entry 1 is the start of the time to search through
//Entry 2 is the end of the time to search through
//other elements may be added later
//arrOfCalendarEvents : This is an array of arrays. The arrays are arrays of date events that correspond to the even numbers being the 
//start of an event and the odds being the end of an event. 
	function compareCalendars(filters, arrOfCalendarEvents) {
		/*var filters = new Array(
			new Date(2014, 7, 7, 0, 0),
			new Date(2014, 7, 8, 23, 59),
			8,
			20,
			60);
		var person1Events = new Array(
			new Date(2014, 7, 7, 13, 0),
			new Date(2014, 7, 7, 14, 0),
			new Date(2014, 7, 7, 17, 0),
			new Date(2014, 7, 7, 18, 0),
			new Date(2014, 7, 7, 20, 0),
			new Date(2014, 7, 7, 21, 0),
			new Date(2014, 7, 8, 10, 0),
			new Date(2014, 7, 8, 14, 0),
			new Date(2014, 7, 8, 16, 0),
			new Date(2014, 7, 8, 17, 0),
			new Date(2014, 7, 8, 19, 0),
			new Date(2014, 7, 8, 23, 0));
		var person2Events = new Array(
			new Date(2014, 7, 7, 15, 0),
			new Date(2014, 7, 7, 17, 0),
			new Date(2014, 7, 7, 18, 0),
			new Date(2014, 7, 7, 19, 0),
			new Date(2014, 7, 7, 22, 0),
			new Date(2014, 7, 7, 23, 0),
			new Date(2014, 7, 8, 6, 0),
			new Date(2014, 7, 8, 12, 0),
			new Date(2014, 7, 8, 16, 0),
			new Date(2014, 7, 8, 17, 0),
			new Date(2014, 7, 8, 19, 0),
			new Date(2014, 7, 8, 23, 0));
		
		var person3Events = new Array(
			new Date(2014, 7, 7, 16, 0),
			new Date(2014, 7, 7, 18, 0),
			new Date(2014, 7, 8, 13, 0),
			new Date(2014, 7, 8, 19, 0));
		
		arrOfCalendarEvents = new Array(
			person1Events,
			person2Events,
			person3Events);
			*/
		var calCount = 0;
		var openTimes = []
		while(calCount < arrOfCalendarEvents.length)
		{   
			openTimes.push(findOpen(arrOfCalendarEvents[calCount], filters));
			calCount++;
		}
		/*var openTimes = new Array (
			findOpen(person1Events, filters),
			findOpen(person2Events, filters),
			findOpen(person3Events, filters)
			);*/
		var meetingTimes = [];
		
		var curTime = new Date(filters[0].valueOf());
		var logTime = curTime.valueOf();
		var startMeetingTime =  new Date(curTime.valueOf());
		var endMeetingTime = new Date(curTime.valueOf());
		var allCouldMeet = false;
		var quitLoop = 0;
		var duration = 0;
		while(compareDay(curTime, filters[1]) < 1) {
			var canMeet = true;
			var count = 0;
			var curEventCount = 0;
			//This sets the current time to be within the meeting range
			if(curTime.getHours() < filters[2])			{
				curTime = curTime.setHours(filters[2]);
				startMeetingTime = new Date(curTime.valueOf());
			//	console.log("Current Time, filter 2 ="+ curTime);
			}
			if(curTime.getHours() >= filters[3])			{
				//increments the time to the lower end of the filters and adds 24 hours so it's the next day. 
				curTime = curTime.setHours(filters[2] + 24);
				startMeetingTime = new Date(curTime.valueOf());
			//	console.log("Current Time, filter 3 ="+ curTime);
			}
			if(compareDay(curTime, filters[1]) == 1){
				break;
			}
			startMeetingTime = new Date(curTime.valueOf());
			duration = 0;
			while(canMeet && openTimes.length > count)
			{
				curEventCount = 0;
				//This while loop increments us to the current free time block in the current calendar.
				// If the current free time blocks end is before the current time then we want to increment to the next block. 
				while(curEventCount < openTimes[count].length){
				  if(compareDay(curTime, openTimes[count][curEventCount+1]) > 0){
					    curEventCount += 2;
			    	}
			    else{
			      break;
			    }
				}
				if (compareDay(curTime, openTimes[count][curEventCount]) >= 0 && compareDay(curTime, openTimes[count][curEventCount+1]) <= 0){
					count++;
					curEventCount = 0;
					canMeet = true;
				}
				//This means the current time is after all of the free time in this calendar.
				else if(curEventCount > openTimes[count].length){
					if(allCouldMeet){
					  if(compareDay(startMeetingTime, endMeetingTime) == -1){
						meetingTimes.push(new Date(startMeetingTime.valueOf()));
						meetingTimes.push(new Date(endMeetingTime.valueOf()));
						//meetingTimes.push("Current Time After all free Time");
						duration = 0;
						
					  }
					allCouldMeet = false;
					}
					canMeet = false;
					duration = 0;
				}		
				//if the current time is before the start of free time that means they can't meet
				else if(compareDay(curTime, openTimes[count][curEventCount]) < 0) {
					if(allCouldMeet)
					{
					  if(compareDay(startMeetingTime, endMeetingTime) == -1){
						meetingTimes.push(new Date(startMeetingTime.valueOf()));
						meetingTimes.push(new Date(endMeetingTime.valueOf()));
						//meetingTimes.push("Before start of free Time");
						duration = 0;
					  }
					allCouldMeet = false;
					}
					canMeet = false;
					duration = 0;
				}
				//The current time works in this calendar. It's possible for them to meet. 
				
				
				//we have gone through all the calendars and all can meet so we start over
				if(count >= openTimes.length && canMeet){
					count = 0;
					allCouldMeet = true;
					endMeetingTime = new Date(curTime.valueOf());
					if(duration == filters[4]){
						//console.log("Duration Meeting");
						if(compareDay(startMeetingTime, endMeetingTime) == -1){
								//console.log("Normal Meeting");
								meetingTimes.push(new Date(startMeetingTime.valueOf()));
								meetingTimes.push(new Date(endMeetingTime.valueOf()));
								//meetingTimes.push("Normal Meeting");
						}
						allCouldMeet = false;
						canMeet = false;
						duration = 0;
					}

					if (!(curTime instanceof Date)) {
						console.log(curTime);
						curTime = new Date(curTime);
						console.log(curTime);
					}

					else if(curTime.getHours() == filters[3])	{
						//console.log("Outside Limit Meeting");
						if(compareDay(startMeetingTime, endMeetingTime) == -1){
								//console.log("Normal Meeting");
								meetingTimes.push(new Date(startMeetingTime.valueOf()));
								meetingTimes.push(new Date(endMeetingTime.valueOf()));
								//meetingTimes.push("Normal Meeting");
						}
						//meetingTimes.push("Outside limit");
						allCouldMeet = false;
						canMeet = false;
						duration = 0;
						if(curTime.getHours() >= filters[3])
						{
							//increments the time to the lower end of the filters and adds 24 hours so it's the next day. 
							curTime.setHours(filters[2] + 24);
						}
						
					}
					else {
						curTime = new Date(incrementTime(curTime));
						if(compareDay(curTime, filters[1]) > 0)
							{if(compareDay(startMeetingTime, endMeetingTime) == -1){
								//console.log("Normal Meeting");
								meetingTimes.push(new Date(startMeetingTime.valueOf()));
								meetingTimes.push(new Date(endMeetingTime.valueOf()));
								//meetingTimes.push("Normal Meeting");
							}
						allCouldMeet = false;
						canMeet = false;
						duration = 0;
						}
					}
					duration++;
				}
							
			}
			curTime = new Date(incrementTime(curTime));
			
		}
		return meetingTimes;
}
