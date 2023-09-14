package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.model.bpmn.instance.ExclusiveGateway;
import org.camunda.bpm.model.bpmn.instance.SequenceFlow;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Value
public class ExclusiveGatewayDto {
    String id;
    String Name;
    List<String> outgoingList ;


    public ExclusiveGatewayDto(String id, String name, List<String> outgoingList) {
		super();
		this.id = id;
		Name = name;
		this.outgoingList = outgoingList;
	}


	public static ExclusiveGatewayDto of (ExclusiveGateway exclusiveGateway) {
        return new  ExclusiveGatewayDto(
                exclusiveGateway.getId(),
                exclusiveGateway.getName(),
                exclusiveGateway.getOutgoing().stream().map(SequenceFlow::getId).collect(toList())
        );
    }
}
