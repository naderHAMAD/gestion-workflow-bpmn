/**
 *  This class represents a Data Transfer Object (DTO) for a Camunda BPMN History Task.
 *  It contains the following information:
 *  id: the unique identifier of the historic task instance
 *  processInstanceId: the unique identifier of the process instance that the historic task instance belongs to
 *  processDefinitionKey: the key of the process definition that the historic task instance belongs to
 *  durationInMillis: the duration of the historic task instance in milliseconds
 *  startTime: the start time of the historic task instance
 *  endTime: the end time of the historic task instance
 *  name: the name of the historic task instance
 *  priority: the priority of the historic task instance
 *  parentTaskId: the unique identifier of the parent task instance, if any
 *  deleteReason: the reason why the historic task instance was deleted, if applicable
 *  taskDefinitionKey: the key of the task definition that the historic task instance belongs to
 */

package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.engine.history.HistoricTaskInstance;
import java.util.Date;



@Value
public class HistoryTaskDto {
    String id;
    String processInstanceId;
    String processDefinitionKey;
    Long durationInMillis;
    Date startTime;
    Date endTime;
    String name;
    Integer priority;
    String parentTaskId;
    String deleteReason;
    String taskDefinitionKey;

    public HistoryTaskDto(String id, String processInstanceId, String processDefinitionKey, Long durationInMillis,
			Date startTime, Date endTime, String name, Integer priority, String parentTaskId, String deleteReason,
			String taskDefinitionKey) {
		super();
		this.id = id;
		this.processInstanceId = processInstanceId;
		this.processDefinitionKey = processDefinitionKey;
		this.durationInMillis = durationInMillis;
		this.startTime = startTime;
		this.endTime = endTime;
		this.name = name;
		this.priority = priority;
		this.parentTaskId = parentTaskId;
		this.deleteReason = deleteReason;
		this.taskDefinitionKey = taskDefinitionKey;
	}

	/**
     * Constructs a new HistoryTaskDto object from a given SendTask object.
     * @param historyTask the HistorTask object to create a DTO from
     * @return a new HistoryTaskDto object
     */

    public static HistoryTaskDto of(HistoricTaskInstance historyTask) {
        return new HistoryTaskDto(
                historyTask.getId(),
                historyTask.getProcessInstanceId(),
                historyTask.getProcessDefinitionKey(),
                historyTask.getDurationInMillis(),
                historyTask.getStartTime(),
                historyTask.getEndTime(),
                historyTask.getName(),
                historyTask.getPriority(),
                historyTask.getParentTaskId(),
                historyTask.getDeleteReason(),
                historyTask.getTaskDefinitionKey()
        );
    }

}
