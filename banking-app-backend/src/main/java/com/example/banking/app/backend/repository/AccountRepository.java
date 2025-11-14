package com.example.banking.app.backend.repository;


import com.example.banking.app.backend.entity.Account;
import com.example.banking.app.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findByUser(User user);

    List<Account> findByUserId(Long userId);

    Boolean existsByAccountNumber(String accountNumber);

    Long countByActive(Boolean active);

    @Query("SELECT SUM(a.balance) FROM Account a WHERE a.active = true")
    BigDecimal sumTotalDeposits();
}
