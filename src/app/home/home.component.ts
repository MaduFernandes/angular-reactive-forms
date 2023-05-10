import { IPlanoAcao } from './../interfaces/plano-acao.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup
  estadoPanel: boolean = true;

  planosAcoes: IPlanoAcao[] = [
    {
      descPlanoAcao: "Encaminhar os produtos para a reciclagem.",
      acao: "Reciclagem dos produtos."
    },
    {
      descPlanoAcao: "Contratar mais 10 funcionários.",
      acao: "Contratar funcionários."
    }
  ]

  constructor(private formBuilder: FormBuilder) { }

  get planoAcaoForm() {
    return this.form.controls['planoAcao'] as FormArray;
  }

  ngOnInit() {
    this.construirFormulario();

    if(this.planosAcoes.length > 0) {
      this.planosAcoes.forEach((planoAcao) => {
        const data = this.formBuilder.group({
          descPlanoAcao: [planoAcao.descPlanoAcao, Validators.required],
          acao: [planoAcao.acao, Validators.required]
        })
        this.planoAcaoForm.push(data)
      })
    }
  }

  construirFormulario(): void {
    this.form = this.formBuilder.group({
      planoAcao: this.formBuilder.array([
       this.formBuilder.group({
           descPlanoAcao: ['', Validators.required],
           acao: [ '', Validators.required]
        })
      ])
    })
  }

  adicionarPlanoAcao(): void {
    const planoAcaoForm = this.construirPlanoAcaoForm()
    this.planoAcaoForm.push(planoAcaoForm);
  }

  construirPlanoAcaoForm() {
    return this.formBuilder.group({
      descPlanoAcao: ['', Validators.required],
      acao: ['', , Validators.required]
    })
  }

  removerPlanoAcao(planoAcaoIndex: number): void {
    this.planoAcaoForm.removeAt(planoAcaoIndex)
  }
}
