import FoxTail from '../lib/foxtail';
let fox = new FoxTail('list', {list_id: 106243757, count: 10});
import Path from 'path';

fox.load(Path.resolve(__dirname, 'plugin'));
fox.run();
