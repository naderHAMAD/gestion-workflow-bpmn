/**
 * Service class for managing Camunda BPMN processes.
 */

package com.example.workflow.service;

import com.example.workflow.dto.HistoricActivityInstanceDto;
import com.example.workflow.dto.ProcessDefinitionDto;
import com.example.workflow.entity.WorkflowProcessInstance;
import com.example.workflow.repository.WorkflowProcessInstanceRepository;
import com.example.workflow.repository.WorkflowRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.camunda.bpm.engine.HistoryService;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;

import org.camunda.bpm.engine.history.HistoricActivityInstance;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.repository.ProcessDefinitionQuery;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;


@Service
public class ProcessService {

    private  final RepositoryService repositoryService;
    private  final RuntimeService runtimeService;
    private  final HistoryService historyService;

    @Autowired
    public ProcessService(
            RepositoryService repositoryService,
            RuntimeService runtimeService,
            HistoryService historyService) {
        this.repositoryService = repositoryService;
        this.runtimeService = runtimeService;
        this.historyService = historyService;
    }
    @Autowired
    private WorkflowProcessInstanceRepository workflowProcessInstanceRepository ;
    @Autowired
    WorkflowRepository workflowRepository;
    /**
     * Deploys a process definition given the process definition name and BPMN file.
     * @param processDefinitionName the name of the process definition
     * @param processDefinitionBpmnFile the file path of the process definition BPMN file
     */
    public void deployProcessDefinition(String processDefinitionName, String processDefinitionBpmnFile) {
        repositoryService.createDeployment()
                .name(processDefinitionName)
                .addClasspathResource(processDefinitionBpmnFile)
                .deploy();
    }


    /**
     * Starts a process given the process key.
     * @param processKey the key of the process definition to start
     */
    public void startProcess(final String processKey){
        runtimeService.startProcessInstanceByKey(processKey);
    }

    /**
     * Starts a process instance by deployment ID.
     * @param deploymentId the ID of the deployment to start the process from
     * @return the ID of the started process instance
     * @throws RuntimeException if the process instance cannot be started
     */
    public String startProcessByDeploymentId(String deploymentId) {


        // Get the process definition for the given deployment ID
        ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery().deploymentId(deploymentId);
        ProcessDefinition processDefinition = processDefinitionQuery.singleResult();
        if (processDefinition == null) {
            throw new RuntimeException("No process definition found for deployment ID: " + deploymentId);
        }
        // Start the process instance using the process definition ID
        try {
            ProcessInstance processInstance = runtimeService.startProcessInstanceById(processDefinition.getId());
            // creating WorkflowProcessInstance object, setting its properties using the process instance information, and save it
            WorkflowProcessInstance workflowProcessInstance = new WorkflowProcessInstance();
            workflowProcessInstance.setId(processInstance.getId());
            workflowProcessInstance.setProcessInstanceId(processInstance.getProcessInstanceId());
            workflowProcessInstance.setProcessName(processDefinition.getName());
            workflowProcessInstance.setWorkflow(workflowRepository.findWorkflowByDeploymentId(deploymentId));
            if (processInstance.isEnded() || historyService.createHistoricProcessInstanceQuery()
                    .processInstanceId(processInstance.getId())
                    .finished()
                    .count() > 0) {
                workflowProcessInstance.setStatus("COMPLETED");
            } else if (processInstance.isSuspended()) {
                workflowProcessInstance.setStatus("SUSPENDED");
            } else {
                workflowProcessInstance.setStatus("ACTIVE");
            }
            workflowProcessInstanceRepository.save(workflowProcessInstance);
            return processInstance.getId();
        } catch (Exception e) {
            throw new RuntimeException("Failed to start process instance for deployment ID: " + deploymentId, e);
        }
    }


    /**
     * Suspend a process instance by process instance ID.
     * @param processInstanceId the ID of the process instance to suspend the process from
     */
    public void suspendProcessInstance(String processInstanceId) {
        runtimeService.suspendProcessInstanceById(processInstanceId);
        WorkflowProcessInstance instance = workflowProcessInstanceRepository.findByProcessInstanceId(processInstanceId);
        instance.setStatus("SUSPENDED");
        workflowProcessInstanceRepository.save(instance);
    }

    /**
     * Resumes a suspended process instance by processInstanceId.
     * @param processInstanceId the ID of the process instance to resume
     * @throws RuntimeException if the process instance cannot be resumed
     */
    public void resumeProcessInstanceById(String processInstanceId) {
        try {
            runtimeService.activateProcessInstanceById(processInstanceId);
            WorkflowProcessInstance instance = workflowProcessInstanceRepository.findByProcessInstanceId(processInstanceId);
            instance.setStatus("ACTIVE");
            workflowProcessInstanceRepository.save(instance);
        } catch (Exception e) {
            throw new RuntimeException("Failed to resume process instance with ID " + processInstanceId, e);
        }
    }

    /**
     * Restart a process instance by processInstanceId.
     * @param processInstanceId the ID of the process instance  which is suspended.
     */
    public void restartProcessInstanceById(String processInstanceId) {
        runtimeService.activateProcessInstanceById(processInstanceId);
        WorkflowProcessInstance instance = workflowProcessInstanceRepository.findByProcessInstanceId(processInstanceId);
        instance.setStatus("ACTIVE");
        workflowProcessInstanceRepository.save(instance);
    }

    /**
     * Retrieves all deployed process definitions as a list of {@link ProcessDefinitionDto}.
     * @return a list of deployed process definitions
     */
    public List<ProcessDefinitionDto> getDeployedProcessDefinitions() {
        return repositoryService
                .createProcessDefinitionQuery()
                .list()
                .stream()
                .map(ProcessDefinitionDto::of)
                .collect(toList());
    }


    /**
     * Deletes a process definition by ID.
     * @param processDefinitionId the ID of the process definition to delete
     * @throws RuntimeException if the process definition cannot be deleted
     */
    public void deleteProcessDefinition(String processDefinitionId) {
        try {
            // Delete the process definition and all its versions
            repositoryService.deleteProcessDefinition(processDefinitionId, true);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete process definition with id " + processDefinitionId, e);
        }
    }

    /**
     * Deletes all deployed process definitions.
     */
    public void deleteAllProcessDefinitions() {
        repositoryService.createProcessDefinitionQuery().list().stream()
                .forEach(processDefinition -> {
                    repositoryService.deleteProcessDefinitions()
                            .byKey(processDefinition.getKey())
                            .delete();
                });
        workflowRepository.deleteAll();
    }

    /**
     * Retrieves all process instances.
     * @return a list of all process instances
     */
    public List<WorkflowProcessInstance> getAllWorkflowProcessInstances() {
        return workflowProcessInstanceRepository.findAll();
    }

    /**
     * Retrieves all process instances by process definition key.
     * @param processDefinitionKey the key of the process definition
     * @return a list of process instances for the given process definition key
     */
    public List<ProcessInstance> getProcessInstancesByProcessDefinitionKey(String processDefinitionKey) {
        return runtimeService.createProcessInstanceQuery().processDefinitionKey(processDefinitionKey).list();
    }

    /**
     * Retrieves a process instance by ID.
     * @param processInstanceId the ID of the process instance to retrieve
     * @return the process instance with the given ID, or null if it does not exist
     */
    public ProcessInstance getProcessInstanceById(String processInstanceId) {
        return runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
    }


    /**
     * Deletes a process instance and its associated workflow process instance by ID.
     * @param id the ID of the process instance to delete
     * @throws NotFoundException if no workflow process instance is found with the given ID
     */
    public void deleteProcessInstanceAndWorkflowInstanceById(String id) throws NotFoundException {
        WorkflowProcessInstance workflowProcessInstance = workflowProcessInstanceRepository.getById(id);
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(workflowProcessInstance.getProcessInstanceId()).singleResult();
        if (processInstance == null) {
            workflowProcessInstanceRepository.deleteById(id);
        }
        else{
            runtimeService.deleteProcessInstance(workflowProcessInstance.getProcessInstanceId(), "Deleted by user");
            workflowProcessInstanceRepository.deleteById(id);
        }
    }

    /**
     * Deletes all process instances.
     */
    public void deleteAllProcessInstances() {
        List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery().list();
        for (ProcessInstance processInstance : processInstances) {
            runtimeService.deleteProcessInstance(processInstance.getId(), "Deleting all process instances");
        }
        workflowProcessInstanceRepository.deleteAll();
    }

    /**
     * Deletes all historic process instances.
     */
    public void deleteAllHistoricProcessInstances() {
        List<HistoricProcessInstance> processInstances = historyService.createHistoricProcessInstanceQuery().list();
        List<String> processInstanceIds = processInstances.stream().map(HistoricProcessInstance::getId).collect(Collectors.toList());
        historyService.deleteHistoricProcessInstances(processInstanceIds);
    }

    /**
     * Retrieves a list of completed process instances.
     * @return a list of completed process instances
     */
    public List<HistoricProcessInstance> getCompletedProcesses() {
        return historyService.createHistoricProcessInstanceQuery().finished().list();
    }

    /**
     * Retrieves the execution history of a process instance by its ID.
     *
     * @param processInstanceId the ID of the process instance
     * @return a list of historic activity instances representing the execution history
     */
    public List<HistoricActivityInstanceDto> getExecutionHistoryByProcessInstanceId(String processInstanceId) {
        List<HistoricActivityInstance> historicActivityInstances = historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId)
                .orderByHistoricActivityInstanceStartTime()
                .asc()
                .list();

        List<HistoricActivityInstanceDto> historicActivityInstanceDtos = new ArrayList<>();
        for (HistoricActivityInstance historicActivityInstance : historicActivityInstances) {
            HistoricActivityInstanceDto historicActivityInstanceDto = HistoricActivityInstanceDto.of(historicActivityInstance);
            historicActivityInstanceDtos.add(historicActivityInstanceDto);
        }

        return historicActivityInstanceDtos;
    }


}