package com.nch.accountservice.web;

import com.nch.accountservice.entities.BankAccount;
import com.nch.accountservice.repository.BankAccountRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//@RequestMapping("/api")
public class AccountRestController {
    private BankAccountRepository accountRepository;

    public AccountRestController (BankAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    @GetMapping("/accounts")
    public List<BankAccount> accountList() {
        return accountRepository.findAll();
    }

    @GetMapping("/account/{id}")
    public BankAccount getAccount(@PathVariable String id) {
        return accountRepository.findById(id).get();
    }
}
