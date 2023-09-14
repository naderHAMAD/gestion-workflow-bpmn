package com.example.workflow.listener;

import com.example.workflow.entity.WorkflowProcessInstance;
import com.example.workflow.repository.WorkflowProcessInstanceRepository;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProcessCompletionListener implements ExecutionListener {

    @Autowired
    private WorkflowProcessInstanceRepository workflowProcessInstanceRepository;

    public ProcessCompletionListener() {}

    @Override
    public void notify(DelegateExecution execution) throws Exception {
        String processInstanceId = execution.getProcessInstanceId();
        WorkflowProcessInstance workflowProcessInstance = workflowProcessInstanceRepository.findByProcessInstanceId(processInstanceId);
        if (workflowProcessInstance != null) {
            workflowProcessInstance.setStatus("COMPLETED");
            workflowProcessInstanceRepository.save(workflowProcessInstance);
        }
    }
}
