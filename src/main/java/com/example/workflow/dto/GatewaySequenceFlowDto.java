package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.model.bpmn.instance.SequenceFlow;

@Value
public class GatewaySequenceFlowDto {
    private String id;
    private String Name;
    private String sourceRef;
    private String conditionExpression;


    public GatewaySequenceFlowDto(String id, String name, String sourceRef, String conditionExpression) {
		super();
		this.id = id;
		Name = name;
		this.sourceRef = sourceRef;
		this.conditionExpression = conditionExpression;
	}


	/**
     * Constructs a new GatewaySequenceFlowDto object from a given SequenceFlow object.
     * @param sequenceFlow the SequenceFlow object to create a DTO from
     * @return a new GatewaySequenceFlowDto object
     */

    public static GatewaySequenceFlowDto of(SequenceFlow sequenceFlow) {
        return new GatewaySequenceFlowDto(
                sequenceFlow.getId(),
                sequenceFlow.getName(),
                sequenceFlow.getSource().getId(),
                sequenceFlow.getConditionExpression().getTextContent()
        );
    }
}