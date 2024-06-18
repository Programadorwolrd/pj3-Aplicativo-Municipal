// TIPAGEM DAS QUERYS

interface Usuario {
  id: string;
  apelido: string;
  nomeCompleto?: string;
  foto: string | null;
  nome: string | null;
  nascimento: string | null;
  sexo: string | null;
  nascimento: string | null;
  cidade: string | null;
  lidoPeloUser: LidoPeloUser[];
  catalogoNLido: Catalogo[];
  progresso: {
    total: number;
    lido: number;
  };
}

interface LidoPeloUser {
  dataDaDescoberta: string;
  catalogo: Catalogo;
}

interface Catalogo {
  uuid: string;
  nomePopular: string;
  nomeCientifico: string;
  especie: string;
  ftModel: string;
  medalha: string;
}

interface Rank {
  id: number;
  apelido: string;
  foto: string;
  qrCodeUnicosLidos: number;
  isCurrentUser: boolean;
}

interface CatalogoInfo {
  uuid: string;
  medalha: string;
  som: string;
  nomePopular: string;
  nomeCientifico: string;
  especie: string;
  ftModel: string;
  descricao: string;
  catalogoGaleria: CatalogoGaleria[];
}

interface CatalogoGaleria {
  id: number;
  catalogo_uuid: string;
  url: string;
}
