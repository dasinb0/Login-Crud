import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
})
export class EditarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  persona: Persona = { id: 0, nombre: '', apellido: '', edad: 0 };
  datosModificados = false;

  constructor(
    private route: ActivatedRoute,
    private personaService: PersonaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
    });
    this.personaForm.valueChanges.subscribe(() => {
      this.datosModificados = true;
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const personaId = +idParam;
      this.obtenerPersona(personaId);
    }
  }

  /**
   * Obtiene los datos de una persona por su ID.
   * @param {number} id - El ID de la persona.
   * @returns {void}
   */
  obtenerPersona(id: number): void {
    this.personaService.getPersonaById(id).subscribe((persona) => {
      if (persona) {
        this.persona = persona;
        this.personaForm.patchValue({
          nombre: persona.nombre,
          apellido: persona.apellido,
          edad: persona.edad,
        });
      } else {
        console.error('No se encontró la persona');
        this.snackBar.open('La persona no se encontró', 'Cerrar', {
          duration: 2000,
        });
        this.router.navigateByUrl('/lista-personas');
      }
    });
  }

  /**
   * Guarda los cambios realizados en los datos de la persona si el formulario es válido y los datos han sido modificados.
   * Si se guardan los cambios correctamente, muestra un mensaje de confirmación y redirige a la lista de personas.
   * Si ocurre un error al guardar los cambios, muestra un mensaje de error.
   * Si no se han realizado cambios o el formulario no es válido, muestra un mensaje indicando la situación.
   * @returns {void}
   */
  guardarCambios(): void {
    if (this.personaForm.valid && this.datosModificados) {
      const personaActualizada: Persona = {
        ...this.persona,
        nombre: this.personaForm.value.nombre,
        apellido: this.personaForm.value.apellido,
        edad: this.personaForm.value.edad,
      };
      this.personaService.editarPersona(personaActualizada).subscribe(
        () => {
          this.snackBar.open('Persona actualizada correctamente', 'Cerrar', {
            duration: 2000,
          });
          this.router.navigate(['/lista-personas']);
        },
        (error) => {
          console.error('Error al editar persona:', error);
          this.snackBar.open('Error al actualizar persona', 'Cerrar', {
            duration: 2000,
          });
        }
      );
    } else {
      this.snackBar.open(
        'No se han realizado cambios o el formulario no es válido',
        'Cerrar',
        { duration: 2000 }
      );
    }
  }

  volverAListaPersonas(): void {
    this.router.navigate(['/lista-personas']);
  }
}
