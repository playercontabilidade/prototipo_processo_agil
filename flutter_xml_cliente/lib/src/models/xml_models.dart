/// Modelos do Extrator XML (espelho do protótipo JS).

enum XmlTab { importar, dashboard, produtos, config }

enum TribCadStatus {
  ok,
  wrong,
  missing;

  static TribCadStatus from(String code) {
    switch (code) {
      case 'ok':
        return TribCadStatus.ok;
      case 'wrong':
        return TribCadStatus.wrong;
      default:
        return TribCadStatus.missing;
    }
  }
}

enum XmlProductStatus {
  semVenda,
  prejuizo,
  baixa,
  atencao,
  saudavel,
}

class TribCadPair {
  const TribCadPair({required this.entrada, required this.saida});
  final TribCadStatus entrada;
  final TribCadStatus saida;
}

class XmlProduct {
  const XmlProduct({
    required this.id,
    required this.nome,
    required this.codigo,
    required this.ncm,
    required this.cfopCompra,
    required this.cfopVenda,
    required this.cst,
    required this.regime,
    required this.fornecedor,
    required this.clientePrincipal,
    required this.qtdCompra,
    required this.qtdVenda,
    required this.custoDocCents,
    required this.acrescimosCents,
    required this.descontosCents,
    required this.creditoCents,
    required this.precoVendaCents,
    required this.tribEntradaCents,
    required this.tribSaidaCents,
    required this.ibs,
    required this.cbs,
  });

  final String id;
  final String nome;
  final String codigo;
  final String ncm;
  final String cfopCompra;
  final String cfopVenda;
  final String cst;
  final String regime;
  final String fornecedor;
  final String clientePrincipal;
  final int qtdCompra;
  final int qtdVenda;
  final int custoDocCents;
  final int acrescimosCents;
  final int descontosCents;
  final int creditoCents;
  final int precoVendaCents;
  final int tribEntradaCents;
  final int tribSaidaCents;
  final TribCadPair ibs;
  final TribCadPair cbs;
}

class XmlNota {
  const XmlNota({
    required this.chave,
    required this.numero,
    required this.serie,
    required this.data,
    required this.emitente,
    required this.destinatario,
    required this.tipo,
    required this.qtd,
    required this.valorCents,
    required this.tribCents,
    required this.produtoId,
    required this.cancelada,
  });

  final String chave;
  final String numero;
  final String serie;
  final String data;
  final String emitente;
  final String destinatario;
  final String tipo; // entrada | saida
  final int qtd;
  final int valorCents;
  final int tribCents;
  final String produtoId;
  final bool cancelada;
}

class XmlConfig {
  const XmlConfig({
    this.adminPct = 3.5,
    this.financeiroPct = 1.2,
    this.comissaoPct = 2.0,
    this.fretePct = 0.8,
    this.perdasPct = 0.5,
    this.outrosPct = 0.3,
    this.lucroDesejadoPct = 18,
    this.margemMinPct = 8,
    this.margemAtencaoPct = 12,
  });

  final double adminPct;
  final double financeiroPct;
  final double comissaoPct;
  final double fretePct;
  final double perdasPct;
  final double outrosPct;
  final double lucroDesejadoPct;
  final double margemMinPct;
  final double margemAtencaoPct;

  double get custoOpPct =>
      adminPct + financeiroPct + comissaoPct + fretePct + perdasPct + outrosPct;

  XmlConfig copyWith({
    double? adminPct,
    double? financeiroPct,
    double? comissaoPct,
    double? fretePct,
    double? perdasPct,
    double? outrosPct,
    double? lucroDesejadoPct,
    double? margemMinPct,
    double? margemAtencaoPct,
  }) {
    return XmlConfig(
      adminPct: adminPct ?? this.adminPct,
      financeiroPct: financeiroPct ?? this.financeiroPct,
      comissaoPct: comissaoPct ?? this.comissaoPct,
      fretePct: fretePct ?? this.fretePct,
      perdasPct: perdasPct ?? this.perdasPct,
      outrosPct: outrosPct ?? this.outrosPct,
      lucroDesejadoPct: lucroDesejadoPct ?? this.lucroDesejadoPct,
      margemMinPct: margemMinPct ?? this.margemMinPct,
      margemAtencaoPct: margemAtencaoPct ?? this.margemAtencaoPct,
    );
  }
}

class XmlFiltros {
  const XmlFiltros({
    this.q = '',
    this.de = '2026-06-01',
    this.ate = '2026-07-15',
    this.status = '',
    this.regime = '',
  });

  final String q;
  final String de;
  final String ate;
  final String status;
  final String regime;

  XmlFiltros copyWith({
    String? q,
    String? de,
    String? ate,
    String? status,
    String? regime,
  }) {
    return XmlFiltros(
      q: q ?? this.q,
      de: de ?? this.de,
      ate: ate ?? this.ate,
      status: status ?? this.status,
      regime: regime ?? this.regime,
    );
  }
}

class XmlImportLog {
  const XmlImportLog({required this.when, required this.level, required this.msg});
  final String when;
  final String level; // ok | bad | warn | info
  final String msg;
}

class XmlImportState {
  const XmlImportState({
    this.running = false,
    this.pct = 100,
    this.phase = 'Concluído · simulação pré-aprovada',
    this.filesTotal = 48,
    this.filesOk = 42,
    this.filesDup = 3,
    this.filesBad = 1,
    this.filesSkip = 2,
    this.logs = const [],
  });

  final bool running;
  final double pct;
  final String phase;
  final int filesTotal;
  final int filesOk;
  final int filesDup;
  final int filesBad;
  final int filesSkip;
  final List<XmlImportLog> logs;

  XmlImportState copyWith({
    bool? running,
    double? pct,
    String? phase,
    int? filesTotal,
    int? filesOk,
    int? filesDup,
    int? filesBad,
    int? filesSkip,
    List<XmlImportLog>? logs,
  }) {
    return XmlImportState(
      running: running ?? this.running,
      pct: pct ?? this.pct,
      phase: phase ?? this.phase,
      filesTotal: filesTotal ?? this.filesTotal,
      filesOk: filesOk ?? this.filesOk,
      filesDup: filesDup ?? this.filesDup,
      filesBad: filesBad ?? this.filesBad,
      filesSkip: filesSkip ?? this.filesSkip,
      logs: logs ?? this.logs,
    );
  }
}

class XmlProductCalc {
  const XmlProductCalc({
    required this.cef,
    required this.pv,
    required this.mbCents,
    required this.mbPct,
    required this.tsCents,
    required this.copCents,
    required this.mlCents,
    required this.mlPct,
    required this.pIdeal,
    required this.reajustePct,
    required this.cargaEntradaPct,
    required this.status,
    required this.semVenda,
    required this.totalCompraCents,
    required this.totalVendaCents,
    required this.tribEntradaTotalCents,
    required this.tribSaidaTotalCents,
  });

  final int cef;
  final int pv;
  final int mbCents;
  final double mbPct;
  final int tsCents;
  final int copCents;
  final int mlCents;
  final double mlPct;
  final int pIdeal;
  final double reajustePct;
  final double cargaEntradaPct;
  final XmlProductStatus status;
  final bool semVenda;
  final int totalCompraCents;
  final int totalVendaCents;
  final int tribEntradaTotalCents;
  final int tribSaidaTotalCents;
}

class XmlProductView {
  const XmlProductView({required this.product, required this.calc});
  final XmlProduct product;
  final XmlProductCalc calc;
}

class XmlDashboardKpis {
  const XmlDashboardKpis({
    required this.totalCompra,
    required this.totalVenda,
    required this.impEntrada,
    required this.impSaida,
    required this.lucroBruto,
    required this.lucroLiq,
    required this.margemNeg,
    required this.abaixoMin,
    required this.notasOk,
    required this.notasCanceladas,
  });

  final int totalCompra;
  final int totalVenda;
  final int impEntrada;
  final int impSaida;
  final int lucroBruto;
  final int lucroLiq;
  final int margemNeg;
  final int abaixoMin;
  final int notasOk;
  final int notasCanceladas;
}
