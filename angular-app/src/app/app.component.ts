import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GameVerse';

  navItems = ['Home', 'Produtos', 'Sobre', 'Contato'];
  categories = ['Todos', 'Consoles', 'Acessórios', 'Jogos'];
  selectedCategory = 'Todos';
  cartCount = 0;
  cartItems: { name: string; price: number }[] = [];
  contactMessage = '';
  cartMessage = '';

  stats = [
    { value: '30k+', label: 'clientes felizes' },
    { value: '500+', label: 'jogos em estoque' },
    { value: '24h', label: 'entrega expressa' }
  ];

  reviews = [
    { name: 'Lucas M.', text: 'Entrega rápida, produto impecável e atendimento excelente.', score: '5.0' },
    { name: 'Beatriz C.', text: 'A loja tem uma seleção incrível e o preço vale muito a pena.', score: '4.9' },
    { name: 'Rafael T.', text: 'Compra simples, visual lindo e experiência de compra muito boa.', score: '5.0' }
  ];

  products = [
    {
      name: 'PlayStation 5 Pro',
      price: 'R$ 4.999,00',
      tag: 'Mais vendido',
      category: 'Consoles',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80',
      description: 'Desempenho extremo com gráficos cinematográficos e velocidade de resposta incomparável.'
    },
    {
      name: 'Xbox Series X',
      price: 'R$ 4.299,00',
      tag: 'Novo lançamento',
      category: 'Consoles',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=900&q=80',
      description: 'Experiência imersiva com catálogo incrível e gameplay ultra suave.'
    },
    {
      name: 'Nintendo Switch OLED',
      price: 'R$ 2.499,00',
      tag: 'Popular',
      category: 'Consoles',
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=80',
      description: 'Console híbrido leve, brilhante e pronto para jogar em qualquer lugar.'
    },
    {
      name: 'Headset HyperX',
      price: 'R$ 899,00',
      tag: 'Oferta',
      category: 'Acessórios',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      description: 'Som surround, conforto premium e qualidade profissional para suas partidas.'
    },
    {
      name: 'Controle DualSense',
      price: 'R$ 459,00',
      tag: 'Top review',
      category: 'Acessórios',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
      description: 'Resposta precisa, feedback tátil envolvente e ergonomia ideal para longas sessões.'
    },
    {
      name: 'Cyberpunk 2077',
      price: 'R$ 199,00',
      tag: 'Lançamento',
      category: 'Jogos',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80',
      description: 'Mundo aberto, narrativa intensa e visual impressionante em uma experiência imersiva.'
    }
  ];

  benefits = [
    'Entrega rápida em todo Brasil',
    'Atendimento especializado',
    'Pagamento seguro e fácil',
    'Garantia em todos os produtos'
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'Todos') {
      return this.products;
    }

    return this.products.filter((product) => product.category === this.selectedCategory);
  }

  applyFilter(category: string): void {
    this.selectedCategory = category;
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  addToCart(product: any): void {
    this.cartItems.push({
      name: product.name,
      price: Number(product.price.replace(/[R$.,]/g, '').trim()) / 100
    });
    this.cartCount = this.cartItems.length;
    this.cartMessage = `${product.name} adicionado ao carrinho!`;
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartCount = this.cartItems.length;
    if (this.cartItems.length === 0) {
      this.cartMessage = 'Carrinho vazio. Que tal escolher mais um item?';
    }
  }

  finishPurchase(): void {
    if (this.cartItems.length === 0) {
      this.cartMessage = 'Seu carrinho está vazio. Adicione algum produto primeiro.';
      return;
    }

    this.cartMessage = `Compra finalizada com sucesso! Total: R$ ${this.cartTotal.toFixed(2).replace('.', ',')}`;
    this.cartItems = [];
    this.cartCount = 0;
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const nameInput = form.querySelector('#nome') as HTMLInputElement | null;
    const emailInput = form.querySelector('#email') as HTMLInputElement | null;
    const messageInput = form.querySelector('#mensagem') as HTMLTextAreaElement | null;

    const name = nameInput?.value?.trim() || 'Jogador';
    const email = emailInput?.value?.trim() || 'seu email';
    const message = messageInput?.value?.trim() || 'solicitação';

    this.contactMessage = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso para ${email}. Em breve responderemos sobre: ${message}.`;
    form.reset();
  }
}
