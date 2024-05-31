import type { ValidacaoOptions } from '@/components/formClass';

export const allvalids = {
  email: [
    [(t) => t.length < 1, 'Insira um email'],
    [(t) => t.length > 64, 'Máx. 64 caracteres'],
    [(t) => !/^[a-zA-Z0-9._%+-]+/.test(t), 'Caractere inválido no início'],
    [(t) => !/@[a-zA-Z0-9.-]+\./.test(t), 'Formato de email inválido'],
    [(t) => !/[a-zA-Z]{2,}$/.test(t), 'Terminação inválida'],
  ],
  apelido: [
    [(t) => t.length < 1, 'Insira um apelido/nome'],
    [(t) => t.length < 3 || t.length > 40, 'Entre 3 e 40 caracteres'],
    [(t) => !/^[a-zA-Z\s\d]{3,40}$/.test(t), 'Apenas letras, números e espaços'],
  ],
  senha: [
    [(t) => t.length < 1, 'Insira uma senha'],
    [(t) => t.length < 4 || t.length > 40, 'Entre 4 e 40 caracteres'],
  ],
} satisfies ValidacaoOptions;
