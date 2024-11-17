import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat-message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  userId: string = '';
  otherUserId: string = '';
  messageList: any[] = [];

  private roomId: string = '';

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.userId = this.route.snapshot.paramMap.get('userId') as string;
    this.userId = localStorage.getItem('userId') || '';
    console.log(this.userId);

    if (!this.userId) {
      console.error(
        'El ID del usuario no está disponible en el almacenamiento local.'
      );
      alert('Debe iniciar sesión nuevamente.');
      return;
    }

    this.roomId = this.route.snapshot.paramMap.get('roomId') || '';
    console.log(`Usuario actual: ${this.userId}, Room ID: ${this.roomId}`);

    if (!this.roomId) {
      console.error('No se proporcionó un Room ID en la ruta.');
      alert('El chat no se puede inicializar sin un Room ID.');
      return;
    }

    this.chatService.joinRoom(this.roomId);

    this.listenToMessages();
  }

  sendMessage(): void {
    if (!this.messageInput.trim()) {
      console.warn('El mensaje está vacío. No se enviará.');
      return;
    }

    const chatMessage: ChatMessage = {
      message: this.messageInput.trim(),
      user: this.userId,
    };

    this.chatService.sendMessage(this.roomId, chatMessage);
    this.messageInput = '';
    console.log('Mensaje enviado:', chatMessage);
  }

  listenToMessages(): void {
    this.chatService
      .getMessageSubject()
      .subscribe((messages: ChatMessage[]) => {
        this.messageList = messages.map((item: ChatMessage) => ({
          ...item,
          message_side: item.user === this.userId ? 'sender' : 'receiver',
        }));
        console.log('Mensajes actualizados:', this.messageList);

        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
