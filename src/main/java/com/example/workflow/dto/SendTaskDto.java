/**
 *  This class represents a Data Transfer Object (DTO) for a Camunda BPMN Send Task.
 *  It contains the following information:
 *  id: the unique identifier of the send task
 *  name: the name of the send task
 *  topic: the topic of the send task
 *  expression: the expression used by the send task
 *  delegateExpression: the delegate expression used by the send task
 *  resultVariable : the result variable of the send task
 */

package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.model.bpmn.instance.SendTask;

@Value
public class SendTaskDto {
    private String id;
    private String name;
    private String topic;
    private String expression;
    private String delegateExpression;
    private String resultVariable;

    public SendTaskDto(String id, String name, String topic, String expression, String delegateExpression,
			String resultVariable) {
		super();
		this.id = id;
		this.name = name;
		this.topic = topic;
		this.expression = expression;
		this.delegateExpression = delegateExpression;
		this.resultVariable = resultVariable;
	}

	/**
     * Constructs a new SendTaskDto object from a given SendTask object.
     * @param sendTask the SendTask object to create a DTO from
     * @return a new SendTaskDto object
     */

    public static SendTaskDto of(SendTask sendTask) {
        return new SendTaskDto(
                sendTask.getId(),
                sendTask.getName(),
                sendTask.getCamundaTopic(),
                sendTask.getCamundaExpression(),
                sendTask.getCamundaDelegateExpression(),
                sendTask.getCamundaResultVariable()
        );
    }
}
