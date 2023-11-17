import * as Blockly from 'blockly';
import { Order } from './formula';
export const formulaGenerator = new Blockly.Generator('formula');

//oldu
formulaGenerator.forBlock['variables_get'] = function (block) {
    const variableName = block.getField("VAR")?.variable?.name;
    const code = `${variableName}`;
    return [code, Order.ATOMIC];
};
//oldu
formulaGenerator.forBlock['variables_set'] = function (block) {
    const variableName = block.getField("VAR")?.variable?.name;
    let valueCode = '';
    const valueBlock = block.getInputTargetBlock("VALUE");
    if (valueBlock) {
        [valueCode] = formulaGenerator.forBlock[valueBlock.type](valueBlock);
    }
    const code = `&${variableName} = ${valueCode}\n`;
    return code;
};
//oldu
formulaGenerator.forBlock['text'] = function (block) {
    const textValue = block.getFieldValue('TEXT');
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
};
//oldu
formulaGenerator.forBlock['text_print'] = function (block) {
    let valueCode = '';
    const valueBlock = block.getInputTargetBlock("TEXT");
    if (valueBlock) {
        [valueCode] = formulaGenerator.forBlock[valueBlock.type](valueBlock);
    }
    const code = `console.log(${valueCode});`;
    return code;
};

//oldu
formulaGenerator.forBlock['logic_compare'] = function (block) {
    const leftValueBlock = block.getInputTargetBlock("A");
    const rightValueBlock = block.getInputTargetBlock("B");

    let leftCode = '';
    let rightCode = '';

    if (leftValueBlock && rightValueBlock) {
        [leftCode] = formulaGenerator.forBlock[leftValueBlock.type](leftValueBlock);
        [rightCode] = formulaGenerator.forBlock[rightValueBlock.type](rightValueBlock);
    }
    const operator = block.getFieldValue('OP');
    let operatorCode = '';
    switch (operator) {
        case 'EQ':
            operatorCode = '===';
            break;
        case 'NEQ':
            operatorCode = '!==';
            break;
        case 'LT':
            operatorCode = '<';
            break;
        case 'LTE':
            operatorCode = '<=';
            break;
        case 'GT':
            operatorCode = '>';
            break;
        case 'GTE':
            operatorCode = '>=';
            break;
        default:
            operatorCode = '===';
    }
    const code = `${leftCode} ${operatorCode} ${rightCode} ;`;
    return [code, Order.ATOMIC];
};

//oldu
formulaGenerator.forBlock['logic_operation'] = function (block) {
    const operator = block.getFieldValue('OP');
    const valueBlockA = block.getInputTargetBlock('A');
    const valueBlockB = block.getInputTargetBlock('B');

    let codeA = '';
    let codeB = '';

    if (valueBlockA && valueBlockB) {
        [codeA] = formulaGenerator.forBlock[valueBlockA.type](valueBlockA);
        [codeB] = formulaGenerator.forBlock[valueBlockB.type](valueBlockB);
    }

    let operatorCode = '';

    switch (operator) {
        case 'AND':
            operatorCode = '&&';
            break;
        case 'OR':
            operatorCode = '||';
            break;
        default:
            operatorCode = '&&';
    }

    const code = `${codeA} ${operatorCode} ${codeB};`;
    return [code, Order.ATOMIC];
};

//oldu
formulaGenerator.forBlock['logic_boolean'] = function (block) {
    const value = block.getFieldValue("BOOL");
    const code = value === 'TRUE' ? 'true' : 'false'
    return [code, Order.ATOMIC]
};

//oldu
formulaGenerator.forBlock['logic_negate'] = function (block) {
    const valueBlock = block.getInputTargetBlock('BOOL');
    let code = '';
    if (valueBlock) {
        const [valueCode] = formulaGenerator.forBlock[valueBlock.type](valueBlock);
        code = `!${valueCode}`;
    }
    return [code, Order.ATOMIC];
}


//buna bakk if0 a girip do ya girmiyo
// formulaGenerator.forBlock['controls_if'] = function (block) {
//     debugger;
//     let code = 'if (';
//     const conditionBlock = block.getInputTargetBlock('IF0');

//     if (conditionBlock) {
//         const [conditionCode] = formulaGenerator.forBlock[conditionBlock.type](conditionBlock);
//         code += conditionCode;
//     }

//     code += ') {\n';

//     const doCodeBlocks = [];
//         const doBlock = block.getInputTargetBlock(0);
//         if (doBlock) {
//             const [doCode] = formulaGenerator.forBlock[doBlock.type](doBlock);
//             code += doCode; 
//         }
//         code += ')\n{\n';

//     if (doCodeBlocks.length > 0) {
//         code += doCodeBlocks.join('\n');
//         code += '\n'; 
//     }

//     code += '\n}';

//     const elseBlock = block.getInputTargetBlock('ELSE');
//     if (elseBlock) {
//         const [elseCode] = formulaGenerator.forBlock[elseBlock.type](elseBlock);
//         code += ` else {\n${elseCode}\n}`;
//     }

//     return [code];
// };
