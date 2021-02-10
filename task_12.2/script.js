"use strict";

class Options {
    constructor(height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    createDiv(text) {
        let newDiv = document.createElement('div');

        newDiv.insertAdjacentText('beforeend', text);

        newDiv.style.cssText = `
        width: ${this.width}px;
        height: ${this.height}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;
        text-align: ${this.textAlign};
        `

        document.body.insertAdjacentElement('beforeend', newDiv);
    }
}

let obj = [600, 600, 'red', 14, 'center'];

let opt = new Options(...obj);

console.log(opt);

opt.createDiv('gbljh');