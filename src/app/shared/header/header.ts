import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',

    imports: [
        RouterLink,
        FormsModule
    ],

    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {

    menuAberto = false;

    // Texto digitado na barra de pesquisa
    pesquisa = '';

    // Quantidade de produtos no carrinho
    quantidadeCarrinho = 0;


    constructor(private router: Router) {

        this.atualizarCarrinho();

    }


    abrirMenu() {

        this.menuAberto = !this.menuAberto;

    }


    fecharMenu() {

        this.menuAberto = false;

    }


    abrirCarrinho() {

        this.router.navigate(['/carrinho']);

    }


    pesquisarProduto() {

        const texto = this.pesquisa.trim();

        if (texto) {

            this.router.navigate(
                ['/produtos'],
                {
                    queryParams: {
                        busca: texto
                    }
                }
            );

        } else {

            this.router.navigate(['/produtos']);

        }

    }


    atualizarCarrinho() {

        const carrinho = localStorage.getItem('carrinho');

        if (carrinho) {

            const itens = JSON.parse(carrinho);

            this.quantidadeCarrinho = itens.reduce(
                (total: number, item: any) => {

                    return total + item.quantidade;

                },
                0
            );

        } else {

            this.quantidadeCarrinho = 0;

        }

    }

}