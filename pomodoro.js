$(document).ready(function () {
    'use strict';
    var currentsessionseconds, totalsessionseconds, currentbreakseconds, totalbreakseconds, controller = false, interval, seconds = 0, sessionmin = 5, sessionmin2 = 5, breakmin = 5, breakmin2 = 5,
        sound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    //currentsessionseconds, totalsessionseconds, currentbreakseconds, and totalbreakseconds are for the css transition
    
    function settime(time, math) {
        if (time === 1 && math === -1) {
            time = 99;
        } else if (time === 99 && math === 1) {
            time = 1;
        } else {
            time += math;
        }
        return time;
    } //end settime()

    function runsession() {
        if (currentsessionseconds === 1) {
            sound.play();
        }
        currentsessionseconds--;
        $(".progress").css("top", (currentsessionseconds / totalsessionseconds * 200) - 81 + "px");
        $(".mode").html("GO!");
        if (seconds > 10) {
            seconds -= 1;
            $(".clock").html(sessionmin + ":" + seconds);
        } else if (seconds > 0) {
            seconds -= 1;
            $(".clock").html(sessionmin + ":0" + seconds);
        } else if (seconds === 0 && sessionmin > 0) {
            seconds = 59;
            sessionmin -= 1;
            $(".clock").html(sessionmin + ":" + seconds);
        } else { //seconds === 0 && minutes === 0)
            currentsessionseconds = totalsessionseconds;
            $(".progress").css("background-color", "white");
            clearInterval(interval);
            seconds = 0;
            sessionmin = sessionmin2;
            runbreak();
            interval = setInterval(runbreak, 1000);
        }
    } //end runsession()
    
    function runbreak() {
        if (currentbreakseconds === 1) {
            sound.play();
        }
        currentbreakseconds--;
        $(".progress").css("top", (currentbreakseconds / totalbreakseconds * 200) - 81 + "px");
        $(".mode").html("Break");
        if (seconds > 10) {
            seconds -= 1;
            $(".clock").html(breakmin + ":" + seconds);
        } else if (seconds > 0) {
            seconds -= 1;
            $(".clock").html(breakmin + ":0" + seconds);
        } else if (seconds === 0 && breakmin > 0) {
            seconds = 59;
            breakmin -= 1;
            $(".clock").html(breakmin + ":" + seconds);
        } else {//seconds === 0 && breakmin === 0)
            currentbreakseconds = totalbreakseconds;
            $(".progress").css("background-color", "#009900");
            clearInterval(interval);
            seconds = 0;
            breakmin = breakmin2;
            runsession();
            interval = setInterval(runsession, 1000);
        }
    } //end runbreak()
    
    $("#psessionmin").click(function () {
        if (!controller) {
            sessionmin = settime(sessionmin, 1);
            $("#smin").html(sessionmin);
            $(".clock").html(sessionmin + ":00");
        }
    }); //end $("#sessionmin").click
    
    $("#msessionmin").click(function () {
        if (!controller) {
            sessionmin = settime(sessionmin, -1);
            $("#smin").html(sessionmin);
            $(".clock").html(sessionmin + ":00");
        }
    }); //end $("#sessionmin").click
    
    $("#pbreakmin").click(function () {
        if (!controller) {
            breakmin = settime(breakmin, 1);
            $("#bmin").html(breakmin);
        }
    }); //end $("#breakmin").click
    
    $("#mbreakmin").click(function () {
        if (!controller) {
            breakmin = settime(breakmin, -1);
            $("#bmin").html(breakmin);
        }
    }); //end $("#breakmin").click
    
    $("#startpause").click(function () {
        if ($("#startpause").html() === "▶" && !controller) {
            $("#startpause").html("❚❚");
            $("#startpause").css("color", "#333");
            $(".mode").html("GO!");
            controller = true;
            seconds = 0;
            sessionmin2 = sessionmin;
            breakmin2 = breakmin;
            totalsessionseconds = sessionmin2 * 60;
            totalbreakseconds = breakmin2 * 60;
            currentsessionseconds = totalsessionseconds;
            currentbreakseconds = totalbreakseconds;
            runsession();
            interval = setInterval(runsession, 1000);
        } else if ($("#startpause").html() === "▶" && controller) {
            $("#startpause").html("❚❚");
            $("#startpause").css("color", "#333");
            $(".mode").html("GO!");
            runsession();
            interval = setInterval(runsession, 1000);
        } else { //#startpause === "❚❚"
            clearInterval(interval);
            $("#startpause").html("▶");
            $("#startpause").css("color", "#009900");
            $(".mode").html("PAUSE");
        }
    }); //end $("#startpause").click
    
    $("#stop").click(function () {
        $(".progress").css("background-color", "#009900");
        $(".progress").css("top", "119px");
        controller = false;
        $(".mode").html("STOP");
        $(".clock").html("5:00");
        clearInterval(interval);
        sessionmin = 5;
        breakmin = 5;
        $("#startpause").html("▶");
        $("#startpause").css("color", "#009900");
        $("#smin").html(sessionmin);
        $("#bmin").html(breakmin);
    }); //end $("stop").click
}); //end $(document).ready