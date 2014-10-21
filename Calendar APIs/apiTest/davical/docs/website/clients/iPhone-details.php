<h1>iPhone</h1>
<p>The Apple <a href="http://www.apple.com/iphone/">iPhone</a>, from OS version 3.0 is generally well-behaved
  and will discover your own calendars when configured.  It will not allow you to manipulate other calendars on
  the same server, however, unless you use different credentials to access them.</p>

<ol>
  <li>Open "Settings", "Mail, Contacts, Calendars" and choose "Add Account".</li>
  <li>Choose "Other" and "Add CalDAV Account".</li>
  <li>Fill in the fields with your server name, username &amp; password.  The description can be anything.</li>
  <li>Press the "Next" button at top-right.</li>
  <li>At this point you may get an error message about SSL connection not available.  You should choose "Cancel", to get to the advanced settings slightly quicker.</li>
  <li>Open the "Advanced Settings" area and choose whether SSL is on or off, and enter the port number (80 is standard for http &amp; 443 is standard for https, but the iPhone wants to use 8008 &amp; 8443 for these)</li>
  <li>In the "Account URL" change "/principals/users/username" to "/caldav.php/username"</li>
  <li>Click on the "Caldav" top left to return to the basic settings and click on "Next" top right.</li></ol>

<h2>Other Settings</h2>
<p>You may want to go into some of the other settings under "Mail, Contacts, Calendars" and set some of the other settings, including:</p>
<ul>
<li>Fetch New Data</li>
<li>Time Zone Support</li>
<li>Default Calendar</li>
</ul>
<p>
All of these should be obvious.  You can choose the calendar which an event goes into
when you create the event, but if you want to move it to a different calendar you will
need to do it with a different client - it's not an option in Apple's one.
</p>
<p>Similarly, in the events the repeat frequencies are fairly limited, but the calendar
does support the more arcane possibilities which you could create with a different
client application.</p>

<h2>Screenshots</h2>
<table border="none" cellpadding="2" cellspacing="2">
<tr><td><img src="clients/iPhone-1.png" alt="Screenshot of setting up an account on an iPhone" /></td><td><img src="clients/iPhone-2.png" alt="Screenshot of setting up an account with adanced settings on an iPhone" /></td></tr>
<tr><td>Adding an Account</td><td>“Advanced Settings” will appear if service discovery is unavailable.</td></tr>
<tr><td><img src="clients/iPhone-3.png" alt="Screenshot of the advanced settings on an iPhone" /></td><td><img src="clients/iPhone-4.png" alt="Screenshot of common advanced settings on an iPhone" /></td></tr>
<tr><td>Security, port, and path</td><td>Typical settings for non-SSL, port 80 and 443 for SSL</td></tr>
</table>
