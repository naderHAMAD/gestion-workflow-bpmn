package com.example.workflow.controller;

import com.example.workflow.entity.Workflow;
import com.example.workflow.service.WorkflowService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/workflow")
@Api(value = "Workflow APIs", tags = {"Workflow"})
@CrossOrigin(origins = "http://localhost:4200")
public class WorkflowController {

    private final WorkflowService workflowService;

    public WorkflowController(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @ApiOperation(value = "Save a Workflow", response = Workflow.class)
    @PostMapping("/save")
    public Workflow saveWorkflow(@RequestBody Workflow workflow) {
        return workflowService.saveWorkflow(workflow);
    }

    @ApiOperation(value = "Get a Workflow by ID", response = Workflow.class)
    @GetMapping("/get/bpmn/{id}")
    public ResponseEntity<Optional<Workflow>> getWorkflowXmlContent(@PathVariable String id) {
        Optional<Workflow> bpmn = workflowService.getBpmnModelInstance(id);
        return ResponseEntity.ok(bpmn);
    }

    @ApiOperation(value = "Create a Workflow", response = Workflow.class)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Workflow created successfully"),
            @ApiResponse(code = 400, message = "Invalid request")
    })
    @PostMapping("/save/bpmn")
    public ResponseEntity<Workflow> createWorkflow(@RequestBody Workflow workflow) throws IOException{
        Workflow savedWorkflowBpmn = workflowService.saveWorkflowBpmn(workflow);
        return ResponseEntity.created(URI.create("/workflows/" + savedWorkflowBpmn.getId())).body(savedWorkflowBpmn);
    }

    @ApiOperation(value = "Get all Workflows", response = Workflow.class, responseContainer = "List")
    @GetMapping("/get/all")
    public List<Workflow> getAllWorkflows() {
        return workflowService.getAllWorkflows();
    }


    @ApiOperation(value = "Get a Workflow by Name", response = Workflow.class)
    @GetMapping("/get/name/{name}")
    public ResponseEntity<Workflow> getWorkflowByName(@PathVariable String name) {
        Optional<Workflow> optionalWorkflow = workflowService.getWorkflowByName(name);

        if (optionalWorkflow.isPresent()) {
            return new ResponseEntity<>(optionalWorkflow.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Update a Workflow", response = Workflow.class)
    @PutMapping("/update/{id}")
    public ResponseEntity<Workflow> updateWorkflow(@PathVariable String id, @RequestBody Workflow workflow) throws IOException {
        Workflow updatedWorkflow = workflowService.updateWorkflowBpmn(id, workflow);

        if (updatedWorkflow != null) {
            return new ResponseEntity<>(updatedWorkflow, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Delete a Workflow")
    @DeleteMapping("/delete/{id}")
    public void deleteWorkflow(@PathVariable String id) {
        workflowService.deleteWorkflow(id);
    }
}