/**
 * WorkflowService class provides methods for CRUD operations on the Workflow entity.
 */

package com.example.workflow.service;

import com.example.workflow.entity.Workflow;
import com.example.workflow.repository.WorkflowRepository;
import lombok.RequiredArgsConstructor;

import org.camunda.bpm.engine.RepositoryService;

import org.camunda.bpm.engine.repository.Deployment;
import org.camunda.bpm.engine.repository.DeploymentQuery;
import org.camunda.bpm.engine.repository.ProcessDefinition;

import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.BpmnModelInstance;
import org.camunda.bpm.model.bpmn.instance.*;
import org.camunda.bpm.model.bpmn.instance.camunda.CamundaExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class WorkflowService {

    private final RepositoryService repositoryService;
    @Autowired
    public WorkflowService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }
    @Autowired
    private WorkflowRepository workflowRepository;


    /**
     * Saves a new Workflow entity to the database.
     * @param workflow The Workflow entity to be saved.
     * @return The saved Workflow entity.
     */
    public Workflow saveWorkflow(Workflow workflow) {
        if (workflow == null) {
            throw new IllegalArgumentException("Workflow cannot be null");
        }

        return workflowRepository.save(workflow);
    }

    /**
     * Gets a Workflow entity by ID.
     * @param workflowId The ID of the Workflow entity.
     * @return The Workflow entity with the given ID.
     */
    public Optional<Workflow> getBpmnModelInstance(String workflowId) {
        Optional<Workflow> bpmn = workflowRepository.findById(workflowId);
        if (bpmn == null) {
            throw new IllegalArgumentException("Workflow not found for id: " + workflowId);
        }
        return bpmn;
    }


    /**
     * Saves a new Workflow entity and deploys it to the Camunda engine.
     *
     * @param workflow The Workflow entity to be saved and deployed.
     * @return The saved Workflow entity.
     * @throws IOException If there is an error writing the XML content to a file.
     */
    public Workflow saveWorkflowBpmn(Workflow workflow) throws IOException {
        // Read BPMN model instance from XML content
        BpmnModelInstance modelInstance = Bpmn.readModelFromStream(
                new ByteArrayInputStream(workflow.getXmlContent().getBytes(StandardCharsets.UTF_8)));


        // Inject condition expressions into sequence flows that come just after a gateway
        Collection<ExclusiveGateway> gateways = modelInstance.getModelElementsByType(ExclusiveGateway.class);
        for (ExclusiveGateway gateway : gateways) {
            int pathCounter = 0;
            List<SequenceFlow> outgoingFlows = new ArrayList<>(gateway.getOutgoing());
            if (outgoingFlows.size() > 1) {
                for (SequenceFlow outgoingFlow : outgoingFlows) {
                    if (outgoingFlow.getTarget() instanceof FlowNode) {
                        FlowNode targetNode = outgoingFlow.getTarget();
                        if (targetNode.getIncoming().stream().anyMatch(incoming -> incoming.getSource() == gateway)) {
                            // Create and set condition expression for sequence flow
                            ConditionExpression conditionExpression = modelInstance.newInstance(ConditionExpression.class);
                            conditionExpression.setTextContent("${input == " + pathCounter++ + "}");
                            outgoingFlow.setConditionExpression(conditionExpression);
                            // Set name of sequence flow
                            if (outgoingFlow.getName() == null || outgoingFlow.getName().isEmpty()) {
                                outgoingFlow.setName("Flow " + pathCounter);
                                outgoingFlow.builder().name(outgoingFlow.getName()).done();
                            }
                        }
                    }
                }
            }
        }

        // Inject default delegate expression for service tasks without one
        Collection<ServiceTask> serviceTasks = modelInstance.getModelElementsByType(ServiceTask.class);
        for (ServiceTask serviceTask : serviceTasks) {
            if (serviceTask.getCamundaDelegateExpression() == null) {
                serviceTask.setCamundaDelegateExpression("#{defaultCamundaDelegateClass}");
            }
        }

        // Inject default delegate expression for send tasks without one and set variables
        Collection<SendTask> sendTasks = modelInstance.getModelElementsByType(SendTask.class);
        for (SendTask sendTask : sendTasks) {
            sendTask.setCamundaDelegateExpression("${defaultSendMailDelegateClass}");
        }

        // Check if every gateway is preceded by a user task
        for (FlowElement element : modelInstance.getModelElementsByType(FlowElement.class)) {
            if (element instanceof Gateway) {
                Collection<SequenceFlow> incomingFlows = ((Gateway) element).getIncoming();
                boolean hasUserTaskBefore = false;
                for (SequenceFlow incomingFlow : incomingFlows) {
                    if (incomingFlow.getSource() instanceof UserTask) {
                        hasUserTaskBefore = true;
                        break;
                    }
                }
                if (!hasUserTaskBefore) {
                    throw new RuntimeException("Gateway " + element.getId() + " must be preceded by a User Task.");
                }
            }
        }


        // Set the execution listener for every end event in the BPMN
        Collection<EndEvent> endEvents = modelInstance.getModelElementsByType(EndEvent.class);
        for (EndEvent endEvent : endEvents) {
            CamundaExecutionListener executionListener = modelInstance.newInstance(CamundaExecutionListener.class);
            executionListener.setCamundaClass("com.example.workflow.listener.ProcessCompletionListener");
            endEvent.builder().camundaExecutionListenerClass("end", executionListener.getCamundaClass());
        }

        // Convert the updated BPMN model instance to XML string
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Bpmn.writeModelToStream(outputStream, modelInstance);
        String updatedXmlContent = outputStream.toString();

        // Set the updated XML content to the workflow entity
        workflow.setXmlContent(updatedXmlContent);

        // Deploy process definition
        String deploymentName = UUID.randomUUID() + "_" + workflow.getName();
        Deployment deployment = repositoryService.createDeployment()
                .name(deploymentName)
                .addString(workflow.getXmlName(), updatedXmlContent)
                .deploy();

        // Get the process definition from the deployment
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId())
                .singleResult();

        // Set the deployment ID of the workflow entity
        workflow.setDeploymentId(deployment.getId());

        /* Save BPMN XML file to /resources/static/bpmn folder
        String fileName = workflow.getXmlName() + ".xml";
        File bpmnFile = new File("src/main/resources/static/bpmns", fileName);
        FileWriter writer = new FileWriter(bpmnFile);
        Bpmn.writeModelToFile(bpmnFile, modelInstance);
        writer.close();*/

        // Save workflow entity to database
        return workflowRepository.save(workflow);
    }

    /**
     * Gets all Workflow entities from the database.
     * @return A list of all Workflow entities in the database.
     */
    public List<Workflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }


    /**
     * Gets a Workflow entity by name.
     * @param name The name of the Workflow entity.
     * @return The Workflow entity with the given name.
     */
    public Optional<Workflow> getWorkflowByName(String name) {
        return workflowRepository.findByName(name);
    }

    /**
     * Updates an existing workflow with the provided XML content and name.
     * If the workflow does not exist, returns null.
     *
     * @param id the ID of the workflow to update
     * @param workflow the updated workflow object containing the new XML content and name
     * @return the updated workflow object
     * @throws IOException if there is an error reading or writing the BPMN model XML content
     */
    public Workflow updateWorkflowBpmn(String id, Workflow workflow) throws IOException {
        // Check if the workflow exists and retrieve its XML content
        Optional<Workflow> optionalWorkflow = workflowRepository.findById(id);
        if (!optionalWorkflow.isPresent()) {
            // Workflow does not exist, return null
            return null;
        }
        Workflow existingWorkflow = optionalWorkflow.get();

        // Inject condition expressions into sequence flows that come just after a gateway
        BpmnModelInstance modelInstance = Bpmn.readModelFromStream(
                new ByteArrayInputStream(workflow.getXmlContent().getBytes(StandardCharsets.UTF_8)));

        Collection<ExclusiveGateway> gateways = modelInstance.getModelElementsByType(ExclusiveGateway.class);
        for (ExclusiveGateway gateway : gateways) {
            int pathCounter = 0;
            List<SequenceFlow> outgoingFlows = new ArrayList<>(gateway.getOutgoing());
            if (outgoingFlows.size() > 1) {
                for (SequenceFlow outgoingFlow : outgoingFlows) {
                    if (outgoingFlow.getTarget() instanceof FlowNode) {
                        FlowNode targetNode = outgoingFlow.getTarget();
                        if (targetNode.getIncoming().stream().anyMatch(incoming -> incoming.getSource() == gateway)) {
                            ConditionExpression conditionExpression = modelInstance.newInstance(ConditionExpression.class);
                            conditionExpression.setTextContent("${input == " + pathCounter++ + "}");
                            outgoingFlow.setConditionExpression(conditionExpression);
                            if (outgoingFlow.getName() == null) {
                                outgoingFlow.setName("Flow " + pathCounter); // Set name of sequence flow
                            }
                            outgoingFlow.builder()
                                    .name(outgoingFlow.getName())
                                    .done();
                        }
                    }
                }
            }
        }

        // Inject default delegate expression for service tasks without one
        Collection<ServiceTask> serviceTasks = modelInstance.getModelElementsByType(ServiceTask.class);
        for (ServiceTask serviceTask : serviceTasks) {
            serviceTask.setCamundaDelegateExpression("#{defaultCamundaDelegateClass}");
        }

        // Inject default delegate expression for send tasks without one and set variables
        Collection<SendTask> sendTasks = modelInstance.getModelElementsByType(SendTask.class);
        for (SendTask sendTask : sendTasks) {
            sendTask.setCamundaDelegateExpression("${defaultSendMailDelegateClass}");
        }

        // Check if every gateway is preceded by a user task
        for (FlowElement element : modelInstance.getModelElementsByType(FlowElement.class)) {
            if (element instanceof Gateway) {
                Collection<SequenceFlow> incomingFlows = ((Gateway) element).getIncoming();
                boolean hasUserTaskBefore = false;
                for (SequenceFlow incomingFlow : incomingFlows) {
                    if (incomingFlow.getSource() instanceof UserTask) {
                        hasUserTaskBefore = true;
                        break;
                    }
                }
                if (!hasUserTaskBefore) {
                    throw new RuntimeException("Gateway " + element.getId() + " must be preceded by a User Task.");
                }
            }
        }



        // Set the execution listener for every end event in the BPMN
        Collection<EndEvent> endEvents = modelInstance.getModelElementsByType(EndEvent.class);
        for (EndEvent endEvent : endEvents) {
            CamundaExecutionListener executionListener = modelInstance.newInstance(CamundaExecutionListener.class);
            if (executionListener.getCamundaClass() == null || executionListener.getCamundaClass() != "com.example.workflow.listener.ProcessCompletionListener" ){
                executionListener.setCamundaClass("com.example.workflow.listener.ProcessCompletionListener");
                endEvent.builder().camundaExecutionListenerClass("end", executionListener.getCamundaClass());
            }
        }

        // Convert the updated BPMN model instance to XML string
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Bpmn.writeModelToStream(outputStream, modelInstance);
        String updatedXmlContent = outputStream.toString();

        if (optionalWorkflow.isPresent()) {
            // Update the existing workflow with the new values
            existingWorkflow.setName(workflow.getName());
            existingWorkflow.setXmlContent(updatedXmlContent);
            existingWorkflow.setXmlName(workflow.getXmlName());

            // Check if there is already a deployment with the same name and xml content
            DeploymentQuery deploymentQuery = repositoryService.createDeploymentQuery()
                    .deploymentName(workflow.getName());
            List<Deployment> deployments = deploymentQuery.list();

            Deployment deploymentUpdate;
            if (!deployments.isEmpty()) {
                deploymentUpdate = deployments.get(0);
                // Update the existing deployment with the new resources
                repositoryService.createDeployment()
                        .name(deploymentUpdate.getName())
                        .addDeploymentResources(deploymentUpdate.getId())
                        .addString(workflow.getXmlName(), updatedXmlContent)
                        .deploy();
            } else {
                // Generate a unique identifier
                String uniqueId = UUID.randomUUID().toString();

                deploymentUpdate = repositoryService.createDeployment()
                        .name(uniqueId + "_" + workflow.getName())
                        .addString(workflow.getXmlName(), updatedXmlContent)
                        .deploy();
            }

            // Set the deployment ID of the existing workflow to the new deployment ID
            existingWorkflow.setDeploymentId(deploymentUpdate.getId());

            /* Save BPMN XML file to resources/static/bpmn folder
            String fileName = workflow.getXmlName() + ".xml";
            File bpmnFile = new File("src/main/resources/static/bpmns", fileName);
            FileWriter writer = new FileWriter(bpmnFile);
            Bpmn.writeModelToFile(bpmnFile, modelInstance);
            writer.close();*/

            return workflowRepository.save(existingWorkflow);
        } else {
            return null;
        }
    }

    /**
     * Deletes the workflow with the given ID.
     * @param id The ID of the workflow to delete.
     */
    public void deleteWorkflow(String id) {
        workflowRepository.deleteById(id);
    }

}
