import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css'],
})
export class ListaPersonasComponent implements OnInit {
  personas: Persona[] = [];
  personaForm: FormGroup;

  constructor(
    private personaService: PersonaService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.personaService
      .getPersonas()
      .subscribe((personas) => (this.personas = personas));
  }

  /**
   * Agrega una nueva persona utilizando los datos del formulario si este es válido.
   * Genera un ID aleatorio para la nueva persona.
   * Si se agrega la persona correctamente, reinicia el formulario y actualiza la lista de personas.
   * @returns {void}
   */
  agregarPersona(): void {
    if (this.personaForm.valid) {
      const nuevaPersona: Persona = {
        id: Math.floor(Math.random() * 1000),
        nombre: this.personaForm.value.nombre,
        apellido: this.personaForm.value.apellido,
        edad: this.personaForm.value.edad,
      };
      this.personaService.agregarPersona(nuevaPersona);
      this.personaForm.reset();
      this.obtenerPersonas();
    }
  }

  editarPersona(id: number): void {
    this.router.navigate(['/editar-persona', id]);
  }

  eliminarPersona(id: number): void {
    this.personaService.eliminarPersona(id);
    this.personas = this.personas.filter((persona) => persona.id !== id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
