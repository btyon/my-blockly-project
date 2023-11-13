import React from 'react';
import * as Blockly from 'blockly';

const MathGroup = () => {
  return {
    "kind": "category",
    "name": "Math",
    "colour":"#00b5d0",
    "contents": [
        {
            "kind": "block",
            "type": "math_random_int"
        },
        {
            "kind": "block",
            "type": "math_random_float"
        },
        {
            "kind": "block",
            "type": "math_round"
        },
        {
            "kind": "block",
            "type": "math_constant"
        },
        {
            "kind": "block",
            "type": "math_trig"
        },
        {
            "kind": "block",
            "type": "math_single"
        },
        {
            "kind": "block",
            "type": "math_arithmetic"
        },
        {
            "kind": "block",
            "type": "math_number"
        },
    ]
  };
};

export default MathGroup;