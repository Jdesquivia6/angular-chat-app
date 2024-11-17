import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ChangeDetectorRef } from '@angular/core'; // Importamos ChangeDetectorRef

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent implements OnInit {
  otherUserId: string = '';
  userId: string = '';
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      alert(
        'No se encontró el ID del usuario. Por favor, inicie sesión nuevamente.'
      );
      this.router.navigate(['/login']);
    } else {
      console.log('ID del usuario actual:', this.userId);
    }

    this.listUsers();
  }

  listUsers(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (response: User[]) => {
        this.users = response;
        this.cdRef.detectChanges();
      },
      (error: any) => {
        console.log('Error al obtener usuarios: ', error.message);
      }
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.otherUserId = user.id;
    console.log('Usuario seleccionado:', this.selectedUser);
  }

  startChat(): void {
    if (!this.otherUserId.trim()) {
      alert('Por favor, ingrese un ID válido para iniciar el chat.');
      return;
    }
    const roomId = this.getRoomId(this.userId, this.otherUserId);
    console.log(`Iniciando chat en el roomId: ${roomId}`);
    this.router.navigate(['/chat', roomId]);
  }

  private getRoomId(id1: string, id2: string): string {
    return [id1, id2].sort().join('-');
  }
}
