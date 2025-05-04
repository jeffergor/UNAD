// Enviar mensaje del usuario y recibir respuesta del bot
function sendMessage() {
  const input = document.getElementById('userMessage');
  const message = input.value.trim();
  if (message) {
    displayMessage('user', message);
    getBotResponse(message);
    input.value = "";
  }
}

// Mostrar mensaje en la ventana de chat
function displayMessage(sender, text) {
  const chatWindow = document.getElementById('chatWindow');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message ' + sender;
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Obtener respuesta del bot basada en la entrada del usuario
function getBotResponse(question) {
  let response = "";
  const lower = question.toLowerCase();
  const savedDocs = JSON.parse(localStorage.getItem('documents')) || [];

  if (lower.includes("hola") || lower.includes("buenos días") || lower.includes("buenas tardes")) {
    response = "¡Hola, buenos días! Me llamo Chatito 🤖. ¿En qué te puedo ayudar?";
  } else if (lower.includes("quién eres") || lower.includes("quien eres")) {
    response = "Soy Chatito, tu asistente virtual para automatizar y gestionar documentos.";
  } else if (lower.includes("qué puedes hacer") || lower.includes("que puedes hacer")) {
    response = "Puedo ayudarte a encontrar documentos, automatizar tareas y responder preguntas frecuentes.";
  } else if (lower.includes("gracias")) {
    response = "¡Con gusto! 😊 Estoy aquí para ayudarte.";
  } else if (lower.includes("adiós") || lower.includes("hasta luego")) {
    response = "¡Hasta luego! Que tengas un excelente día 👋";
  } else if (lower.includes("cuántos documentos") || lower.includes("cuantos documentos")) {
    response = `Tengo ${savedDocs.length} documentos cargados actualmente.`;
  } else if (lower.includes("dame el documento")) {
    const docName = lower.replace("dame el documento", "").trim();
    const found = savedDocs.find(doc => doc.name.toLowerCase().includes(docName));
    if (found) {
      const date = found.date || "Fecha no disponible";
      const category = found.category || "Sin categoría";
      response = `📄 <strong>${found.name}</strong><br>📁 Tipo: ${found.ext}<br>📅 Subido: ${date}<br>🏷️ Categoría: ${category}`;
    } else {
      response = `No encontré ningún documento que coincida con \"${docName}\".`;
    }
  } else if (lower.includes("top 10 categorías") || lower.includes("categorías más usadas")) {
    const categoryCount = {};
    savedDocs.forEach(doc => {
      const cat = doc.category || "Sin categoría";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    const sortedCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([cat, count], index) => `${index + 1}. ${cat} (${count})`).join(" ");
    response = `📊 Top 10 categorías más utilizadas: ${sortedCategories}`;
  } else {
    switch (lower) {
      case 'what documents can i upload?':
        response = "You can upload PDFs, Word files, Excel spreadsheets, and PowerPoint presentations.";
        break;
      case 'how to search for a document?':
        response = "Use the 🔍 icon next to each document or use the search function above.";
        break;
      case 'can i automate a workflow?':
        response = "Yes! Head over to the Automation section to create and manage workflows.";
        break;
      default:
        response = "Lo siento, aún no entiendo esa pregunta. ¿Puedes intentar con otra?";
    }
  }

  displayMessage('bot', response);
}

function handleQuestion(question) {
  displayMessage('user', question);
  getBotResponse(question);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchButtons = document.querySelectorAll('.search-btn');
  searchButtons.forEach(button => {
    button.addEventListener('click', () => {
      const docTitle = button.getAttribute('data-title');
      const searchQuery = prompt("Search document name:", "");
      if (searchQuery) {
        if (searchQuery.toLowerCase() === docTitle.toLowerCase()) {
          alert(`✅ Document "${docTitle}" found!`);
        } else {
          alert(`❌ Document "${searchQuery}" not found.`);
        }
      }
    });
  });

  loadDocuments();
});

function searchDocuments() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const items = document.querySelectorAll('.document-item');

  items.forEach(item => {
    const title = item.querySelector('.doc-title').textContent.toLowerCase();
    item.style.display = title.includes(query) ? 'flex' : 'none';
  });
}

function uploadDocuments() {
  const fileInput = document.getElementById('fileUpload');
  const fileList = fileInput.files;
  const container = document.querySelector('.documents-list');
  let savedDocs = JSON.parse(localStorage.getItem('documents')) || [];

  for (const file of fileList) {
    const ext = file.name.split('.').pop().toUpperCase();
    const icon = ext === 'PDF' ? '📄' : ext === 'DOCX' ? '📋' : ext === 'PPTX' ? '📽️' : '📁';

    const existingDoc = savedDocs.find(doc => doc.name === file.name);
    if (existingDoc) {
      alert(`El documento "${file.name}" ya existe. No se agregará.`);
      continue;
    }

    const docData = {
      name: file.name,
      ext: ext,
      icon: icon,
      url: URL.createObjectURL(file),
      date: new Date().toLocaleDateString(),
      category: prompt(`Ingresa una categoría para el documento "${file.name}":`, "General") || "General"
    };

    savedDocs.push(docData);
    addDocumentToDOM(docData, container);
  }

  localStorage.setItem('documents', JSON.stringify(savedDocs));
  fileInput.value = '';
}

function loadDocuments() {
  const savedDocs = JSON.parse(localStorage.getItem('documents')) || [];
  const container = document.querySelector('.documents-list');

  savedDocs.forEach(doc => {
    addDocumentToDOM(doc, container);
  });
}

function addDocumentToDOM(doc, container) {
  const item = document.createElement('div');
  item.className = 'document-item';
  item.innerHTML = `
    <div class="doc-info">
      <div class="doc-icon">${doc.icon}</div>
      <div>
        <div class="doc-title">${doc.name}</div>
        <div class="doc-type">${doc.ext}</div>
        <div class="doc-date">📅 ${doc.date || 'Fecha no disponible'}</div>
        <div class="doc-category">🏷️ ${doc.category || 'Sin categoría'}</div>
      </div>
    </div>
    <div class="doc-actions">
      <button class="download-btn" onclick="downloadDocument('${doc.url}', '${doc.name}')">⬇️</button>
      <button class="preview-btn" onclick="previewDocument('${doc.url}', '${doc.ext}')">👁️</button>
      <button class="delete-btn" onclick="deleteDocument('${doc.name}')">🗑️</button>
    </div>
  `;
  container.appendChild(item);
}

function previewDocument(url, ext) {
  if (ext === 'PDF') {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head><title>Document Preview</title></head>
        <body style="margin:0; padding:0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0;">
          <iframe src="${url}" width="100%" height="100%" style="border: none;"></iframe>
        </body>
      </html>
    `);
    newWindow.document.close();
  } else {
    alert('Preview not available for this file type.');
  }
}

function deleteDocument(fileName) {
  let savedDocs = JSON.parse(localStorage.getItem('documents')) || [];
  savedDocs = savedDocs.filter(doc => doc.name !== fileName);
  localStorage.setItem('documents', JSON.stringify(savedDocs));

  const container = document.querySelector('.documents-list');
  const docItem = Array.from(container.children).find(item => item.querySelector('.doc-title').textContent === fileName);
  if (docItem) {
    container.removeChild(docItem);
  }

  alert(`Documento "${fileName}" eliminado correctamente.`);
}