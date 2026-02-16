// Função para abrir o menu lateral
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Função para fechar o menu lateral
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Função principal do formulário SweetAlert2
async function solicitarServico(tipo) {
    const { value: formValues } = await Swal.fire({
        title: `SOLICITAR ${tipo.toUpperCase()}`,
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#00f2ff',
        confirmButtonText: 'ENVIAR PARA WHATSAPP',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',
        cancelButtonColor: '#333',
        html:
            // Mensagem de observação em vermelho destacado
            '<p style="color: #ff3c00; font-weight: 900; margin-bottom: 15px; border: 2px solid #ff3c00; padding: 10px; border-radius: 8px; font-size: 13px; text-transform: uppercase; animation: pulse 1.5s infinite;">' +
            '⚠️ Atenção: Mande uma foto do local do serviço!' +
            '</p>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Seu Nome" style="color:white; background:#1a1a1a; border:1px solid #333; width: 80%;">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Seu Endereço" style="color:white; background:#1a1a1a; border:1px solid #333; width: 80%;">' +
            '<textarea id="swal-input3" class="swal2-textarea" placeholder="Descreva o problema detalhadamente..." style="color:white; background:#1a1a1a; border:1px solid #333; width: 80%; height: 100px;"></textarea>',
        focusConfirm: false,
        preConfirm: () => {
            const nome = document.getElementById('swal-input1').value;
            const endereco = document.getElementById('swal-input2').value;
            const detalhe = document.getElementById('swal-input3').value;
            
            if (!nome || !endereco || !detalhe) {
                Swal.showValidationMessage('Preencha todos os campos para continuar!');
                return false;
            }
            return { nome, endereco, detalhe };
        }
    });

    // Se o formulário for preenchido e confirmado
    if (formValues) {
        const { nome, endereco, detalhe } = formValues;
        const numero = "5573988478170";
        
        // Mensagem formatada com emojis para facilitar sua leitura no WhatsApp
        const mensagem = `*🛠️ NOVO CHAMADO DE EMERGÊNCIA 🛠️*%0A%0A` +
                         `*Serviço:* ${tipo.toUpperCase()}%0A` +
                         `*Cliente:* ${nome}%0A` +
                         `*Endereço:* ${endereco}%0A` +
                         `*Descrição:* ${detalhe}%0A%0A` +
                         `_O cliente foi avisado para enviar a foto agora._`;

        const url = `https://wa.me/${numero}?text=${mensagem}`;
        window.open(url, '_blank');
        
        // Feedback de sucesso para o cliente
        Swal.fire({
            icon: 'success',
            title: 'Solicitação Enviada!',
            text: 'Aguarde o redirecionamento para o WhatsApp.',
            background: '#0a0a0a',
            color: '#fff',
            timer: 3000,
            showConfirmButton: false
        });
    }
}

// Animação de entrada suave ao carregar a página
window.onload = () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(30px)";
        setTimeout(() => {
            heroContent.style.transition = "all 1s ease-out";
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
        }, 200);
    }
};
