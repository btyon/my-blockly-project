import React from 'react';
import * as Blockly from 'blockly';
import './textGroup.css'
const TextGroup = () => {
  return {
    "kind": "category",
    "name": "Text",
    "colour":"#52007f",
    "contents": [
        {
            "kind": "block",
            "type": "text",
        },
        {
            "kind": "block",
            "type": "text_join"
        },
        {
            "kind": "block",
            "type": "text_append"
        },
        {
            "kind": "block",
            "type": "text_length"
        },
        {
            "kind": "block",
            "type": "text_isEmpty"
        },
        {
            "kind": "block",
            "type": "text_indexOf"
        },
        {
            "kind": "block",
            "type": "text_charAt"
        },
        {
            "kind": "block",
            "type": "text_getSubstring"
        },
        {
            "kind": "block",
            "type": "text_changeCase"
        },
        {
            "kind": "block",
            "type": "text_trim"
        },
        {
            "kind": "block",
            "type": "text_print"
        },
    ]
  };
};

export default TextGroup;