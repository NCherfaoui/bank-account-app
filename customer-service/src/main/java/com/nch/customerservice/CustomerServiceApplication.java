package com.nch.customerservice;

import com.nch.customerservice.entities.Customer;
import com.nch.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CustomerServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(CustomerServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
		return args -> {
			List<Customer> customerList = List.of(
					Customer.builder()
							.firstName("John")
							.lastName("Doe")
							.email("john@doe")
							.build(),
					Customer.builder()
							.firstName("Jane")
							.lastName("Doe")
							.email("jane@doe")
							.build()
			);
//			Customer customer1 = Customer.builder()
//					.firstName("John")
//					.lastName("Doe")
//					.email("john@doe")
//					.build();
//			customerRepository.save(customer1);
//			Customer customer2 = Customer.builder()
//					.firstName("Jane")
//					.lastName("Doe")
//					.email("jane@doe")
//					.build();
//			customerRepository.save(customer2);
			customerRepository.saveAll(customerList);
		};
	}
}

