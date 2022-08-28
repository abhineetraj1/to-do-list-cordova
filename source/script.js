function add() {
	document.body.innerHTML = document.body.innerHTML + '<div id="task-add"><p class="task-p">What is your task?</p><input type="text" class="task-inp"><p class="task-p">Your deadline</p><input type="date" class="task-inp"><br><br><button onclick="setDetails()" class="task-btn">add</button><a href="main.html"><button  class="task-btn">Cancel</button></a></div>';
}

if (localStorage.getItem("task") ==  null) {
	document.getElementById("note").innerHTML="<center>--No task available--</center>"
} else {
	var t = localStorage.task.split("]+[");
	var n = 0;
	while (n < t.length) {
		if (t[n].length > 1) {
			var f = JSON.parse(t[n]);
			document.getElementById("note").innerHTML= document.getElementById("note").innerHTML + '<div class="note-div"><div class="note-date">'+ date_con(f.deadline) +'<img class="note-img" onclick="bin('+n+')" src="images/trash.png"></div><textarea class="note-txt" readonly>'+f.task+'</textarea></div>';
		}
		n=n+1;
	}
}
function setDetails() {
	var jD = {"task":document.getElementsByClassName('task-inp')[0].value,"deadline":document.getElementsByClassName('task-inp')[1].value};
	if (jD["deadline"] == "") {
		alert("Enter deadline");
		jD = null;
	} else {
		if (localStorage.getItem("task") == null) {
			localStorage.setItem("task",JSON.stringify(jD))
		} else {
			var m = JSON.stringify(jD);
			var k = localStorage.getItem("task") + "]+[" + m;
			localStorage.setItem("task",k);
		}
		window.location.href = window.location.href;
	}
}
function alert(msg) {
	document.body.innerHTML = document.body.innerHTML + '<div id="alert"><p id="alert-txt">'+msg+'</p><button id="alert-btn" onclick="removeAlert()">Ok</button></div>';
}

function removeAlert() {
	document.getElementById("alert").remove();
}

function bin(n) {
	var t = localStorage.task.split("]+[");
	t.splice(n,1);
	var n = 0;
	var g="";
	while (n < t.length) {
		g = g + t[n] + "]+[";
		n=n+1;
	}
	if (g == "") {
		localStorage.removeItem("task");
	} else {
		localStorage.setItem("task", g);
	}
	window.location.href = window.location.href;
}
function date_con(s) {
	month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	return String(s.split("-")[2]+" "+ month[parseInt(s.split("-")[1]) - 1]+", " +s.split("-")[0]);
}