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
import { ZoomToFitControl } from '@blockly/zoom-to-fit';
import { Zelos } from 'blockly/core/theme/zelos';

const BlocklyPage: React.FC = () => {
  const [blocklyData, setBlocklyData] = useState();
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg>();
  const [generatedCode, setGeneratedCode] = useState('');
  const fileInputRef = useRef(null);
  const [blocksJson, setBlocksJson] = useState('');
  const [codejson, setCodejson] = useState("code");
  useEffect(() => {

    if (blocklyDiv.current) {
      const customTheme = Blockly.Theme.defineTheme('customTheme', {
        'base': Blockly.Themes.Classic,
        'blockStyles': {
          'variable_blocks': {
            colourPrimary: "#e67200",
            colourSecondary: "#f4a457",
            colourTertiary: "#f4a457"
          },
          'text_blocks': {
            colourPrimary: "#52007f",
            colourSecondary: "#7a3f9a",
            colourTertiary: "#7a3f9a"
          },
          'list_blocks': {
            colourPrimary: "#00677d",
            colourSecondary: "#6c9aa3",
            colourTertiary: "#6c9aa3"
          },
          'logic_blocks': {
            colourPrimary: "#cbacff",
            colourSecondary: "#ba92fe",
            colourTertiary: "#a36efe"
          },
          'math_blocks': {
            colourPrimary: "#00b5d0",
            colourSecondary: "#018a9e",
            colourTertiary: "#008194"
          },
          'loop_blocks': {
            colourPrimary: "#c5c341",
            colourSecondary: "#999722",
            colourTertiary: "#999722"
          },
          'procedure_blocks': {
            colourPrimary: "#00c3d5",
            colourSecondary: "#06838f",
            colourTertiary: "#06838f"
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
        zoom: {
          controls: true,  // Zoom kontrollerini etkinleştir
          wheel: true,     // Fare tekerleğiyle zoom yapmayı etkinleştir
          startScale: 1.0, // Başlangıç zoom seviyesi
          maxScale: 3,     // Maksimum zoom seviyesi
          minScale: 0.3,   // Minimum zoom seviyesi
          scaleSpeed: 1.2  // Zoom hızı
        },
        grid: {
          spacing: 15,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
        theme: customTheme,
        renderer: 'zelos'
      });

      const onWorkspaceChange = (e) => {
        const code = formulaGenerator.workspaceToCode(workspace.current);
        const workspaceXml = Blockly.Xml.workspaceToDom(workspace.current);
        const savexml = Blockly.Xml.domToText(workspaceXml)
        console.log(savexml);
        var json = Blockly.serialization.workspaces.save(workspace.current);
        setGeneratedCode(code);
        var json = Blockly.serialization.workspaces.save(workspace.current);
        setBlocksJson(JSON.stringify(json, null, 2));
        const allBlocks = workspace.current.getAllBlocks(false);
        allBlocks.forEach(block => {
          const isBlockConnected = block.outputConnection && block.outputConnection.isConnected();
          const isInnerBlockConnected = block.inputList.some(input =>
            input.connection &&
            input.connection.targetConnection &&
            input.connection.targetBlock()
          );
          if (!isBlockConnected && !isInnerBlockConnected) {
            block.getSvgRoot().classList.add('blocklyPassiveBlock');
            const childBlocks = block.getDescendants();
            childBlocks.forEach(child => {
              child.getSvgRoot().classList.add('blocklyPassiveBlock');
            });
          } else {
            block.getSvgRoot().classList.remove('blocklyPassiveBlock');
            const childBlocks = block.getDescendants();
            childBlocks.forEach(child => {
              child.getSvgRoot().classList.remove('blocklyPassiveBlock');
            });
          }
        });
      }

      workspace.current.addChangeListener(onWorkspaceChange);
      const zoomToFit = new ZoomToFitControl(workspace.current);
      zoomToFit.init();
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);

  const downloadXml = () => {
    const state = Blockly.serialization.workspaces.save(workspace.current);
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
  const loadXml = (event) => {
    debugger;
    const reader = new FileReader();
    reader.onload = function (event) {
      const xmlText = event.target.result;
      Blockly.serialization.workspaces.load(JSON.parse(xmlText), workspace.current);
    };
    reader.readAsText(event.target.files[0]);
  };

  const handleJsonChange = (event) => {
    setBlocksJson(event.target.value);
  };

  const updateWorkspace = () => {
    try {
      const json = JSON.parse(blocksJson);
      Blockly.serialization.workspaces.load(json, workspace.current);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  return (
    <div className="App" style={{ display: 'flex', height: '93vh', marginTop: '3.5%' }}>
      <BlocklyContext.Provider value={blocklyData}>
        <div ref={blocklyDiv} style={{ flex: 1 }}></div>
        <Navbar downloadXml={downloadXml} loadXml={loadXml} fileInputRef={fileInputRef}></Navbar>
      </BlocklyContext.Provider>

      <div className='generator'>
        <div>
          <button onClick={() => { setCodejson("json") }}>json</button>
          <button onClick={() => { setCodejson("code") }}>code</button>
        </div>
        <div className='code' style={{ display: `${codejson == "code" ? "block" : "none"}` }}>
          {generatedCode}
        </div>
        <div className='json' style={{ display: `${codejson == "json" ? "block" : "none"}` }}>
          <textarea
            value={blocksJson}
            onChange={handleJsonChange}
          ></textarea>
          <button onClick={updateWorkspace}>Update Blocks</button>
        </div>
      </div>
    </div>

  );
}
export default BlocklyPage;
