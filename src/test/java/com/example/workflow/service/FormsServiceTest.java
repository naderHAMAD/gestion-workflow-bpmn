package com.example.workflow.service;

import com.example.workflow.entity.Form;
import com.example.workflow.entity.FormData;
import com.example.workflow.repository.FormDataRepository;
import com.example.workflow.repository.FormRepository;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class FormsServiceTest {

    @Mock
    private FormRepository formRepository;


    @InjectMocks
    private FormsService formsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveForm_ValidForm_ReturnsSavedForm() {
        // Arrange
        Form form = new Form();
        when(formRepository.save(form)).thenReturn(form);

        // Act
        Form savedForm = formsService.saveForm(form);

        // Assert
        assertNotNull(savedForm);
        assertEquals(form, savedForm);
        verify(formRepository, times(1)).save(form);
    }

    @Test
    void getForm_ExistingFormId_ReturnsFormOptional() {
        // Arrange
        String formId = "1";
        Form form = new Form();
        when(formRepository.findById(formId)).thenReturn(Optional.of(form));

        // Act
        Optional<Form> retrievedForm = formsService.getForm(formId);

        // Assert
        assertTrue(retrievedForm.isPresent());
        assertEquals(form, retrievedForm.get());
        verify(formRepository, times(1)).findById(formId);
    }

    @Test
    void getForm_NonExistingFormId_ThrowsIllegalArgumentException() {
        // Arrange
        String formId = "1";
        when(formRepository.findById(formId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> formsService.getForm(formId));
        verify(formRepository, times(1)).findById(formId);
    }

    @Test
    void deleteFormById_ExistingFormId_FormDeleted() {
        // Arrange
        String formId = "1";
        Form form = new Form();
        when(formRepository.findById(formId)).thenReturn(Optional.of(form));

        // Act
        formsService.deleteFormById(formId);

        // Assert
        verify(formRepository, times(1)).findById(formId);
        verify(formRepository, times(1)).delete(form);
    }

    @Test
    void getAllForms_ExistingForms_ReturnsListOfForms() {
        // Arrange
        List<Form> forms = new ArrayList<>();
        forms.add(new Form());
        forms.add(new Form());
        when(formRepository.findAll()).thenReturn(forms);

        // Act
        List<Form> allForms = formsService.getAllForms();

        // Assert
        assertNotNull(allForms);
        assertEquals(forms, allForms);
        verify(formRepository, times(1)).findAll();
    }

    @Test
    void getFormContentByFormKey_ExistingFormKey_ReturnsFormContent() throws NotFoundException {
        // Arrange
        String formKey = "testForm";
        Form form = new Form();
        form.setFormContent("Test form content");
        when(formRepository.findByFormKey(formKey)).thenReturn(form);

        // Act
        String formContent = formsService.getFormContentByFormKey(formKey);

        // Assert
        assertNotNull(formContent);
        assertEquals(form.getFormContent(), formContent);
        verify(formRepository, times(1)).findByFormKey(formKey);
    }

    @Test
    void getFormContentByFormKey_NonExistingFormKey_ThrowsNotFoundException() throws NotFoundException {
        // Arrange
        String formKey = "nonExistingForm";
        when(formRepository.findByFormKey(formKey)).thenReturn(null);

        // Act & Assert
        assertThrows(NotFoundException.class, () -> formsService.getFormContentByFormKey(formKey));
        verify(formRepository, times(1)).findByFormKey(formKey);
    }

}