import React from 'react';
import * as Blockly from 'blockly';
import './veriableGroup.css'
const VariablesGroup = () => {
  Blockly.Blocks['variables_set'].SetColour = "#ff8c1b"; // Yeni renk kodu

  return {
    "kind": "category",
    "name": "Variables",
    "colour": "#ff8c1b",
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