function PartyMember() {
  this.name = "Coder";
  this.frontend = 0;
  this.backend = 0;
  this.pic = "assets/seal.png";

  this.special = function() {};
}

function WorkTask() {
  this.name = "Work";
  this.frontend_left = 1;
  this.frontend = 100;
  this.backend_left = 1;
  this.backend = 100;

  this.secondsLeft = 100;
  this.secondsTotal = 100;

  this.reward = 10;
  this.pic = "";

  this.assigned = null;
}

WorkTask.prototype.doTick = function() {
  if (this.assigned !== null) {
    this.frontend_left -= this.assigned.frontend;
    this.backend_left  -= this.assigned.backend;
  }
  this.secondsLeft--;
};