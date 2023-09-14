import BpmnJS from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";

// import BPMN font
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import PaletteProvider from "bpmn-js/lib/features/palette/PaletteProvider";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import camundaModdleExtension from "camunda-bpmn-moddle/lib";

import propertiesPanelModule from "bpmn-js-properties-panel";

import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import "src\app\pages\modeler\modeler.component.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const container = document.getElementById("container");

class CustomPaletteProvider extends PaletteProvider {
  constructor(
    create,
    elementFactory,
    globalConnect,
    handTool,
    lassoTool,
    palette,
    spaceTool,
    translate
  ) {
    super(
      palette,
      create,
      elementFactory,
      spaceTool,
      lassoTool,
      handTool,
      globalConnect,
      translate
    );

    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
  }

  getPaletteEntries(element) {
    const { create, elementFactory, translate } = this;

    return Object.assign(super.getPaletteEntries(element), {
      "terminate-end-event": {
        group: "event",
        className: "bpmn-icon-script-task",
        title: translate("Create Script Task"),
        action: {
          click: function(event) {
            var shape = elementFactory.createShape({
              type: "bpmn:ScriptTask"
            });

            shape.businessObject.scriptFormat = "Javascript";
            shape.businessObject.script =
              'console.log("test");\nnext(null, "done");';

            create.start(event, shape);
          }
        }
      }
    });
  }
}

CustomPaletteProvider.$inject = [
  "create",
  "elementFactory",
  "globalConnect",
  "handTool",
  "lassoTool",
  "palette",
  "spaceTool",
  "translate"
];

const bpmnJS = new BpmnJS({
  container,
  additionalModules: [
    {
      __init__: ["paletteProvider"],
      paletteProvider: ["type", CustomPaletteProvider]
    },
    camundaModdleExtension,
    propertiesPanelModule,
    propertiesProviderModule
  ],
  keyboard: {
    bindTo: document
  },
  moddleExtensions: {
    camunda: camundaModdlePackage
  },
  propertiesPanel: {
    parent: "#properties"
  }
});

bpmnJS.importXML(xml, err => {
  if (err) {
    console.error(err);
  }

  const canvas = bpmnJS.get("canvas");

  canvas.zoom("fit-viewport");
});
