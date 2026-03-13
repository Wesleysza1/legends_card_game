export default function handler(req, res) {
  // Apenas aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const correctPassword = process.env.SITE_PASSWORD;

  // Verifica se a variável de ambiente está configurada
  if (!correctPassword) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Valida a senha
  if (password === correctPassword) {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(401).json({ valid: false });
  }
}
