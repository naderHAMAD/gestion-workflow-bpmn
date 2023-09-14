package com.example.workflow.controller;

import com.example.workflow.entity.Form;
import com.example.workflow.entity.FormData;
import com.example.workflow.service.FormsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/form")
@Api(value = "Form API" , tags = {"Form"})
@CrossOrigin(origins = "http://localhost:4200")
public class FormController {

    private final FormsService formsService;

    public FormController(FormsService formsService) {
        this.formsService = formsService;
    }

    @ApiOperation(value = "Get a Form by ID", response = Form.class)
    @GetMapping("/get/{id}")
    public ResponseEntity<Form> getFormById(@PathVariable String id) {
        Optional<Form> form = formsService.getForm(id);
        if (form.isPresent()) {
            return ResponseEntity.ok(form.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ApiOperation(value = "Save a new Form", response = Form.class)
    @PostMapping("/save/json")
    public ResponseEntity<Form> createForm(@RequestBody Form form) throws IOException {
        Form createdForm = formsService.saveFormJson(form);
        return ResponseEntity.created(URI.create("/forms/" + createdForm.getId())).body(createdForm);
    }


    @ApiOperation(value = "Delete a Form by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFormById(@PathVariable String id) {
        formsService.deleteFormById(id);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "Update a Form")
    @PutMapping("/update/{id}")
    public ResponseEntity<Form> updateForm(@PathVariable("id") String id, @RequestBody Form form) throws IOException {
        if (!id.equals(form.getId())) {
            return ResponseEntity.badRequest().build();
        }
        Form updatedForm = formsService.updateForm(form);
        return ResponseEntity.ok(updatedForm);
    }

    @ApiOperation(value = "Get all Forms", response = List.class)
    @GetMapping("/get/all")
    public List<Form> getAllJsonForms() {
        return formsService.getAllForms();
    }

    @ApiOperation(value = "Get form Content", response = Form.class)
    @GetMapping("/content/{formKey}")
    public ResponseEntity<String> getFormContent(@PathVariable String formKey) throws NotFoundException {
        String formContent = formsService.getFormContentByFormKey(formKey);
        if (formContent == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(formContent);
    }

    @PostMapping("/form-data/{formKey}")
    public ResponseEntity<?> saveFormData(@PathVariable String formKey, @RequestBody String formDataJson, HttpServletResponse response) throws IOException {
        try {
            formsService.saveFormData(formKey, formDataJson);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            if (response.isCommitted()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            } else {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to save form data");
                return null;
            }
        }
    }
}
