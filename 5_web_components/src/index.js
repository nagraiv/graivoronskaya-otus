import {MyLeaf} from "./components/MyLeaf";
import {MyTree} from "./components/MyTree";
import data from './data.json'

window.customElements.define('my-leaf', MyLeaf);
window.customElements.define('my-tree', MyTree);

console.log(data);

