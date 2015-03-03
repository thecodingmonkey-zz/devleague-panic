$(document).ready ( function() {
  $("#gameplay").hide(true);
  $("#button_start").click();

  $("#button_start").click( function() {
    $("#game_setup").hide(true);
    $("#gameplay").show(false);

    gameStart = true;
  });


  var score = 0;
  var difficulty = 100;

  var party = [];
  var tasks = [];

  var gameStart = false;

  var active_party = 1;

  party[0] = new PartyMember();
  party[0].name = 'Andrew';
  party[0].frontend = 50;
  party[0].backend = 200;
  party[0].pic = './assets/sloth.png';
  
  party[1] = new PartyMember();
  party[1].name = 'Jackie';
  party[1].frontend = 200;
  party[1].backend = 150;
  party[1].pic = './assets/squid.png';
  
  party[2] = new PartyMember();
  party[2].name = 'Jon';
  party[2].frontend = 100;
  party[2].backend = 150;
  party[2].pic = './assets/turtle.png';
  
  party[3] = new PartyMember();
  party[3].name = 'Kelli';
  party[3].frontend = 250;
  party[3].backend = 10;
  party[3].pic = './assets/seal.png';

  renderPartyMember("party_member_1", party[0]);
  renderPartyMember("party_member_2", party[1]);
  renderPartyMember("party_member_3", party[2]);
  renderPartyMember("party_member_4", party[3]);

  function renderPartyMember(pageId, partyMember) {
    var target = $("#" + pageId);

    var nameTxt = $("<h2>");
    nameTxt.html(partyMember.name);
    target.empty();
    target.css("background-image", "url(" + partyMember.pic + ")");

    target.append(nameTxt);
  }

  var gameDelay = 200;
  var deadlineY = 1000;
  gameLoop(gameDelay);

  function gameLoop(delay) {
    if (gameStart === false) {
      window.setTimeout(function() { gameLoop(1000); }, 1000);
      return;
    }

    renderTasks(delay);

    $(".party").css("border", "5px solid black");
    $($(".party")[active_party-1]).css("border", "5px solid red");    

    deadlineY = $("#deadline").offset().top;
    window.setTimeout(function() { gameLoop(gameDelay); }, gameDelay);

  }

  function makeTaskWave(difficulty, num) {
    var i;

    for(i=0; i<num; i++) {
      var share1 = Math.random();
      var share2 = 1 - share1;

      var fe, be;
      var total = Math.pow(difficulty, 2);
      fe = Math.sqrt(total * share1);
      be = Math.sqrt(total * share2);

      makeTask("Task", fe, be, 30, difficulty, i, "");
    }

  }

  makeTaskWave(1000, 4);

  function makeTask(name, frontend, backend, time, reward, leftPos, pic) {
    var newItem = new WorkTask();

    newItem.name = name;
    newItem.frontend = frontend;
    newItem.frontend_left = frontend;
    newItem.backend = backend;
    newItem.backend_left = backend;
    newItem.secondsLeft = time;
    newItem.secondsTotal = time;
    newItem.reward = reward;
    newItem.pic = pic;
    newItem.left = 300 + 110 * leftPos;

    tasks.push(newItem);
  }


  function renderTask(task, delay) {
    var result;
    if (task.docElement) {
      result = task.docElement;
    }
    else {
      result = $("<div>");
      result.addClass("task");
      $("#tasks").append(result);
      task.docElement = result;
    }


    var tmp;

    result.width(100);
    result.height(100);
    result.css("background-color", "red");
    result.css("top", 
      (1 - task.secondsLeft / task.secondsTotal) * deadlineY -
        result.height()

      );
    result.css("left", task.left);

    result.html('' + task.frontend_left + ' - ' +
        task.backend_left);

    // mousedown instead of click, to trigger more easily
    result.on("mousedown", function(event) {
      task.assigned = party[active_party-1];
      party[active_party-1].assignedTask = 
        tasks.indexOf(task);
//        $.grep(tasks, function(e) { return task === e; });

      //tasks.find(task);
    });

    return result;
  }

  function renderTasks(delay) {

    party.forEach(function(val, idx) {
      val.doWork(delay, tasks);
    });

    tasks.forEach(function(val, idx) {
      if (val === null) {
        return;
      }

      val.doTick(delay);
      renderTask(val, delay);

      if (val.isDone() ) {
        val.docElement.hide();
        val.docElement.remove();
        val = null;
      }
    });

  }

  $(document).keypress(function(event) {
    if (event.which >= 49 && event.which <= 52) {
      active_party = event.which - 48;
    }

  });

});