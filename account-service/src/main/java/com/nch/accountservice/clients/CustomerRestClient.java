package com.nch.accountservice.clients;

import com.nch.accountservice.model.Customer;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping("/customers/{id}")
    @CircuitBreaker(name = "customerService", fallbackMethod = "getDefaultCustomer")
    Customer findCustomerById(@PathVariable Long id);
    @GetMapping("/customers")
    @CircuitBreaker(name = "customerService", fallbackMethod = "allCustomers")
    List<Customer> allCustomers();

    default Customer getDefaultCustomer(Long id, Exception e) {
       Customer customer = new Customer();
         customer.setId(id);
         customer.setFirstName("Not Vailable");
         customer.setLastName("Not Vailable");
         customer.setEmail("Not Vailable");
         return customer;
    }

    default List<Customer> allCustomers(Exception e) {
        return List.of();
    }

}
