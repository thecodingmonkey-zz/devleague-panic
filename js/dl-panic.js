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
  
  party[1] = new PartyMember();
  party[1].name = 'Jackie';
  party[1].frontend = 200;
  party[1].backend = 150;
  
  party[2] = new PartyMember();
  party[2].name = 'Jon';
  party[2].frontend = 100;
  party[2].backend = 150;
  
  party[3] = new PartyMember();
  party[3].name = 'Kelli';
  party[3].frontend = 250;
  party[3].backend = 10;

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

  var gameDelay = 100;
  var deadlineY = 1000;
  gameLoop(gameDelay);

  function gameLoop(delay) {
    if (gameStart === false) {
      window.setTimeout(function() { gameLoop(1000); }, 1000);
      return;
    }

    console.log('ping');
    renderTasks(delay);

    $(".party").css("border", "5px solid black");
    $($(".party")[active_party-1]).css("border", "5px solid red");    

    deadlineY = $("#deadline").offset().top;
    window.setTimeout(function() { gameLoop(gameDelay); }, gameDelay);

  }

  tasks[0] = new WorkTask();
  tasks[0].name = "PixelPainter";
  tasks[0].frontend_left = 500;
  tasks[0].frontend = 500;
  tasks[0].backend_left = 500;
  tasks[0].backend = 500;
  tasks[0].secondsLeft = 100;
  tasks[0].secondsTotal = 120;
  tasks[0].reward = 10;
  tasks[0].pic = "";

  function renderTask(task, delay) {
    var result = $("<div>");
    result.addClass("task");

    var tmp;

    result.width(100);
    result.height(100);
    result.css("background-color", "red");
    result.css("top", 
      (1 - task.secondsLeft / task.secondsTotal) * deadlineY -
        result.height()

      );
    result.css("left", "300");

    result.html('' + task.frontend_left + ' - ' +
        task.backend_left);

    result.click(function() {
      task.assigned = party[active_party-1];
    });

    return result;
  }

  function renderTasks(delay) {
    $(".task").remove();

    tasks.forEach(function(val, idx) {
      val.doTick(delay);
      $("#tasks").append(renderTask(val, delay));
    });

  }

  $(document).keypress(function(event) {
    if (event.which >= 49 && event.which <= 52) {
      active_party = event.which - 48;
    }

  });

});