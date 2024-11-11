package com.nch.accountservice;

import com.nch.accountservice.clients.CustomerRestClient;
import com.nch.accountservice.entities.BankAccount;
import com.nch.accountservice.enums.AccountType;
import com.nch.accountservice.repository.BankAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class AccountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(BankAccountRepository accountRepository, CustomerRestClient customerRestClient) {
		return args -> {
			customerRestClient.allCustomers().forEach(customer -> {
				List<BankAccount> accountList = List.of(
						BankAccount.builder()
								.accountId(UUID.randomUUID().toString())
								.currency("EUR")
								.customerId(customer.getId())
								.balance(Math.random()*80000)
								.createdAt(LocalDate.now())
								.type(AccountType.CURRENT_ACCOUNT)
								.build(),
						BankAccount.builder()
								.accountId(UUID.randomUUID().toString())
								.currency("EUR")
								.customerId(customer.getId())
								.balance(Math.random()*65400)
								.createdAt(LocalDate.now())
								.type(AccountType.SAVING_ACCOUNT)
								.build()
				);
				accountRepository.saveAll(accountList);
			});
		};
/*	return args -> {
			List<BankAccount> accountList = List.of(
					BankAccount.builder()
							.accountId(UUID.randomUUID().toString())
							.currency("EUR")
							.customerId(Long.valueOf(1))
							.balance(9800)
							.createdAt(LocalDate.now())
							.type(AccountType.CURRENT_ACCOUNT)
							.build(),
					BankAccount.builder()
							.accountId(UUID.randomUUID().toString())
							.currency("USD")
							.customerId(Long.valueOf(2))
							.balance(0)
							.createdAt(LocalDate.now())
							.type(AccountType.SAVING_ACCOUNT)
							.build()
			);
			accountRepository.saveAll(accountList);
		};
	}
*/
	};


}
