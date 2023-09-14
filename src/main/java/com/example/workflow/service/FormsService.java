package com.example.workflow.service;

import com.example.workflow.entity.Form;

import com.example.workflow.entity.FormData;
import com.example.workflow.repository.FormDataRepository;
import com.example.workflow.repository.FormRepository;

import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormsService {

    @Autowired
    private FormRepository formRepository;
    @Autowired
    private FormDataRepository formDataRepository;


    /**
     * Saves a new Form entity to the database.
     * @param form The Workflow entity to be saved.
     * @return The saved Workflow entity.
     */
    public Form saveForm(Form form) {
        return formRepository.save(form);
    }

    /**
     * Gets a Form  entity by ID.
     * @param formId The ID of the Form entity.
     * @return The Form entity with the given ID.
     */
    public Optional<Form> getForm(String formId) {
        Optional<Form> form = formRepository.findById(formId);
        if (!form.isPresent()) {
            throw new IllegalArgumentException("Form not found for id: " + formId);
        }
        return form;
    }

    /**
     * Saves a new Form entity .
     * @param form The Form entity to be saved .
     * @return The saved Form entity.
     * @throws IOException If there is an error writing the JSON content to a file.
     */
    public Form saveFormJson (Form form) throws IOException {

        /* Save form.Content to an .form file in the specified path
        File jsonFile = new File("src/main/resources/static/forms", form.getFormKey() + ".json");
        FileWriter writer = new FileWriter(jsonFile);
        writer.write(form.getFormContent());
        writer.close();*/

        // Save form entity in database
        return formRepository.save(form);
    }

    /**
     * Deletes a form instance by ID.
     * @param id the ID of the form to delete
     */
    public void deleteFormById(String id) {
        Optional<Form> form = formRepository.findById(id);
        form.ifPresent(formRepository::delete);
    }

    /**
     * update a form  .
     * @param form the Form Object to update
     */
    public Form updateForm(Form form) throws IOException {

        /* Save form.Content to an .form file in the specified path
        File jsonFile = new File("src/main/resources/static/forms", form.getFormKey() + ".json");
        FileWriter writer = new FileWriter(jsonFile);
        writer.write(form.getFormContent());
        writer.close();*/
        return formRepository.save(form);
    }

    /**
     * Gets all Form entities from the database.
     * @return A list of all Form entities in the database.
     */
    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    /**
     * Get a form content from the database by formKey.
     * @param formKey to get the appropriate from .
     * @return formContent of the form .
     * @throws NotFoundException If there is an error while getting formContent .
     */
    public String getFormContentByFormKey(String formKey) throws NotFoundException {
        Form form = formRepository.findByFormKey(formKey);
        if (form == null) {
            throw new NotFoundException("Form not found for form key: " + formKey);
        }
        return form.getFormContent();
    }

    /**
     * Saves the form data to the database.
     *  @param formKey the form key used to retrieve the form entity from the database
     * @param formDataJson the data submitted by the user
     * @return
     */
    public FormData saveFormData(String formKey, String formDataJson) throws NotFoundException {
        Form form = formRepository.findByFormKey(formKey);
        if (form == null) {
            throw new NotFoundException("Form not found for key: " + formKey);
        }

        FormData formData = new FormData();
        formData.setForm(form);
        formData.setData(formDataJson);
        return formDataRepository.save(formData);
    }
}
