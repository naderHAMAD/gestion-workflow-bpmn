/**
 *
 * Represents form data that is submitted by a user.
 * A form data entity contains information about the submitted data,
 * such as the ID of the user who submitted it, the actual data, and the form that the data belongs to.
 */

package com.example.workflow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class FormData {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String data;
    @JsonIgnore // Ignore the user field during JSON serialization
    @ManyToOne(fetch = FetchType.LAZY)
    private Form form;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public Form getForm() {
		return form;
	}
	public void setForm(Form form) {
		this.form = form;
	}
    
}
