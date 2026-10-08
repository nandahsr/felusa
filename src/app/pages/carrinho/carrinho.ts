import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carrinho',
    imports: [],
    templateUrl: './carrinho.html',
    styleUrl: './carrinho.css'
})
export class Carrinho {

    itens: any[] = [];

    total = 0;


    constructor(private router: Router) {

        this.carregarCarrinho();

    }


    carregarCarrinho() {

        const carrinho = localStorage.getItem('carrinho');

        if (carrinho) {

            this.itens = JSON.parse(carrinho);

        } else {

            this.itens = [];

        }

        this.calcularTotal();

    }


    calcularTotal() {

        this.total = 0;

        for (let item of this.itens) {

            this.total += item.preco * item.quantidade;

        }

    }


    formatarPreco(valor: number): string {

        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    }


    aumentarQuantidade(index: number) {

        this.itens[index].quantidade++;

        this.salvarCarrinho();

        this.calcularTotal();

    }


    diminuirQuantidade(index: number) {

        if (this.itens[index].quantidade > 1) {

            this.itens[index].quantidade--;

            this.salvarCarrinho();

            this.calcularTotal();

        }

    }


    removerProduto(index: number) {

        this.itens.splice(index, 1);

        this.salvarCarrinho();

        this.calcularTotal();

    }


    salvarCarrinho() {

        localStorage.setItem(
            'carrinho',
            JSON.stringify(this.itens)
        );

    }


    continuarComprando() {

        this.router.navigate(['/produtos']);

    }


    finalizarCompra() {

        if (this.itens.length === 0) {

            return;

        }

        alert('Pedido realizado com sucesso!');

        localStorage.removeItem('carrinho');

        this.itens = [];

        this.total = 0;

    }
    limparCarrinho() {

    // Apaga todos os produtos salvos
    localStorage.removeItem('carrinho');

    // Limpa a lista da página
    this.itens = [];

    // Zera o total
    this.total = 0;

}

}