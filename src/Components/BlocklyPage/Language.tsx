import React, { useRef, useEffect, useContext } from 'react';
import * as Blockly from 'blockly';
import BlocklyContext from './BlocklyContext';
import { formulaGenerator } from '../../Grammar/generator';
export default function Language() {
    const blocklyData = useContext(BlocklyContext);

    useEffect(() => {
        console.log(blocklyData,"ıkojoşp")
        if (typeof Blockly.MyLanguage === 'undefined') {
            Blockly.MyLanguage = {};
        }

    }, [])

    const deneme = () => {
        Blockly.MyLanguage['controls_if'] = kek();

    }

    const kek = (block) => {
        var condition = Blockly.MyLanguage.valueToCode(block, 'IF0', Blockly.MyLanguage.ORDER_NONE) || 'false';
        var branch = Blockly.MyLanguage.statementToCode(block, 'DO0') || Blockly.MyLanguage.PASS;
        var code = 'if (' + condition + ') {\n' + branch + '}';
        console.log("ssss", code)
        return code;
    };


    return (
        <div>
            <h2>Language Component</h2>
            {/* Burada blocklyData kullanılabilir */}
            <p>Blokların Bilgisi: {JSON.stringify(blocklyData)}</p>
        </div>
    )
}
