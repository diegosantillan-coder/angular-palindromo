import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-palindrome-checker',
  standalone: true,
  template: `
    <div class="palindrome-checker">
      <h2>Verificador de Palíndromos</h2>
      <input [value]="text()" (input)="onInputChange($event)" placeholder="Escribe un texto" />
      <button (click)="checkPalindrome()">Verificar</button>
      @if (result() !== null) {
        <div class="result">
          @if (result()) {
            <span class="success">¡Es palíndromo!</span>
          } @else {
            <span class="error">No es palíndromo.</span>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .palindrome-checker {
      margin: 2rem auto;
      max-width: 400px;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #f9f9f9;
      text-align: center;
    }
    input {
      width: 80%;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
    }
    div {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    .result {
      margin-top: 1rem;
    }
    .success {
      color: green;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
  `]
})
export class PalindromeCheckerComponent {
  text: WritableSignal<string> = signal('');
  result: WritableSignal<boolean | null> = signal(null);

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.text.set(input.value);
  }

  checkPalindrome() {
    const value = this.text().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    this.result.set(value.length > 0 && value === value.split('').reverse().join(''));
  }
}
