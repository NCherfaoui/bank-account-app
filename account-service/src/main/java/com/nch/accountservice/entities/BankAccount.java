package com.nch.accountservice.entities;

import com.nch.accountservice.enums.AccountType;
import com.nch.accountservice.model.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity @Setter @Getter @ToString @NoArgsConstructor @AllArgsConstructor @Builder
public class BankAccount {
    @Id
    private String accountId;
    private double balance;
    private LocalDate createdAt;
    private String currency;
    @Enumerated(EnumType.STRING)
    private AccountType type;
// Cutomer c'est dans un autre microservice donc on ne peut pas le mettre en tant qu'attribut
    @Transient
    private Customer customer;
    private Long customerId;

}
