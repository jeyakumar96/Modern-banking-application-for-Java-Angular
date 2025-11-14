package com.example.banking.app.backend.service;


import com.example.banking.app.backend.dto.TransactionRequest;
import com.example.banking.app.backend.dto.TransactionResponse;
import com.example.banking.app.backend.entity.Account;
import com.example.banking.app.backend.entity.Transaction;
import com.example.banking.app.backend.repository.AccountRepository;
import com.example.banking.app.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public TransactionResponse deposit(TransactionRequest request) {
        Account account = accountRepository.findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        BigDecimal balanceBefore = account.getBalance();
        BigDecimal newBalance = balanceBefore.add(request.getAmount());
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setAccount(account);
        transaction.setType(Transaction.TransactionType.DEPOSIT);
        transaction.setAmount(request.getAmount());
        transaction.setBalanceBefore(balanceBefore);
        transaction.setBalanceAfter(newBalance);
        transaction.setDescription(request.getDescription() != null ? request.getDescription() : "Deposit");

        Transaction savedTransaction = transactionRepository.save(transaction);
        return mapToTransactionResponse(savedTransaction);
    }

    @Transactional
    public TransactionResponse withdraw(TransactionRequest request) {
        Account account = accountRepository.findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        BigDecimal balanceBefore = account.getBalance();
        BigDecimal newBalance = balanceBefore.subtract(request.getAmount());
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setAccount(account);
        transaction.setType(Transaction.TransactionType.WITHDRAWAL);
        transaction.setAmount(request.getAmount());
        transaction.setBalanceBefore(balanceBefore);
        transaction.setBalanceAfter(newBalance);
        transaction.setDescription(request.getDescription() != null ? request.getDescription() : "Withdrawal");

        Transaction savedTransaction = transactionRepository.save(transaction);
        return mapToTransactionResponse(savedTransaction);
    }

    @Transactional
    public TransactionResponse transfer(TransactionRequest request) {
        Account fromAccount = accountRepository.findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("From account not found"));

        Account toAccount = accountRepository.findByAccountNumber(request.getToAccountNumber())
                .orElseThrow(() -> new RuntimeException("To account not found"));

        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        // Debit from sender
        BigDecimal fromBalanceBefore = fromAccount.getBalance();
        BigDecimal fromNewBalance = fromBalanceBefore.subtract(request.getAmount());
        fromAccount.setBalance(fromNewBalance);
        accountRepository.save(fromAccount);

        // Credit to receiver
        BigDecimal toBalanceBefore = toAccount.getBalance();
        BigDecimal toNewBalance = toBalanceBefore.add(request.getAmount());
        toAccount.setBalance(toNewBalance);
        accountRepository.save(toAccount);

        // Create transfer out transaction
        Transaction transferOut = new Transaction();
        transferOut.setTransactionId(generateTransactionId());
        transferOut.setAccount(fromAccount);
        transferOut.setType(Transaction.TransactionType.TRANSFER_OUT);
        transferOut.setAmount(request.getAmount());
        transferOut.setBalanceBefore(fromBalanceBefore);
        transferOut.setBalanceAfter(fromNewBalance);
        transferOut.setToAccountNumber(toAccount.getAccountNumber());
        transferOut.setDescription(request.getDescription() != null ? request.getDescription()
                : "Transfer to " + toAccount.getAccountNumber());
        transactionRepository.save(transferOut);

        // Create transfer in transaction
        Transaction transferIn = new Transaction();
        transferIn.setTransactionId(generateTransactionId());
        transferIn.setAccount(toAccount);
        transferIn.setType(Transaction.TransactionType.TRANSFER_IN);
        transferIn.setAmount(request.getAmount());
        transferIn.setBalanceBefore(toBalanceBefore);
        transferIn.setBalanceAfter(toNewBalance);
        transferIn.setFromAccountNumber(fromAccount.getAccountNumber());
        transferIn.setDescription(request.getDescription() != null ? request.getDescription()
                : "Transfer from " + fromAccount.getAccountNumber());
        transactionRepository.save(transferIn);

        return mapToTransactionResponse(transferOut);
    }

    public List<TransactionResponse> getTransactionsByAccountNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return transactionRepository.findByAccountOrderByTransactionDateDesc(account)
                .stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());
    }

    public List<TransactionResponse> getRecentTransactions(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return transactionRepository.findTop10ByAccountOrderByTransactionDateDesc(account)
                .stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());
    }

    private String generateTransactionId() {
        return "TXN" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
    }

    private TransactionResponse mapToTransactionResponse(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getTransactionId(),
                transaction.getType().name(),
                transaction.getAmount(),
                transaction.getBalanceBefore(),
                transaction.getBalanceAfter(),
                transaction.getAccount().getAccountNumber(),
                transaction.getToAccountNumber(),
                transaction.getFromAccountNumber(),
                transaction.getDescription(),
                transaction.getTransactionDate());
    }
}
