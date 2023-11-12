import {LitElement, html} from 'https://cdn.skypack.dev/lit?min';
// import {LitElement, html} from 'lit';
// import { MyLeaf } from './MyLeaf';

class MyLeaf extends LitElement {
    static get properties()  {
        return {
            leaf: { type: String },
            subtree: { type: Object },
        };
    }

    constructor() {
        super();
        this.leaf = 'default value';
        this.subtree = [{}];
    }

    render() {
        return html`
    <li>${this.leaf}
        ${ this.subtree ? this.subtree.map( item => html`<my-tree .tree=${item}></my-tree>`) : '' }
    </li>
    `
    }
}

window.customElements.define('my-leaf', MyLeaf);


export class MyTree extends LitElement {
    static properties = {
        tree: {type: Object},
    };

    constructor(tree = {}, spaceFiller = '') {
        super();
        this.tree = {
            'id': 'level_1',
            'items': [
                { 'id': 'level_2', 'items': [
                        { 'id': 'level_3' },
                        { 'id': 'level_3', 'items': [
                                { 'id': 'level_4' },
                            ] },
                    ]},
                { 'id': 'level_2', },
                { 'id': 'level_2', 'items': [
                        { 'id': 'level_3' },
                        { 'id': 'level_3', 'items': [
                                { 'id': 'level_4', 'items': [
                                        { 'id': 'level_5' },
                                    ] },
                                { 'id': 'level_4' },
                                { 'id': 'level_4' },
                            ] },
                        { 'id': 'level_3', 'items': [
                                { 'id': 'level_4' },
                                { 'id': 'level_4' },
                            ] },
                        { 'id': 'level_3' },
                    ]},
            ],
        };
    }

    render() {
        const { id, items } = this.tree;
        return html`
          <ul>
            <my-leaf leaf=${id} .subtree=${items}></my-leaf>
          </ul>
        `;
    }
}

customElements.define('my-tree', MyTree);
