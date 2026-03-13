(async function() {
  const sessionKey = 'legends_auth';
  
  // Verifica se já está autenticado nesta sessão
  if (sessionStorage.getItem(sessionKey) === 'true') {
    return;
  }
  
  // Solicita senha
  const password = prompt('🔒 Digite a senha para acessar o Legends Card Generator:');
  
  if (!password) {
    alert('Acesso negado!');
    window.location.href = 'about:blank';
    return;
  }
  
  try {
    // Envia senha para validação no servidor
    const response = await fetch('/api/check-password', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ password })
    });
    
    const data = await response.json();
    
    if (data.valid) {
      // Senha correta - salva na sessão
      sessionStorage.setItem(sessionKey, 'true');
      console.log('✅ Autenticado com sucesso!');
    } else {
      // Senha incorreta
      alert('❌ Senha incorreta!');
      window.location.href = 'about:blank';
    }
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    alert('⚠️ Erro ao verificar senha. Tente novamente.');
    window.location.href = 'about:blank';
  }
})();
