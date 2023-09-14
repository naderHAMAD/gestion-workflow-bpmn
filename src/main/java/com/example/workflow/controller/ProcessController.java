package com.example.workflow.controller;

import com.example.workflow.dto.HistoricActivityInstanceDto;
import com.example.workflow.dto.ProcessDefinitionDto;
import com.example.workflow.entity.WorkflowProcessInstance;
import com.example.workflow.service.ProcessService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.camunda.bpm.engine.history.HistoricActivityInstance;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/process")
@Api(value = "Process API" , tags = {"Process"})
@CrossOrigin(origins = "http://localhost:4200")
public class ProcessController {

    @Autowired
    private ProcessService processService;

    @ApiOperation(value = "Get all deployed process definitions")
    @GetMapping("/get/process-definitions")
    public List<ProcessDefinitionDto> getProcessDefinitions() {
        return processService.getDeployedProcessDefinitions();
    }

    @ApiOperation(value = "Start a process by its key")
    @PostMapping("/start/{processKey}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void startProcess(@PathVariable String processKey){
        processService.startProcess(processKey);
    }

    @ApiOperation(value = "Start a process by its deploymentId")
    @PostMapping("/start/deployement/{deploymentId}")
    public ResponseEntity<String> startProcessByDeploymentId(@PathVariable String deploymentId) {
        String processInstanceId = processService.startProcessByDeploymentId(deploymentId);
        return new ResponseEntity<>(processInstanceId, HttpStatus.OK);
    }

    @ApiOperation(value = "Suspend process instances by process instance ID")
    @PostMapping("/suspend/process-instances/{processInstanceId}")
    public ResponseEntity<String> suspendProcessInstance(@PathVariable String processInstanceId) {
        processService.suspendProcessInstance(processInstanceId);
        return ResponseEntity.ok("Process instances suspended successfully.");
    }

    @ApiOperation(value = " Restart a process instance by process instance ID")
    @PutMapping("/restart/{processInstanceId}")
    public ResponseEntity<String> restartProcessInstanceById(@PathVariable String processInstanceId) {
        processService.restartProcessInstanceById(processInstanceId);
        return ResponseEntity.ok("Process instance with ID " + processInstanceId + " has been restarted.");
    }

    @ApiOperation(value = "Resume a process instance by process instance ID")
    @PostMapping("/resume/{processInstanceId}")
    public ResponseEntity<String> resumeProcessInstanceById(@PathVariable String processInstanceId) {
        processService.resumeProcessInstanceById(processInstanceId);
        return ResponseEntity.ok("Process instance resumed successfully.");
    }

    @ApiOperation(value = "Delete all process instances")
    @DeleteMapping("/delete/process-instances")
    public ResponseEntity<String> deleteAllProcessInstances() {
        try {
            processService.deleteAllProcessInstances();
            return ResponseEntity.ok("All process instances deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ApiOperation(value = "Delete all process definitions and their versions")
    @DeleteMapping("/delete/process-definitions")
    public ResponseEntity<String> deleteAllProcessDefinitions() {
        try {
            processService.deleteAllProcessDefinitions();
            return ResponseEntity.ok("All process definitions and their versions deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ApiOperation(value = "Delete a process definition by its ID and all its versions")
    @DeleteMapping("/delete/process-definitions/{id}")
    public ResponseEntity<String> deleteProcessDefinition(@PathVariable("id") String processDefinitionId) {
        try {
            processService.deleteProcessDefinition(processDefinitionId);
            return ResponseEntity.ok("Process definition with id: " + processDefinitionId + " and all its versions are deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ApiOperation(value = "Deploy a process definition by providing the name and bpmn file")
    @PostMapping("/deploy")
    public ResponseEntity<String> deployProcessDefinition(@RequestParam("processDefinitionName") String processDefinitionName,
                                                          @RequestParam("processDefinitionBpmnFile") String processDefinitionBpmnFile) {
        try {
            processService.deployProcessDefinition(processDefinitionName, processDefinitionBpmnFile);
            return ResponseEntity.ok("Process definition deployed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ApiOperation(value = "Get completed process instances history")
    @GetMapping("/get/history/processes")
    public List<HistoricProcessInstance> getCompletedProcesses() {
        return processService.getCompletedProcesses();
    }

    @ApiOperation(value = "Delete all historic process instances")
    @DeleteMapping("/delete/historic-process-instances")
    public void deleteAllHistoricProcessInstances() {
        processService.deleteAllHistoricProcessInstances();
    }

    @ApiOperation(value = "Get  process instances")
    @GetMapping("/get/process-instances")
    public List<WorkflowProcessInstance> getAllProcessInstances() {

        return processService.getAllWorkflowProcessInstances();
    }

    @ApiOperation(value = "Retrieves all process instances by process definition key")
    @GetMapping("/get/definition-key/{processDefinitionKey}")
    public List<ProcessInstance> getProcessInstancesByProcessDefinitionKey(@PathVariable String processDefinitionKey) {
        return processService.getProcessInstancesByProcessDefinitionKey(processDefinitionKey);
    }

    @ApiOperation(value = "Retrieves a process instance by ID")
    @GetMapping("/get/{processInstanceId}")
    public ResponseEntity<ProcessInstance> getProcessInstanceById(@PathVariable String processInstanceId) {
        ProcessInstance processInstance = processService.getProcessInstanceById(processInstanceId);

        if (processInstance != null) {
            return ResponseEntity.ok(processInstance);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ApiOperation(value = "Deletes a process instance by ID")
    @DeleteMapping("/delete/process-instance/{Id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProcessInstanceById(@PathVariable String Id) throws NotFoundException {
        processService.deleteProcessInstanceAndWorkflowInstanceById(Id);
    }

    @GetMapping("/get/{processInstanceId}/execution-history")
    public List<HistoricActivityInstanceDto> getExecutionHistory(@PathVariable String processInstanceId) {
        return processService.getExecutionHistoryByProcessInstanceId(processInstanceId);
    }

}
