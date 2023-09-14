/**
 *
 * This class represents a Camunda BPMN service task for booking a ship place.
 * It implements the JavaDelegate interface, and uses the Camunda delegate
 * execution object to retrieve the amount of money available, and to set the
 * type of ticket to be purchased based on the amount of money.
 */

package com.example.workflow.delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import javax.inject.Named;

@Named
public class BookShipPlace implements JavaDelegate {

    /**
     * This method is called when the service task is executed, and it retrieves
     * the amount of money available from the delegate execution object. It then
     * sets the type of ticket to be purchased based on the amount of money, and
     * stores it in the delegate execution object.
     *
     * @param delegateExecution The delegate execution object used to retrieve and store
     *                          variables during the BPMN process execution.
     * @throws Exception If an error occurs while executing the service task.
     */

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {

        // Get the amount of money available from the delegate execution object.
        String money = "0.0";
        String ticketType = "None";

        money = (String) delegateExecution.getVariable("money");
        double moneyDouble = Double.parseDouble(money);

        // Determine the type of ticket to be purchased based on the amount of money.
        if (moneyDouble >= 10000) {
            ticketType = "First Class";
        } else if (moneyDouble >= 5000) {
            ticketType = "Business Class";
        }

        // Store the type of ticket to be purchased in the delegate execution object.
        delegateExecution.setVariable("ticketType", ticketType);
    }
}