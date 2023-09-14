package com.example.workflow.repository;

import com.example.workflow.entity.Workflow;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class WorkflowRepositoryTest {

    @Autowired
    private WorkflowRepository workflowRepository;

    @Test
    public void testFindWorkflowByDeploymentId() {
        // Create a sample Workflow entity and save it to the repository
        Workflow workflow = new Workflow();
        workflow.setDeploymentId("123");
        workflowRepository.save(workflow);

        // Call the method under test
        Workflow foundWorkflow = workflowRepository.findWorkflowByDeploymentId("123");

        // Assert that the returned Workflow matches the one saved
        Assertions.assertNotNull(foundWorkflow);
        Assertions.assertEquals(workflow.getDeploymentId(), foundWorkflow.getDeploymentId());
    }

    @Test
    public void testFindByName() {
        // Create a sample Workflow entity and save it to the repository
        Workflow workflow = new Workflow();
        workflow.setName("Sample Workflow");
        workflowRepository.save(workflow);

        // Call the method under test
        Optional<Workflow> foundWorkflow = workflowRepository.findByName("Sample Workflow");

        // Assert that a Workflow is found and its name matches the one saved
        Assertions.assertTrue(foundWorkflow.isPresent());
        Assertions.assertEquals(workflow.getName(), foundWorkflow.get().getName());
    }
}