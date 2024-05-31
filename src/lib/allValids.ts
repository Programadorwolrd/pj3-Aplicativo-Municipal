import type { ValidacaoOptions } from '@/components/formClass';

export const allvalids = {
  email: [
    [(t) => t.length < 1, 'insira um valor'],
    // [(t) => t.length <= 64, "o email deve ter entre 10 a 50 caracteres"],
    // [
    //   (t) => /^[a-zA-Z0-9._%+-]+/.test(t),
    //   "O email deve começar com caracteres válidos",
    // ],
    // [
    //   (t) => /@[a-zA-Z0-9.-]+\./.test(t),
    //   'O email deve conter "@" seguido de caracteres válidos e "."',
    // ],
    // [
    //   (t) => /[a-zA-Z]{2,}$/.test(t),
    //   'O email deve terminar com pelo menos duas letras após o "."',
    // ],
  ],
  apelido: [
    [(t) => t.length < 1, 'insira um valor'],

    // [(t) => /^.{3,40}$/.test(t), "O apelido deve ter entre 3 e 40 caracteres"],
    // [
    //   (t) => /^[a-zA-Z\s\d]{3,40}$/.test(t),
    //   "O apelido deve conter apenas letras, números e espaços",
    // ],
  ],
  senha: [
    [(t) => t.length < 1, 'insira um valor'],

    // [(t) => /^.{4,40}$/.test(t), "A senha deve ter entre 4 e 40 caracteres"],
  ],
} satisfies ValidacaoOptions;
