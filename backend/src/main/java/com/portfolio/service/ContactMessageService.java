package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage submitMessage(ContactMessage message) {
        message.setCreatedAt(ZonedDateTime.now());
        return contactMessageRepository.save(message);
    }
}
