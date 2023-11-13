import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './blocklyPage.css'
import LogicGroup from '../BlockGroups/Logic/LogicGroup';
import MathGroup from '../BlockGroups/Math/MathGroup';
import LoopGroup from '../BlockGroups/Loop/LoopGroup';
import FunctionGroup from '../BlockGroups/Function/FunctionGroup';
import TextGroup from '../BlockGroups/Text/TextGroup';
import VariablesGroup from '../BlockGroups/Variables/VariablesGroup';
import ListGroup from '../BlockGroups/List/ListGroup';



const BlocklyPage: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg>();

  const getWorkspaceAsJson = () => {
    const blocks = workspace.current.getAllBlocks(false);
    const blocksData = blocks.map(block => {
      return {
        type: block.type,
        id: block.id,
        x: block.getRelativeToSurfaceXY().x,
        y: block.getRelativeToSurfaceXY().y
      };
    });

    return JSON.stringify(blocksData, null, 2);
  };
  const triggerDownload = (content, fileName) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };


  const saveWorkspaceAsJson = () => {
    const jsonString = getWorkspaceAsJson();
    triggerDownload(jsonString, 'blockly_workspace.json');
  };


  useEffect(() => {
    if (blocklyDiv.current) {
      const customTheme = Blockly.Theme.defineTheme('customTheme', {
        'base': Blockly.Themes.Classic,
        'blockStyles': {
          'variable_blocks': {
            colourPrimary: "#e67200",
            colourSecondary: "#e67200",
            colourTertiary: "#e67200"
          },
          'text_blocks': {
            colourPrimary: "#52007f",
            colourSecondary: "#52007f",
            colourTertiary: "#52007f"
          },
          'list_blocks': {
            colourPrimary: "#00677d",
            colourSecondary: "#00677d",
            colourTertiary: "#00677d"
          },
          'logic_blocks': {
            colourPrimary: "#cbacff",
            colourSecondary: "#cbacff",
            colourTertiary: "#cbacff"
          },
          'math_blocks': {
            colourPrimary: "#00b5d0",
            colourSecondary: "#00b5d0",
            colourTertiary: "#00b5d0"
          },
          'loop_blocks': {
            colourPrimary: "#c5c341",
            colourSecondary: "#c5c341",
            colourTertiary: "#c5c341"
          },
        },
        name: 'a'
      });

      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          "kind": "categoryToolbox",
          "contents": [
            LogicGroup(),
            MathGroup(),
            LoopGroup(),
            FunctionGroup(),
            TextGroup(),
            VariablesGroup(),
            ListGroup(),
          ]
        },
        grid: {
          spacing: 15,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
        theme: customTheme,
      });
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);


  
  return (
    <div className="App">
      <div ref={blocklyDiv} id="blocklyDivs" style={{ height: '93vh' }}>
        <button onClick={saveWorkspaceAsJson}>asdsd</button>
      </div>
    </div>
  );
}

export default BlocklyPage;
