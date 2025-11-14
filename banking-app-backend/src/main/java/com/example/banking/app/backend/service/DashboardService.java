package com.example.banking.app.backend.service;


import com.example.banking.app.backend.dto.DashboardStats;
import com.example.banking.app.backend.entity.User;
import com.example.banking.app.backend.repository.AccountRepository;
import com.example.banking.app.backend.repository.TransactionRepository;
import com.example.banking.app.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public DashboardStats getAdminDashboardStats() {
        Long totalCustomers = userRepository.findByRole(User.Role.CUSTOMER).stream().count();
        Long totalAccounts = accountRepository.count();
        Long activeAccounts = accountRepository.countByActive(true);
        BigDecimal totalDeposits = accountRepository.sumTotalDeposits();
        if (totalDeposits == null)
            totalDeposits = BigDecimal.ZERO;

        Long totalTransactions = transactionRepository.count();

        LocalDateTime startOfToday = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        Long todayTransactions = transactionRepository.countTransactionsSince(startOfToday);
        BigDecimal todayVolume = transactionRepository.sumTransactionVolumeSince(startOfToday);
        if (todayVolume == null)
            todayVolume = BigDecimal.ZERO;

        return new DashboardStats(
                totalCustomers,
                totalAccounts,
                activeAccounts,
                totalDeposits,
                totalTransactions,
                todayTransactions,
                todayVolume);
    }
}
