import FoxTail from '../lib/foxtail';
import Path from 'path';

let fox = new FoxTail('list', {list_id: 106243757, count: 10});
fox.load(Path.resolve(__dirname, 'plugin'));
fox.run();
