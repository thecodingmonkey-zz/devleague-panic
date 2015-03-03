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
  this.left = 0;

  this.docElement = null;

  this.assigned = null;
}

WorkTask.prototype.doTick = function(delay) {
//  console.log(delay, this.secondsLeft);

  if (this.assigned !== null) {
    this.frontend_left -= this.assigned.frontend * delay/1000;
    this.backend_left  -= this.assigned.backend * delay/1000;

    this.frontend_left = this.frontend_left > 0 ? this.frontend_left : 0;
    this.backend_left = this.backend_left > 0 ? this.backend_left : 0;
  }
  this.secondsLeft = this.secondsLeft - delay/1000.0;

};

