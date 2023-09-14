/**
 * Represents a form that can be filled out by a user.
 * A form entity contains information about the form's content
 * key, type, and any associated form data.
 */

package com.example.workflow.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Form {
    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFormContent() {
		return formContent;
	}
	public void setFormContent(String formContent) {
		this.formContent = formContent;
	}
	public String getFormKey() {
		return formKey;
	}
	public void setFormKey(String formKey) {
		this.formKey = formKey;
	}
	public String getFormType() {
		return formType;
	}
	public void setFormType(String formType) {
		this.formType = formType;
	}
	public List<FormData> getFormDataList() {
		return formDataList;
	}
	public void setFormDataList(List<FormData> formDataList) {
		this.formDataList = formDataList;
	}
	@Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    @Column(name = "form_content", length = 1000000)
    private String formContent;
    @Column(name = "form_key", length = 10000)
    private String formKey;
    private String formType;
    @OneToMany(mappedBy = "form")
    private List<FormData> formDataList;
}
