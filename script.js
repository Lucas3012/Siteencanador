function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

async function solicitarServico(tipo) {
    const { value: formValues } = await Swal.fire({
        title: `SOLICITAR ${tipo.toUpperCase()}`,
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#00f2ff',
        confirmButtonText: 'ENVIAR PARA WHATSAPP',
        html:
            // Observação em destaque vermelho
            '<p style="color: #ff3c00; font-weight: bold; margin-bottom: 15px; border: 1px solid #ff3c00; padding: 5px; border-radius: 5px; font-size: 14px;">' +
            '⚠️ ATENÇÃO: Mande uma foto do local do serviço!' +
            '</p>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Seu Nome" style="color:white; background:#1a1a1a; border:1px solid #00f2ff; margin-bottom: 10px;">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Seu Endereço" style="color:white; background:#1a1a1a; border:1px solid #00f2ff; margin-bottom: 10px;">' +
            '<textarea id="swal-input3" class="swal2-textarea" placeholder="Detalhes (O que aconteceu?)" style="color:white; background:#1a1a1a; border:1px solid #00f2ff;"></textarea>',
        focusConfirm: false,
        preConfirm: () => {
            const nome = document.getElementById('swal-input1').value;
            const endereco = document.getElementById('swal-input2').value;
            const detalhe = document.getElementById('swal-input3').value;
            
            if (!nome || !endereco || !detalhe) {
                Swal.showValidationMessage('Por favor, preencha todos os campos!');
                return false;
            }
            return { nome, endereco, detalhe };
        }
    });

    if (formValues) {
        const { nome, endereco, detalhe } = formValues;
        const numero = "5573988478170";
        
        // Formatação da mensagem para o seu WhatsApp
        const mensagem = `*🛠️ NOVA SOLICITAÇÃO 🛠️*%0A%0A` +
                         `*Tipo:* ${tipo}%0A` +
                         `*Nome:* ${nome}%0A` +
                         `*Endereço:* ${endereco}%0A` +
                         `*Detalhes:* ${detalhe}%0A%0A` +
                         `_(Vou enviar a foto do local agora...)_`;

        const url = `https://wa.me/${numero}?text=${mensagem}`;
        window.open(url, '_blank');
    }
}

// Animação de entrada da página
window.onload = () => {
    const content = document.querySelector('.hero-content');
    if(content) {
        content.style.opacity = "0";
        setTimeout(() => {
            content.style.transition = "all 1s ease-out";
            content.style.opacity = "1";
        }, 200);
    }
};
