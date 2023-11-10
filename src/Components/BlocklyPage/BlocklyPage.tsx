import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './blocklyPage.css'
import ControlGroup from '../BlockGroups/Control/ControlGroup';
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

  // const saveWorkspace = () => {
  //   const xml = Blockly.Xml.workspaceToDom(workspace.current);
  //   const xmlText = Blockly.Xml.domToText(xml);
  //   localStorage.setItem('blocklyWorkspace', xmlText);
  //   alert('Workspace saved!');
  // };

  // const loadWorkspace = () => {
  //   const xmlText = localStorage.getItem('blocklyWorkspace');
  //   if (xmlText) {
  //     const xml = Blockly.Xml.textToDom(xmlText);
  //     Blockly.Xml.domToWorkspace(xml, workspace.current);
  //     alert('Workspace loaded!');
  //   } else {
  //     alert('No saved workspace found.');
  //   }
  // };

  useEffect(() => {
    if (blocklyDiv.current) {
      const customTheme = Blockly.Theme.defineTheme('customTheme', {
        'base': Blockly.Themes.Classic,
        'blockStyles': {
          'variable_blocks': {
            colourPrimary: "#ff8c1b",
            colourSecondary: "#ff8c1b",
            colourTertiary: "#ff8c1b"
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
            colourPrimary: "#a82a20",
            colourSecondary: "#a82a20",
            colourTertiary: "#a82a20"
          },
          'math_blocks': {
            colourPrimary: "#0079c1",
            colourSecondary: "#0079c1",
            colourTertiary: "#0079c1"
          },
          'loop_blocks': {
            colourPrimary: "#2e9340",
            colourSecondary: "#2e9340",
            colourTertiary: "#2e9340"
          },
          
          
        
        },
        name:'a'
      });

      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          "kind": "categoryToolbox",
          "contents": [
            ControlGroup(),
            LogicGroup(),
            MathGroup(),
            LoopGroup(),
            FunctionGroup(),
            TextGroup(),
            VariablesGroup(),
            ListGroup()
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
      <div ref={blocklyDiv} id="blocklyDivs" style={{ height:'93vh'}}>
      </div>
    </div>
  );
}

export default BlocklyPage;
