import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './blocklyPage.css'

const BlocklyPage: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg>();

  useEffect(() => {
   if (blocklyDiv.current) {
       workspace.current = Blockly.inject(blocklyDiv.current, {
           toolbox: {
               "kind": "categoryToolbox",
               "contents": [
                   {
                       "kind": "category",
                       "name": "Control",
                       "colour":"red",
                       "contents": [
                           {
                               "kind": "block",
                               "type": "controls_if"
                           },
                       ]
                   },
                   {
                       "kind": "category",
                       "name": "Logic",
                       "colour":"blue",
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
                           }
                       ]
                   }
               ]
           },
    grid: {
      spacing: 15,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
  });
}

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }};
  },[]);

  return (
    <div className="App">
      <div ref={blocklyDiv} id="blocklyDivs" style={{ height:'93vh' }}></div>
   

    </div>
  );
}

export default BlocklyPage;
