import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './App.css';

const App: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg>();

  useEffect(() => {
   if (blocklyDiv.current) {
  workspace.current = Blockly.inject(blocklyDiv.current, {
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'math_number',
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
        },
        {
          kind: 'block',
          type: 'text',
        },
        {
          kind: 'block',
          type: 'text_print',
        },
        {
          kind: 'block',
          type: 'lists_create_with',
        },
        {
          kind: 'block',
          type: 'lists_repeat',
        },
        {
          kind: 'block',
          type: 'colour_picker',
        },
        {
          kind: 'block',
          type: 'colour_random',
        },
        {
          kind: 'block',
          type: 'colour_rgb',
        },
        {
          kind: 'block',
          type: 'variables_set',
        },
        {
          kind: 'block',
          type: 'variables_get',
        },
        {
          kind: 'block',
          type: 'math_random_int',
        },
        {
          kind: 'block',
          type: 'logic_null',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        }
      ],
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
      <div ref={blocklyDiv} id="blocklyDiv" style={{ height: '98vh', width: '198vh' }}></div>
    </div>
  );
}

export default App;
