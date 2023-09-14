package com.example.workflow.repository;

import com.example.workflow.entity.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface WorkflowRepository extends JpaRepository<Workflow,String> {
    Workflow findWorkflowByDeploymentId(String deploymentId);
    Optional<Workflow> findByName(String name);
}
