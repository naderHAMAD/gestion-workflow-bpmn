/**
 *  This class represents a Data Transfer Object (DTO) for a Camunda BPMN Service Task.
 *  It contains the following information:
 *  id: the unique identifier of the service task
 *  name: the name of the service task
 *  topic: the topic of the service task
 *  expression: the expression used by the service task
 *  delegateExpression: the delegate expression used by the service task
 *  taskPriority: the task priority of the service task
 */

package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.model.bpmn.instance.ServiceTask;

@Value
public class ServiceTaskDto {
    private String id;
    private String name;
    private String topic;
    private String expression;
    private String delegateExpression;
    private String taskPriority;

    /**
     * Constructs a new ServiceTaskDto object from a given ServiceTask object.
     * @param serviceTask the ServiceTask object to create a DTO from
     * @return a new ServiceTaskDto object
     */

    public static ServiceTaskDto of(ServiceTask serviceTask) {
        return new ServiceTaskDto(
                serviceTask.getId(),
                serviceTask.getName(),
                serviceTask.getCamundaTopic(),
                serviceTask.getCamundaExpression(),
                serviceTask.getCamundaDelegateExpression(),
                serviceTask.getCamundaTaskPriority()
        );
    }

	public ServiceTaskDto(String id, String name, String topic, String expression, String delegateExpression,
			String taskPriority) {
		super();
		this.id = id;
		this.name = name;
		this.topic = topic;
		this.expression = expression;
		this.delegateExpression = delegateExpression;
		this.taskPriority = taskPriority;
	}
}
