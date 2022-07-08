let stats = {
  hash: 'edd79cfdee57262197ba',
  version: '5.73.0', //webpack版本号
  time: 127, //花费时间
  builtAt: 1656489284942, //构建时的时间戳
  publicPath: 'auto',
  outputPath: 'd:\\exam\\webpack\\flow\\dist',
  assetsByChunkName: { main: ['main.js'] }, //key是代码块的名字，值是产出的资源文件
  assets: [
    //产出的资源文件
    {
      type: 'asset',
      name: 'main.js',
    },
  ],
  chunks: [
    //代码块
    {
      rendered: true,
      initial: true,
      entry: true,
      recorded: false,
      reason: undefined,
      size: 1,
      names: [Array],
      idHints: [],
      runtime: [Array],
      files: [Array], //这个chunk产出了哪些文件
      auxiliaryFiles: [],
      hash: '5cf757d7b8abb84003dc', //chunkhash
      id: 'main',
      siblings: [],
      parents: [],
      children: [],
      origins: [Array],
    },
  ],
  modules: [
    //模块
    {
      type: 'module',
      moduleType: 'javascript/auto', //webpack从4开始对模块进行细分
      layer: null,
      size: 1,
      sizes: [Object],
      built: true,
      codeGenerated: true,
      buildTimeExecuted: false,
      cached: false,
      identifier: 'd:\\exam\\webpack\\flow\\src\\index.js',
      name: './src/index.js',
      nameForCondition: 'd:\\exam\\webpack\\flow\\src\\index.js',
      index: 0,
      preOrderIndex: 0,
      index2: 0,
      postOrderIndex: 0,
      cacheable: true,
      optional: false,
      orphan: false,
      dependent: undefined,
      issuer: null,
      issuerName: null,
      issuerPath: null,
      failed: false,
      errors: 0,
      warnings: 0,
      id: './src/index.js', //模块id。相对于根目录的相对路径
      issuerId: null,
      chunks: [Array],
      assets: [],
      reasons: [Array],
      filteredReasons: undefined,
      usedExports: null,
      providedExports: null,
      optimizationBailout: [],
      depth: 0,
    },
  ],
  filteredModules: undefined,
  entrypoints: {
    //入口点
    main: {
      name: 'main',
      chunks: [Array],
      assets: [Array],
      filteredAssets: 0,
      assetsSize: 1203,
      auxiliaryAssets: [],
      filteredAuxiliaryAssets: 0,
      auxiliaryAssetsSize: 0,
      isOverSizeLimit: false,
    },
  },
  errors: [],
  errorsCount: 0,
  warnings: [],
  warningsCount: 0,
  children: [],
}
