package com.example.workflow.repository;

import com.example.workflow.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends JpaRepository<Form,String> {
    Form findByFormKey(String formKey);
}
