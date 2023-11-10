import React from 'react';
import * as Blockly from 'blockly';

const ListGroup = () => {
  return {
    "kind": "category",
    "name": "List",
    "colour": "#00677d",
    "contents": [
        {
            "kind": "block",
            "type": "lists_create_empty",
        },
        {
            "kind": "block",
            "type": "lists_create_with"
        },
        {
            "kind": "block",
            "type": "lists_repeat"
        },
        {
            "kind": "block",
            "type": "lists_length"
        },
        {
            "kind": "block",
            "type": "lists_isEmpty"
        },
        {
            "kind": "block",
            "type": "lists_indexOf"
        },
        {
            "kind": "block",
            "type": "lists_getIndex"
        },
        
        {
            "kind": "block",
            "type": "lists_setIndex"
        },
        {
            "kind": "block",
            "type": "lists_getSublist"
        },
        {
            "kind": "block",
            "type": "lists_split"
        },
        {
            "kind": "block",
            "type": "lists_sort"
        },
        
    ]
  };
};

export default ListGroup;