var FoxTail = require('../lib/foxtail');
var fox = new FoxTail('public');

fox.add(function (res) {
  console.log("@" + res.screen_name + "(" + res.name + ") " + res.text + "\n");
});

fox.run();
