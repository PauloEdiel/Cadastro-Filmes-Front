import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Filme } from '../services/filme';
import { ConfigService } from './config.service';

@Injectable()
export class FilmeService {

  private baseUrlService: string = '';
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http,
    private configService: ConfigService) {

    /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
    this.baseUrlService = configService.getUrlService() + '/filme/';

    /*ADICIONANDO O JSON NO HEADER */
    this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**CONSULTA TODOS OS FILMES CADASTRADAS */
  getFilmes() {
    return this.http.get(this.baseUrlService).map(res => res.json());
  }

  /**ADICIONA UM Novo  Filme */
  addFilme(filme: Filme) {
    return this.http.post(this.baseUrlService, JSON.stringify(filme), this.options)
      .map(res => res.json());
  }

  /**Exclui um filme */
  excluirPessoa(codigo: number) {
    return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
  }

  /**CONSULTA um Filme pelo código */
  getPessoa(codigo: number) {
    return this.http.get(this.baseUrlService + codigo).map(res => res.json());
  }

  /**ATUALIZA A descrição do Filme */
  atualizarPessoa(filme: Filme) {
    return this.http.put(this.baseUrlService, JSON.stringify(filme), this.options)
      .map(res => res.json());
  }


}
