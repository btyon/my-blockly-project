import * as Blockly from 'blockly';
import { Order } from './formula';
export const formulaGenerator = new Blockly.Generator('formula');

formulaGenerator.forBlock['logic_compare'] = function kek(block, generator) {

    console.log(block,"block")
    console.log(generator,"genehbjlo")
    return 'cafer kod bloğu hehe';
}

formulaGenerator.forBlock['variables_get'] = function(block) {
    const variableName = block.getField("VAR")?.variable?.name;
    const code = `${variableName};`; 
    return [code, Order.ATOMIC];
};
formulaGenerator.forBlock['variables_set'] = function(block) {
    // console.log(block);
    // return "a"
    debugger;
     const variableName = block.getField("VALUE");
     const code = `&${variableName}`; 
     console.log(code);
     return code;
};