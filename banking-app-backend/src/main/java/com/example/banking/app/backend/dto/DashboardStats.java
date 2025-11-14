package com.example.banking.app.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private Long totalCustomers;
    private Long totalAccounts;
    private Long activeAccounts;
    private BigDecimal totalDeposits;
    private Long totalTransactions;
    private Long todayTransactions;
    private BigDecimal todayTransactionVolume;
}
