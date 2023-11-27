// import { LitElement, css, html } from 'https://cdn.skypack.dev/lit?min';
import {html, LitElement} from 'lit';

export class MyLeaf extends LitElement {
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

