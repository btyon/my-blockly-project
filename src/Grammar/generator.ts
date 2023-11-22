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
formulaGenerator.forBlock['controls_if'] = function (block) {
    let code = 'if (';
    const conditionBlock = block.getInputTargetBlock('IF0');

    if (conditionBlock) {
        const [conditionCode] = formulaGenerator.forBlock[conditionBlock.type](conditionBlock);
        code += conditionCode;
    }

    code += ') {\n';

    const doCodeBlocks = [];

    const doBlock = block.getInputTargetBlock('DO');
    if (doBlock) {
        const [doCode] = formulaGenerator.forBlock[doBlock.type](doBlock);
        doCodeBlocks.push(doCode);
    }

    if (doCodeBlocks.length > 0) {
        code += doCodeBlocks.join('\n');
    }

    code += '\n}';

    const elseBlock = block.getInputTargetBlock('ELSE0');
    if (elseBlock) {
        code += ` else {\n`;
        const [elseCode] = formulaGenerator.forBlock[elseBlock.type](elseBlock);
        code += elseCode;
        code += `\n}`;
    }
    console.log(code);

    return [code, formulaGenerator.ORDER_NONE];
};

//oldu
formulaGenerator.forBlock['math_number'] = function (block) {
    const value = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(value)) {
        return ['0', formulaGenerator.ORDER_ATOMIC];
    }
    else {
        return [value.toString(), formulaGenerator.ORDER_ATOMIC];
    }
};

//oldu
formulaGenerator.forBlock['math_arithmetic'] = function (block) {
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
        case 'ADD':
            operatorCode = '+';
            break;
        case 'MINUS':
            operatorCode = '-';
            break;
        case 'MULTIPLY':
            operatorCode = '*';
            break;
        case 'DIVIDE':
            operatorCode = '/';
            break;
        case 'POWER':
            operatorCode = '**';
            break;
        default:
            operatorCode = '+';
    }

    const code = `(${codeA} ${operatorCode} ${codeB})`;
    console.log(code);

    return [code, formulaGenerator.ORDER_ATOMIC];
};

//oldu
formulaGenerator.forBlock['math_single'] = function (block) {
    const operator = block.getFieldValue('OP');
    const valueBlock = block.getInputTargetBlock('NUM');

    let code = '';
    let mathFunction = '';

    if (valueBlock) {
        [code] = formulaGenerator.forBlock[valueBlock.type](valueBlock);
    }

    switch (operator) {
        case 'ROOT':
            mathFunction = 'Math.sqrt';
            break;
        case 'ABS':
            mathFunction = 'Math.abs';
            break;
        case 'NEG':
            mathFunction = '-';
            break;
        default:
            // Varsayılan olarak herhangi bir işlem yapma
            mathFunction = '';
    }

    if (mathFunction) {
        code = `${mathFunction}(${code})`;
    }
    console.log(code);

    return [code, formulaGenerator.ORDER_FUNCTION_CALL];
};

//oldu
formulaGenerator.forBlock['math_trig'] = function (block) {
    const operator = block.getFieldValue('OP');
    const valueBlock = block.getInputTargetBlock('NUM');

    let code = '';
    let mathFunction = '';

    if (valueBlock) {
        [code] = formulaGenerator.forBlock[valueBlock.type](valueBlock);
    }

    switch (operator) {
        case 'SIN':
            mathFunction = 'Math.sin';
            break;
        case 'COS':
            mathFunction = 'Math.cos';
            break;
        case 'TAN':
            mathFunction = 'Math.tan';
            break;
        case 'ASIN':
            mathFunction = 'Math.asin';
            break;
        case 'ACOS':
            mathFunction = 'Math.acos';
            break;
        case 'ATAN':
            mathFunction = 'Math.atan';
            break;
        default:
            mathFunction = '';
    }

    if (mathFunction) {
        code = `${mathFunction}(${code})`;
    }
    console.log(code)
    return [code, formulaGenerator.ORDER_FUNCTION_CALL];
};

//işlem içine koyunca cortluyo 
formulaGenerator.forBlock['math_constant'] = function (block) {
    const constantValue = block.getFieldValue('CONSTANT');

    let code = '';

    switch (constantValue) {
        case 'PI':
            code = 'Math.PI';
            break;
        case 'E':
            code = 'Math.E';
            break;
        case 'SQRT2':
            code = 'Math.sqrt(2)';
            break;
        case 'SQRT1_2':
            code = 'Math.sqrt(1/2)';
            break;
        case 'INFINITY':
            code = 'Infinity';
            break;
        default:
            code = '0';
            break;
    }
    console.log(code);

    return [code, formulaGenerator.ORDER_ATOMIC];
};

//DİKKAT GERİ DÖN!!
formulaGenerator.forBlock['math_random_int'] = function (block) {
    const minBlock = block.getInputTargetBlock('MIN');
    const maxBlock = block.getInputTargetBlock('MAX');

    let minCode;
    let maxCode;
    debugger;
    [minCode] = formulaGenerator.forBlock[minBlock.type](minBlock);
    [maxCode] = formulaGenerator.forBlock[maxBlock.type](maxBlock);

    const code = `Math.floor(Math.random() * (${maxCode} - ${minCode} + 1)) + ${minCode}`;
    console.log(code);

    return [code, formulaGenerator.ORDER_HIGH];
};

//oldu
formulaGenerator.forBlock['controls_repeat_ext'] = function (block) {
    debugger;
    const timesInput = block.getInputTargetBlock('TIMES');
    const times = timesInput ? timesInput.getFieldValue('NUM') : '0';
    const branch = formulaGenerator.statementToCode(block, 'DO');
    const code = `özel_dil_for_döngüsü(${times}) {\n${branch}}\n`;
    return [code, formulaGenerator.ORDER_NONE];
};

//değeri false alıyo her türlü ve do yu okumuyopr
// formulaGenerator.forBlock['controls_whileUntil'] = function(block) {
//     const mode = block.getFieldValue('MODE'); // "WHILE" veya "UNTIL" değerini alır
//     const conditionBlock = block.getInputTargetBlock('BOOL');
//     // conditionBlock referansını doğru bir şekilde kullanın
//     const conditionCode = conditionBlock ? formulaGenerator.valueToCode(conditionBlock, 'BOOL', formulaGenerator.ORDER_ATOMIC) : 'false';
//     const branch = formulaGenerator.statementToCode(block, 'DO');
//     const dowhileCode = mode === 'UNTIL' ? `!(${conditionCode})` : conditionCode;
//     const code = `özel_dil_while_döngüsü(${dowhileCode}) {\n${branch}}\n`;
//     console.log(code, "lollo");

//     return [code, formulaGenerator.ORDER_NONE];
// };

