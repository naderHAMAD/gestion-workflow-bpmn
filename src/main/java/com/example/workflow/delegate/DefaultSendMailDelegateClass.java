package com.example.workflow.delegate;

import javax.inject.Named;


import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Named
public class DefaultSendMailDelegateClass implements JavaDelegate {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        String recipientAddress = "nader.hamad@esprit.tn";
        String taskName = execution.getCurrentActivityName();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientAddress);
        message.setSubject(taskName);
        message.setText("The task '" + taskName + "' has been reached.");

        javaMailSender.send(message);
    }
}