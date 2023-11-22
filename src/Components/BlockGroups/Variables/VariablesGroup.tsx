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
        "id":"aa"
      },
      {
        "kind": "block",
        "type": "variables_get",
        "id":"22"
      }

    ]
  };
};

export default VariablesGroup;