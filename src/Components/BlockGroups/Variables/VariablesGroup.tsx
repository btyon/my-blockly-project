import React from 'react';
import * as Blockly from 'blockly';
import './veriableGroup.css'

const VariablesGroup = () => {
  return {
    "kind": "category",
    "name": "Variables",
    "colour": "#e67200",
    "contents": [
      {
        "kind": "block",
        "type": "variables_set",
        "colour":"blue"
      },
      {
        "kind": "block",
        "type": "variables_get"
      }

    ]
  };
};

export default VariablesGroup;