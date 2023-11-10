import React from 'react';
import * as Blockly from 'blockly';

const LogicGroup = () => {
  return {
    "kind": "category",
    "name": "Logic",
    "colour":"#a82a20",
    "contents": [
        {
            "kind": "block",
            "type": "logic_compare"
        },
        {
            "kind": "block",
            "type": "logic_operation"
        },
        {
            "kind": "block",
            "type": "logic_boolean"
        },
        {
            "kind": "block",
            "type": "logic_negate"
        },
        {
            "kind": "block",
            "type": "logic_null"
        },
   
    ]
  };
};

export default LogicGroup;