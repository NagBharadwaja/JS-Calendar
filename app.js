//use 'esversion: 6';

window.onload = () => {
	// Create a new date object
	var d = new Date();
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 
					  'July', 'August', 'September', 'October', 'November', 'December'];
	// Get  month
	var month = d.getMonth(); // returns 0-11: 0-Jan; 11-Dec
	var year = d.getFullYear(); // 2017

	render(month_name, month, year);

	var left = document.getElementById("left");
	var right = document.getElementById("right");

	/*left.onclick = (e) => {
		if(month === 0){
			month = 11;
			document.getElementById("calendar-month-year").innerHTML = "";
			document.getElementById("calendar-dates").innerHTML = "";
			render(month_name, month, year);
		}else{
			month--;
			document.getElementById("calendar-month-year").innerHTML = "";
			document.getElementById("calendar-dates").innerHTML = "";
			render(month_name, month, year);
		}
		//console.log("Previous month: ", month);
	};

	right.onclick = (e) => {
		if(month === 11){
			month = 0;
			document.getElementById("calendar-month-year").innerHTML = "";
			document.getElementById("calendar-dates").innerHTML = "";
			render(month_name, month, year);
		}else{
			month++;
			document.getElementById("calendar-month-year").innerHTML = "";
			document.getElementById("calendar-dates").innerHTML = "";
			render(month_name, month, year);
		}
		///console.log("Next month: ", month);
	};*/

	console.log("Current month: ", month);
};

var render = (month_name, month, year) => {
		// Get first date of  month
		var first_date = month_name[month] + " " + "1" + " " + year; // January 1 2017
		console.log("First date: ", first_date);

		var tmp = new Date(first_date).toDateString(); // Sun Jan 01 2017
		console.log("Tmp: ", tmp);

		// First three letters of  day
		var first_day = tmp.substring(0, 3); // Sun
		console.log("First day of January 2017: ", first_day);
		var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		// Index of first day in day_name array
		var dayNumber = day_name.indexOf(first_day); // 6
		console.log(" day index: ", dayNumber);

		// # of days in  month
		var numDays = new Date(year, month+1, 0).getDate();
		console.log("# of days in month: ", numDays);

		var calendar = get_calendar(dayNumber, numDays);
		console.log("CALENDAR: ", calendar);	

		document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
		document.getElementById("calendar-dates").appendChild(calendar);
	};

var get_calendar = (dayNumber, numDays) => {
	var table = document.createElement('table');
	
	// row for the day letters
	var tr = document.createElement('tr');	
	for(var c = 0; c<=6; c++){
		var td = document.createElement('td');
		td.innerHTML = "SMTWTFS"[c];
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// Create 2nd row (blank row)
	tr = document.createElement('tr');
	var c;
	for(c = 0; c<=6; c++){
		if(c == dayNumber){
			break;
		}
		var td = document.createElement('td');
		td.innerHTML = "";
		tr.appendChild(td);
	}

	var count = 1; // count for # of days printed
	for(;c <=6;c++){
			var td = document.createElement('td');
			td.setAttribute('id', 'date'+count);
			td.setAttribute('class', 'td-date');
			td.innerHTML = count;
			count++;
			td.onclick = (e) => {
				dateClicked(e);
			};
			var dateClicked = (e) => {
				let id = e.target.id;
				let elem = document.getElementById(id);
				let span = document.getElementsByClassName("close")[0];
				let modal = document.getElementById("myModal");
				console.log("SPAN: ", span);
				//console.log("Date clicked id: ", id);
				elem.onclick = (id)=>{
					modal.style.display = "block";
				};
				/*document.getElementById('close').onclick = () => {
					modal.style.display = "none";
				};*/
				console.log(document.getElementById('close'));
				window.onclick = (e) => {
					if(e.target == modal){
						modal.style.display = "none";
					}
				};
				document.getElementById(id).className = "highlightDate";
			};

			tr.appendChild(td);
			
	}
	console.log("Count days: ", count);
	table.appendChild(tr);

	// Rest of the rows
	for(var r=3; r<=7; r++){
		tr = document.createElement('tr');
		for(var c=0;c<=6;c++){
			if(count > numDays){
				table.appendChild(tr);
				return table;
			}
			var td = document.createElement('td');
			td.setAttribute('id', 'date'+count);
			td.setAttribute('class', 'td-date');			
			td.setAttribute('data-toggle', 'modal');
			td.setAttribute('data-target', '#myModal');
			td.innerHTML = count;
			td.onclick = (e) => {
				dateClicked(e);
			};
			count++;
			tr.appendChild(td);

			var dateClicked = (e) => {
				let id = e.target.id;
				let elem = document.getElementById(id);
				let span = document.getElementsByClassName("close")[0];
				let modal = document.getElementById("myModal");
				console.log("SPAN: ", span);
				//console.log("Date clicked id: ", id);
				elem.onclick = (id)=>{
					modal.style.display = "block";
				};
				span.onclick = () => {
					modal.style.display = "none";
				};
				console.log(document.getElementById('close'));
				window.onclick = (e) => {
					if(e.target == modal){
						modal.style.display = "none";
					}
				};
				document.getElementById(id).className = "highlightDate";
			};
		}
		table.appendChild(tr);
	}

	return table;

};