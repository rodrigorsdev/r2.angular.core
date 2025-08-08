import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { UserGetResponseDto } from "../dtos/user-get-response.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users: UserGetResponseDto[] = [
        {
            id: '1',
            name: 'João Silva',
            email: 'joao@exemplo.com',
            birthDate: new Date(1990, 4, 15)
        },
        {
            id: '2',
            name: 'Maria Souza',
            email: 'maria@exemplo.com',
            birthDate: new Date(1985, 7, 22)
        },
        {
            id: '3',
            name: 'Carlos Oliveira',
            email: 'carlos@exemplo.com',
            birthDate: new Date(1995, 2, 10)
        }
    ];
    private lastId = 3;

    constructor() { }

    list(): Observable<UserGetResponseDto[]> {
        // Simula delay de rede
        return of([...this.users]).pipe(delay(500));
    }

    register(user: Omit<UserGetResponseDto, 'id'>): Observable<UserGetResponseDto> {
        // Simula criação com ID incremental
        const newUser: UserGetResponseDto = {
            ...user,
            id: (++this.lastId).toString()
        };
        this.users.push(newUser);
        return of(newUser).pipe(delay(300));
    }

    update(user: UserGetResponseDto): Observable<UserGetResponseDto> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index >= 0) {
            this.users[index] = user;
        }
        return of(user).pipe(delay(300));
    }

    delete(id: string): Observable<void> {
        this.users = this.users.filter(user => user.id !== id);
        return of(void 0).pipe(delay(300));
    }

    resetMockData(): void {
        this.users = [
            {
                id: '1',
                name: 'João Silva',
                email: 'joao@exemplo.com',
                birthDate: new Date(1990, 4, 15)
            },
            {
                id: '2',
                name: 'Maria Souza',
                email: 'maria@exemplo.com',
                birthDate: new Date(1985, 7, 22)
            },
            {
                id: '3',
                name: 'Carlos Oliveira',
                email: 'carlos@exemplo.com',
                birthDate: new Date(1995, 2, 10)
            }
        ];
        this.lastId = 3;
    }
}