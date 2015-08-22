import FoxTail from '../lib/foxtail';
import Path from 'path';

let fox = new FoxTail();
fox.load(Path.resolve(__dirname, 'plugin'));
fox.run();
