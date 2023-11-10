import React from 'react';
import * as Blockly from 'blockly';

const FunctionGroup = () => {
  return {
    "kind": "category",
    "name": "Function",
    "colour":"#00c3d5",
    "contents": [
        {
            "kind": "block",
            "type": "procedures_defnoreturn"
        },
        {
            "kind": "block",
            "type": "procedures_defreturn"

        },
        {
            "kind": "block",
            "type": "procedures_callnoreturn"
        },
        {
            "kind": "block",
            "type": "procedures_callreturn"
        },
        {
            "kind": "block",
            "type": "procedures_ifreturn"
        },
        {
            "kind": "block",
            "type": "procedures_mutatorcontainer"
        },
        {
            "kind": "block",
            "type": "procedures_mutatorarg"
        },
        
    ]
  };
};

export default FunctionGroup;