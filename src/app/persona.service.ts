import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personas: Persona[] = [];

  constructor() {
    const storedData = localStorage.getItem('personas');
    if (storedData) {
      this.personas = JSON.parse(storedData);
    }
  }

  private guardarDatosLocalmente(): void {
    localStorage.setItem('personas', JSON.stringify(this.personas));
  }

  getPersonas(): Observable<Persona[]> {
    return of(this.personas);
  }

  getPersonaById(id: number): Observable<Persona | undefined> {
    return of(this.personas.find((persona) => persona.id === id));
  }

  agregarPersona(persona: Persona): void {
    this.personas.push(persona);
    this.guardarDatosLocalmente();
  }

  editarPersona(personaActualizada: Persona): Observable<null> {
    const index = this.personas.findIndex(
      (persona) => persona.id === personaActualizada.id
    );
    if (index !== -1) {
      this.personas[index] = personaActualizada;
      this.guardarDatosLocalmente();
      return of(null).pipe(
        catchError(() => throwError('Error al editar la persona'))
      );
    } else {
      return throwError('No se encontró la persona a editar');
    }
  }

  eliminarPersona(id: number): void {
    this.personas = this.personas.filter((persona) => persona.id !== id);
    this.guardarDatosLocalmente();
  }
}
