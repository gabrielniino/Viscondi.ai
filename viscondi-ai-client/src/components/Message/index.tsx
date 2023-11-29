import React, { useEffect } from 'react';

interface MessageProps {
  message: string;
  onClose: () => void; // Função para fechar a mensagem
  type: 'success' | 'error'; // Tipo da mensagem (success ou error)
}

export function Message({ message, onClose, type }: MessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Chama a função para fechar a mensagem após 3 segundos
    }, 3000);

    return () => {
      clearTimeout(timer); // Limpa o timer ao desmontar o componente
    };
  }, [onClose]);

  const messageClassName =
    type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 right-4 text-white p-4 rounded-md shadow-md ${messageClassName}`}>
      {message}
    </div>
  );
}
