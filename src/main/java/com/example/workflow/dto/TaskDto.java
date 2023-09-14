/**
 * This class represents a Data Transfer Object (DTO) for a Camunda BPMN task.
 *  It contains the following information:
 *  id: the unique identifier of the task
 *  name: the name of the task
 *  assignee: the assignee of the task
 *  createdTime: the date and time when the task was created
 *  processInstanceId: the unique identifier of the process instance to which the task belongs
 *  taskDefinitionKey: the unique identifier of the task definition
 *  processDefinitionId: the unique identifier of the process definition to which the task belongs
 */

package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.engine.task.Task;
import java.util.Date;


@Value
public class TaskDto {

    String id;
    String name;
    String assignee;
    String formKey;
    Date   createdTime;
    String processInstanceId;
    String taskDefinitionKey;
    String processDefinitionId;

    public TaskDto(String id, String name, String assignee, String formKey, Date createdTime, String processInstanceId,
			String taskDefinitionKey, String processDefinitionId) {
		super();
		this.id = id;
		this.name = name;
		this.assignee = assignee;
		this.formKey = formKey;
		this.createdTime = createdTime;
		this.processInstanceId = processInstanceId;
		this.taskDefinitionKey = taskDefinitionKey;
		this.processDefinitionId = processDefinitionId;
	}

	/**
     * Creates a new TaskDto object based on the provided Task object.
     * @param task the Task object to convert to a TaskDto
     * @return the newly created TaskDto object
     */

    public static TaskDto of (Task task) {
        return new TaskDto(
                task.getId(),
                task.getName(),
                task.getAssignee(),
                task.getFormKey(),
                task.getCreateTime(),
                task.getProcessInstanceId(),
                task.getTaskDefinitionKey(),
                task.getProcessDefinitionId()
        );
    }
}
