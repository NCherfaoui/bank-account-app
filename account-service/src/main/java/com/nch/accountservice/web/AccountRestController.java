package com.nch.accountservice.web;

import com.nch.accountservice.clients.CustomerRestClient;
import com.nch.accountservice.entities.BankAccount;
import com.nch.accountservice.model.Customer;
import com.nch.accountservice.repository.BankAccountRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@RequestMapping("/api")
public class AccountRestController {
    private final BankAccountRepository accountRepository;
    private final CustomerRestClient customerRestClient;

    public AccountRestController (BankAccountRepository accountRepository, CustomerRestClient customerRestClient) {
        this.accountRepository = accountRepository;
        this.customerRestClient = customerRestClient;
    }
    @GetMapping("/accounts")
    public List<BankAccount> accountList() {
        List<BankAccount> bankAccounts = accountRepository.findAll();
        bankAccounts.forEach(bankAccount -> {
            Customer customer = customerRestClient.findCustomerById(bankAccount.getCustomerId());
            bankAccount.setCustomer(customer);      });
        return bankAccounts;
    }

    @GetMapping("/accounts/{id}")
    public BankAccount bankAccount(@PathVariable String id) {
        BankAccount bankAccount = accountRepository.findById(id).get();
        Customer customer = customerRestClient.findCustomerById(bankAccount.getCustomerId());
        bankAccount.setCustomer(customer);
        return bankAccount;
    }
}
