package com.example.workflow.controller;

import com.example.workflow.dto.*;
import com.example.workflow.service.TasksService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.camunda.bpm.engine.history.HistoricTaskInstance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/task")
@Api(value = "Task APIs", tags = {"Task"})
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TasksService tasksService;

    @ApiOperation(value = "Get active tasks", notes = "Returns a list of all active tasks")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = TaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/active")
    public List<TaskDto> getProcessInstanceActiveTasks() {
        return tasksService.getActiveTasks();
    }

    @ApiOperation(value = "Get Simple User active tasks", notes = "Returns a list of all simple user active tasks")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = TaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })

    @GetMapping("/get/active/user")
    public List<TaskDto> getSimpleUserActiveUserTasksByAssignee() {
        return tasksService.getSimpleUserActiveUserTasksByAssignee();
    }

    @ApiOperation(value = "Get Validator active tasks", notes = "Returns a list of all validator active tasks")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = TaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/active/validator")
    public List<TaskDto> getValidatorActiveUserTasksByAssignee() {
        return tasksService.getValidatorActiveUserTasksByAssignee();
    }

    @ApiOperation(value = "Delete all tasks", notes = "Deletes all tasks")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @DeleteMapping("/delete/tasks")
    public ResponseEntity<String> deleteAllTasks() {
        try {
            tasksService.deleteAllTasks();
            return ResponseEntity.ok("All tasks deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ApiOperation(value = "Claim task", notes = "Claims a task")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No Content"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PostMapping("/claim/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void claimTask(@PathVariable String taskId) {
        tasksService.claimTask(taskId);
    }

    @ApiOperation(value = "Complete task", notes = "Completes a task")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PostMapping("/complete/{taskId}")
    public void completeTask(@PathVariable String taskId, @RequestBody Map<String, Integer> requestBody) {
        Integer input = requestBody.get("input");
        tasksService.completeTask(taskId, input);
    }

    @ApiOperation(value = "Get completed tasks", notes = "Returns a list of all completed tasks")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = HistoricTaskInstance.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/history/tasks")
    public List<HistoryTaskDto> getCompletedTasks() {
        return tasksService.getCompletedTasks();
    }

    @ApiOperation(value = "Get service tasks", notes = "Returns a list of all service tasks for a given process deployment ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ServiceTaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/process/service-tasks/{deploymentId}")
    public ResponseEntity<List<ServiceTaskDto>> getServiceTasks(@PathVariable String deploymentId) {
        List<ServiceTaskDto> serviceTasks = tasksService.getServiceTaskDefinitions( deploymentId);
        return ResponseEntity.ok(serviceTasks);
    }

    @ApiOperation(value = "Get user tasks", notes = "Returns a list of all user tasks for a given process deployment ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = UserTaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/process/user-tasks/{deploymentId}")
    public ResponseEntity<List<UserTaskDto>> getUserTasks(@PathVariable String deploymentId) {
        List<UserTaskDto> userTasks = tasksService.getUserTaskDefinitions(deploymentId);
        return ResponseEntity.ok(userTasks);
    }

    @ApiOperation(value = "Get send tasks", notes = "Returns a list of all send tasks for a given deployment ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = SendTaskDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/process/send-tasks/{deploymentId}")
    public ResponseEntity<List<SendTaskDto>> getSendTasks(@PathVariable String deploymentId) {
        List<SendTaskDto> sendTasks = tasksService.getSendTaskDefinitions(deploymentId);
        return ResponseEntity.ok(sendTasks);
    }
    @ApiOperation(value = "Get exclusive gateway outgoing sequence flows", notes = "Returns a list of all gateways outgoing sequence flows for a given deployment ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ExclusiveGatewayDto.class, responseContainer = "List"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/get/process/gateway/outgoing/{deploymentId}")
    public ResponseEntity<List<GatewaySequenceFlowDto>> getGatewaySequenceFlows(@PathVariable String deploymentId) {
        List<GatewaySequenceFlowDto> sequenceFlows = tasksService.getAllGatewaySequenceFlowsByDeploymentId(deploymentId);
        return ResponseEntity.ok(sequenceFlows);
    }

    @ApiOperation(value = "Edit User Task assignee and candidate users")
    @PutMapping("/update/process/user-tasks/{processDeploymentId}/{userTaskId}")
    public ResponseEntity<String> updateCandidateUsers(
            @PathVariable String processDeploymentId,
            @PathVariable String userTaskId,
            @RequestParam String formKey,
            @RequestParam String assignee) {
        tasksService.updateTask(processDeploymentId, userTaskId,formKey,assignee);
        return ResponseEntity.ok("User task updated successfully");
    }


}
