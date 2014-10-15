//Info for google developer console project
var clientId = "YOUR CLIENT ID";
var apiKey = "YOUR API KEY";
var scopes = 'https://www.googleapis.com/auth/calendar';

/*
 * Calendar object
 */
function calendar(id, summary) {
  this.id = id;
  this.summary = summary;
}

/*
 * Event object
 */
function event(id, summary, start, end) {
  this.id = id;
  this.summary = summary;
  this.start = start;
  this.end = end;
}

/*
 * Object to store a time period during which a user is busy
 */
function busy(start, end) {
  this.start = start;
  this.end = end;
}


/*
 * ---------------- User Authentication ----------------
 */
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

/*
 * -----------------------------------------------------
 */

/*
 * Return a list of all the user's Google calendars
 */
function getCalendarList() {
  gapi.client.load('calendar', 'v3', function() {
    var req = gapi.client.calendar.calendarList.list();
    var listCal = [];

    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        listCal.push(new calendar(resp.items[i].id, resp.items[i].summary));
      }
    });
  });

  return listCal;
}

/*
 * Return a single calendar
 */
function getCalendar(id) {
  gapi.client.load('calendar', 'v3', function() {
    var req = gapi.client.calendar.calendars.get();

    req.execute(function(resp) {
      var cal = new calendar(resp.items[i].id, resp.items[i].summary);
    });
  });

  return cal;
}

/*
 * Return a list of events in a specific calendar
 */
function getEvents(cal) {
  gapi.client.load('calendar', 'v3', function() {
    var req = gapi.client.calendar.events.list(cal);
    var listEv = [];

    req.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        listEv.push(new event(resp.items[i].id, resp.items[i].summary,
          resp.items[i].start.dateTime, resp.items[i].end.dateTime));
      }
    });
  });

  return listEv;
}

/*
 * Return a list containing busy times for one calendar
 */
function getFreeBusy(cal, start, end) {
  listBusy = [];

  gapi.client.load('calendar', 'v3', function() {
    var check = {
      items: [{id: cal.id}],
      timeMax: start,
      timeMin: end
    };
    var req = gapi.client.calendar.freebusy.query(check);

    req.execute(function(resp) {
      for (var i = 0; i < resp.calendars[cal.id].busy.length; i++) {
        listBusy.push(new busy(resp.calendars[cal.id].busy[i].start, resp.calendars[cal.id].busy[i].end));
      }
    });
  });

  return listBusy;
}

/*
 * Return a list containing busy times for all Google calendars
 */
function getAllFreeBusy(listCal, start, end) {
  var listBusy = [];
  for (c in listCal) {
    listBusy = listBusy.concat(getFreeBusy(c, start, end));
  }
  return listBusy;
}