import React from 'react';
import * as Blockly from 'blockly';

const LoopGroup = () => {
  return {
    "kind": "category",
    "name": "Loop",
    "colour":"#2e9340",
    "contents": [
        {
            "kind": "block",
            "type": "controls_repeat_ext"
        },
        {
            "kind": "block",
            "type": "controls_whileUntil"
        },
        {
            "kind": "block",
            "type": "controls_for"
        },
        {
            "kind": "block",
            "type": "controls_forEach"
        },
        {
            "kind": "block",
            "type": "controls_flow_statements"
        },
        
    ]
  };
};

export default LoopGroup;