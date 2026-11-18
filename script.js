
/* =================================
   MENU MOBILE
================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

    const opened = navigation.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", opened);
    menuToggle.setAttribute(
        "aria-label",
        opened ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = opened ? "✕" : "☰";

});

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });

});


/* =================================
   MÁSCARA DE TELEFONE
================================= */


const telefone = document.getElementById("telefone");

telefone.addEventListener("input", function () {

    let numero = this.value.replace(/\D/g, "").slice(0, 11);

    if (numero.length <= 2) {
        this.value = numero ? "(" + numero : "";
    } else if (numero.length <= 6) {
        this.value = "(" + numero.slice(0, 2) + ") " +
                     numero.slice(2);
    } else if (numero.length <= 10) {
        this.value = "(" + numero.slice(0, 2) + ") " +
                     numero.slice(2, 6) + "-" +
                     numero.slice(6);
    } else {
        this.value = "(" + numero.slice(0, 2) + ") " +
                     numero.slice(2, 7) + "-" +
                     numero.slice(7);
    }

});



/* =================================
   ORÇAMENTO - WHATSAPP E E-MAIL
================================= */

// Dados da empresa
const WHATSAPP_EMPRESA = "5511920133757";
const EMAIL_EMPRESA = "jailton.sp@hotmail.com";

// Elementos do formulário
const budgetForm = document.getElementById("budgetForm");
const formMessage = document.getElementById("formMessage");

budgetForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const numero = telefone.value.replace(/\D/g, "");

    formMessage.innerHTML = "";
    formMessage.className = "form-message";

    // Validar telefone fixo ou celular
    if (numero.length !== 10 && numero.length !== 11) {

        formMessage.textContent =
            "Informe um telefone válido com DDD.";

        formMessage.classList.add("error");
        telefone.focus();

        return;
    }

    // Validar celular com nono dígito
    if (numero.length === 11 && numero[2] !== "9") {

        formMessage.textContent =
            "Confira o número do celular informado.";

        formMessage.classList.add("error");
        telefone.focus();

        return;
    }

    // Capturar dados do formulário
    const dados = new FormData(budgetForm);

    const nome = dados.get("nome");
    const telefoneCliente = dados.get("telefone");
    const emailCliente = dados.get("email") || "Não informado";
    const servico = dados.get("servico");
    const origem = dados.get("origem");
    const destino = dados.get("destino");
    const moto = dados.get("moto") || "Não informado";
    const mensagem = dados.get("mensagem") || "Sem observações";

    // Montar mensagem
    const texto = `
NOVO ORÇAMENTO - RESGATE MOTOS E TRANSPORTE

Nome: ${nome}
Telefone: ${telefoneCliente}
E-mail do cliente: ${emailCliente}

Serviço: ${servico}

Origem: ${origem}
Destino: ${destino}

Motocicleta: ${moto}

Informações adicionais:
${mensagem}

Área de atendimento:
São Paulo e região metropolitana.
    `.trim();

    // Criar links de envio
    const whatsappURL =
        "https://wa.me/" + WHATSAPP_EMPRESA +
        "?text=" + encodeURIComponent(texto);

    const emailURL =
        "mailto:" + EMAIL_EMPRESA +
        "?subject=" +
        encodeURIComponent("Novo orçamento - Resgate Motos") +
        "&body=" +
        encodeURIComponent(texto);

    // Mensagem de confirmação
    formMessage.classList.add("success");

    const titulo = document.createElement("strong");
    titulo.textContent = "Solicitação validada com sucesso!";

    const descricao = document.createElement("p");
    descricao.textContent =
        "Escolha os canais abaixo para encaminhar seu orçamento. Para enviar pelos dois, conclua cada envio.";

    const acoes = document.createElement("div");
    acoes.className = "form-actions";

    // Botão WhatsApp
    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappURL;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.className = "btn btn-whatsapp";
    whatsappLink.textContent = "Enviar pelo WhatsApp";

    // Botão E-mail
    const emailLink = document.createElement("a");
    emailLink.href = emailURL;
    emailLink.className = "btn btn-email";
    emailLink.textContent = "Enviar por e-mail";

    acoes.appendChild(whatsappLink);
    acoes.appendChild(emailLink);

    formMessage.appendChild(titulo);
    formMessage.appendChild(descricao);
    formMessage.appendChild(acoes);

});


/* =================================
   GALERIA DE FOTOS
================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("closeLightbox");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImage = 0;

function showImage(index) {

    if (index < 0) {
        index = galleryItems.length - 1;
    }

    if (index >= galleryItems.length) {
        index = 0;
    }

    currentImage = index;

    const item = galleryItems[currentImage];

    const image = item.querySelector("img");

    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
        item.dataset.description || image.alt;

}


function openGallery(index) {

    showImage(index);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeLightbox.focus();

}


function closeGallery() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
        openGallery(index);
    });

});


closeLightbox.addEventListener("click", closeGallery);

prevImage.addEventListener("click", () => {
    showImage(currentImage - 1);
});

nextImage.addEventListener("click", () => {
    showImage(currentImage + 1);
});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeGallery();
    }

});


document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeGallery();
    }

    if (event.key === "ArrowRight") {
        showImage(currentImage + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImage - 1);
    }

});


/* =================================
   ANO AUTOMÁTICO
================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();
