/**
 *  This class represents a Data Transfer Object (DTO) for a Camunda BPMN process definition.
 *  It contains the following information:
 *  id: the unique identifier of the process definition
 *  name: the name of the process definition
 *  key: the key of the process definition
 *  category: the category of the process definition
 *  tenantId: the tenant ID of the process definition
 *  version: the version of the process definition
 */

package com.example.workflow.dto;

import lombok.Value;
import org.camunda.bpm.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.camunda.bpm.engine.repository.ProcessDefinition;

@Value
public class ProcessDefinitionDto {

    String id;
    String name;
    String key;
    String deploymentId;
    String category;
    String tenantId;
    int version;

    public ProcessDefinitionDto(String id, String name, String key, String deploymentId, String category,
			String tenantId, int version) {
		super();
		this.id = id;
		this.name = name;
		this.key = key;
		this.deploymentId = deploymentId;
		this.category = category;
		this.tenantId = tenantId;
		this.version = version;
	}

	/**
     * Constructs a new ProcessDefinitionDto object from a given ProcessDefinition object.
     * @param processDefinition the ProcessDefinition object to create a DTO from
     * @return a new ProcessDefinitionDto object
     */

    public static ProcessDefinitionDto of(ProcessDefinition processDefinition) {
        ProcessDefinitionEntity processDefinitionEntity = (ProcessDefinitionEntity) processDefinition;
        return new ProcessDefinitionDto(
                processDefinitionEntity.getId(),
                processDefinitionEntity.getName(),
                processDefinitionEntity.getKey(),
                processDefinitionEntity.getDeploymentId(),
                processDefinitionEntity.getCategory(),
                processDefinitionEntity.getTenantId(),
                processDefinitionEntity.getVersion()
        );
    }
}
