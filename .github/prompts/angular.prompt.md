---
mode: agent
---
# IMPLEMENTACIÓN DE PRUEBAS PARA ARCHIVO ACTUAL - ANGULAR

# INSTRUCCIONES PARA GENERAR PRUEBAS DEL COMPONENTE ABIERTO

## Contexto

Estas instrucciones se aplican ÚNICAMENTE al archivo que el desarrollador tiene actualmente abierto en el editor.

## Configuración Automatizada para Pruebas

Antes de crear o ejecutar pruebas, asegúrate de instalar las dependencias de desarrollo:

```bash
npm install
```

Antes de crear o ejecutar pruebas, siempre instala las siguientes dependencias y definiciones de tipos (ajusta las versiones según sea necesario):

```bash
npm install --save-dev @angular/core @angular/common @angular/platform-browser-dynamic @angular/compiler karma karma-jasmine karma-chrome-launcher karma-coverage jasmine-core @types/jasmine
```

Si el proyecto usa Jest en lugar de Karma/Jasmine:

```bash
npm install --save-dev jest @types/jest jest-preset-angular ts-jest
```

## Configuración de TypeScript para Pruebas

Asegúrate de que tu `tsconfig.spec.json` incluya:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

## Alcance de las Pruebas

**IMPORTANTE**: Genera pruebas SOLO para el archivo actualmente abierto en el editor.

### Pasos para Analizar el Archivo Actual

1. Identifica el tipo de archivo:
   - Componente Angular (`.component.ts`)
   - Servicio Angular (`.service.ts`)
   - Directiva (`.directive.ts`)
   - Pipe (`.pipe.ts`)
   - Guard (`.guard.ts`)
   - Interceptor (`.interceptor.ts`)
   - Utilidad o helper (`.ts`)
2. Analiza las exportaciones del archivo actual
3. Identifica `@Input()`, `@Output()`, estados internos, y lógica del componente/servicio
4. Determina los casos de prueba necesarios basándose en el código visible

## Patrones de Prueba Robustos para Angular

- Usa `TestBed` para configurar el módulo de prueba
- Usa `fixture.debugElement` para consultas del DOM
- Usa `By.css()` para seleccionar elementos
- Para componentes standalone, usa `imports` en lugar de `declarations`
- Mock de servicios usando `jasmine.createSpyObj` o proveyendo implementaciones falsas

### Ejemplo de configuración básica:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponente } from './mi-componente.component';

describe('MiComponente', () => {
  let component: MiComponente;
  let fixture: ComponentFixture<MiComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Para componentes standalone
      imports: [MiComponente],
      // Para componentes tradicionales
      // declarations: [MiComponente],
      // providers: [...]
    }).compileComponents();

    fixture = TestBed.createComponent(MiComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Estructura del Archivo de Prueba

- Crear el archivo de prueba en la misma ubicación que el archivo original
- Nombrar el archivo como: `[nombre-archivo].spec.ts`
- Ejemplo: `button.component.ts` → `button.component.spec.ts`

## Casos de Prueba a Cubrir

Para el componente/servicio/directiva del archivo actual, genera pruebas que cubran:

1. **Creación básica**: Verifica que el componente/servicio se crea correctamente
2. **@Input()**: Prueba todos los inputs y sus valores por defecto
3. **@Output()**: Prueba que los eventos se emiten correctamente
4. **Propiedades y Estado**: Prueba cambios de estado y actualizaciones
5. **Métodos públicos**: Prueba todos los métodos públicos con diferentes escenarios
6. **Interacciones de usuario**: Clicks, inputs, eventos del DOM
7. **Casos extremos**: Valores nulos, undefined, listas vacías, etc.
8. **Lógica condicional**: Todas las ramas if/else y operadores ternarios
9. **Lifecycle hooks**: ngOnInit, ngOnChanges, ngOnDestroy, etc.
10. **Servicios inyectados**: Mock y prueba de dependencias
11. **Observables**: Prueba suscripciones, emisiones, y manejo de errores
12. **Renderizado condicional**: *ngIf, *ngFor, *ngSwitch
13. **Formularios**: FormControl, FormGroup, validaciones

## Convención de Nomenclatura

Usa el formato Given-When-Then (Dado-Cuando-Entonces) o describe el comportamiento esperado:

```typescript
describe('ComponenteActual', () => {
  describe('cuando se inicializa', () => {
    it('debería tener valores por defecto', () => {
      // prueba aquí
    });
  });

  describe('dado un input específico', () => {
    it('cuando el usuario hace click, entonces debería emitir un evento', () => {
      // prueba aquí
    });
  });
});
```

## Ejemplos de Patrones Comunes

### Testing de @Input()

```typescript
it('debería aceptar y renderizar el input title', () => {
  component.title = 'Test Title';
  fixture.detectChanges();
  const element = fixture.debugElement.nativeElement;
  expect(element.querySelector('h1').textContent).toContain('Test Title');
});
```

### Testing de @Output()

```typescript
it('debería emitir el evento cuando se hace click', () => {
  spyOn(component.clicked, 'emit');
  const button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  expect(component.clicked.emit).toHaveBeenCalledWith(true);
});
```

### Testing de Servicios

```typescript
describe('MiServicio', () => {
  let service: MiServicio;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MiServicio]
    });
    service = TestBed.inject(MiServicio);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería hacer una petición GET', () => {
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

### Testing de Observables

```typescript
it('debería emitir valores del observable', (done) => {
  service.data$.subscribe(value => {
    expect(value).toBe('expected value');
    done();
  });
});
```

### Testing de Formularios Reactivos

```typescript
it('debería validar el formulario', () => {
  component.form.controls['email'].setValue('invalid');
  expect(component.form.valid).toBeFalsy();
  
  component.form.controls['email'].setValue('valid@email.com');
  expect(component.form.valid).toBeTruthy();
});
```

## Flujo de Trabajo

1. Analiza el archivo actualmente abierto
2. Genera un archivo de prueba completo con extensión `.spec.ts`
3. Instala dependencias si es necesario
4. Ejecuta las pruebas:
   - Para un archivo específico: `ng test --include='**/[nombre-archivo].spec.ts'`
   - Para todos los tests: `ng test`
   - Con coverage: `ng test --code-coverage`
5. Si hay errores, ajusta y vuelve a ejecutar

## Restricciones

- ❌ NO analizar otros archivos del proyecto
- ❌ NO crear nuevas funcionalidades o componentes
- ✅ SOLO generar pruebas para el código visible en el archivo actual
- ✅ Usar Jasmine/Karma (o Jest si está configurado) y mejores prácticas de Angular
- ✅ Lograr cobertura completa del archivo actual
- ✅ Incluir imports necesarios automáticamente
- ✅ Mockear dependencias externas (servicios, HttpClient, etc.) cuando sea necesario
- ✅ Usar TestBed correctamente para la configuración del módulo de prueba
- ✅ Llamar a `fixture.detectChanges()` cuando sea necesario para actualizar el DOM
- ✅ Limpiar suscripciones y recursos en `afterEach` si es necesario

## Notas Adicionales

### Para Componentes Standalone (Angular 14+)

```typescript
await TestBed.configureTestingModule({
  imports: [MiComponente, CommonModule, FormsModule]
}).compileComponents();
```

### Para Componentes con Rutas

```typescript
import { RouterTestingModule } from '@angular/router/testing';

await TestBed.configureTestingModule({
  imports: [RouterTestingModule],
  declarations: [MiComponente]
}).compileComponents();
```

### Para Servicios con HttpClient

```typescript
import { HttpClientTestingModule } from '@angular/common/http/testing';

TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],
  providers: [MiServicio]
});
```

### Uso de Signals (Angular 16+)

```typescript
it('debería actualizar el signal', () => {
  component.mySignal.set('new value');
  expect(component.mySignal()).toBe('new value');
});
```
