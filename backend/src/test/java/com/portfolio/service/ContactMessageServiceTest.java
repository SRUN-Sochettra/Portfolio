package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContactMessageServiceTest {

    @Mock
    private ContactMessageRepository contactMessageRepository;

    @InjectMocks
    private ContactMessageService contactMessageService;

    @Test
    void submitMessage_setsCreatedAtAndSaves() {
        ContactMessage input = new ContactMessage();
        input.setName("John Doe");
        input.setEmail("john@example.com");
        input.setMessage("Hello, this is a test message.");

        when(contactMessageRepository.save(any(ContactMessage.class)))
                .thenAnswer(invocation -> {
                    ContactMessage saved = invocation.getArgument(0);
                    saved.setId(1);
                    return saved;
                });

        ContactMessage result = contactMessageService.submitMessage(input);

        assertThat(result.getId()).isEqualTo(1);
        assertThat(result.getCreatedAt()).isNotNull();

        ArgumentCaptor<ContactMessage> captor = ArgumentCaptor.forClass(ContactMessage.class);
        verify(contactMessageRepository).save(captor.capture());
        assertThat(captor.getValue().getCreatedAt()).isNotNull();
    }
}
