// TIPAGEM DAS QUERYS

interface Usuario {
  id: string;
  apelido: string;
  foto: string;
  sexo?: string | undefined;
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