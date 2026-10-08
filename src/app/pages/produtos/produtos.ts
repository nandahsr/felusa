import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-produtos',
    imports: [RouterLink],
    templateUrl: './produtos.html',
    styleUrl: './produtos.css',
})
export class Produtos {

    busca = '';


    constructor(private route: ActivatedRoute) {

        this.route.queryParams.subscribe(params => {

            this.busca = params['busca'] || '';

        });

    }


    normalizarTexto(texto: string): string {

        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

    }


    mostrarProduto(produto: string): boolean {

        if (!this.busca) {
            return true;
        }

        const pesquisa = this.normalizarTexto(this.busca);

        const nomeProduto = this.normalizarTexto(produto);

        /*
        Permite pesquisar:
        camiseta
        camiseta has
        HAS
        calça / calca
        etc.
        */

        return (
            nomeProduto.includes(pesquisa) ||
            pesquisa.includes(nomeProduto) ||
            pesquisa === 'has'
        );

    }


    nenhumProdutoEncontrado(): boolean {

        const produtos = [
            'camiseta',
            'calca',
            'bermuda',
            'jaleco',
            'casaco',
            'moletom'
        ];

        return !produtos.some(produto =>
            this.mostrarProduto(produto)
        );

    }

}