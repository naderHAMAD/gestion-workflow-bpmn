package com.example.workflow.repository;

import com.example.workflow.entity.Form;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FormRepositoryTest {

    @Mock
    private FormRepository formRepository;

    @Test
    void findByFormKey_ValidFormKey_ReturnsForm() {
        // Arrange
        String formKey = "testForm";
        Form expectedForm = new Form();
        expectedForm.setFormKey(formKey);
        when(formRepository.findByFormKey(formKey)).thenReturn(expectedForm);

        // Act
        Form actualForm = formRepository.findByFormKey(formKey);

        // Assert
        assertEquals(expectedForm, actualForm);
        verify(formRepository).findByFormKey(formKey);
    }
}