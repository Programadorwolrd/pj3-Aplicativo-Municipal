import axios from "axios";
import { baseURL } from "./useAxios";
import { ValidacoesCampo } from "@/components/FormClass";

async function verifyEmail(email: string) {
  try {
    const { data } = await axios.get(
      `${baseURL}/usuario/verify/?email=${email}`,
      { timeout: 2000 }
    );

    return !data.emailDisponivel && data.message;
  } catch (error) {
    return true;
  }
}

/**
 * validações de campos pre definidas
 */
export const validsPaia = {
  email: [
    [(t) => t.length < 1, "Insira um email"],
    [(t) => t.length > 64, "Máx. 64 caracteres"],
    [(t) => !/^[a-zA-Z0-9._%+-]+/.test(t), "Caractere inválido no início"],
    [(t) => !/@[a-zA-Z0-9.-]+\./.test(t), "Formato de email inválido"],
    [(t) => !/[a-zA-Z]{2,}$/.test(t), "Terminação inválida"],
    [verifyEmail, "Erro ao verificar o email"],
  ],
  apelido: [
    [(t) => t.length < 1, "Insira um apelido/nome"],
    [(t) => t.length < 3 || t.length > 40, "Entre 3 e 40 caracteres"],
    [
      (t) => !/^[a-zA-Z\s\dÀ-ú]{3,40}$/.test(t),
      "Apenas letras, números e espaços",
    ],
  ],
  senha: [
    [(t) => t.length < 1, "Insira uma senha"],
    [(t) => t.length < 4 || t.length > 40, "Entre 4 e 40 caracteres"],
  ],
} as Record<string, ValidacoesCampo>;
