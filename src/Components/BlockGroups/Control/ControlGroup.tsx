
import React from 'react';
import * as Blockly from 'blockly';
const ControlGroup = () => {
  return {
    "kind": "category",
    "name": "Control",
    "colour": "#00ea23", // Renk kodunun başında # işareti olmalı
    "contents": [
      {
        "kind": "block",
        "type": "controls_if" // Bu type, tema tanımınızdaki stil adıyla eşleşmeli
      }
      // Diğer bloklarınız...
    ]
  };
};

export default ControlGroup;

