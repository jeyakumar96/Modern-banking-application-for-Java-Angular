package com.example.banking.app.backend.repository;


import com.example.banking.app.backend.entity.Account;
import com.example.banking.app.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccount(Account account);

    List<Transaction> findByAccountOrderByTransactionDateDesc(Account account);

    List<Transaction> findTop10ByAccountOrderByTransactionDateDesc(Account account);

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.transactionDate >= :startDate")
    Long countTransactionsSince(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.transactionDate >= :startDate")
    BigDecimal sumTransactionVolumeSince(@Param("startDate") LocalDateTime startDate);
}
