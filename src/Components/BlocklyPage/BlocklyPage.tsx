import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import './blocklyPage.css';
import LogicGroup from '../BlockGroups/Logic/LogicGroup';
import MathGroup from '../BlockGroups/Math/MathGroup';
import LoopGroup from '../BlockGroups/Loop/LoopGroup';
import FunctionGroup from '../BlockGroups/Function/FunctionGroup';
import TextGroup from '../BlockGroups/Text/TextGroup';
import VariablesGroup from '../BlockGroups/Variables/VariablesGroup';
import ListGroup from '../BlockGroups/List/ListGroup';

import BlocklyContext from './BlocklyContext';
import { toolbox } from 'blockly/core/utils';
import { formulaGenerator } from '../../Grammar/generator';
import Navbar from '../Navbar/Navbar';

const BlocklyPage: React.FC = () => {
  const [blocklyData, setBlocklyData] = useState();
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg>();
  const [generatedCode, setGeneratedCode] = useState('');
  const fileInputRef = useRef(null);

  // const [scope,setScope]=useState("");
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
          'procedure_blocks': {
            colourPrimary: "#00c3d5",
            colourSecondary: "#00c3d5",
            colourTertiary: "#00c3d5"
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

      const onWorkspaceChange = (e) => {
        const code = formulaGenerator.workspaceToCode(workspace.current);
        const workspaceXml = Blockly.Xml.workspaceToDom(workspace.current);
        const savexml = Blockly.Xml.domToText(workspaceXml)
        console.log(savexml);
        var json = Blockly.serialization.workspaces.save(workspace.current);
        // console.log(json,'jsonn');
        console.log(code,"dende3neden");
        
        setGeneratedCode(code);
        // console.log(code, "KODE BURADA AYOL");
        //"logic_compare"
      }
      workspace.current.addChangeListener(onWorkspaceChange);
    }
    // if (typeof Blockly.MyLanguage === 'undefined') {
    //   Blockly.MyLanguage = {};
    //   const code = Blockly.MyLanguage.workspaceToCode(workspace.current);
    //   setBlocklyData(code);
    // }
    // debugger;


    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);


  const downloadXml = () => {
    const state = Blockly.serialization.workspaces.save(workspace.current);
    // const blob = new Blob([state], { type: 'application/json' });
    const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "kek.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // const handleTextareaChange = (event:any) => {
  //   setScope(event.target.value)
  //   console.log(event.target.value);
  // };
  const loadXml = (event) => {
    debugger;
    const reader = new FileReader();
    reader.onload = function (event) {
      const xmlText = event.target.result;
      Blockly.serialization.workspaces.load(JSON.parse(xmlText),workspace.current);
    };
    reader.readAsText(event.target.files[0]);
  };


  return (
    <div className="App" style={{ display: 'flex', height: '93vh',marginTop:'3.5%' }}>
      <BlocklyContext.Provider value={blocklyData}>
        <div ref={blocklyDiv} style={{ flex: 1 }}></div>
        <Navbar downloadXml={downloadXml} loadXml={loadXml} fileInputRef={fileInputRef}></Navbar>
      </BlocklyContext.Provider>
      <div className='code'>{generatedCode}</div>
    </div>
  );
}
export default BlocklyPage;
