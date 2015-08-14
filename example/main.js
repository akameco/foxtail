import FoxTail from '../lib/foxtail'

let fox = new FoxTail();

fox.add((res) => {
  let name = res.username;
  let screen_name = res.screen_name;
  let text = res.text;
  console.log(`@${screen_name}(${name}) ${text}\n`);
});

fox.run();
