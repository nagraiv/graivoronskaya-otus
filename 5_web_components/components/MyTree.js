import {LitElement, html} from 'https://cdn.skypack.dev/lit?min';
// import {LitElement, html} from 'lit';

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

window.customElements.define('my-tree', MyTree);
