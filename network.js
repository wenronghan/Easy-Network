const DB_NAME = "archaeodesk-prototype";
const GRAPH_STORAGE_KEY = "easy-network-analysis-graph-v1";
const GRAPH_LINK_STORAGE_PREFIX = "easy-network-analysis-linked-graph-";
const NETWORK_SETTINGS_KEY = "easy-network-analysis-settings-v1";
const DEFAULT_LANGUAGE = "en";
localStorage.setItem("easy-network-language", DEFAULT_LANGUAGE);
const DEFAULT_STORAGE_NAME = "Local Archive";
const LEGACY_DEFAULT_STORAGE_NAMES = new Set(["考古文物项目", "鑰冨彜鏂囩墿椤圭洰"]);
const IS_EMBEDDED = new URLSearchParams(window.location.search).get("embedded") === "1";

if (IS_EMBEDDED) {
  document.body.classList.add("embedded-network");
}

const dom = {
  networkSummary: document.querySelector("#networkSummary"),
  themeToggleBtn: document.querySelector("#themeToggleBtn"),
  languageToggleBtn: document.querySelector("#languageToggleBtn"),
  csvInput: document.querySelector("#csvInput"),
  csvMode: document.querySelector("#csvMode"),
  csvIdColumn: document.querySelector("#csvIdColumn"),
  csvLabelColumn: document.querySelector("#csvLabelColumn"),
  csvSourceColumn: document.querySelector("#csvSourceColumn"),
  csvTargetColumn: document.querySelector("#csvTargetColumn"),
  csvWeightColumn: document.querySelector("#csvWeightColumn"),
  csvGroupColumn: document.querySelector("#csvGroupColumn"),
  csvStatus: document.querySelector("#csvStatus"),
  importCsvBtn: document.querySelector("#importCsvBtn"),
  mergeCsvBtn: document.querySelector("#mergeCsvBtn"),
  networkSidebar: document.querySelector("#networkSidebar"),
  sidebarToggleBtn: document.querySelector("#sidebarToggleBtn"),
  storageImportModeBtn: document.querySelector("#storageImportModeBtn"),
  csvImportModeBtn: document.querySelector("#csvImportModeBtn"),
  storageImportSection: document.querySelector("#storageImportSection"),
  csvImportSection: document.querySelector("#csvImportSection"),
  scopeAllStoragesBtn: document.querySelector("#scopeAllStoragesBtn"),
  scopeCurrentStorageBtn: document.querySelector("#scopeCurrentStorageBtn"),
  scopeFilteredBtn: document.querySelector("#scopeFilteredBtn"),
  storageScopeSelect: document.querySelector("#storageScopeSelect"),
  artifactFilterPanel: document.querySelector("#artifactFilterPanel"),
  artifactFilterField: document.querySelector("#artifactFilterField"),
  artifactFilterValue: document.querySelector("#artifactFilterValue"),
  artifactFilterValues: document.querySelector("#artifactFilterValues"),
  filterPresetSelect: document.querySelector("#filterPresetSelect"),
  saveFilterPresetBtn: document.querySelector("#saveFilterPresetBtn"),
  loadFilterPresetBtn: document.querySelector("#loadFilterPresetBtn"),
  applyArtifactFilterBtn: document.querySelector("#applyArtifactFilterBtn"),
  clearArtifactFilterBtn: document.querySelector("#clearArtifactFilterBtn"),
  focusFilterOnlyToggle: document.querySelector("#focusFilterOnlyToggle"),
  focusFilterOnlyLabel: document.querySelector("#focusFilterOnlyLabel"),
  topbarGraphControls: document.querySelector("#topbarGraphControls"),
  detailToggleBtn: document.querySelector("#detailToggleBtn"),
  scopeStatus: document.querySelector("#scopeStatus"),
  layoutModeSelect: document.querySelector("#layoutModeSelect"),
  edgeWeightingToggle: document.querySelector("#edgeWeightingToggle"),
  useSimilarityForceToggle: document.querySelector("#useSimilarityForceToggle"),
  nodeSizeMetricSelect: document.querySelector("#nodeSizeMetricSelect"),
  nodeColorMetricSelect: document.querySelector("#nodeColorMetricSelect"),
  leftNodeSizeControl: document.querySelector("#leftNodeSizeControl"),
  leftNodeSizeValue: document.querySelector("#leftNodeSizeValue"),
  edgeOpacityControl: document.querySelector("#edgeOpacityControl"),
  edgeOpacityValue: document.querySelector("#edgeOpacityValue"),
  labelVisibilityToggle: document.querySelector("#labelVisibilityToggle"),
  repulsionStrengthControl: document.querySelector("#repulsionStrengthControl"),
  repulsionStrengthValue: document.querySelector("#repulsionStrengthValue"),
  collisionStrengthControl: document.querySelector("#collisionStrengthControl"),
  collisionStrengthValue: document.querySelector("#collisionStrengthValue"),
  metricsNotLayoutHint: document.querySelector("#metricsNotLayoutHint"),
  nodeColorFieldSelect: document.querySelector("#nodeColorFieldSelect"),
  nodeShapeFieldSelect: document.querySelector("#nodeShapeFieldSelect"),
  nodeSizeFieldSelect: document.querySelector("#nodeSizeFieldSelect"),
  nodeOpacityFieldSelect: document.querySelector("#nodeOpacityFieldSelect"),
  edgeColorFieldSelect: document.querySelector("#edgeColorFieldSelect"),
  edgeOpacityFieldSelect: document.querySelector("#edgeOpacityFieldSelect"),
  edgeLabelFieldSelect: document.querySelector("#edgeLabelFieldSelect"),
  mapColorByField: document.querySelector("#mapColorByField"),
  mapShapeByField: document.querySelector("#mapShapeByField"),
  mapSizeByField: document.querySelector("#mapSizeByField"),
  mapOpacityByField: document.querySelector("#mapOpacityByField"),
  mapEdgeColorByField: document.querySelector("#mapEdgeColorByField"),
  mapEdgeOpacityByField: document.querySelector("#mapEdgeOpacityByField"),
  mapEdgeLabelByField: document.querySelector("#mapEdgeLabelByField"),
  classificationLegend: document.querySelector("#classificationLegend"),
  edgeClassificationLegend: document.querySelector("#edgeClassificationLegend"),
  graphStyleDock: document.querySelector("#graphStyleDock"),
  graphStyleToolbar: document.querySelector(".graph-style-toolbar"),
  inventoryTab: document.querySelector("#inventoryTab"),
  networkTab: document.querySelector("#networkTab"),
  refreshConfigBtn: document.querySelector("#refreshConfigBtn"),
  applyConfigBtn: document.querySelector("#applyConfigBtn"),
  analysisTypeSelect: document.querySelector("#analysisTypeSelect"),
  artifactAnalysisPanel: document.querySelector("#artifactAnalysisPanel"),
  fieldCheckedToggleBtn: document.querySelector("#fieldCheckedToggleBtn"),
  fieldSortToggleBtn: document.querySelector("#fieldSortToggleBtn"),
  artifactFieldList: document.querySelector("#artifactFieldList"),
  refreshFieldPercentBtn: document.querySelector("#refreshFieldPercentBtn"),
  systemFieldList: document.querySelector("#systemFieldList"),
  siteAnalysisPanel: document.querySelector("#siteAnalysisPanel"),
  siteNodeFieldSelect: document.querySelector("#siteNodeFieldSelect"),
  siteTargetFieldSelect: document.querySelector("#siteTargetFieldSelect"),
  siteMetricSelect: document.querySelector("#siteMetricSelect"),
  similarityThreshold: document.querySelector("#similarityThreshold"),
  thresholdValue: document.querySelector("#thresholdValue"),
  timeFilterPanel: document.querySelector("#timeFilterPanel"),
  timeFilterTitle: document.querySelector("#timeFilterTitle"),
  timeFilterMinLabel: document.querySelector("#timeFilterMinLabel"),
  timeFilterMaxLabel: document.querySelector("#timeFilterMaxLabel"),
  timeFilterMinInput: document.querySelector("#timeFilterMinInput"),
  timeFilterMaxInput: document.querySelector("#timeFilterMaxInput"),
  timeFilterMinRange: document.querySelector("#timeFilterMinRange"),
  timeFilterMaxRange: document.querySelector("#timeFilterMaxRange"),
  timeFilterStatus: document.querySelector("#timeFilterStatus"),
  resetTimeFilterBtn: document.querySelector("#resetTimeFilterBtn"),
  missingValueRulesTitle: document.querySelector("#missingValueRulesTitle"),
  includeEmptyFields: document.querySelector("#includeEmptyFields"),
  missingFieldLimitInput: document.querySelector("#missingFieldLimitInput"),
  removeEdgesOnMissingLimit: document.querySelector("#removeEdgesOnMissingLimit"),
  removeNodesOnMissingLimit: document.querySelector("#removeNodesOnMissingLimit"),
  missingValueMarkersInput: document.querySelector("#missingValueMarkersInput"),
  importantMissingFieldsFolder: document.querySelector("#importantMissingFieldsFolder"),
  importantMissingFieldsHint: document.querySelector("#importantMissingFieldsHint"),
  importantMissingFieldList: document.querySelector("#importantMissingFieldList"),
  hierarchyRulesPanel: document.querySelector("#hierarchyRulesPanel"),
  hierarchyRulesTitle: document.querySelector("#hierarchyRulesTitle"),
  hierarchyRulesHint: document.querySelector("#hierarchyRulesHint"),
  hierarchyRuleList: document.querySelector("#hierarchyRuleList"),
  addHierarchyRuleBtn: document.querySelector("#addHierarchyRuleBtn"),
  buildArtifactNetworkBtn: document.querySelector("#buildArtifactNetworkBtn"),
  showSimilarityMatrixBtn: document.querySelector("#showSimilarityMatrixBtn"),
  similarityMatrixDialog: document.querySelector("#similarityMatrixDialog"),
  closeSimilarityMatrixBtn: document.querySelector("#closeSimilarityMatrixBtn"),
  matrixFontDownBtn: document.querySelector("#matrixFontDownBtn"),
  matrixFontUpBtn: document.querySelector("#matrixFontUpBtn"),
  matrixFontSizeRange: document.querySelector("#matrixFontSizeRange"),
  matrixHeaderFieldSelect: document.querySelector("#matrixHeaderFieldSelect"),
  exportMatrixCsvBtn: document.querySelector("#exportMatrixCsvBtn"),
  similarityMatrixTitle: document.querySelector("#similarityMatrixTitle"),
  similarityMatrixMeta: document.querySelector("#similarityMatrixMeta"),
  similarityMatrixTable: document.querySelector("#similarityMatrixTable"),
  savedGraphLinkPanel: document.querySelector("#savedGraphLinkPanel"),
  savedGraphLinkInput: document.querySelector("#savedGraphLinkInput"),
  openSavedGraphLink: document.querySelector("#openSavedGraphLink"),
  saveGraphBtn: document.querySelector("#saveGraphBtn"),
  exportGraphBtn: document.querySelector("#exportGraphBtn"),
  exportPngBtn: document.querySelector("#exportPngBtn"),
  imageExportDialog: document.querySelector("#imageExportDialog"),
  closeImageExportBtn: document.querySelector("#closeImageExportBtn"),
  cancelImageExportBtn: document.querySelector("#cancelImageExportBtn"),
  confirmImageExportBtn: document.querySelector("#confirmImageExportBtn"),
  imageExportFormat: document.querySelector("#imageExportFormat"),
  imageExportName: document.querySelector("#imageExportName"),
  imageExportScale: document.querySelector("#imageExportScale"),
  imageExportHint: document.querySelector("#imageExportHint"),
  resetGraphBtn: document.querySelector("#resetGraphBtn"),
  newNodeId: document.querySelector("#newNodeId"),
  newNodeLabel: document.querySelector("#newNodeLabel"),
  addNodeBtn: document.querySelector("#addNodeBtn"),
  newEdgeSource: document.querySelector("#newEdgeSource"),
  newEdgeTarget: document.querySelector("#newEdgeTarget"),
  undirectedEdgeBtn: document.querySelector("#undirectedEdgeBtn"),
  directedEdgeBtn: document.querySelector("#directedEdgeBtn"),
  selfLoopBtn: document.querySelector("#selfLoopBtn"),
  addEdgeBtn: document.querySelector("#addEdgeBtn"),
  graphTitle: document.querySelector("#graphTitle"),
  graphSummary: document.querySelector("#graphSummary"),
  graphStage: document.querySelector("#graphStage"),
  graphSvg: document.querySelector("#graphSvg"),
  graphSelectionBox: document.querySelector("#graphSelectionBox"),
  graphEmpty: document.querySelector("#graphEmpty"),
  nodeHoverCard: document.querySelector("#nodeHoverCard"),
  layoutSelect: document.querySelector("#layoutSelect"),
  fitGraphBtn: document.querySelector("#fitGraphBtn"),
  layoutGraphBtn: document.querySelector("#layoutGraphBtn"),
  toggleLabelsBtn: document.querySelector("#toggleLabelsBtn"),
  metricNodes: document.querySelector("#metricNodes"),
  metricEdges: document.querySelector("#metricEdges"),
  metricDensity: document.querySelector("#metricDensity"),
  metricComponents: document.querySelector("#metricComponents"),
  centralityList: document.querySelector("#centralityList"),
  centralitySummary: document.querySelector("#centralitySummary"),
  centralitySelect: document.querySelector("#centralitySelect"),
  centralityThresholdTitle: document.querySelector("#centralityThresholdTitle"),
  centralityThresholdList: document.querySelector("#centralityThresholdList"),
  addCentralityThresholdBtn: document.querySelector("#addCentralityThresholdBtn"),
  inspectorEmpty: document.querySelector("#inspectorEmpty"),
  nodeInspector: document.querySelector("#nodeInspector"),
  edgeInspector: document.querySelector("#edgeInspector"),
  inspectNodeId: document.querySelector("#inspectNodeId"),
  inspectNodeLabel: document.querySelector("#inspectNodeLabel"),
  inspectNodeGroup: document.querySelector("#inspectNodeGroup"),
  inspectNodeNotes: document.querySelector("#inspectNodeNotes"),
  artifactPreview: document.querySelector("#artifactPreview"),
  openArtifactBtn: document.querySelector("#openArtifactBtn"),
  deleteNodeBtn: document.querySelector("#deleteNodeBtn"),
  inspectEdgeId: document.querySelector("#inspectEdgeId"),
  inspectEdgeLabel: document.querySelector("#inspectEdgeLabel"),
  inspectEdgeWeight: document.querySelector("#inspectEdgeWeight"),
  inspectEdgeNotes: document.querySelector("#inspectEdgeNotes"),
  deleteEdgeBtn: document.querySelector("#deleteEdgeBtn"),
  nodeTableTab: document.querySelector("#nodeTableTab"),
  edgeTableTab: document.querySelector("#edgeTableTab"),
  nodeTable: document.querySelector("#nodeTable"),
  edgeTable: document.querySelector("#edgeTable"),
  showNodesControl: document.querySelector("#showNodesControl"),
  nodeShapeControl: document.querySelector("#nodeShapeControl"),
  nodeColorControl: document.querySelector("#nodeColorControl"),
  nodeOpacityControl: document.querySelector("#nodeOpacityControl"),
  nodeSizeControl: document.querySelector("#nodeSizeControl"),
  nodeStrokeColorControl: document.querySelector("#nodeStrokeColorControl"),
  nodeStrokeWidthControl: document.querySelector("#nodeStrokeWidthControl"),
  nodeStrokeOpacityControl: document.querySelector("#nodeStrokeOpacityControl"),
  showEdgesControl: document.querySelector("#showEdgesControl"),
  vectorEdgesControl: document.querySelector("#vectorEdgesControl"),
  vectorModeToggleBtn: document.querySelector("#vectorModeToggleBtn"),
  edgeColorControl: document.querySelector("#edgeColorControl"),
  edgeOpacityStyleControl: document.querySelector("#edgeOpacityStyleControl"),
  edgeWidthControl: document.querySelector("#edgeWidthControl"),
  edgeStyleModeSelect: document.querySelector("#edgeStyleModeSelect"),
  edgeThresholdFieldSelect: document.querySelector("#edgeThresholdFieldSelect"),
  nodeLabelFieldRow: document.querySelector("#nodeLabelFieldRow"),
  nodeLabelFieldSelect: document.querySelector("#nodeLabelFieldSelect"),
  edgeStyleLabelFieldRow: document.querySelector("#edgeStyleLabelFieldRow"),
  edgeStyleLabelFieldSelect: document.querySelector("#edgeStyleLabelFieldSelect"),
  showNodeLabelsControl: document.querySelector("#showNodeLabelsControl"),
  showLabelsControl: document.querySelector("#showLabelsControl"),
  nodeLabelColorControl: document.querySelector("#nodeLabelColorControl"),
  nodeLabelSizeControl: document.querySelector("#nodeLabelSizeControl"),
  edgeLabelColorControl: document.querySelector("#edgeLabelColorControl"),
  edgeLabelSizeControl: document.querySelector("#edgeLabelSizeControl"),
  graphToolRail: document.querySelector("#graphToolRail"),
  selectToolBtn: document.querySelector("#selectToolBtn"),
  boxSelectToolBtn: document.querySelector("#boxSelectToolBtn"),
  filterToolBtn: document.querySelector("#filterToolBtn"),
  panToolBtn: document.querySelector("#panToolBtn"),
  rotateGraphBtn: document.querySelector("#rotateGraphBtn"),
  edgeThresholdSummary: document.querySelector("#edgeThresholdSummary"),
  edgeThresholdStyleList: document.querySelector("#edgeThresholdStyleList"),
  applyEdgeThresholdStyleBtn: document.querySelector("#applyEdgeThresholdStyleBtn"),
  addEdgeThresholdStyleBtn: document.querySelector("#addEdgeThresholdStyleBtn")
};

const state = {
  artifacts: [],
  images: [],
  fields: [],
  storages: [],
  activeStorageName: "",
  scopeMode: "all",
  filterFieldId: "",
  filterValue: "",
  filterValues: [],
  filterAction: "keep",
  filterPresets: [],
  detailPanelCollapsed: false,
  theme: localStorage.getItem("easy-network-theme") || "light",
  language: DEFAULT_LANGUAGE,
  graph: { nodes: [], edges: [] },
  savedNetworkLink: "",
  csv: null,
  selectedNodeId: null,
  selectedEdgeId: null,
  selectedNodeIds: new Set(),
  selectedEdgeIds: new Set(),
  showLabels: true,
  view: { x: 0, y: 0, scale: 1, rotation: 0 },
  tableMode: "nodes",
  nodeTableFieldIds: [],
  importMode: "storage",
  edgeMode: "undirected",
  allowSelfLoop: false,
  sidebarCollapsed: false,
  layoutMode: "spring",
  fieldUi: {
    order: [],
    checked: {},
    weights: {},
    showCheckedOnly: false,
    sortDirection: "asc",
    draggingId: ""
  },
  similarityRules: {
    edgeWeighting: true,
    useSimilarityAsForce: true,
    missingFieldLimit: 0,
    removeEdgesOnMissingLimit: true,
    removeNodesOnMissingLimit: false,
    missingValueMarkers: "(blank), NULL, n, N/A",
    importantMissingFieldIds: new Set()
  },
  visualEncoding: {
    nodeSizeMetric: "none",
    nodeColorMetric: "community",
    edgeOpacity: 0.75,
    repulsionStrength: 1,
    collisionStrength: 1,
    nodeColorFieldId: "",
    nodeShapeFieldId: "",
    nodeSizeFieldId: "",
    nodeOpacityFieldId: "",
    edgeColorFieldId: "similarity",
    edgeOpacityFieldId: "similarity",
    edgeLabelFieldId: "similarity",
    mapColorByField: false,
    mapShapeByField: false,
    mapSizeByField: false,
    mapOpacityByField: false,
    mapEdgeColorByField: false,
    mapEdgeOpacityByField: false,
    mapEdgeLabelByField: false,
    nodeColorOverrides: {},
    nodeShapeOverrides: {}
  },
  dateFilter: {
    domainMin: null,
    domainMax: null,
    min: null,
    max: null
  },
  hoverCardPinned: false,
  hoverHideTimer: null,
  style: {
    showNodes: true,
    nodeShape: "circle",
    nodeColor: "#286f6c",
    nodeOpacity: 1,
    nodeSize: 10,
    nodeStrokeColor: "#102326",
    nodeStrokeWidth: 0,
    nodeStrokeOpacity: 0,
    showEdges: true,
    vectorEdges: true,
    edgeColor: "#7a8b91",
    edgeOpacity: 0.75,
    edgeWidth: 1,
    edgeStyleMode: "threshold",
    edgeThresholdField: "similarity",
    nodeLabelField: "label",
    edgeStyleLabelField: "none",
    showLabels: true,
    showNodeLabels: true,
    showEdgeLabels: false,
    labelColor: "#eaf2f2",
    labelSize: 11,
    nodeLabelColor: "#eaf2f2",
    nodeLabelSize: 11,
    edgeLabelColor: "#eaf2f2",
    edgeLabelSize: 10
  },
  graphTool: "pan",
  centralityThresholds: [],
  hierarchyRules: [],
  edgeThresholdStyles: [],
  settingsReady: false,
  dragging: null,
  panning: null,
  rotating: null,
  boxSelecting: null,
  lastMatrix: null,
  matrixUi: {
    x: null,
    y: null,
    fontSize: 12,
    headerFieldId: "label"
  }
};

const NETWORK_I18N = {
  zh: {
    inventory: "文物管理库",
    network: "网络分析",
    save: "保存网络",
    exportJson: "导出 JSON",
    exportPng: "导出图像",
    clear: "清空画布",
    items: "个条目",
    graphTitle: "网络画布",
    fit: "适配",
    relayout: "重新布局",
    labels: "标签",
    centrality: "排行",
    selectToEdit: "选择一个节点或一条边查看。",
    openArtifact: "打开文物条目",
    deleteNode: "删除节点",
    deleteEdge: "删除边",
    nodes: "节点",
    edges: "边",
    density: "密度",
    components: "连通分量",
    noCsv: "未选择 CSV。",
    scopePrefix: "当前范围",
    allStorages: "所有库房",
    currentStorage: "当前库房",
    filteredItems: "筛选条目",
    csvImport: "CSV 导入",
    csvFile: "CSV 文件",
    importMode: "导入方式",
    autoMode: "自动识别节点/边",
    nodesMode: "作为节点表导入",
    edgesMode: "作为边表导入",
    importNetwork: "导入到网络",
    mergeImport: "叠加导入",
    storageScope: "库房导入范围",
    allStorageItems: "所有库房条目",
    currentStorageItems: "当前库房条目",
    filterItems: "筛选条目",
    storage: "Inventory",
    filterField: "筛选字段",
    fieldValue: "字段值",
    applyFilterScope: "应用筛选范围",
    analysisType: "网络分析类型",
    type: "类型",
    artifactNetwork: "器物相似度网络",
    siteNetwork: "遗址相似度网络",
    refresh: "刷新库房",
    apply: "应用网络选项",
    customWeights: "字段",
    rawMetadata: "元数据",
    threshold: "相似度阈值",
    timeFilter: "时间范围",
    timeFilterMin: "最早",
    timeFilterMax: "最晚",
    timeFilterReset: "重置",
    includeEmpty: "把空值也作为可比较内容",
    missingValues: "缺失值",
    refreshPercentages: "刷新百分比",
    missingFieldLimit: "缺失字段达到此数量则跳过",
    missingValueMarkers: "缺失值标记",
    importantMissingFields: "必须完整的重要字段",
    importantMissingHint: "任一被选重要字段缺失时，这对条目不参与比较。",
    selectStorage: "选择库房",
    buildNetwork: "生成网络",
    manualEdit: "手动编辑",
    addNode: "添加节点",
    directedEdges: "有向边",
    undirected: "无向",
    directed: "有向",
    selfLoop: "自循环",
    inspector: "检查器",
    nodesAndEdges: "节点和边列表",
    thresholdSimilarity: "相似度",
    distance: "吸引强度",
    thresholdLabel: "分类",
    color: "颜色",
    width: "宽度",
    opacity: "透明度",
    siteNodeField: "节点字段",
    targetField: "目标统计字段",
    similarityMetric: "相似度函数",
    centralityMetric: "中心性",
    distanceThresholds: "相似度吸引强度",
    hierarchyDistanceRules: "层级相似度距离",
    hierarchyDistanceHint: "当 Hierarchical Layout 启用时，这些相似度阈值会把关联更强的节点放到更近的层级。",
    edgeThresholdStyles: "边阈值样式",
    addThresholdStyle: "添加阈值样式",
    nodeSize: "节点大小"
  },
  en: {
    inventory: "Inventory",
    network: "Network",
    save: "Save Network",
    exportJson: "Export JSON",
    exportPng: "Export Image",
    clear: "Clear Canvas",
    items: "items",
    graphTitle: "Network Canvas",
    fit: "Fit",
    relayout: "Relayout",
    labels: "Labels",
    centrality: "Ranking and Centrality",
    selectToEdit: "Select a node or edge to inspect it.",
    openArtifact: "Open Artifact",
    deleteNode: "Delete Node",
    deleteEdge: "Delete Edge",
    nodes: "Nodes",
    edges: "Edges",
    density: "Density",
    components: "Components",
    noCsv: "No CSV selected.",
    scopePrefix: "Current Scope",
    allStorages: "All Storages",
    currentStorage: "Current Storage",
    filteredItems: "Filtered Items",
    csvImport: "CSV Import",
    csvFile: "CSV File",
    importMode: "Import mode",
    autoMode: "Auto-detect nodes/edges",
    nodesMode: "Import as node table",
    edgesMode: "Import as edge table",
    importNetwork: "Import to Network",
    mergeImport: "Merge Import",
    storageScope: "Inventory import scope",
    allStorageItems: "All inventory items",
    currentStorageItems: "Current storage items",
    filterItems: "Filter Items",
    storage: "Inventory",
    filterField: "Filter Field",
    fieldValue: "Field Value",
    applyFilterScope: "Apply Filter Scope",
    analysisType: "Similarity Type",
    type: "Type",
    artifactNetwork: "Artifact Similarity Network",
    siteNetwork: "Site Similarity Network",
    refresh: "Refresh Inventory",
    apply: "Apply Network Options",
    customWeights: "Fields and Weights",
    rawMetadata: "Metadata",
    threshold: "Similarity threshold",
    timeFilter: "Time range",
    timeFilterMin: "Earliest",
    timeFilterMax: "Latest",
    timeFilterReset: "Reset",
    includeEmpty: "Use empty values as comparable content",
    missingValues: "Missing Values",
    refreshPercentages: "Refresh percentages",
    missingFieldLimit: "Skip if missing fields reach",
    missingValueMarkers: "Missing value markers",
    importantMissingFields: "Important fields required",
    importantMissingHint: "If any selected important field is missing, that pair is skipped.",
    selectStorage: "Select Inventory",
    buildNetwork: "Build Network",
    manualEdit: "Manual Edit",
    addNode: "Add Node",
    directedEdges: "Directed edges",
    undirected: "Undirected",
    directed: "Directed",
    selfLoop: "Self-loop",
    inspector: "Inspector",
    nodesAndEdges: "Node and Edge List",
    thresholdSimilarity: "Similarity",
    distance: "Attraction",
    thresholdLabel: "Class",
    color: "Color",
    width: "Width",
    opacity: "Opacity",
    siteNodeField: "Node field",
    targetField: "Target statistic field",
    similarityMetric: "Similarity metric",
    centralityMetric: "Centrality",
    distanceThresholds: "Similarity attraction strength",
    hierarchyDistanceRules: "Hierarchy Similarity Distance",
    hierarchyDistanceHint: "When Hierarchical Layout is active, these similarity thresholds place closely linked nodes nearer each other.",
    edgeThresholdStyles: "Threshold Setting",
    addThresholdStyle: "Add Threshold Style",
    nodeSize: "Node size"
  }
};
function nt(key) {
  return NETWORK_I18N[state.language]?.[key] || NETWORK_I18N.en[key] || NETWORK_I18N.zh[key] || key;
}

class ArtifactReader {
  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onupgradeneeded = () => request.transaction.abort();
    });
  }

  async getAll(storeName) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getState() {
    const [artifacts, fields, images] = await Promise.all([this.getAll("artifacts"), this.getAll("fields"), this.getAll("images")]);
    return {
      artifacts: artifacts.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")),
      fields: fields.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
      images
    };
  }
}

const reader = new ArtifactReader();

const ThresholdRules = {
  edgeExists(similarity, threshold) {
    return Number(similarity || 0) >= Number(threshold || 0);
  },

  attractionStrength(weight) {
    const similarity = Number(weight || 0);
    const rule = state.centralityThresholds
      .slice()
      .sort((a, b) => b.similarity - a.similarity)
      .find((item) => similarity >= Number(item.similarity || 0));
    if (rule) return Math.max(0.05, Number(rule.strength ?? rule.distance ?? 1));
    return Math.max(0.1, similarity);
  },

  pathDistance(weight) {
    return 1 / Math.max(0.05, Number(weight || 0.05));
  }
};

const SimilarityEngine = {
  artifact(scopeArtifacts, selectedFields, includeEmpty, weights, threshold) {
    const nodes = scopeArtifacts.map((artifact) => ({
      id: artifact.id,
      uniqueID: artifact.id,
      label: artifact.metadata?.Title || artifact.title || artifact.id,
      group: artifact.metadata?.Location || "文物",
      type: "artifact",
      artifactId: artifact.id,
      notes: "",
      attrs: collectArtifactAttrs(artifact)
    }));
    const edges = [];
    for (let i = 0; i < scopeArtifacts.length; i += 1) {
      for (let j = i + 1; j < scopeArtifacts.length; j += 1) {
        const match = compareArtifacts(scopeArtifacts[i], scopeArtifacts[j], selectedFields, includeEmpty, weights);
        if (match.skipped) continue;
        if (!ThresholdRules.edgeExists(match.score, threshold)) continue;
        edges.push({
          id: createEdgeId(scopeArtifacts[i].id, scopeArtifacts[j].id, edges.length),
          source: scopeArtifacts[i].id,
          target: scopeArtifacts[j].id,
          weight: state.similarityRules.edgeWeighting ? round(match.score, 3) : 1,
          similarity: round(match.score, 3),
          label: match.reasons.join(" · ") || "similarity",
          notes: "",
          attrs: { reasons: match.reasons, matchedFields: match.matchedFields }
        });
      }
    }
    return { nodes, edges };
  },

  site(scopeArtifacts, nodeField, targetField, metric, threshold) {
    const groups = new Map();
    scopeArtifacts.forEach((artifact) => {
      const nodeValue = cleanCell(getFieldValue(artifact, nodeField));
      const targetValue = cleanCell(getFieldValue(artifact, targetField));
      if (!nodeValue || !targetValue) return;
      if (!groups.has(nodeValue)) groups.set(nodeValue, { label: nodeValue, counts: new Map(), artifacts: [] });
      const group = groups.get(nodeValue);
      group.counts.set(targetValue, (group.counts.get(targetValue) || 0) + 1);
      group.artifacts.push(artifact.id);
    });
    const nodes = Array.from(groups.entries()).map(([id, group]) => ({
      id,
      uniqueID: id,
      label: id,
      group: nodeField.label,
      type: "site",
      notes: `${group.artifacts.length} artifacts`,
      attrs: {
        counts: Object.fromEntries(group.counts),
        artifacts: group.artifacts,
        total: group.artifacts.length,
        nodeField: nodeField.label,
        targetField: targetField.label,
        metric
      }
    }));
    const edges = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const left = groups.get(nodes[i].id).counts;
        const right = groups.get(nodes[j].id).counts;
        const similarity = metric === "cosine"
          ? cosineSimilarity(left, right)
          : metric === "brayCurtis"
            ? brayCurtisSimilarity(left, right)
            : jaccardSimilarity(left, right);
        if (!ThresholdRules.edgeExists(similarity, threshold)) continue;
        edges.push({
          id: createEdgeId(nodes[i].id, nodes[j].id, edges.length),
          source: nodes[i].id,
          target: nodes[j].id,
          weight: state.similarityRules.edgeWeighting ? round(similarity, 3) : 1,
          similarity: round(similarity, 3),
          label: `${metric}:${round(similarity, 2)}`,
          notes: "",
          attrs: { metric }
        });
      }
    }
    return { nodes, edges };
  }
};

const MetricsEngine = {
  degrees: () => getDegrees(),
  centrality: (mode) => getCentralityScores(mode),
  density() {
    const n = state.graph.nodes.length;
    const e = state.graph.edges.length;
    return n > 1 ? (2 * e) / (n * (n - 1)) : 0;
  },
  components: () => countComponents()
};

const VisualEncodingEngine = {
  context() {
    return {
      sizeScores: scoreRowsToMap(MetricsEngine.centrality(state.visualEncoding.nodeSizeMetric)),
      colorScores: scoreRowsToMap(MetricsEngine.centrality(dom.centralitySelect?.value || "degree"))
    };
  },

  nodeRadius(node, context) {
    const base = Number(state.style.nodeSize || 10);
    const sizeField = getNodeVisualField("size");
    if (state.visualEncoding.mapSizeByField && sizeField) {
      return base + (categoryIndexForField(getNodeFieldValue(node, sizeField), sizeField) % 4) * 3;
    }
    if (state.visualEncoding.nodeSizeMetric === "none") return base;
    const score = context.sizeScores.get(node.id) || 0;
    const max = Math.max(0.01, ...context.sizeScores.values());
    return base + Math.min(14, (score / max) * 14);
  },

  nodeFill(node, context) {
    const colorField = getNodeVisualField("color");
    if (state.visualEncoding.mapColorByField && colorField) {
      const value = getNodeFieldValue(node, colorField);
      return state.visualEncoding.nodeColorOverrides?.[colorField.id]?.[value] || colorForCategoryValue(value);
    }
    const mode = state.visualEncoding.nodeColorMetric;
    if (mode === "centrality") {
      const score = context.colorScores.get(node.id) || 0;
      const max = Math.max(0.01, ...context.colorScores.values());
      const lightness = 66 - Math.min(34, (score / max) * 34);
      return `hsl(176, 48%, ${lightness}%)`;
    }
    if (mode === "material") return colorFromValue(node.attrs?.Material || node.attrs?.material || node.group || node.id);
    if (mode === "chronology") return colorFromValue(node.attrs?.Date || node.attrs?.date || node.group || node.id);
    return state.style.nodeColor;
  },

  nodeShape(node) {
    const shapeField = getNodeVisualField("shape");
    if (state.visualEncoding.mapShapeByField && shapeField) {
      const value = getNodeFieldValue(node, shapeField);
      return state.visualEncoding.nodeShapeOverrides?.[shapeField.id]?.[value] || shapeForCategoryValue(value, shapeField);
    }
    return state.style.nodeShape;
  },

  nodeOpacity(node) {
    const opacityField = getNodeVisualField("opacity");
    const baseOpacity = clamp(Number(state.style.nodeOpacity ?? 1), 0, 1);
    if (!state.visualEncoding.mapOpacityByField || !opacityField) return baseOpacity;
    const mappedOpacity = 1 - (categoryIndexForField(getNodeFieldValue(node, opacityField), opacityField) % 4) * 0.16;
    return clamp(baseOpacity * mappedOpacity, 0, 1);
  },

  edgeStyle(edge) {
    const thresholdStyle = state.style.edgeStyleMode === "threshold" ? getEdgeThresholdStyle(edge) : null;
    const colorValue = getEdgeVisualValue(edge, state.visualEncoding.edgeColorFieldId);
    const opacityValue = getEdgeVisualValue(edge, state.visualEncoding.edgeOpacityFieldId);
    const opacityScale = state.visualEncoding.mapEdgeOpacityByField ? (0.25 + normalizedVisualValue(opacityValue, state.visualEncoding.edgeOpacityFieldId) * 0.75) : 1;
    const mappedStroke = state.visualEncoding.mapEdgeColorByField ? colorForCategoryValue(colorValue) : state.style.edgeColor;
    const weightedWidth = (1 + Math.min(5, Number(edge.weight || 1) * 2)) * state.style.edgeWidth;
    return {
      stroke: thresholdStyle?.color || mappedStroke,
      opacity: thresholdStyle ? clamp(thresholdStyle.opacity, 0, 1) : clamp(Number(state.style.edgeOpacity ?? 0.75) * opacityScale, 0, 1),
      width: thresholdStyle ? thresholdStyle.width : weightedWidth,
      thresholdApplied: Boolean(thresholdStyle)
    };
  }
};

const LayoutEngine = {
  apply(mode, options = {}) {
    const nextMode = ["spring", "similarity", "circular", "hierarchical"].includes(mode) ? mode : "spring";
    state.layoutMode = nextMode;
    syncLayoutControls(nextMode);
    const rect = dom.graphStage.getBoundingClientRect();
    const size = { width: Math.max(rect.width, 600), height: Math.max(rect.height, 420) };
    if (nextMode === "spring") this.spring(size, options.reset !== false);
    if (nextMode === "similarity") this.similarity(size);
    if (nextMode === "circular") this.circular(size);
    if (nextMode === "hierarchical") this.hierarchical(size);
  },

  ensure(size = null) {
    const rect = size || dom.graphStage.getBoundingClientRect();
    const width = Math.max(rect.width || 600, 600);
    const height = Math.max(rect.height || 420, 420);
    state.graph.nodes.forEach((node, index) => {
      if (Number.isFinite(node.x) && Number.isFinite(node.y)) return;
      const angle = (index / Math.max(1, state.graph.nodes.length)) * Math.PI * 2;
      node.x = width / 2 + Math.cos(angle) * Math.min(width, height) * 0.28;
      node.y = height / 2 + Math.sin(angle) * Math.min(width, height) * 0.28;
    });
  },

  circular(size) {
    const nodes = state.graph.nodes;
    const cx = size.width / 2;
    const cy = size.height / 2;
    const radius = Math.min(size.width, size.height) * 0.32;
    nodes.forEach((node, index) => {
      const angle = (index / Math.max(1, nodes.length)) * Math.PI * 2;
      node.x = cx + Math.cos(angle) * radius;
      node.y = cy + Math.sin(angle) * radius;
      node.vx = 0;
      node.vy = 0;
    });
  },

  hierarchical(size) {
    if (state.hierarchyRules.length) {
      this.hierarchicalDistance(size);
      return;
    }
    const nodes = state.graph.nodes.slice().sort((a, b) => {
      const groupA = hierarchyGroupForNode(a);
      const groupB = hierarchyGroupForNode(b);
      return groupA.sort - groupB.sort || groupA.label.localeCompare(groupB.label) || String(a.label || a.id).localeCompare(String(b.label || b.id));
    });
    const groups = new Map();
    nodes.forEach((node) => {
      const key = hierarchyGroupForNode(node).label;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(node);
    });
    const groupEntries = Array.from(groups.values());
    groupEntries.forEach((group, row) => {
      group.forEach((node, col) => {
        node.x = size.width * 0.16 + (col / Math.max(1, group.length - 1)) * size.width * 0.68;
        node.y = size.height * 0.16 + (row / Math.max(1, groupEntries.length - 1)) * size.height * 0.68;
        node.vx = 0;
        node.vy = 0;
      });
    });
  },

  hierarchicalDistance(size) {
    this.circular(size);
    const nodes = state.graph.nodes;
    const edges = state.graph.edges;
    applyHierarchyEdgeDistances();
    for (let tick = 0; tick < 160; tick += 1) {
      nodes.forEach((node) => {
        node.vx = (node.vx || 0) * 0.72;
        node.vy = (node.vy || 0) * 0.72;
      });
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (b.x || 0) - (a.x || 0) || 0.01;
          const dy = (b.y || 0) - (a.y || 0) || 0.01;
          const distance2 = Math.max(dx * dx + dy * dy, 80);
          const force = (760 * state.visualEncoding.repulsionStrength) / distance2;
          a.vx -= dx * force;
          a.vy -= dy * force;
          b.vx += dx * force;
          b.vy += dy * force;
        }
      }
      edges.forEach((edge) => {
        const source = findNode(edge.source);
        const target = findNode(edge.target);
        if (!source || !target) return;
        const preferred = hierarchyPreferredPixelDistance(edge, size);
        applyPairForce(source, target, preferred, 0.028 * Math.max(0.35, Number(edge.weight || 1)));
      });
      settleNodes(size, 0.0025);
    }
  },

  similarity(size) {
    this.circular(size);
    const nodes = state.graph.nodes;
    for (let tick = 0; tick < 130; tick += 1) {
      nodes.forEach((node) => {
        node.vx = (node.vx || 0) * 0.74;
        node.vy = (node.vy || 0) * 0.74;
      });
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const edge = state.graph.edges.find((item) => (item.source === a.id && item.target === b.id) || (item.source === b.id && item.target === a.id));
          const similarity = edge ? Number(edge.similarity ?? edge.weight ?? 0) : 0;
          const preferred = 70 + (1 - similarity) * 250;
          applyPairForce(a, b, preferred, 0.012);
        }
      }
      settleNodes(size, 0.003);
    }
  },

  spring(size, resetPositions = true) {
    if (resetPositions) this.circular(size);
    this.ensure(size);
    const nodes = state.graph.nodes;
    const edges = state.graph.edges;
    for (let tick = 0; tick < 180; tick += 1) {
      nodes.forEach((node) => {
        node.vx = (node.vx || 0) * 0.72;
        node.vy = (node.vy || 0) * 0.72;
      });
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (b.x || 0) - (a.x || 0) || 0.01;
          const dy = (b.y || 0) - (a.y || 0) || 0.01;
          const distance2 = Math.max(dx * dx + dy * dy, 80);
          const force = (880 * state.visualEncoding.repulsionStrength) / distance2;
          a.vx -= dx * force;
          a.vy -= dy * force;
          b.vx += dx * force;
          b.vy += dy * force;
        }
      }
      edges.forEach((edge) => {
        const source = findNode(edge.source);
        const target = findNode(edge.target);
        if (!source || !target) return;
        const similarity = Number(edge.similarity ?? edge.weight ?? 0);
        const attraction = state.similarityRules.useSimilarityAsForce ? ThresholdRules.attractionStrength(similarity) : 1;
        const weighted = state.similarityRules.edgeWeighting ? Math.max(0.25, Number(edge.weight || 1)) : 1;
        const preferred = state.similarityRules.useSimilarityAsForce ? 52 + (1 - Math.max(0, Math.min(1, similarity))) * 260 : 105;
        applyPairForce(source, target, preferred, 0.015 * attraction * weighted);
      });
      settleNodes(size, 0.002);
    }
  }
};

function loadNetworkSettings() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(NETWORK_SETTINGS_KEY) || "null");
  } catch {
    saved = null;
  }
  if (!saved || typeof saved !== "object") {
    state.settingsReady = true;
    return;
  }
  state.scopeMode = ["storage", "filtered", "all"].includes(saved.scopeMode) ? saved.scopeMode : state.scopeMode;
  state.activeStorageName = state.storages.includes(saved.activeStorageName) ? saved.activeStorageName : "";
  state.filterFieldId = saved.filterFieldId || "";
  state.filterValue = saved.filterValue || "";
  state.filterValues = Array.isArray(saved.filterValues)
    ? saved.filterValues.map(String)
    : (state.filterValue ? String(state.filterValue).split("\u001f").filter(Boolean) : []);
  state.filterAction = saved.filterAction === "focus" ? "focus" : "keep";
  state.filterPresets = Array.isArray(saved.filterPresets)
    ? saved.filterPresets.filter((preset) => preset && typeof preset === "object")
    : [];
  state.detailPanelCollapsed = Boolean(saved.detailPanelCollapsed);
  state.nodeTableFieldIds = Array.isArray(saved.nodeTableFieldIds) ? saved.nodeTableFieldIds.map(String) : [];
  if (saved.matrixUi && typeof saved.matrixUi === "object") {
    state.matrixUi = {
      ...state.matrixUi,
      x: Number.isFinite(Number(saved.matrixUi.x)) ? Number(saved.matrixUi.x) : null,
      y: Number.isFinite(Number(saved.matrixUi.y)) ? Number(saved.matrixUi.y) : null,
      fontSize: Number.isFinite(Number(saved.matrixUi.fontSize)) ? clamp(Number(saved.matrixUi.fontSize), 9, 22) : state.matrixUi.fontSize,
      headerFieldId: saved.matrixUi.headerFieldId || state.matrixUi.headerFieldId
    };
  }
  state.layoutMode = ["spring", "similarity", "circular", "hierarchical"].includes(saved.layoutMode) ? saved.layoutMode : state.layoutMode;
  if (saved.fieldUi && typeof saved.fieldUi === "object") {
    state.fieldUi = {
      ...state.fieldUi,
      ...saved.fieldUi,
      checked: saved.fieldUi.checked || {},
      weights: saved.fieldUi.weights || {},
      order: Array.isArray(saved.fieldUi.order) ? saved.fieldUi.order : []
    };
    state.fieldUi.draggingId = "";
  }
  if (saved.similarityRules && typeof saved.similarityRules === "object") {
    state.similarityRules = {
      ...state.similarityRules,
      ...saved.similarityRules,
      importantMissingFieldIds: new Set(saved.similarityRules.importantMissingFieldIds || [])
    };
    state.similarityRules.useSimilarityAsForce = true;
  }
  if (saved.visualEncoding && typeof saved.visualEncoding === "object") {
    state.visualEncoding = { ...state.visualEncoding, ...saved.visualEncoding };
  }
  if (saved.style && typeof saved.style === "object") {
    state.style = { ...state.style, ...saved.style };
  }
  if (saved.style?.edgeOpacity === undefined && Number.isFinite(Number(state.visualEncoding.edgeOpacity))) {
    state.style.edgeOpacity = Number(state.visualEncoding.edgeOpacity);
  }
  if (Array.isArray(saved.centralityThresholds)) state.centralityThresholds = saved.centralityThresholds;
  if (Array.isArray(saved.hierarchyRules)) state.hierarchyRules = saved.hierarchyRules;
  if (Array.isArray(saved.edgeThresholdStyles)) state.edgeThresholdStyles = saved.edgeThresholdStyles;
  if (saved.dateFilter && typeof saved.dateFilter === "object") {
    state.dateFilter.min = Number.isFinite(Number(saved.dateFilter.min)) ? Number(saved.dateFilter.min) : null;
    state.dateFilter.max = Number.isFinite(Number(saved.dateFilter.max)) ? Number(saved.dateFilter.max) : null;
  }
  syncControlsFromSettings(saved);
  state.settingsReady = true;
}

function syncControlsFromSettings(saved = {}) {
  if (dom.storageScopeSelect) dom.storageScopeSelect.value = state.activeStorageName;
  if (dom.analysisTypeSelect && saved.analysisType && Array.from(dom.analysisTypeSelect.options).some((option) => option.value === saved.analysisType)) {
    dom.analysisTypeSelect.value = saved.analysisType;
  }
  if (dom.layoutModeSelect) dom.layoutModeSelect.value = state.layoutMode;
  if (dom.layoutSelect) dom.layoutSelect.value = state.layoutMode;
  if (dom.similarityThreshold && Number.isFinite(Number(saved.similarityThreshold))) {
    dom.similarityThreshold.value = String(clamp(Number(saved.similarityThreshold), 0, 1));
  }
  if (dom.artifactFilterField && state.filterFieldId) dom.artifactFilterField.value = state.filterFieldId;
  if (dom.focusFilterOnlyToggle) dom.focusFilterOnlyToggle.checked = state.filterAction === "focus";
  if (dom.matrixFontSizeRange) dom.matrixFontSizeRange.value = String(state.matrixUi.fontSize || 12);
  if (dom.thresholdValue && dom.similarityThreshold) dom.thresholdValue.textContent = Number(dom.similarityThreshold.value).toFixed(2);
  if (dom.edgeWeightingToggle) dom.edgeWeightingToggle.checked = Boolean(state.similarityRules.edgeWeighting);
  if (dom.useSimilarityForceToggle) dom.useSimilarityForceToggle.checked = true;
  if (dom.includeEmptyFields) dom.includeEmptyFields.checked = Boolean(saved.includeEmptyFields);
  if (dom.missingFieldLimitInput) dom.missingFieldLimitInput.value = String(state.similarityRules.missingFieldLimit || 0);
  if (dom.removeEdgesOnMissingLimit) dom.removeEdgesOnMissingLimit.checked = state.similarityRules.removeEdgesOnMissingLimit !== false;
  if (dom.removeNodesOnMissingLimit) dom.removeNodesOnMissingLimit.checked = Boolean(state.similarityRules.removeNodesOnMissingLimit);
  if (dom.missingValueMarkersInput) dom.missingValueMarkersInput.value = state.similarityRules.missingValueMarkers || "";
  Object.entries({
    showNodesControl: ["showNodes", "checked"],
    nodeShapeControl: ["nodeShape", "value"],
    nodeColorControl: ["nodeColor", "value"],
    nodeOpacityControl: ["nodeOpacity", "value"],
    nodeSizeControl: ["nodeSize", "value"],
    nodeStrokeColorControl: ["nodeStrokeColor", "value"],
    nodeStrokeWidthControl: ["nodeStrokeWidth", "value"],
    nodeStrokeOpacityControl: ["nodeStrokeOpacity", "value"],
    showEdgesControl: ["showEdges", "checked"],
    vectorEdgesControl: ["vectorEdges", "checked"],
    edgeColorControl: ["edgeColor", "value"],
    edgeOpacityStyleControl: ["edgeOpacity", "value"],
    edgeWidthControl: ["edgeWidth", "value"],
    edgeStyleModeSelect: ["edgeStyleMode", "value"],
    edgeThresholdFieldSelect: ["edgeThresholdField", "value"],
    showNodeLabelsControl: ["showNodeLabels", "checked"],
    showLabelsControl: ["showEdgeLabels", "checked"],
    nodeLabelColorControl: ["nodeLabelColor", "value"],
    nodeLabelSizeControl: ["nodeLabelSize", "value"],
    edgeLabelColorControl: ["edgeLabelColor", "value"],
    edgeLabelSizeControl: ["edgeLabelSize", "value"]
  }).forEach(([domKey, [stateKey, prop]]) => {
    const control = dom[domKey];
    if (!control || state.style[stateKey] === undefined) return;
    control[prop] = state.style[stateKey];
  });
  syncEngineControlValues();
  applyDetailPanelCollapsed();
}

function saveNetworkSettings() {
  if (!state.settingsReady) return;
  captureFieldUiState();
  const settings = {
    scopeMode: state.scopeMode,
    activeStorageName: state.activeStorageName,
    filterFieldId: state.filterFieldId,
    filterValue: state.filterValue,
    filterValues: state.filterValues,
    filterAction: state.filterAction,
    filterPresets: state.filterPresets,
    detailPanelCollapsed: Boolean(state.detailPanelCollapsed),
    nodeTableFieldIds: state.nodeTableFieldIds,
    matrixUi: state.matrixUi,
    analysisType: dom.analysisTypeSelect?.value || "artifact",
    layoutMode: dom.layoutModeSelect?.value || state.layoutMode,
    similarityThreshold: Number(dom.similarityThreshold?.value || 0),
    includeEmptyFields: Boolean(dom.includeEmptyFields?.checked),
    fieldUi: {
      order: state.fieldUi.order || [],
      checked: state.fieldUi.checked || {},
      weights: state.fieldUi.weights || {},
      showCheckedOnly: Boolean(state.fieldUi.showCheckedOnly),
      sortDirection: state.fieldUi.sortDirection || "asc"
    },
    similarityRules: {
      ...state.similarityRules,
      importantMissingFieldIds: Array.from(state.similarityRules.importantMissingFieldIds || [])
    },
    visualEncoding: state.visualEncoding,
    style: state.style,
    dateFilter: {
      min: state.dateFilter.min,
      max: state.dateFilter.max
    },
    centralityThresholds: state.centralityThresholds,
    hierarchyRules: state.hierarchyRules,
    edgeThresholdStyles: state.edgeThresholdStyles
  };
  localStorage.setItem(NETWORK_SETTINGS_KEY, JSON.stringify(settings));
}

async function boot() {
  await loadArtifacts();
  loadSavedGraph();
  loadLinkedGraphFromUrl();
  dockGraphStyleToolbar();
  applySharedChrome();
  applyThemeLabelDefaults();
  loadNetworkSettings();
  applyDetailPanelCollapsed();
  bindEvents();
  orderSidebarPanels();
  enableNetworkSidebarResize();
  enableNetworkDetailResize();
  enableMatrixDialogInteractions();
  enableSidebarPanelCollapse();
  renderScopeControls();
  renderFieldOptions();
  renderAnalysisMode();
  renderAll();
  fitGraph();
}

async function loadArtifacts() {
  try {
    const next = await reader.getState();
    state.artifacts = next.artifacts;
    state.fields = next.fields;
    state.images = next.images;
    state.storages = getStorages();
  } catch (error) {
    state.artifacts = [];
    state.fields = [];
    state.images = [];
    dom.artifactFieldList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No readable inventory data yet." : "还没有可读取的文物库数据。"}</p>`;
  }
}

let externalInventoryRefreshPromise = null;

async function refreshInventoryFromExternalUpdate() {
  if (externalInventoryRefreshPromise) return externalInventoryRefreshPromise;
  externalInventoryRefreshPromise = (async () => {
    await loadArtifacts();
    renderScopeControls();
    renderFieldOptions();
    renderAnalysisMode();
    renderAll();
  })().finally(() => {
    externalInventoryRefreshPromise = null;
  });
  return externalInventoryRefreshPromise;
}

function bindEvents() {
  dom.themeToggleBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("easy-network-theme", state.theme);
    applySharedChrome();
  });
  dom.languageToggleBtn.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    localStorage.setItem("easy-network-language", state.language);
    applySharedChrome();
  });
  dom.inventoryTab.addEventListener("click", (event) => {
    event.preventDefault();
    if (IS_EMBEDDED) {
      window.parent.postMessage({ type: "easy-network-show-workspace", workspace: "inventory" }, "*");
      return;
    }
    window.location.href = `${window.location.origin}/index.html`;
  });
  dom.networkTab.addEventListener("click", (event) => {
    event.preventDefault();
    if (IS_EMBEDDED) return;
    window.location.href = `${window.location.origin}/network.html`;
  });
  dom.csvInput?.addEventListener("change", handleCsvFile);
  dom.csvMode?.addEventListener("change", renderCsvColumnOptions);
  dom.importCsvBtn?.addEventListener("click", () => importCsv(false));
  dom.mergeCsvBtn?.addEventListener("click", () => importCsv(true));
  dom.storageImportModeBtn?.addEventListener("click", () => setImportMode("storage"));
  dom.csvImportModeBtn?.addEventListener("click", () => setImportMode("csv"));
  dom.sidebarToggleBtn.addEventListener("click", toggleSidebar);
  bindStyleControls();
  bindEngineControls();
  dom.centralitySelect.addEventListener("change", renderAll);
  dom.addCentralityThresholdBtn?.addEventListener("click", addCentralityThreshold);
  dom.addHierarchyRuleBtn?.addEventListener("click", addHierarchyRule);
  dom.refreshFieldPercentBtn?.addEventListener("click", updateFieldWeightPercents);
  dom.fieldCheckedToggleBtn?.addEventListener("click", () => {
    captureFieldUiState();
    state.fieldUi.showCheckedOnly = !state.fieldUi.showCheckedOnly;
    renderFieldOptions();
    saveNetworkSettings();
  });
  dom.fieldSortToggleBtn?.addEventListener("click", () => {
    captureFieldUiState();
    state.fieldUi.sortDirection = state.fieldUi.sortDirection === "asc" ? "desc" : "asc";
    renderFieldOptions();
    saveNetworkSettings();
  });
  dom.panToolBtn?.addEventListener("click", () => setGraphTool("pan"));
  dom.rotateGraphBtn?.addEventListener("click", () => setGraphTool(state.graphTool === "rotate" ? "pan" : "rotate"));
  dom.selectToolBtn?.addEventListener("click", () => setGraphTool("select"));
  dom.boxSelectToolBtn?.addEventListener("click", () => setGraphTool("box"));
  dom.filterToolBtn?.addEventListener("click", () => toggleFilterPanelFromTool());
  dom.refreshConfigBtn.addEventListener("click", async () => {
    await loadArtifacts();
    renderScopeControls();
    renderFieldOptions();
    renderAll();
  });
  dom.applyConfigBtn.addEventListener("click", handleBuildNetworkClick);
  dom.scopeAllStoragesBtn?.addEventListener("click", () => setScopeMode("all"));
  dom.scopeCurrentStorageBtn.addEventListener("click", () => setScopeMode("storage"));
  dom.scopeFilteredBtn.addEventListener("click", () => {
    dom.artifactFilterPanel.classList.toggle("hidden");
    renderScopeControls();
    renderFieldOptions();
    saveNetworkSettings();
  });
  dom.storageScopeSelect.addEventListener("change", () => {
    state.activeStorageName = dom.storageScopeSelect.value;
    localStorage.setItem("easy-network-storage-name", state.activeStorageName);
    state.scopeMode = "storage";
    renderFieldOptions();
    renderScopeControls();
    renderAll();
    saveNetworkSettings();
  });
  dom.artifactFilterField.addEventListener("change", () => {
    state.filterValues = [];
    state.filterValue = "";
    renderArtifactFilterValues();
    saveNetworkSettings();
  });
  dom.focusFilterOnlyToggle?.addEventListener("change", () => {
    state.filterAction = dom.focusFilterOnlyToggle.checked ? "focus" : "keep";
    saveNetworkSettings();
  });
  dom.applyArtifactFilterBtn.addEventListener("click", applyArtifactFilter);
  dom.clearArtifactFilterBtn?.addEventListener("click", clearArtifactFilter);
  dom.saveFilterPresetBtn?.addEventListener("click", saveCurrentFilterPreset);
  dom.loadFilterPresetBtn?.addEventListener("click", loadSelectedFilterPreset);
  dom.analysisTypeSelect.addEventListener("change", () => {
    renderAnalysisMode();
    saveNetworkSettings();
  });
  dom.similarityThreshold.addEventListener("input", () => {
    dom.thresholdValue.textContent = Number(dom.similarityThreshold.value).toFixed(2);
    saveNetworkSettings();
  });
  bindTimeFilterControls();
  dom.missingValueMarkersInput?.addEventListener("input", () => {
    state.similarityRules.missingValueMarkers = dom.missingValueMarkersInput.value;
    saveNetworkSettings();
  });
  dom.missingValueMarkersInput?.addEventListener("change", rebuildArtifactNetworkIfReady);
  dom.includeEmptyFields?.addEventListener("change", () => {
    saveNetworkSettings();
    rebuildArtifactNetworkIfReady();
  });
  dom.buildArtifactNetworkBtn?.addEventListener("click", handleBuildNetworkClick);
  dom.showSimilarityMatrixBtn?.addEventListener("click", showSimilarityMatrix);
  dom.matrixFontDownBtn?.addEventListener("click", () => changeMatrixFontSize(-1));
  dom.matrixFontUpBtn?.addEventListener("click", () => changeMatrixFontSize(1));
  dom.matrixFontSizeRange?.addEventListener("input", () => setMatrixFontSize(Number(dom.matrixFontSizeRange.value)));
  dom.matrixFontSizeRange?.addEventListener("pointerdown", (event) => event.stopPropagation());
  dom.matrixFontSizeRange?.addEventListener("click", (event) => event.stopPropagation());
  dom.matrixHeaderFieldSelect?.addEventListener("change", () => {
    state.matrixUi.headerFieldId = dom.matrixHeaderFieldSelect.value || "label";
    if (state.lastMatrix) renderMatrixTable(state.lastMatrix);
    saveNetworkSettings();
  });
  dom.matrixHeaderFieldSelect?.addEventListener("pointerdown", (event) => event.stopPropagation());
  dom.matrixHeaderFieldSelect?.addEventListener("click", (event) => event.stopPropagation());
  dom.exportMatrixCsvBtn?.addEventListener("click", exportSimilarityMatrixCsv);
  dom.applyEdgeThresholdStyleBtn?.addEventListener("click", applyEdgeThresholdStyles);
  dom.closeSimilarityMatrixBtn?.addEventListener("click", hideSimilarityMatrix);
  dom.similarityMatrixDialog?.addEventListener("click", (event) => {
    if (event.target === dom.similarityMatrixDialog) hideSimilarityMatrix();
  });
  dom.saveGraphBtn.addEventListener("click", saveGraph);
  dom.exportGraphBtn.addEventListener("click", exportGraph);
  dom.exportPngBtn?.addEventListener("click", openImageExportDialog);
  dom.closeImageExportBtn?.addEventListener("click", closeImageExportDialog);
  dom.cancelImageExportBtn?.addEventListener("click", closeImageExportDialog);
  dom.confirmImageExportBtn?.addEventListener("click", exportGraphImage);
  dom.imageExportDialog?.addEventListener("click", (event) => {
    if (event.target === dom.imageExportDialog) closeImageExportDialog();
  });
  dom.detailToggleBtn?.addEventListener("click", () => {
    state.detailPanelCollapsed = !state.detailPanelCollapsed;
    applyDetailPanelCollapsed();
    saveNetworkSettings();
  });
  dom.resetGraphBtn.addEventListener("click", resetGraph);
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === "easy-network-inventory-updated") refreshInventoryFromExternalUpdate();
    if (event.data?.type === "easy-network-theme-changed") {
      state.theme = event.data.theme === "dark" ? "dark" : "light";
      localStorage.setItem("easy-network-theme", state.theme);
      applySharedChrome();
      applyThemeLabelDefaults();
      renderGraph();
    }
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "easy-network-inventory-updated-at") refreshInventoryFromExternalUpdate();
    if (event.key === "easy-network-theme") {
      state.theme = event.newValue === "dark" ? "dark" : "light";
      applySharedChrome();
      applyThemeLabelDefaults();
      renderGraph();
    }
  });
  dom.addNodeBtn.addEventListener("click", addManualNode);
  dom.undirectedEdgeBtn.addEventListener("click", () => setEdgeMode("undirected"));
  dom.directedEdgeBtn.addEventListener("click", () => setEdgeMode("directed"));
  dom.selfLoopBtn.addEventListener("click", () => {
    state.allowSelfLoop = !state.allowSelfLoop;
    dom.selfLoopBtn.classList.toggle("active", state.allowSelfLoop);
  });
  dom.addEdgeBtn.addEventListener("click", addManualEdge);
  dom.fitGraphBtn.addEventListener("click", fitGraph);
  dom.vectorModeToggleBtn?.addEventListener("click", () => {
    state.style.vectorEdges = !state.style.vectorEdges;
    if (dom.vectorEdgesControl) dom.vectorEdgesControl.checked = state.style.vectorEdges;
    syncVectorModeControl();
    renderGraph();
    saveNetworkSettings();
  });
  dom.layoutGraphBtn.addEventListener("click", () => applySelectedLayout(true));
  dom.layoutSelect.addEventListener("change", () => {
    if (dom.layoutModeSelect) dom.layoutModeSelect.value = dom.layoutSelect.value;
    syncHierarchyRulesPanel();
    applySelectedLayout(true);
  });
  dom.toggleLabelsBtn.addEventListener("click", () => {
    const next = !(state.style.showNodeLabels || state.style.showEdgeLabels);
    state.style.showLabels = next;
    state.style.showNodeLabels = next;
    state.style.showEdgeLabels = next;
    if (dom.showNodeLabelsControl) dom.showNodeLabelsControl.checked = next;
    dom.showLabelsControl.checked = next;
    dom.toggleLabelsBtn.classList.toggle("active", next);
    renderGraph();
  });
  dom.inspectNodeLabel.addEventListener("input", updateSelectedNode);
  dom.inspectNodeGroup.addEventListener("input", updateSelectedNode);
  dom.inspectNodeNotes.addEventListener("input", updateSelectedNode);
  dom.inspectEdgeLabel.addEventListener("input", updateSelectedEdge);
  dom.inspectEdgeWeight.addEventListener("input", updateSelectedEdge);
  dom.inspectEdgeNotes.addEventListener("input", updateSelectedEdge);
  dom.openArtifactBtn.addEventListener("click", openSelectedArtifact);
  dom.deleteNodeBtn.addEventListener("click", deleteSelectedNode);
  dom.deleteEdgeBtn.addEventListener("click", deleteSelectedEdge);
  dom.nodeTableTab.addEventListener("click", () => setTableMode("nodes"));
  dom.edgeTableTab.addEventListener("click", () => setTableMode("edges"));
  dom.graphStage.addEventListener("wheel", handleWheel, { passive: false });
  dom.graphStage.addEventListener("pointerdown", beginPan);
  dom.graphStage.addEventListener("pointermove", handlePointerMove);
  dom.graphStage.addEventListener("pointerup", endPointerAction);
  dom.graphStage.addEventListener("pointerleave", endPointerAction);
  dom.nodeHoverCard.addEventListener("pointerenter", () => {
    state.hoverCardPinned = true;
    clearTimeout(state.hoverHideTimer);
  });
  dom.nodeHoverCard.addEventListener("wheel", (event) => {
    event.stopPropagation();
  }, { passive: true });
  dom.nodeHoverCard.addEventListener("pointerleave", () => {
    state.hoverCardPinned = false;
    hideNodeHover();
  });
  window.addEventListener("resize", renderGraph);
  renderImportMode();
  setEdgeMode(state.edgeMode);
  setGraphTool(state.graphTool);
}

function applySharedChrome() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.body.dataset.theme = state.theme;
  dom.themeToggleBtn.textContent = state.theme === "light" ? "☀" : "☾";
  dom.themeToggleBtn.classList.toggle("active", state.theme === "light");
  dom.languageToggleBtn.classList.toggle("is-en", state.language === "en");
  dom.inventoryTab.textContent = nt("inventory");
  dom.networkTab.textContent = nt("network");
  dom.saveGraphBtn.textContent = nt("save");
  dom.exportGraphBtn.textContent = nt("exportJson");
  if (dom.exportPngBtn) dom.exportPngBtn.textContent = nt("exportPng");
  if (dom.imageExportTitle) dom.imageExportTitle.textContent = state.language === "en" ? "Export image" : "导出图像";
  setText("label[for='imageExportFormat']", state.language === "en" ? "Format" : "格式");
  setText("label[for='imageExportName']", state.language === "en" ? "File name" : "文件名");
  setText("label[for='imageExportScale']", state.language === "en" ? "Scale" : "倍率");
  if (dom.imageExportHint) dom.imageExportHint.textContent = state.language === "en"
    ? "Choose Save to select the folder and file name when supported by your browser."
    : "点击保存后，如果浏览器支持，会弹出路径和文件名选择窗口。";
  if (dom.confirmImageExportBtn) dom.confirmImageExportBtn.textContent = state.language === "en" ? "Save" : "保存";
  if (dom.cancelImageExportBtn) dom.cancelImageExportBtn.textContent = state.language === "en" ? "Cancel" : "取消";
  applyDetailPanelCollapsed();
  dom.resetGraphBtn.textContent = nt("clear");
  dom.graphTitle.textContent = nt("graphTitle");
  dom.fitGraphBtn.textContent = nt("fit");
  dom.layoutGraphBtn.textContent = nt("relayout");
  dom.toggleLabelsBtn.textContent = nt("labels");
  dom.centralitySummary.textContent = nt("centrality");
  dom.inspectorEmpty.textContent = nt("selectToEdit");
  dom.openArtifactBtn.textContent = nt("openArtifact");
  dom.deleteNodeBtn.textContent = nt("deleteNode");
  dom.deleteEdgeBtn.textContent = nt("deleteEdge");
  dom.nodeTableTab.textContent = nt("nodes");
  dom.edgeTableTab.textContent = nt("edges");
  const metricLabels = document.querySelectorAll(".metric-grid span");
  [nt("nodes"), nt("edges"), nt("density"), nt("components")].forEach((label, index) => {
    if (metricLabels[index]) metricLabels[index].textContent = label;
  });
  if (dom.storageImportModeBtn) dom.storageImportModeBtn.textContent = state.language === "zh" ? "Inventory" : "Inventory";
  if (dom.csvImportModeBtn) dom.csvImportModeBtn.textContent = "CSV";
  setText("#csvImportSection .section-title", nt("csvImport"));
  setText("label[for='csvInput']", nt("csvFile"));
  setText("label[for='csvMode']", nt("importMode"));
  if (dom.csvMode) setOptionText(dom.csvMode, ["autoMode", "nodesMode", "edgesMode"]);
  if (dom.importCsvBtn) dom.importCsvBtn.textContent = nt("importNetwork");
  if (dom.mergeCsvBtn) dom.mergeCsvBtn.textContent = nt("mergeImport");
  setText("#storageImportSection .section-title", nt("storageScope"));
  if (dom.scopeAllStoragesBtn) dom.scopeAllStoragesBtn.textContent = nt("allStorageItems");
  dom.scopeCurrentStorageBtn.textContent = nt("currentStorageItems");
  dom.scopeFilteredBtn.textContent = nt("filterItems");
  setText("label[for='storageScopeSelect']", nt("storage"));
  setText("label[for='artifactFilterField']", nt("filterField"));
  setText("label[for='artifactFilterValue']", nt("fieldValue"));
  dom.applyArtifactFilterBtn.textContent = nt("applyFilterScope");
  setText(".analysis-panel .section-title", nt("analysisType"));
  setText("label[for='analysisTypeSelect']", nt("type"));
  setOptionText(dom.analysisTypeSelect, ["artifactNetwork", "siteNetwork"]);
  dom.refreshConfigBtn.textContent = nt("refresh");
  dom.applyConfigBtn.textContent = nt("apply");
  setText("#artifactAnalysisPanel .fields-folder summary", nt("customWeights"));
  setText("#customFieldsTitle", state.language === "en" ? "Custom Fields" : "自定义字段");
  setText("#metadataFieldsTitle", nt("rawMetadata"));
  if (dom.refreshFieldPercentBtn) dom.refreshFieldPercentBtn.textContent = nt("refreshPercentages");
  setText("label[for='similarityThreshold'] span", nt("threshold"));
  if (dom.timeFilterTitle) dom.timeFilterTitle.textContent = nt("timeFilter");
  if (dom.timeFilterMinLabel) dom.timeFilterMinLabel.textContent = nt("timeFilterMin");
  if (dom.timeFilterMaxLabel) dom.timeFilterMaxLabel.textContent = nt("timeFilterMax");
  if (dom.resetTimeFilterBtn) dom.resetTimeFilterBtn.textContent = nt("timeFilterReset");
  setText("label[for='includeEmptyFields'] span", nt("includeEmpty"));
  setText("label[for='missingFieldLimitInput']", nt("missingFieldLimit"));
  setText("#removeEdgesOnMissingLimitLabel", state.language === "en" ? "Remove related edges when limit is reached" : "达到阈值时删除相关边");
  setText("#removeNodesOnMissingLimitLabel", state.language === "en" ? "Remove related nodes when limit is reached" : "达到阈值时删除相关节点");
  setText("label[for='missingValueMarkersInput']", nt("missingValueMarkers"));
  setText("#importantMissingFieldsFolder summary", nt("importantMissingFields"));
  setText("#importantMissingFieldsHint", nt("importantMissingHint"));
  if (dom.buildArtifactNetworkBtn) dom.buildArtifactNetworkBtn.textContent = nt("buildNetwork");
  setText(".network-sidebar .panel:last-of-type .section-title", nt("manualEdit"));
  dom.addNodeBtn.textContent = nt("addNode");
  dom.undirectedEdgeBtn.textContent = nt("undirected");
  dom.directedEdgeBtn.textContent = nt("directed");
  dom.selfLoopBtn.textContent = nt("selfLoop");
  setText(".network-sidebar .panel:last-of-type details summary", nt("directedEdges"));
  setText(".inspector-panel .section-title", nt("inspector"));
  setText("#nodesEdgesSummary", nt("nodesAndEdges"));
  updateNetworkSummary();
  syncFieldToolbar();
  sanitizeNetworkLanguage();
}

function updateNetworkSummary() {
  if (!dom.networkSummary) return;
  dom.networkSummary.textContent = hasSelectedInventoryScope()
    ? `Network · ${getScopedArtifacts().length} ${nt("items")}`
    : "Network";
}

function applyThemeLabelDefaults() {
  const textColor = state.theme === "dark" ? "#eaf2f2" : "#243438";
  state.style.labelColor = textColor;
  state.style.nodeLabelColor = textColor;
  state.style.edgeLabelColor = textColor;
  if (dom.nodeLabelColorControl) dom.nodeLabelColorControl.value = textColor;
  if (dom.edgeLabelColorControl) dom.edgeLabelColorControl.value = textColor;
}

function sanitizeNetworkLanguage() {
  const isEn = state.language === "en";
  const text = {
    importSource: isEn ? "Import Source" : "导入来源",
    storage: "Inventory",
    graphEmptyTitle: isEn ? "Build a network from Inventory" : "从文物库生成网络",
    graphEmptyHelp: isEn ? "Nodes use uniqueID to connect to Inventory items; click an artifact node to view its details on the right." : "节点会使用 uniqueID 关联文物管理库；点击文物节点可在右侧查看条目详情。",
    artifactDescription: isEn ? "Nodes are artifact items. Select custom fields or metadata to compare; selected field weights are normalized to 100%." : "节点为器物条目。选择自定义字段或元数据参与比较；已选字段权重总和按 100% 归一。",
    rawMetadataDescription: isEn ? "Metadata is available for comparison when needed." : "需要时可以选择元数据参与比较。",
    siteDescription: isEn ? "Nodes are Site, Location, or a chosen field value. The selected node field groups items, the target field builds a value-count matrix, and Jaccard or Cosine compares similarity." : "节点为 Site / Location / 自选字段值。按目标字段做值统计矩阵，再用 Jaccard 或 Cosine 比较节点相似度。",
    nodeField: isEn ? "Node field" : "节点字段",
    targetField: isEn ? "Target statistic field" : "目标统计字段",
    similarityMetric: isEn ? "Similarity metric" : "相似度函数",
    node: isEn ? "Nodes" : "节点",
    shape: isEn ? "Shape" : "形状",
    nodeColor: isEn ? "Color" : "颜色",
    nodeOpacity: isEn ? "Opacity" : "透明度",
    nodeSize: isEn ? "Size" : "大小",
    nodeStrokeColor: isEn ? "Border Color" : "包边颜色",
    nodeStrokeWidth: isEn ? "Border Width" : "包边宽度",
    nodeStrokeOpacity: isEn ? "Border Opacity" : "包边透明度",
    edge: isEn ? "Edges" : "边",
    edgeColor: isEn ? "Color" : "颜色",
    edgeOpacityStyle: isEn ? "Opacity" : "透明度",
    edgeWidth: isEn ? "Width" : "粗细",
    edgeLabel: isEn ? "Label" : "标签",
    textColor: isEn ? "Text color" : "文字颜色",
    textSize: isEn ? "Text size" : "字号",
    centralityMetric: isEn ? "Centrality" : "中心性",
    distanceThresholds: isEn ? "Similarity attraction strength" : "相似度吸引强度",
    hierarchyDistanceRules: isEn ? "Hierarchy similarity distance" : "层级相似度距离",
    hierarchyDistanceHint: isEn ? "When Hierarchical Layout is active, these similarity thresholds place closely linked nodes nearer each other." : "当 Hierarchical Layout 启用时，这些相似度阈值会把关联更强的节点放到更近的层级。",
    edgeThresholdStyles: isEn ? "Threshold Setting" : "阈值设置",
    addThresholdStyle: isEn ? "Add Threshold Style" : "添加阈值样式",
    networkMetrics: isEn ? "Network metrics" : "网络指标",
    layoutMode: isEn ? "Layout Mode" : "布局模式",
    layoutHint: isEn ? "Only the active layout engine controls node coordinates. Metrics never move nodes." : "只有当前布局引擎控制节点坐标。指标只作为分析叠加，不移动节点。",
    similarityRules: isEn ? "Similarity Rules" : "相似度规则",
    edgeWeighting: isEn ? "Use similarity as edge weight" : "使用相似度作为边权",
    useSimilarityForce: isEn ? "Use similarity as layout force" : "在布局力中使用相似度",
    attractionHint: isEn ? "These values influence Spring Layout forces; they are not fixed geometric distances." : "这些值只影响 Spring 布局的吸引力，不是固定几何距离。",
    addRule: isEn ? "Add rule" : "添加规则",
    analyticalMetrics: isEn ? "Analytical Metrics" : "分析指标",
    nodeSizeMapping: isEn ? "Node size mapping" : "节点大小映射",
    nodeColorMapping: isEn ? "Node color mapping" : "节点颜色映射",
    visualStyling: isEn ? "Visual Styling" : "视觉样式",
    edgeOpacity: isEn ? "Edge opacity" : "边透明度",
    labelVisibility: isEn ? "Show labels" : "显示标签",
    repulsionStrength: isEn ? "Repulsion strength" : "排斥强度",
    collisionStrength: isEn ? "Collision strength" : "碰撞强度",
    metricsHint: isEn ? "Metrics are analytical overlays and do not control layout positions." : "指标是分析叠加，不控制布局位置。",
    visualMapping: "",
    nodeVisual: isEn ? "Mapping" : "映射",
    edgeVisual: isEn ? "Mapping" : "映射",
    colorByValue: isEn ? "Color by field" : "颜色映射字段",
    shapeByValue: isEn ? "Shape by field" : "形状映射字段",
    sizeByValue: isEn ? "Size by field" : "大小映射字段",
    opacityByValue: isEn ? "Opacity by field" : "透明度映射字段",
    edgeColorByValue: isEn ? "Color by edge value" : "边颜色映射",
    edgeOpacityByValue: isEn ? "Opacity by edge value" : "边透明度映射",
    edgeLabelByValue: isEn ? "Label by edge value" : "边标签映射",
    similarityMatrix: isEn ? "Similarity Matrix" : "相似度矩阵",
    rightStyle: isEn ? "Global Style" : "全局样式"
  };
  const languageParts = dom.languageToggleBtn?.querySelectorAll("span");
  if (languageParts?.length >= 2) {
    languageParts[0].textContent = isEn ? "ZH" : "中";
    languageParts[1].textContent = "EN";
  }
  setText(".metrics-panel .section-title", text.networkMetrics);
  setText("#analysisTypeTitle", nt("analysisType"));
  setText("label[for='storageScopeSelect']", nt("storage"));
  setText("label[for='artifactFilterField']", nt("filterField"));
  setText("label[for='artifactFilterValue']", nt("fieldValue"));
  setText("label[for='filterPresetSelect']", isEn ? "Filter Preset" : "筛选预设");
  setText("#scopeFilteredBtn", nt("filterItems"));
  setText("#applyArtifactFilterBtn", nt("applyFilterScope"));
  setText("#clearArtifactFilterBtn", isEn ? "Clear Filter" : "取消筛选");
  setText("#focusFilterOnlyLabel", isEn ? "Focus matches instead of filtering graph" : "只聚焦匹配节点，不删除其他节点");
  setText("#saveFilterPresetBtn", isEn ? "Save Preset" : "保存预设");
  setText("#loadFilterPresetBtn", isEn ? "Load Preset" : "调取预设");
  setText("#layoutEngineTitle", text.layoutMode);
  setText("#layoutEngineHint", text.layoutHint);
  setText("#edgeWeightingLabel", text.edgeWeighting);
  setText("#useSimilarityForceLabel", text.useSimilarityForce);
  setText("#missingValueRulesTitle", nt("missingValues"));
  setText("#attractionRulesTitle", text.distanceThresholds);
  setText("#attractionRulesHint", text.attractionHint);
  setText("#addCentralityThresholdBtn", text.addRule);
  setText("#hierarchyRulesTitle", text.hierarchyDistanceRules);
  setText("#hierarchyRulesHint", text.hierarchyDistanceHint);
  setText("#addHierarchyRuleBtn", text.addRule);
  setText("#analyticalMetricsTitle", text.analyticalMetrics);
  setText("label[for='nodeSizeMetricSelect']", text.nodeSizeMapping);
  setText("label[for='nodeColorMetricSelect']", text.nodeColorMapping);
  setText("#visualStylingTitle", text.visualStyling);
  setText("#leftNodeSizeLabel", text.nodeSize);
  setText("#edgeOpacityLabel", text.edgeOpacity);
  setText("#labelVisibilityLabel", text.labelVisibility);
  setText("#repulsionStrengthLabel", text.repulsionStrength);
  setText("#collisionStrengthLabel", text.collisionStrength);
  setText("#metricsNotLayoutHint", text.metricsHint);
  setText("#visualMappingTitle", text.visualMapping);
  setText("#nodeVisualSummary", text.nodeVisual);
  setText("#edgeVisualSummary", text.edgeVisual);
  setText("#mapColorLabel", text.colorByValue);
  setText("#mapShapeLabel", text.shapeByValue);
  setText("#mapSizeLabel", text.sizeByValue);
  setText("#mapOpacityLabel", text.opacityByValue);
  setText("#mapEdgeColorLabel", text.edgeColorByValue);
  setText("#mapEdgeOpacityLabel", text.edgeOpacityByValue);
  setText("#mapEdgeLabelLabel", text.edgeLabelByValue);
  if (dom.showSimilarityMatrixBtn) dom.showSimilarityMatrixBtn.textContent = text.similarityMatrix;
  if (dom.similarityMatrixTitle) dom.similarityMatrixTitle.textContent = text.similarityMatrix;
  setText(".matrix-font-control span", isEn ? "Size" : "大小");
  setText(".matrix-header-control span", isEn ? "Headers" : "表头");
  setText("#rightStyleTitle", text.rightStyle);
  const stylePanel = document.querySelector(".right-style-panel");
  const styleTitle = document.querySelector("#rightStyleTitle");
  if (stylePanel) {
    delete stylePanel.dataset.tip;
  }
  if (styleTitle) {
    styleTitle.dataset.tip = isEn
      ? "Global defaults. Field-based node or edge mappings below override these settings."
      : "全局默认样式。下方按字段映射的节点或边设置会覆盖这里。";
    styleTitle.removeAttribute("title");
  }
  if (dom.storageImportModeBtn) dom.storageImportModeBtn.textContent = text.storage;
  setText("#graphEmpty h3", text.graphEmptyTitle);
  setText("#graphEmpty p", text.graphEmptyHelp);
  setText("#artifactAnalysisPanel .fields-folder > .quiet-line", text.artifactDescription);
  setText("#artifactAnalysisPanel .metadata-fields-hint", text.rawMetadataDescription);
  setText("#siteAnalysisPanel .quiet-line", text.siteDescription);
  setOptionText(dom.analysisTypeSelect, ["artifactNetwork", "siteNetwork"]);
  setText("label[for='siteNodeFieldSelect']", text.nodeField);
  setText("label[for='siteTargetFieldSelect']", text.targetField);
  setText("label[for='siteMetricSelect']", text.similarityMetric);
  setLabelText(dom.centralitySelect?.closest("label"), text.centralityMetric);
  if (dom.centralityThresholdTitle) dom.centralityThresholdTitle.textContent = text.distanceThresholds;
  if (dom.edgeThresholdSummary) dom.edgeThresholdSummary.textContent = text.edgeThresholdStyles;
  if (dom.applyEdgeThresholdStyleBtn) dom.applyEdgeThresholdStyleBtn.textContent = state.language === "en" ? "Apply threshold styles" : "应用阈值样式";
  if (dom.addEdgeThresholdStyleBtn) dom.addEdgeThresholdStyleBtn.textContent = text.addThresholdStyle;
  document.querySelectorAll(".style-subsection .style-subtitle").forEach((title, index) => {
    title.textContent = index === 0 ? text.node : text.edge;
  });
  setToolbarLabelText(0, isEn ? "Display" : "显示");
  setToolbarLabelText(1, text.shape);
  setToolbarLabelText(2, text.nodeColor);
  setToolbarLabelText(3, text.nodeOpacity);
  setToolbarLabelText(4, text.nodeSize);
  setToolbarLabelText(5, text.nodeStrokeColor);
  setToolbarLabelText(6, text.nodeStrokeWidth);
  setToolbarLabelText(7, text.nodeStrokeOpacity);
  setToolbarLabelText(8, isEn ? "Labels" : "标签");
  setToolbarLabelText(9, isEn ? "Label Field" : "标签字段");
  setToolbarLabelText(10, isEn ? "Text Color" : "文字颜色");
  setToolbarLabelText(11, isEn ? "Text Size" : "字号");
  setToolbarLabelText(12, isEn ? "Display" : "显示");
  setToolbarLabelText(13, isEn ? "Style Source" : "样式来源");
  setToolbarLabelText(14, text.edgeColor);
  setToolbarLabelText(15, text.edgeOpacityStyle);
  setToolbarLabelText(16, text.edgeWidth);
  setToolbarLabelText(17, isEn ? "Labels" : "标签");
  setToolbarLabelText(18, isEn ? "Label Field" : "标签字段");
  setToolbarLabelText(19, isEn ? "Text Color" : "文字颜色");
  setToolbarLabelText(20, isEn ? "Text Size" : "字号");
  syncVectorModeControl();
  const layoutHelp = isEn
    ? "Spring: topology force layout; edge weight strengthens attraction. Similarity: places nodes in similarity space. Circular: overview layout without similarity-driven coordinates. Hierarchical: arranges nodes by chronology or category."
    : "Spring：拓扑力导向布局，边权增强吸引力。Similarity：把节点放到相似度空间。Circular：用于总览，不由相似度决定坐标。Hierarchical：按年代或类别组织节点。";
  if (dom.layoutModeSelect) dom.layoutModeSelect.title = layoutHelp;
  if (dom.layoutSelect) dom.layoutSelect.title = layoutHelp;
  if (dom.nodeShapeControl) {
    dom.nodeShapeControl.options[0].textContent = isEn ? "Circle" : "圆";
    dom.nodeShapeControl.options[1].textContent = isEn ? "Square" : "方";
    dom.nodeShapeControl.options[2].textContent = isEn ? "Diamond" : "菱形";
  }
  setToolButtonText(dom.panToolBtn, isEn ? "Drag" : "拖动");
  setToolButtonText(dom.rotateGraphBtn, isEn ? "Rotate" : "旋转");
  setToolButtonText(dom.selectToolBtn, isEn ? "Select" : "选择");
  setToolButtonText(dom.boxSelectToolBtn, isEn ? "Box Select" : "框选");
  setToolButtonText(dom.filterToolBtn, isEn ? "Filter" : "筛选");
  setToolTip(dom.panToolBtn, isEn ? "Drag: move the canvas without changing selection." : "拖动：移动画布，不改变选择。");
  setToolTip(dom.rotateGraphBtn, isEn ? "Rotate: click to enable, then drag the canvas." : "旋转：点击启用，然后拖动画布。");
  setToolTip(dom.selectToolBtn, isEn ? "Select: click nodes; hold Ctrl to keep multiple nodes selected." : "选择：点击节点；按住 Ctrl 可保留多个已选节点。");
  setToolTip(dom.boxSelectToolBtn, isEn ? "Box Select: drag a rectangle to select a group of nodes." : "框选：拖出矩形区域选择一组节点。");
  setToolTip(dom.filterToolBtn, isEn ? "Filter: open field and value filters for the current inventory." : "筛选：打开当前库房的字段和值筛选。");
  renderThresholdControls();
}
function setLabelText(label, text) {
  if (!label) return;
  const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) textNode.textContent = `${text} `;
}

function setToolbarLabelText(index, text) {
  setLabelText(document.querySelectorAll(".graph-style-toolbar > .style-subsection > label")[index], text);
}

function setToolButtonText(button, text) {
  if (!button) return;
  button.title = text;
  button.setAttribute("aria-label", text);
}

function setToolTip(button, text) {
  if (!button) return;
  button.dataset.tip = text;
}

function setText(selector, text) {
  const node = document.querySelector(selector);
  if (node) node.textContent = text;
}

function setOptionText(select, keys) {
  if (!select) return;
  Array.from(select.options).forEach((option, index) => {
    if (keys[index]) option.textContent = nt(keys[index]);
  });
}

function setScopeMode(mode) {
  state.scopeMode = mode;
  dom.artifactFilterPanel.classList.add("hidden");
  renderScopeControls();
  renderFieldOptions();
  renderAll();
  saveNetworkSettings();
}

function setEdgeMode(mode) {
  state.edgeMode = mode;
  dom.undirectedEdgeBtn.classList.toggle("active", mode === "undirected");
  dom.directedEdgeBtn.classList.toggle("active", mode === "directed");
  const directedDetails = dom.newEdgeSource.closest("details");
  directedDetails.classList.toggle("hidden", mode !== "directed");
  directedDetails.open = mode === "directed";
}

function setImportMode(mode) {
  state.importMode = mode;
  renderImportMode();
}

function renderImportMode() {
  state.importMode = "storage";
  dom.storageImportModeBtn?.classList.toggle("active", true);
  dom.csvImportModeBtn?.classList.toggle("active", false);
  dom.storageImportSection?.classList.remove("hidden");
  dom.csvImportSection?.classList.add("hidden");
}

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  document.body.classList.toggle("network-sidebar-collapsed", state.sidebarCollapsed);
  dom.sidebarToggleBtn.textContent = state.sidebarCollapsed ? "›" : "‹";
}

function orderSidebarPanels() {
  const sidebar = dom.networkSidebar;
  const analysisPanel = document.querySelector(".analysis-panel");
  const fieldsPanel = document.querySelector(".fields-weights-panel");
  const layoutPanel = document.querySelector(".layout-engine-panel");
  const similarityPanel = document.querySelector(".similarity-rules-panel");
  const sidebarActions = sidebar?.querySelector(":scope > .sidebar-sticky-actions");
  if (!sidebar) return;
  [analysisPanel, fieldsPanel, layoutPanel, similarityPanel].filter(Boolean).forEach((panel) => sidebar.append(panel));
  if (sidebarActions) sidebar.append(sidebarActions);
}

function enableNetworkSidebarResize() {
  if (!dom.networkSidebar) return;
  let handle = dom.networkSidebar.querySelector(".network-sidebar-resizer");
  if (!handle) {
    handle = document.createElement("div");
    handle.className = "network-sidebar-resizer";
    handle.title = state.language === "en" ? "Drag to resize sidebar" : "拖动调整侧栏宽度";
    dom.networkSidebar.append(handle);
  }
  const savedWidth = Number(localStorage.getItem("easy-network-network-sidebar-width") || 320);
  document.body.style.setProperty("--network-sidebar-width", `${Math.max(240, Math.min(560, savedWidth))}px`);
  const beginResize = (event) => {
    if (state.sidebarCollapsed) return;
    const rect = dom.networkSidebar.getBoundingClientRect();
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = rect.width;
    const move = (moveEvent) => {
      const width = Math.max(240, Math.min(560, startWidth + moveEvent.clientX - startX));
      document.body.style.setProperty("--network-sidebar-width", `${width}px`);
      localStorage.setItem("easy-network-network-sidebar-width", String(Math.round(width)));
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };
  handle.addEventListener("pointerdown", beginResize);
  dom.networkSidebar.addEventListener("pointerdown", (event) => {
    const rect = dom.networkSidebar.getBoundingClientRect();
    if (rect.right - event.clientX > 8) return;
    beginResize(event);
  });
}

function enableNetworkDetailResize() {
  const detail = document.querySelector(".network-detail");
  if (!detail) return;
  let handle = detail.querySelector(".network-detail-resizer");
  if (!handle) {
    handle = document.createElement("div");
    handle.className = "network-detail-resizer";
    handle.title = state.language === "en" ? "Drag to resize style panel" : "拖动调整样式面板宽度";
    detail.append(handle);
  }
  const savedWidth = Number(localStorage.getItem("easy-network-detail-width") || 430);
  document.body.style.setProperty("--network-detail-width", `${Math.max(360, Math.min(680, savedWidth))}px`);
  const beginResize = (event) => {
    if (state.detailPanelCollapsed) return;
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = detail.getBoundingClientRect().width;
    const move = (moveEvent) => {
      const width = Math.max(360, Math.min(680, startWidth + startX - moveEvent.clientX));
      document.body.style.setProperty("--network-detail-width", `${width}px`);
      localStorage.setItem("easy-network-detail-width", String(Math.round(width)));
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };
  handle.addEventListener("pointerdown", beginResize);
}

function enableMatrixDialogInteractions() {
  const card = dom.similarityMatrixDialog?.querySelector(".matrix-modal-card");
  if (!card) return;
  const title = card.querySelector(".section-title");
  const applyPosition = () => {
    card.style.setProperty("--matrix-font-size", `${state.matrixUi.fontSize}px`);
    if (Number.isFinite(state.matrixUi.x) && Number.isFinite(state.matrixUi.y)) {
      card.style.left = `${state.matrixUi.x}px`;
      card.style.top = `${state.matrixUi.y}px`;
      card.classList.add("positioned");
    }
  };
  applyPosition();
  title?.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, input, select, label, .matrix-window-actions")) return;
    event.preventDefault();
    const rect = card.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const baseX = rect.left;
    const baseY = rect.top;
    card.classList.add("positioned");
    const move = (moveEvent) => {
      const nextX = clamp(baseX + moveEvent.clientX - startX, 0, Math.max(0, window.innerWidth - rect.width));
      const nextY = clamp(baseY + moveEvent.clientY - startY, 0, Math.max(0, window.innerHeight - rect.height));
      state.matrixUi.x = Math.round(nextX);
      state.matrixUi.y = Math.round(nextY);
      card.style.left = `${state.matrixUi.x}px`;
      card.style.top = `${state.matrixUi.y}px`;
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      saveNetworkSettings();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  });
}

function enableSidebarPanelCollapse() {
  document.querySelectorAll(".network-sidebar > section.panel").forEach((panel) => {
    const title = panel.querySelector(":scope > .section-title");
    if (!title) return;
    panel.classList.add("collapsible-panel");
    title.setAttribute("role", "button");
    title.tabIndex = 0;
    const toggle = () => panel.classList.toggle("panel-collapsed");
    title.addEventListener("click", toggle);
    title.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  });
}

function bindStyleControls() {
  const bindings = [
    [dom.showNodesControl, "showNodes", "checked"],
    [dom.nodeShapeControl, "nodeShape", "value"],
    [dom.nodeColorControl, "nodeColor", "value"],
    [dom.nodeOpacityControl, "nodeOpacity", "value"],
    [dom.nodeSizeControl, "nodeSize", "value"],
    [dom.nodeStrokeColorControl, "nodeStrokeColor", "value"],
    [dom.nodeStrokeWidthControl, "nodeStrokeWidth", "value"],
    [dom.nodeStrokeOpacityControl, "nodeStrokeOpacity", "value"],
    [dom.showEdgesControl, "showEdges", "checked"],
    [dom.vectorEdgesControl, "vectorEdges", "checked"],
    [dom.edgeColorControl, "edgeColor", "value"],
    [dom.edgeOpacityStyleControl, "edgeOpacity", "value"],
    [dom.edgeWidthControl, "edgeWidth", "value"],
    [dom.edgeStyleModeSelect, "edgeStyleMode", "value"],
    [dom.edgeThresholdFieldSelect, "edgeThresholdField", "value"],
    [dom.nodeLabelFieldSelect, "nodeLabelField", "value"],
    [dom.edgeStyleLabelFieldSelect, "edgeStyleLabelField", "value"],
    [dom.showNodeLabelsControl, "showNodeLabels", "checked"],
    [dom.showLabelsControl, "showEdgeLabels", "checked"],
    [dom.nodeLabelColorControl, "nodeLabelColor", "value"],
    [dom.nodeLabelSizeControl, "nodeLabelSize", "value"],
    [dom.edgeLabelColorControl, "edgeLabelColor", "value"],
    [dom.edgeLabelSizeControl, "edgeLabelSize", "value"]
  ].filter(([control]) => control);
  bindings.forEach(([control, key, prop]) => {
    const syncControl = () => {
      const value = prop === "checked" ? control.checked : control.value;
      state.style[key] = ["nodeOpacity", "nodeSize", "nodeStrokeWidth", "nodeStrokeOpacity", "edgeOpacity", "edgeWidth", "nodeLabelSize", "edgeLabelSize"].includes(key) ? Number(value) : value;
      if (key === "showNodeLabels" || key === "showEdgeLabels") {
        state.style.showLabels = state.style.showNodeLabels || state.style.showEdgeLabels;
        state.showLabels = state.style.showLabels;
        if (dom.labelVisibilityToggle) dom.labelVisibilityToggle.checked = state.style.showLabels;
        dom.toggleLabelsBtn.classList.toggle("active", state.style.showLabels);
      }
      if (key === "nodeSize" && dom.leftNodeSizeControl) {
        dom.leftNodeSizeControl.value = state.style.nodeSize;
        syncEngineControlValues();
      }
      if (key === "edgeThresholdField") renderEdgeThresholdStyles();
      syncVectorModeControl();
      renderGraph();
      saveNetworkSettings();
    };
    control.addEventListener("input", syncControl);
    control.addEventListener("change", syncControl);
  });
}

function bindEngineControls() {
  dom.layoutModeSelect?.addEventListener("change", () => {
    if (dom.layoutSelect) dom.layoutSelect.value = dom.layoutModeSelect.value;
    syncHierarchyRulesPanel();
    applySelectedLayout(true);
    saveNetworkSettings();
  });
  dom.edgeWeightingToggle?.addEventListener("change", () => {
    state.similarityRules.edgeWeighting = dom.edgeWeightingToggle.checked;
    buildArtifactNetwork();
    saveNetworkSettings();
  });
  dom.useSimilarityForceToggle?.addEventListener("change", () => {
    state.similarityRules.useSimilarityAsForce = dom.useSimilarityForceToggle.checked;
    applySelectedLayout(true);
  });
  dom.missingFieldLimitInput?.addEventListener("input", () => {
    state.similarityRules.missingFieldLimit = Math.max(0, Math.floor(Number(dom.missingFieldLimitInput.value || 0)));
    dom.missingFieldLimitInput.value = String(state.similarityRules.missingFieldLimit);
    saveNetworkSettings();
    rebuildArtifactNetworkIfReady();
  });
  dom.removeEdgesOnMissingLimit?.addEventListener("change", () => {
    state.similarityRules.removeEdgesOnMissingLimit = dom.removeEdgesOnMissingLimit.checked;
    saveNetworkSettings();
    rebuildArtifactNetworkIfReady();
  });
  dom.removeNodesOnMissingLimit?.addEventListener("change", () => {
    state.similarityRules.removeNodesOnMissingLimit = dom.removeNodesOnMissingLimit.checked;
    saveNetworkSettings();
    rebuildArtifactNetworkIfReady();
  });
  dom.nodeSizeMetricSelect?.addEventListener("change", () => {
    state.visualEncoding.nodeSizeMetric = dom.nodeSizeMetricSelect.value;
    renderGraph();
    saveNetworkSettings();
  });
  dom.nodeColorMetricSelect?.addEventListener("change", () => {
    state.visualEncoding.nodeColorMetric = dom.nodeColorMetricSelect.value;
    renderGraph();
    saveNetworkSettings();
  });
  [
    [dom.nodeColorFieldSelect, "nodeColorFieldId"],
    [dom.nodeShapeFieldSelect, "nodeShapeFieldId"],
    [dom.nodeSizeFieldSelect, "nodeSizeFieldId"],
    [dom.nodeOpacityFieldSelect, "nodeOpacityFieldId"],
    [dom.edgeColorFieldSelect, "edgeColorFieldId"],
    [dom.edgeOpacityFieldSelect, "edgeOpacityFieldId"],
    [dom.edgeLabelFieldSelect, "edgeLabelFieldId"]
  ].forEach(([select, key]) => {
    select?.addEventListener("change", () => {
      state.visualEncoding[key] = select.value;
      renderAll();
      saveNetworkSettings();
    });
  });
  dom.mapColorByField?.addEventListener("change", () => {
    state.visualEncoding.mapColorByField = dom.mapColorByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapShapeByField?.addEventListener("change", () => {
    state.visualEncoding.mapShapeByField = dom.mapShapeByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapSizeByField?.addEventListener("change", () => {
    state.visualEncoding.mapSizeByField = dom.mapSizeByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapOpacityByField?.addEventListener("change", () => {
    state.visualEncoding.mapOpacityByField = dom.mapOpacityByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapEdgeColorByField?.addEventListener("change", () => {
    state.visualEncoding.mapEdgeColorByField = dom.mapEdgeColorByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapEdgeOpacityByField?.addEventListener("change", () => {
    state.visualEncoding.mapEdgeOpacityByField = dom.mapEdgeOpacityByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.mapEdgeLabelByField?.addEventListener("change", () => {
    state.visualEncoding.mapEdgeLabelByField = dom.mapEdgeLabelByField.checked;
    renderAll();
    saveNetworkSettings();
  });
  dom.leftNodeSizeControl?.addEventListener("input", () => {
    state.style.nodeSize = Number(dom.leftNodeSizeControl.value);
    if (dom.nodeSizeControl) dom.nodeSizeControl.value = dom.leftNodeSizeControl.value;
    syncEngineControlValues();
    renderGraph();
    saveNetworkSettings();
  });
  dom.edgeOpacityControl?.addEventListener("input", () => {
    state.visualEncoding.edgeOpacity = Number(dom.edgeOpacityControl.value);
    syncEngineControlValues();
    renderGraph();
    saveNetworkSettings();
  });
  dom.labelVisibilityToggle?.addEventListener("change", () => {
    state.style.showLabels = dom.labelVisibilityToggle.checked;
    state.style.showNodeLabels = state.style.showLabels;
    state.style.showEdgeLabels = state.style.showLabels;
    if (dom.showNodeLabelsControl) dom.showNodeLabelsControl.checked = state.style.showLabels;
    if (dom.showLabelsControl) dom.showLabelsControl.checked = state.style.showLabels;
    dom.toggleLabelsBtn.classList.toggle("active", state.style.showLabels);
    renderGraph();
  });
  dom.repulsionStrengthControl?.addEventListener("input", () => {
    state.visualEncoding.repulsionStrength = Number(dom.repulsionStrengthControl.value);
    syncEngineControlValues();
  });
  dom.collisionStrengthControl?.addEventListener("input", () => {
    state.visualEncoding.collisionStrength = Number(dom.collisionStrengthControl.value);
    syncEngineControlValues();
  });
  syncEngineControlValues();
}

function bindTimeFilterControls() {
  const controls = [
    [dom.timeFilterMinInput, "min"],
    [dom.timeFilterMinRange, "min"],
    [dom.timeFilterMaxInput, "max"],
    [dom.timeFilterMaxRange, "max"]
  ];
  controls.forEach(([control, side]) => {
    control?.addEventListener("input", () => updateTimeFilterValue(side, control.value));
    control?.addEventListener("change", () => updateTimeFilterValue(side, control.value));
  });
  dom.resetTimeFilterBtn?.addEventListener("click", () => {
    if (!hasTimeFilterDomain()) return;
    state.dateFilter.min = state.dateFilter.domainMin;
    state.dateFilter.max = state.dateFilter.domainMax;
    renderTimeFilterControls();
    renderGraph();
    saveNetworkSettings();
  });
}

function updateTimeFilterValue(side, value) {
  if (!hasTimeFilterDomain()) return;
  const next = clamp(Math.round(Number(value)), state.dateFilter.domainMin, state.dateFilter.domainMax);
  if (!Number.isFinite(next)) return;
  if (side === "min") {
    state.dateFilter.min = Math.min(next, state.dateFilter.max);
  } else {
    state.dateFilter.max = Math.max(next, state.dateFilter.min);
  }
  renderTimeFilterControls();
  renderGraph();
  saveNetworkSettings();
}

function hasTimeFilterDomain() {
  return Number.isFinite(state.dateFilter.domainMin) && Number.isFinite(state.dateFilter.domainMax);
}

function updateTimeFilterDomain() {
  const ranges = getCurrentTimeRanges();
  if (!ranges.length) {
    state.dateFilter.domainMin = null;
    state.dateFilter.domainMax = null;
    state.dateFilter.min = null;
    state.dateFilter.max = null;
    return;
  }
  const domainMin = Math.floor(Math.min(...ranges.map((range) => range.start)));
  const domainMax = Math.ceil(Math.max(...ranges.map((range) => range.end)));
  const changed = state.dateFilter.domainMin !== domainMin || state.dateFilter.domainMax !== domainMax;
  state.dateFilter.domainMin = domainMin;
  state.dateFilter.domainMax = domainMax;
  if (changed || !Number.isFinite(state.dateFilter.min) || !Number.isFinite(state.dateFilter.max)) {
    state.dateFilter.min = domainMin;
    state.dateFilter.max = domainMax;
    return;
  }
  state.dateFilter.min = clamp(state.dateFilter.min, domainMin, domainMax);
  state.dateFilter.max = clamp(state.dateFilter.max, domainMin, domainMax);
  if (state.dateFilter.min > state.dateFilter.max) {
    state.dateFilter.min = domainMin;
    state.dateFilter.max = domainMax;
  }
}

function getCurrentTimeRanges() {
  if (!hasSelectedInventoryScope()) return [];
  if (state.graph.nodes.length) return state.graph.nodes.map(getNodeDateRange).filter(Boolean);
  return getScopedArtifacts().map(getArtifactDateRange).filter(Boolean);
}

function renderTimeFilterControls() {
  if (!dom.timeFilterPanel) return;
  const hasDomain = hasTimeFilterDomain();
  dom.timeFilterPanel.classList.toggle("hidden", !hasDomain);
  if (!hasDomain) return;
  const { domainMin, domainMax, min, max } = state.dateFilter;
  [dom.timeFilterMinInput, dom.timeFilterMaxInput, dom.timeFilterMinRange, dom.timeFilterMaxRange].forEach((control) => {
    if (!control) return;
    control.min = String(domainMin);
    control.max = String(domainMax);
  });
  if (dom.timeFilterMinInput) dom.timeFilterMinInput.value = String(min);
  if (dom.timeFilterMinRange) dom.timeFilterMinRange.value = String(min);
  if (dom.timeFilterMaxInput) dom.timeFilterMaxInput.value = String(max);
  if (dom.timeFilterMaxRange) dom.timeFilterMaxRange.value = String(max);
  const span = Math.max(1, domainMax - domainMin);
  const startPercent = ((min - domainMin) / span) * 100;
  const endPercent = ((max - domainMin) / span) * 100;
  const rangeStack = dom.timeFilterMinRange?.closest(".time-range-stack");
  if (rangeStack) {
    rangeStack.style.setProperty("--time-start", `${clamp(startPercent, 0, 100)}%`);
    rangeStack.style.setProperty("--time-end", `${clamp(endPercent, 0, 100)}%`);
  }
  if (dom.timeFilterStatus) {
    const parsedCount = state.graph.nodes.filter((node) => getNodeDateRange(node)).length;
    const visibleCount = state.graph.nodes.filter((node) => !isNodeOutsideTimeRange(node)).length;
    const totalCount = state.graph.nodes.length;
    const missingCount = Math.max(0, totalCount - parsedCount);
    const selected = `${formatYearForDisplay(min)} - ${formatYearForDisplay(max)}`;
    dom.timeFilterStatus.textContent = state.language === "en"
      ? `${selected} · ${visibleCount}/${totalCount || parsedCount} nodes in range · ${missingCount} undated`
      : `${selected} · 范围内 ${visibleCount}/${totalCount || parsedCount} 个节点 · ${missingCount} 个日期未解析`;
  }
}

function dockGraphStyleToolbar() {
  if (!dom.graphStyleDock || !dom.graphStyleToolbar) return;
  dom.graphStyleDock.append(dom.graphStyleToolbar);
  const stylePanel = document.querySelector(".right-style-panel");
  const visualPanel = document.querySelector(".visual-mapping-panel");
  const nodeStyleSection = document.querySelector(".node-style-section");
  const edgeStyleSection = document.querySelector(".edge-style-section");
  const nodeVisualFolder = document.querySelector("#nodeVisualSummary")?.closest("details");
  const edgeVisualFolder = document.querySelector("#edgeVisualSummary")?.closest("details");
  const centralityFolder = dom.centralitySummary?.closest("details");
  const edgeThresholdFolder = dom.edgeThresholdSummary?.closest("details");
  const tableFolder = document.querySelector(".table-panel > details");
  const metricsPanel = document.querySelector(".metrics-panel");
  if (stylePanel && visualPanel && visualPanel.previousElementSibling !== stylePanel) {
    visualPanel.parentElement.insertBefore(stylePanel, visualPanel);
  }
  if (nodeStyleSection && nodeVisualFolder && nodeVisualFolder.parentElement !== nodeStyleSection) nodeStyleSection.append(nodeVisualFolder);
  if (nodeStyleSection && centralityFolder && centralityFolder.parentElement !== nodeStyleSection) nodeStyleSection.append(centralityFolder);
  if (edgeStyleSection && edgeVisualFolder && edgeVisualFolder.parentElement !== edgeStyleSection) edgeStyleSection.append(edgeVisualFolder);
  if (edgeStyleSection && edgeThresholdFolder && edgeThresholdFolder.parentElement !== edgeStyleSection) edgeStyleSection.append(edgeThresholdFolder);
  if (edgeThresholdFolder) edgeThresholdFolder.open = true;
  if (metricsPanel && tableFolder && tableFolder.parentElement !== metricsPanel) metricsPanel.append(tableFolder);
  document.querySelector(".table-panel")?.classList.add("hidden");
  const graphControls = dom.topbarGraphControls;
  if (graphControls) {
    if (dom.graphSummary?.parentElement !== graphControls) graphControls.append(dom.graphSummary);
    let topbarMetrics = document.querySelector("#topbarMetrics");
    if (!topbarMetrics) {
      topbarMetrics = document.createElement("div");
      topbarMetrics.id = "topbarMetrics";
      topbarMetrics.className = "topbar-metrics";
    }
    const metricGrid = metricsPanel?.querySelector(".metric-grid");
    if (metricGrid && metricGrid.parentElement !== topbarMetrics) topbarMetrics.append(metricGrid);
    if (topbarMetrics.parentElement !== graphControls) graphControls.append(topbarMetrics);
    if (dom.buildArtifactNetworkBtn?.parentElement !== graphControls) graphControls.append(dom.buildArtifactNetworkBtn);
    if (dom.fitGraphBtn?.parentElement !== graphControls) graphControls.append(dom.fitGraphBtn);
    if (dom.vectorModeToggleBtn?.parentElement !== graphControls) graphControls.append(dom.vectorModeToggleBtn);
    if (dom.vectorEdgesControl?.parentElement !== graphControls) graphControls.append(dom.vectorEdgesControl);
  }
  metricsPanel?.querySelector(":scope > .section-title")?.classList.add("hidden");
  if (dom.networkSidebar && dom.showSimilarityMatrixBtn) {
    let sidebarActions = dom.networkSidebar.querySelector(":scope > .sidebar-sticky-actions");
    if (!sidebarActions) {
      sidebarActions = document.createElement("div");
      sidebarActions.className = "sidebar-sticky-actions";
      dom.networkSidebar.append(sidebarActions);
    }
    if (dom.showSimilarityMatrixBtn.parentElement !== sidebarActions) sidebarActions.append(dom.showSimilarityMatrixBtn);
    dom.showSimilarityMatrixBtn.classList.add("full");
    dom.artifactAnalysisPanel?.querySelector(".fields-sticky-actions:empty")?.remove();
  }
  if (stylePanel) {
    delete stylePanel.dataset.tip;
  }
}

function applyDetailPanelCollapsed() {
  document.body.classList.toggle("network-detail-collapsed", Boolean(state.detailPanelCollapsed));
  if (dom.detailToggleBtn) {
    dom.detailToggleBtn.classList.toggle("active", !state.detailPanelCollapsed);
    dom.detailToggleBtn.textContent = state.detailPanelCollapsed ? "‹" : "›";
    const label = state.detailPanelCollapsed
      ? (state.language === "en" ? "Show Style Panel" : "显示样式面板")
      : (state.language === "en" ? "Hide Style Panel" : "隐藏样式面板");
    dom.detailToggleBtn.title = label;
    dom.detailToggleBtn.setAttribute("aria-label", label);
  }
  window.requestAnimationFrame(() => renderGraph());
}

function syncEngineControlValues() {
  if (dom.leftNodeSizeValue) dom.leftNodeSizeValue.textContent = state.style.nodeSize;
  if (dom.edgeOpacityValue) dom.edgeOpacityValue.textContent = Number(state.visualEncoding.edgeOpacity).toFixed(2);
  if (dom.repulsionStrengthValue) dom.repulsionStrengthValue.textContent = Number(state.visualEncoding.repulsionStrength).toFixed(1);
  if (dom.collisionStrengthValue) dom.collisionStrengthValue.textContent = Number(state.visualEncoding.collisionStrength).toFixed(1);
  if (dom.missingFieldLimitInput) dom.missingFieldLimitInput.value = String(state.similarityRules.missingFieldLimit || 0);
  if (dom.removeEdgesOnMissingLimit) dom.removeEdgesOnMissingLimit.checked = state.similarityRules.removeEdgesOnMissingLimit !== false;
  if (dom.removeNodesOnMissingLimit) dom.removeNodesOnMissingLimit.checked = Boolean(state.similarityRules.removeNodesOnMissingLimit);
  if (dom.missingValueMarkersInput) dom.missingValueMarkersInput.value = state.similarityRules.missingValueMarkers || "";
  if (dom.mapColorByField) dom.mapColorByField.checked = state.visualEncoding.mapColorByField;
  if (dom.mapShapeByField) dom.mapShapeByField.checked = state.visualEncoding.mapShapeByField;
  if (dom.mapSizeByField) dom.mapSizeByField.checked = state.visualEncoding.mapSizeByField;
  if (dom.mapOpacityByField) dom.mapOpacityByField.checked = state.visualEncoding.mapOpacityByField;
  if (dom.mapEdgeColorByField) dom.mapEdgeColorByField.checked = state.visualEncoding.mapEdgeColorByField;
  if (dom.mapEdgeOpacityByField) dom.mapEdgeOpacityByField.checked = state.visualEncoding.mapEdgeOpacityByField;
  if (dom.mapEdgeLabelByField) dom.mapEdgeLabelByField.checked = state.visualEncoding.mapEdgeLabelByField;
  if (dom.showNodeLabelsControl) dom.showNodeLabelsControl.checked = state.style.showNodeLabels;
  if (dom.showLabelsControl) dom.showLabelsControl.checked = state.style.showEdgeLabels;
  syncVectorModeControl();
}

function syncVectorModeControl() {
  if (dom.vectorEdgesControl) dom.vectorEdgesControl.checked = Boolean(state.style.vectorEdges);
  if (!dom.vectorModeToggleBtn) return;
  const isVector = Boolean(state.style.vectorEdges);
  dom.vectorModeToggleBtn.classList.toggle("active", isVector);
  dom.vectorModeToggleBtn.textContent = isVector
    ? (state.language === "en" ? "Vector" : "矢量")
    : (state.language === "en" ? "Pixel" : "像素");
  const title = isVector
    ? (state.language === "en" ? "Vector mode: each edge is rendered as an SVG line" : "矢量模式：每条边以 SVG 线条渲染")
    : (state.language === "en" ? "Pixel-friendly mode: dense edges are batched for speed" : "像素模式：密集边合并渲染以提升速度");
  dom.vectorModeToggleBtn.title = title;
  dom.vectorModeToggleBtn.setAttribute("aria-label", title);
}

async function handleCsvFile() {
  const file = dom.csvInput.files?.[0];
  if (!file) return;
  const text = await file.text();
  state.csv = parseCsv(text);
  renderCsvColumnOptions();
  dom.csvStatus.textContent = file.name + " · " + state.csv.rows.length + " rows · " + state.csv.headers.length + " columns";
}

function renderCsvColumnOptions() {
  const headers = state.csv?.headers || [];
  const selects = [
    dom.csvIdColumn,
    dom.csvLabelColumn,
    dom.csvSourceColumn,
    dom.csvTargetColumn,
    dom.csvWeightColumn,
    dom.csvGroupColumn
  ];
  selects.forEach((select) => {
    select.innerHTML = "";
    select.append(new Option(state.language === "en" ? "Not used" : "不使用", ""));
    headers.forEach((header) => select.append(new Option(header, header)));
  });
  chooseColumn(dom.csvIdColumn, ["uniqueid", "unique_id", "id", "编号"]);
  chooseColumn(dom.csvLabelColumn, ["label", "title", "name", "名称", "题名"]);
  chooseColumn(dom.csvSourceColumn, ["source", "from", "源", "起点"]);
  chooseColumn(dom.csvTargetColumn, ["target", "to", "目标", "终点"]);
  chooseColumn(dom.csvWeightColumn, ["weight", "score", "similarity", "权重"]);
  chooseColumn(dom.csvGroupColumn, ["group", "type", "category", "类别", "类型"]);
}
function chooseColumn(select, candidates) {
  const options = Array.from(select.options);
  const match = options.find((option) => candidates.includes(normalizeKey(option.value)));
  if (match) select.value = match.value;
}

function importCsv(merge) {
  if (!state.csv) {
    dom.csvStatus.textContent = state.language === "en" ? "Select a CSV file first." : "请先选择 CSV 文件。";
    return;
  }
  const csvGraph = graphFromCsv();
  if (!merge) state.graph = csvGraph;
  else mergeGraph(csvGraph);
  clearSelection();
  ensurePositions();
  applySelectedLayout(true);
  renderAll();
  if (state.language === "en") {
    dom.csvStatus.textContent = "Imported " + csvGraph.nodes.length + " nodes and " + csvGraph.edges.length + " edges.";
  } else {
    dom.csvStatus.textContent = "已导入 " + csvGraph.nodes.length + " 个节点、" + csvGraph.edges.length + " 条边。";
  }
}

function graphFromCsv() {
  const mode = dom.csvMode.value;
  const idCol = dom.csvIdColumn.value;
  const labelCol = dom.csvLabelColumn.value;
  const sourceCol = dom.csvSourceColumn.value;
  const targetCol = dom.csvTargetColumn.value;
  const weightCol = dom.csvWeightColumn.value;
  const groupCol = dom.csvGroupColumn.value;
  const shouldImportEdges = mode === "edges" || (mode === "auto" && sourceCol && targetCol);
  const nodes = new Map();
  const edges = [];

  state.csv.rows.forEach((row, index) => {
    if (shouldImportEdges) {
      const source = cleanCell(row[sourceCol]);
      const target = cleanCell(row[targetCol]);
      if (!source || !target) return;
      addNode(nodes, { id: source, label: source, type: "csv", group: "" });
      addNode(nodes, { id: target, label: target, type: "csv", group: "" });
      const weight = parseWeight(row[weightCol], 1);
      edges.push({
        id: createEdgeId(source, target, index),
        source,
        target,
        weight,
        label: cleanCell(row[labelCol]) || `${source} - ${target}`,
        notes: "",
        attrs: { ...row }
      });
      return;
    }

    const id = cleanCell(row[idCol]) || `CSV-${index + 1}`;
    addNode(nodes, {
      id,
      label: cleanCell(row[labelCol]) || id,
      type: "csv",
      group: cleanCell(row[groupCol]),
      notes: "",
      attrs: { ...row }
    });
  });

  return { nodes: Array.from(nodes.values()), edges };
}

function rebuildArtifactNetworkIfReady() {
  if (dom.analysisTypeSelect?.value !== "artifact") return;
  if (!hasSelectedInventoryScope()) return;
  if (!getSelectedFieldCheckboxes().length) return;
  buildArtifactNetwork();
}

function syncActiveFilterSelection() {
  if (!dom.artifactFilterValue || state.scopeMode !== "filtered") return;
  state.filterFieldId = dom.artifactFilterField?.value || state.filterFieldId;
  state.filterValues = Array.from(dom.artifactFilterValue.selectedOptions || []).map((option) => option.value).filter(Boolean);
  state.filterValue = state.filterValues.join("\u001f");
}

function handleBuildNetworkClick(event) {
  event?.preventDefault();
  syncActiveFilterSelection();
  captureFieldUiState();
  if (dom.buildArtifactNetworkBtn) {
    dom.buildArtifactNetworkBtn.disabled = true;
    dom.buildArtifactNetworkBtn.textContent = state.language === "en" ? "Building..." : "正在生成...";
  }
  window.setTimeout(() => {
    try {
      buildArtifactNetwork();
    } catch (error) {
      console.error(error);
      window.alert(state.language === "en" ? `Build failed: ${error.message}` : `生成网络失败：${error.message}`);
    } finally {
      if (dom.buildArtifactNetworkBtn) {
        dom.buildArtifactNetworkBtn.disabled = false;
        dom.buildArtifactNetworkBtn.textContent = nt("buildNetwork");
      }
    }
  }, 0);
}

function getArtifactNetworkArtifacts(fieldIds) {
  const artifacts = getScopedArtifacts();
  const limit = Math.max(0, Math.floor(Number(state.similarityRules.missingFieldLimit || 0)));
  if (!state.similarityRules.removeNodesOnMissingLimit || limit <= 0) return artifacts;
  return artifacts.filter((artifact) => countMissingFieldsForArtifact(artifact, fieldIds) < limit);
}

function buildArtifactNetwork() {
  if (dom.analysisTypeSelect.value === "site") {
    buildSiteNetwork();
    return;
  }
  const selectedFields = getSelectedFieldCheckboxes().map((input) => input.value);
  if (!selectedFields.length) {
    window.alert(state.language === "en" ? "Select at least one field to compare." : "请至少选择一个用于比较的字段。");
    return;
  }
  const scopeArtifacts = getArtifactNetworkArtifacts(selectedFields);
  const threshold = Number(dom.similarityThreshold.value);
  const includeEmpty = dom.includeEmptyFields.checked;
  const weights = getSelectedFieldWeights();
  state.graph = SimilarityEngine.artifact(scopeArtifacts, selectedFields, includeEmpty, weights, threshold);
  clearSelection();
  applySelectedLayout(true);
  renderAll();
  fitGraph();
}

function showSimilarityMatrix() {
  if (dom.analysisTypeSelect.value === "site") {
    showGraphSimilarityMatrix();
    return;
  }
  const selectedFields = getSelectedFieldCheckboxes().map((input) => input.value);
  if (!selectedFields.length) {
    window.alert(state.language === "en" ? "Select at least one field to compare before opening the matrix." : "打开矩阵前请至少选择一个用于比较的字段。");
    return;
  }
  const scopeArtifacts = getArtifactNetworkArtifacts(selectedFields);
  const includeEmpty = dom.includeEmptyFields.checked;
  const weights = getSelectedFieldWeights();
  const fields = selectedFields.map((id) => state.fields.find((field) => field.id === id)).filter(Boolean);
  const rows = scopeArtifacts.map((artifact) => ({
    id: artifact.id,
    label: artifact.metadata?.Title || artifact.title || artifact.id,
    artifact
  }));
  const matrix = rows.map((rowA, i) => rows.map((rowB, j) => {
    if (i === j) return { score: 1, reasons: [state.language === "en" ? "same item" : "同一条目"] };
    return compareArtifacts(rowA.artifact, rowB.artifact, selectedFields, includeEmpty, weights);
  }));
  renderSimilarityMatrix(rows, matrix, fields);
}

function showGraphSimilarityMatrix() {
  if (dom.analysisTypeSelect.value === "site") {
    showSiteStatisticMatrix();
    return;
  }
  const rows = state.graph.nodes.map((node) => ({ id: node.id, label: node.label || node.id }));
  const edgeMap = new Map(state.graph.edges.map((edge) => [`${edge.source}→${edge.target}`, edge]));
  const matrix = rows.map((rowA, i) => rows.map((rowB, j) => {
    if (i === j) return { score: 1, reasons: [state.language === "en" ? "same node" : "同一节点"] };
    const edge = edgeMap.get(`${rowA.id}→${rowB.id}`) || edgeMap.get(`${rowB.id}→${rowA.id}`);
    return { score: edge ? Number(edge.similarity ?? edge.weight ?? 0) : 0, reasons: edge?.attrs?.reasons || [] };
  }));
  renderSimilarityMatrix(rows, matrix, []);
}

function showSiteStatisticMatrix() {
  const scopeArtifacts = getScopedArtifacts();
  const nodeField = state.fields.find((field) => field.id === dom.siteNodeFieldSelect.value);
  const targetField = state.fields.find((field) => field.id === dom.siteTargetFieldSelect.value);
  if (!nodeField || !targetField) {
    window.alert(state.language === "en" ? "Select a node field and a target statistic field." : "请选择节点字段和目标统计字段。");
    return;
  }
  const metric = dom.siteMetricSelect.value;
  const groups = new Map();
  const targetValues = new Set();
  scopeArtifacts.forEach((artifact) => {
    const nodeValue = cleanCell(getFieldValue(artifact, nodeField));
    const targetValue = cleanCell(getFieldValue(artifact, targetField));
    if (!nodeValue || !targetValue) return;
    if (!groups.has(nodeValue)) groups.set(nodeValue, new Map());
    const counts = groups.get(nodeValue);
    counts.set(targetValue, (counts.get(targetValue) || 0) + 1);
    targetValues.add(targetValue);
  });
  const columns = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b)).map((value) => ({ id: value, label: value }));
  const rows = Array.from(targetValues).sort((a, b) => a.localeCompare(b)).map((value) => ({ id: value, label: value }));
  const maxCount = Math.max(1, ...columns.flatMap((column) => rows.map((row) => groups.get(column.id)?.get(row.id) || 0)));
  const matrix = rows.map((row) => columns.map((column) => {
    const count = groups.get(column.id)?.get(row.id) || 0;
    const value = metric === "jaccard" ? (count > 0 ? 1 : 0) : count;
    return {
      score: metric === "jaccard" ? value : value / maxCount,
      display: String(value),
      reasons: [state.language === "en"
        ? `${targetField.label} in ${nodeField.label}: ${count}`
        : `${nodeField.label} 中的 ${targetField.label}：${count}`]
    };
  }));
  renderMatrixTable({
    rows,
    columns,
    matrix,
    meta: state.language === "en"
      ? `${rows.length} ${targetField.label} values × ${columns.length} ${nodeField.label} values · ${metric}`
      : `${rows.length} 个 ${targetField.label} 值 × ${columns.length} 个 ${nodeField.label} 值 · ${metric}`
  });
}

function renderSimilarityMatrix(rows, matrix, fields) {
  if (!dom.similarityMatrixDialog || !dom.similarityMatrixTable) return;
  const fieldText = fields.length
    ? fields.map((field) => field.label).join(", ")
    : (state.language === "en" ? "current graph edges" : "当前图中的边");
  const meta = state.language === "en"
    ? `${rows.length} × ${rows.length} matrix · Compared fields: ${fieldText}`
    : `${rows.length} × ${rows.length} 矩阵 · 比较字段：${fieldText}`;
  renderMatrixTable({ rows, columns: rows, matrix, meta });
}

function renderMatrixTable({ rows, columns, matrix, meta }) {
  if (!dom.similarityMatrixDialog || !dom.similarityMatrixTable) return;
  state.lastMatrix = { rows, columns, matrix, meta };
  dom.similarityMatrixMeta.textContent = meta;
  renderMatrixHeaderFieldSelect(rows, columns);
  const card = dom.similarityMatrixDialog.querySelector(".matrix-modal-card");
  card?.style.setProperty("--matrix-font-size", `${state.matrixUi.fontSize}px`);
  const table = document.createElement("table");
  table.className = "similarity-matrix-table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headRow.append(document.createElement("th"));
  columns.forEach((column) => {
    const th = document.createElement("th");
    const header = getMatrixHeaderLabel(column);
    th.textContent = header.label;
    th.title = header.title || column.id;
    headRow.append(th);
  });
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  rows.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const header = getMatrixHeaderLabel(row);
    th.textContent = header.label;
    th.title = header.title || row.id;
    tr.append(th);
    columns.forEach((_, colIndex) => {
      const cell = matrix[rowIndex][colIndex];
      const td = document.createElement("td");
      const score = clamp(Number(cell.score || 0), 0, 1);
      td.textContent = cell.display ?? round(score, 3);
      td.title = (cell.reasons || []).join(" · ");
      td.style.background = `color-mix(in srgb, var(--accent) ${Math.round(score * 82)}%, var(--surface))`;
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(thead, tbody);
  dom.similarityMatrixTable.innerHTML = "";
  dom.similarityMatrixTable.append(table);
  dom.similarityMatrixDialog.classList.remove("hidden");
}

function renderMatrixHeaderFieldSelect(rows = [], columns = []) {
  if (!dom.matrixHeaderFieldSelect) return;
  const current = state.matrixUi.headerFieldId || "label";
  const options = matrixHeaderFieldOptions(rows, columns);
  dom.matrixHeaderFieldSelect.innerHTML = "";
  options.forEach((option) => dom.matrixHeaderFieldSelect.append(new Option(option.label, option.value)));
  const values = new Set(options.map((option) => option.value));
  if (!values.has(current)) state.matrixUi.headerFieldId = "label";
  dom.matrixHeaderFieldSelect.value = state.matrixUi.headerFieldId;
}

function matrixHeaderFieldOptions(rows = [], columns = []) {
  const records = [...rows, ...columns];
  const hasArtifact = records.some((record) => record?.artifact);
  const options = [
    { value: "label", label: state.language === "en" ? "Label" : "标签" },
    { value: "id", label: "ID" }
  ];
  if (!hasArtifact) return options;
  const fieldOptions = state.fields
    .filter((field) => {
      if (!field) return false;
      if (field.isSystemField) return field.label !== "ID";
      return records.some((record) => Object.prototype.hasOwnProperty.call(record.artifact?.customFields || {}, field.id));
    })
    .map((field) => ({ value: `field:${field.id}`, label: field.label }));
  return [...options, ...fieldOptions];
}

function getMatrixHeaderLabel(record) {
  const fieldId = state.matrixUi.headerFieldId || "label";
  if (fieldId === "id") return { label: record.id || record.label || "", title: record.label || record.id || "" };
  if (fieldId === "label") return { label: record.label || record.id || "", title: record.id || record.label || "" };
  if (fieldId.startsWith("field:") && record.artifact) {
    const field = state.fields.find((item) => item.id === fieldId.slice("field:".length));
    const value = field ? cleanCell(getFieldValue(record.artifact, field)) : "";
    return {
      label: value || record.label || record.id || "",
      title: value ? `${field.label}: ${value}` : (record.id || record.label || "")
    };
  }
  return { label: record.label || record.id || "", title: record.id || record.label || "" };
}

function hideSimilarityMatrix() {
  dom.similarityMatrixDialog?.classList.add("hidden");
}

function changeMatrixFontSize(delta) {
  setMatrixFontSize(Number(state.matrixUi.fontSize || 12) + delta);
}

function setMatrixFontSize(value) {
  state.matrixUi.fontSize = clamp(Number(value), 9, 22);
  const card = dom.similarityMatrixDialog?.querySelector(".matrix-modal-card");
  card?.style.setProperty("--matrix-font-size", `${state.matrixUi.fontSize}px`);
  if (dom.matrixFontSizeRange) dom.matrixFontSizeRange.value = String(state.matrixUi.fontSize);
  saveNetworkSettings();
}

async function exportSimilarityMatrixCsv() {
  const matrix = state.lastMatrix;
  if (!matrix?.rows?.length || !matrix?.columns?.length) {
    window.alert(state.language === "en" ? "Open a similarity matrix before exporting CSV." : "请先打开相似度矩阵再导出 CSV。");
    return;
  }
  const lines = [
    ["", ...matrix.columns.map((column) => getMatrixHeaderLabel(column).label || column.label || column.id)].map(escapeCsvCell).join(",")
  ];
  matrix.rows.forEach((row, rowIndex) => {
    const cells = matrix.columns.map((_, colIndex) => {
      const cell = matrix.matrix[rowIndex]?.[colIndex] || {};
      return cell.display ?? round(clamp(Number(cell.score || 0), 0, 1), 3);
    });
    lines.push([getMatrixHeaderLabel(row).label || row.label || row.id, ...cells].map(escapeCsvCell).join(","));
  });
  const method = await saveTextFile("similarity-matrix.csv", lines.join("\n"), "text/csv;charset=utf-8");
  if (method === "clipboard-download" && dom.similarityMatrixMeta) {
    dom.similarityMatrixMeta.textContent = `${matrix.meta} · ${state.language === "en" ? "CSV copied to clipboard; download starts when supported." : "CSV 已复制到剪贴板；支持下载时会同时开始下载。"}`;
  }
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function compareArtifacts(a, b, fieldIds, includeEmpty, weights = {}) {
  const missingDecision = getMissingComparisonDecision(a, b, fieldIds);
  if (missingDecision.skip) {
    return { score: 0, reasons: [missingDecision.reason], matchedFields: [], skipped: true };
  }
  let score = 0;
  const reasons = [];
  const matchedFields = [];
  fieldIds.forEach((fieldId) => {
    const field = state.fields.find((item) => item.id === fieldId);
    if (!field) return;
    const av = getFieldValue(a, field);
    const bv = getFieldValue(b, field);
    if (!includeEmpty && (!hasComparableValue(av) || !hasComparableValue(bv))) return;
    const fieldScore = valueSimilarity(av, bv, includeEmpty);
    const weighted = fieldScore * (weights[fieldId] || 0);
    if (weighted > 0) {
      reasons.push(`${field.label}:${round(weighted, 2)}`);
      matchedFields.push(field.label);
    }
    score += weighted;
  });
  return { score, reasons, matchedFields };
}

function getMissingComparisonDecision(a, b, fieldIds) {
  const importantIds = state.similarityRules.importantMissingFieldIds || new Set();
  const importantMissingLabels = [];
  let missingFields = 0;
  fieldIds.forEach((fieldId) => {
    const field = state.fields.find((item) => item.id === fieldId);
    if (!field) return;
    const missing = isMissingValue(getFieldValue(a, field)) || isMissingValue(getFieldValue(b, field));
    if (!missing) return;
    missingFields += 1;
    if (importantIds.has(fieldId)) importantMissingLabels.push(field.label);
  });
  if (importantMissingLabels.length) {
    return {
      skip: true,
      reason: state.language === "en"
        ? `Required field missing: ${importantMissingLabels.join(", ")}`
        : `重要字段缺失：${importantMissingLabels.join("、")}`
    };
  }
  const limit = Math.max(0, Math.floor(Number(state.similarityRules.missingFieldLimit || 0)));
  if (state.similarityRules.removeEdgesOnMissingLimit !== false && limit > 0 && missingFields >= limit) {
    return {
      skip: true,
      reason: state.language === "en"
        ? `Skipped: ${missingFields} missing fields`
        : `已跳过：${missingFields} 个字段缺失`
    };
  }
  return { skip: false, reason: "" };
}

function countMissingFieldsForArtifact(artifact, fieldIds) {
  return fieldIds.reduce((count, fieldId) => {
    const field = state.fields.find((item) => item.id === fieldId);
    if (!field) return count;
    return count + (isMissingValue(getFieldValue(artifact, field)) ? 1 : 0);
  }, 0);
}

function buildSiteNetwork() {
  const scopeArtifacts = getScopedArtifacts();
  const nodeField = state.fields.find((field) => field.id === dom.siteNodeFieldSelect.value);
  const targetField = state.fields.find((field) => field.id === dom.siteTargetFieldSelect.value);
  if (!nodeField || !targetField) {
    window.alert(state.language === "en" ? "Select a node field and a target statistic field." : "请选择节点字段和目标统计字段。");
    return;
  }
  const metric = dom.siteMetricSelect.value;
  const threshold = Number(dom.similarityThreshold.value);
  state.graph = SimilarityEngine.site(scopeArtifacts, nodeField, targetField, metric, threshold);
  clearSelection();
  applySelectedLayout(true);
  renderAll();
  fitGraph();
}
function jaccardSimilarity(left, right) {
  const leftKeys = new Set(Array.from(left.keys()));
  const rightKeys = new Set(Array.from(right.keys()));
  const union = new Set([...leftKeys, ...rightKeys]);
  if (!union.size) return 0;
  let intersection = 0;
  leftKeys.forEach((key) => {
    if (rightKeys.has(key)) intersection += 1;
  });
  return intersection / union.size;
}

function cosineSimilarity(left, right) {
  const keys = new Set([...left.keys(), ...right.keys()]);
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  keys.forEach((key) => {
    const a = left.get(key) || 0;
    const b = right.get(key) || 0;
    dot += a * b;
    leftNorm += a * a;
    rightNorm += b * b;
  });
  return leftNorm && rightNorm ? dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm)) : 0;
}

function brayCurtisSimilarity(left, right) {
  const keys = new Set([...left.keys(), ...right.keys()]);
  let difference = 0;
  let total = 0;
  keys.forEach((key) => {
    const a = left.get(key) || 0;
    const b = right.get(key) || 0;
    difference += Math.abs(a - b);
    total += a + b;
  });
  return total ? 1 - (difference / total) : 0;
}

function valueSimilarity(a, b, includeEmpty) {
  const left = cleanCell(a).toLowerCase();
  const right = cleanCell(b).toLowerCase();
  if (!left && !right) return includeEmpty ? 1 : 0;
  if (!left || !right) return 0;
  if (left === right) return 1;
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);
  const union = new Set([...leftTokens, ...rightTokens]);
  if (!union.size) return 0;
  const intersection = leftTokens.filter((token) => rightTokens.includes(token)).length;
  return intersection / union.size;
}

function getMissingValueTokens() {
  return String(state.similarityRules.missingValueMarkers || "")
    .split(/[,;，；\n]+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .map((token) => ["(blank)", "(empty)", "blank", "empty"].includes(token) ? "" : token);
}

function isMissingValue(value) {
  const tokens = getMissingValueTokens();
  if (!tokens.length) return !cleanCell(value);
  const normalized = cleanCell(value).toLowerCase();
  if (!normalized) return true;
  if (tokens.includes(normalized)) return true;
  const parts = normalized
    .split(/[\s,;|/、，；]+/)
    .map((token) => token.trim())
    .filter(Boolean);
  return parts.length > 0 && parts.every((token) => tokens.includes(token));
}

function hasComparableValue(value) {
  return cleanCell(value) && !isMissingValue(value);
}

function tokenize(value) {
  return value.split(/[\s,;锛岋紱銆?|]+/).map((token) => token.trim()).filter(Boolean);
}

function collectArtifactAttrs(artifact) {
  const attrs = { uniqueID: artifact.id };
  state.fields.forEach((field) => {
    attrs[field.label] = getFieldValue(artifact, field);
  });
  attachParsedDateRange(attrs);
  return attrs;
}

function ensureNodeDateRange(node) {
  node.attrs ||= {};
  attachParsedDateRange(node.attrs);
  return node;
}

function attachParsedDateRange(attrs) {
  const dateText = getDateTextFromAttrs(attrs);
  const range = parseDateRangeText(dateText);
  if (!range) {
    delete attrs.__dateRange;
    delete attrs.__dateStart;
    delete attrs.__dateEnd;
    delete attrs.__dateText;
    return null;
  }
  attrs.__dateRange = range;
  attrs.__dateStart = range.start;
  attrs.__dateEnd = range.end;
  attrs.__dateText = range.text;
  return range;
}

function getDateTextFromAttrs(attrs = {}) {
  const direct = attrs.Date || attrs.date || attrs.日期 || attrs.Dating || attrs.dating || attrs.Period || attrs.period || attrs.时期 || attrs.年代;
  if (cleanCell(direct)) return cleanCell(direct);
  const entry = Object.entries(attrs).find(([key, value]) => {
    const normalized = normalizeKey(key);
    return cleanCell(value) && (normalized === "date" || normalized.includes("date") || key.includes("日期") || key.includes("年代") || key.includes("时期"));
  });
  return cleanCell(entry?.[1]);
}

function getArtifactDateRange(artifact) {
  return parseDateRangeText(getDateTextFromAttrs(collectArtifactAttrs(artifact)));
}

function getNodeDateRange(node) {
  if (!node?.attrs) return null;
  const existing = node.attrs.__dateRange;
  if (existing && Number.isFinite(existing.start) && Number.isFinite(existing.end)) return existing;
  return attachParsedDateRange(node.attrs);
}

function isNodeOutsideTimeRange(node) {
  if (!hasTimeFilterDomain()) return false;
  const range = getNodeDateRange(node);
  if (!range) return false;
  return range.end < state.dateFilter.min || range.start > state.dateFilter.max;
}

function parseDateRangeText(value) {
  const original = cleanCell(value);
  if (!original) return null;
  const text = normalizeDateText(original);
  const dynastyRange = parseDynastyDate(text, original);
  if (dynastyRange) return dynastyRange;
  const decadeRange = parseDecadeDate(text, original);
  if (decadeRange) return decadeRange;
  const centuryRange = parseCenturyDate(text, original);
  if (centuryRange) return centuryRange;
  const yearRange = parseYearDate(text, original);
  if (yearRange) return yearRange;
  return null;
}

function normalizeDateText(value) {
  return cleanCell(value)
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 65248))
    .replace(/[‐‑‒–—―]/g, "-")
    .replace(/[约約大约大約大致约为約為]/g, "")
    .replace(/\b(?:ca|c|circa|approx|approximately)\.?\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDynastyDate(text, original) {
  const periodRanges = [
    ["新石器时代", -10000, -2000], ["新石器", -10000, -2000],
    ["夏代", -2070, -1600], ["夏", -2070, -1600],
    ["商代", -1600, -1046], ["商", -1600, -1046],
    ["西周", -1046, -771], ["东周", -770, -256], ["周代", -1046, -256], ["周", -1046, -256],
    ["春秋", -770, -476], ["战国", -475, -221],
    ["秦代", -221, -206], ["秦", -221, -206],
    ["西汉", -202, 9], ["东汉", 25, 220], ["汉代", -202, 220], ["汉", -202, 220],
    ["三国", 220, 280],
    ["西晋", 266, 316], ["东晋", 317, 420], ["晋代", 266, 420], ["晋", 266, 420],
    ["南北朝", 420, 589], ["北朝", 386, 581], ["南朝", 420, 589],
    ["隋代", 581, 618], ["隋", 581, 618],
    ["唐代", 618, 907], ["唐", 618, 907],
    ["五代十国", 907, 979], ["五代", 907, 960],
    ["北宋", 960, 1127], ["南宋", 1127, 1279], ["宋代", 960, 1279], ["宋", 960, 1279],
    ["辽代", 916, 1125], ["辽", 916, 1125],
    ["金代", 1115, 1234], ["金", 1115, 1234],
    ["元代", 1271, 1368], ["元", 1271, 1368],
    ["明代", 1368, 1644], ["明", 1368, 1644],
    ["清代", 1644, 1912], ["清", 1644, 1912],
    ["民国", 1912, 1949]
  ].sort((a, b) => b[0].length - a[0].length);
  const match = periodRanges.find(([name]) => {
    const index = text.indexOf(name);
    if (index < 0) return false;
    if (name.length === 1 && ["公", "西"].includes(text[index - 1])) return false;
    return true;
  });
  if (!match) return null;
  return makeDateRange(match[1], match[2], original);
}

function parseCenturyDate(text, original) {
  const englishRange = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s*(?:-|to|至|到)\s*(\d{1,2})(?:st|nd|rd|th)?\s*centur(?:y|ies)\s*(BCE|BC|CE|AD)?/i);
  if (englishRange) {
    return makeCenturyRange(Number(englishRange[1]), Number(englishRange[2]), englishRange[3] || eraFromText(text), text, original);
  }
  const englishSingle = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s*centur(?:y|ies)\s*(BCE|BC|CE|AD)?/i);
  if (englishSingle) {
    return makeCenturyRange(Number(englishSingle[1]), Number(englishSingle[1]), englishSingle[2] || eraFromText(text), text, original);
  }
  const chineseRange = text.match(/(?:第)?([一二三四五六七八九十百\d]{1,3})\s*(?:-|至|到)\s*(?:第)?([一二三四五六七八九十百\d]{1,3})\s*世纪/);
  if (chineseRange) {
    return makeCenturyRange(parseChineseNumber(chineseRange[1]), parseChineseNumber(chineseRange[2]), eraFromText(text), text, original);
  }
  const chineseSingle = text.match(/(?:第)?([一二三四五六七八九十百\d]{1,3})\s*世纪/);
  if (chineseSingle) {
    const century = parseChineseNumber(chineseSingle[1]);
    return makeCenturyRange(century, century, eraFromText(text), text, original);
  }
  return null;
}

function makeCenturyRange(left, right, era, text, original) {
  if (!Number.isFinite(left) || !Number.isFinite(right) || left <= 0 || right <= 0) return null;
  const isBce = /BCE|BC|公元前|西元前|^前/.test(String(era || "")) || /BCE|BC|公元前|西元前/.test(text);
  const first = Math.min(left, right);
  const last = Math.max(left, right);
  let start = isBce ? -last * 100 : (first - 1) * 100 + 1;
  let end = isBce ? -(first - 1) * 100 - 1 : last * 100;
  if (first === last) {
    const span = end - start + 1;
    if (/早|初|early/i.test(text)) end = start + Math.floor(span / 3) - 1;
    if (/中|middle|mid/i.test(text)) {
      start += Math.floor(span / 3);
      end -= Math.floor(span / 3);
    }
    if (/晚|末|late/i.test(text)) start = end - Math.floor(span / 3) + 1;
  }
  return makeDateRange(start, end, original);
}

function parseDecadeDate(text, original) {
  const centuryDecade = text.match(/(\d{1,2})\s*世纪\s*(\d{1,2})0\s*年代/);
  if (centuryDecade) {
    const century = Number(centuryDecade[1]);
    const decade = Number(centuryDecade[2]) * 10;
    const year = (century - 1) * 100 + decade;
    return makeDateRange(year, year + 9, original);
  }
  const decade = text.match(/(\d{3,4})\s*(?:s|年代)/i);
  if (!decade) return null;
  let start = Number(decade[1]);
  if (isBceText(text)) {
    const end = -start;
    return makeDateRange(end - 9, end, original);
  }
  return makeDateRange(start, start + 9, original);
}

function parseYearDate(text, original) {
  const matches = Array.from(text.matchAll(/(公元前|西元前|前|BCE|BC|AD|CE|公元|西元)?\s*(\d{1,4})\s*(年)?\s*(BCE|BC|AD|CE)?/gi));
  if (!matches.length) return null;
  const hasStrongYearSignal = /年|BCE|BC|AD|CE|公元|西元|前|\d{3,4}/i.test(text);
  if (!hasStrongYearSignal) return null;
  const hasBce = isBceText(text);
  const hasCe = /\b(?:AD|CE)\b|公元|西元/i.test(text.replace(/公元前|西元前/g, ""));
  const years = matches
    .map((match) => {
      const raw = Number(match[2]);
      if (!Number.isFinite(raw)) return null;
      const token = match[0];
      const explicitBce = isBceText(token);
      const explicitCe = /\b(?:AD|CE)\b|公元|西元/i.test(token.replace(/公元前|西元前/g, ""));
      if (raw < 100 && !match[3] && !explicitBce && !explicitCe && !/\d{3,4}/.test(text)) return null;
      const bce = explicitBce || (!explicitCe && hasBce && !hasCe);
      return bce ? -raw : raw;
    })
    .filter((year) => Number.isFinite(year));
  if (!years.length) return null;
  return makeDateRange(Math.min(...years), Math.max(...years), original);
}

function eraFromText(text) {
  if (isBceText(text)) return "BCE";
  if (/\b(?:AD|CE)\b|公元|西元/i.test(text)) return "CE";
  return "";
}

function isBceText(text) {
  return /BCE|BC|公元前|西元前|(?:^|[\s(（-])前/i.test(cleanCell(text));
}

function parseChineseNumber(value) {
  const text = cleanCell(value);
  if (/^\d+$/.test(text)) return Number(text);
  const digits = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (text === "十") return 10;
  const tenIndex = text.indexOf("十");
  if (tenIndex >= 0) {
    const tens = tenIndex === 0 ? 1 : (digits[text[tenIndex - 1]] || 0);
    const ones = digits[text[tenIndex + 1]] || 0;
    return tens * 10 + ones;
  }
  return digits[text] || Number.NaN;
}

function makeDateRange(start, end, text) {
  const left = Number(start);
  const right = Number(end);
  if (!Number.isFinite(left) || !Number.isFinite(right)) return null;
  return { start: Math.min(left, right), end: Math.max(left, right), text: cleanCell(text) };
}

function formatYearForDisplay(year) {
  if (!Number.isFinite(year)) return "";
  if (year < 0) return state.language === "en" ? `${Math.abs(year)} BCE` : `公元前${Math.abs(year)}`;
  return state.language === "en" ? `${year} CE` : `${year}`;
}

function getPrimaryImage(artifact) {
  const ids = artifact?.imageIds || [];
  return state.images
    .filter((image) => image.artifactId === artifact.id || ids.includes(image.id))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))[0];
}

function getImageUrl(image) {
  if (!image?.blob) return "";
  if (!image._objectUrl) image._objectUrl = URL.createObjectURL(image.blob);
  return image._objectUrl;
}

function getSelectedStorageName() {
  const selected = dom.storageScopeSelect?.value || state.activeStorageName;
  return selected || "";
}

function hasSelectedInventoryScope() {
  return (state.scopeMode === "storage" || state.scopeMode === "filtered") && Boolean(getSelectedStorageName());
}

function updateInventoryScopedFieldUi() {
  const isSiteAnalysis = dom.analysisTypeSelect?.value === "site";
  dom.artifactAnalysisPanel?.classList.toggle("hidden", isSiteAnalysis);
  if (dom.nodeLabelFieldSelect) dom.nodeLabelFieldSelect.disabled = false;
  if (dom.edgeStyleLabelFieldSelect) dom.edgeStyleLabelFieldSelect.disabled = false;
}

function fieldBelongsToStorage(field, storageName) {
  if (!field || field.isSystemField) return true;
  const target = storageName || getSelectedStorageName();
  if (!target) return false;
  if (field.storageName) return field.storageName === target || field.linkedStorageName === target;
  return state.artifacts.some((artifact) => (
    getArtifactStorageName(artifact) === target
    && Object.prototype.hasOwnProperty.call(artifact.customFields || {}, field.id)
  ));
}

function getSelectedStorageFields() {
  const storageName = getSelectedStorageName();
  if (!storageName) return [];
  return state.fields.filter((field) => fieldBelongsToStorage(field, storageName));
}

function captureFieldUiState() {
  const rows = document.querySelectorAll("#artifactFieldList label[data-field-id], #systemFieldList label[data-field-id]");
  if (!rows.length) return;
  const order = [];
  rows.forEach((row) => {
    const fieldId = row.dataset.fieldId;
    if (!fieldId) return;
    order.push(fieldId);
    const checkbox = row.querySelector("input[type='checkbox']");
    const weightInput = row.querySelector(".field-weight-input");
    if (checkbox) state.fieldUi.checked[fieldId] = checkbox.checked;
    if (weightInput) state.fieldUi.weights[fieldId] = Math.max(0, Number(weightInput.value || 0));
  });
  const existing = new Set(state.fieldUi.order || []);
  state.fieldUi.order = [
    ...order,
    ...(state.fieldUi.order || []).filter((fieldId) => !order.includes(fieldId) && existing.has(fieldId))
  ];
}

function getInitialFieldSelection(field, defaultChecked, defaultWeight) {
  const hasSavedChecked = Object.prototype.hasOwnProperty.call(state.fieldUi.checked, field.id);
  const checked = hasSavedChecked ? Boolean(state.fieldUi.checked[field.id]) : defaultChecked;
  const hasSavedWeight = Object.prototype.hasOwnProperty.call(state.fieldUi.weights, field.id);
  const weight = hasSavedWeight ? Number(state.fieldUi.weights[field.id] || 0) : (checked ? defaultWeight : 0);
  return { checked, weight: Math.max(0, Math.round(weight)) };
}

function prepareFieldsForDisplay(fields, options = {}) {
  const availableIds = new Set(fields.map((field) => field.id));
  fields.forEach((field) => {
    if (!state.fieldUi.order.includes(field.id)) state.fieldUi.order.push(field.id);
  });
  const fieldById = new Map(fields.map((field) => [field.id, field]));
  let ordered = state.fieldUi.order
    .filter((fieldId) => availableIds.has(fieldId))
    .map((fieldId) => fieldById.get(fieldId))
    .filter(Boolean);
  if (state.fieldUi.sortDirection === "asc" || state.fieldUi.sortDirection === "desc") {
    const direction = state.fieldUi.sortDirection === "asc" ? 1 : -1;
    ordered = fields.slice().sort((a, b) => direction * a.label.localeCompare(b.label));
    mergeFieldOrderSubset(ordered.map((field) => field.id));
  }
  if (state.fieldUi.showCheckedOnly && !options.ignoreCheckedOnly) {
    ordered = ordered.filter((field) => Boolean(state.fieldUi.checked[field.id]));
  }
  return ordered;
}

function mergeFieldOrderSubset(subsetOrder) {
  const subsetIds = new Set(subsetOrder);
  const next = [];
  let inserted = false;
  (state.fieldUi.order || []).forEach((fieldId) => {
    if (subsetIds.has(fieldId)) {
      if (!inserted) {
        next.push(...subsetOrder);
        inserted = true;
      }
      return;
    }
    next.push(fieldId);
  });
  if (!inserted) next.push(...subsetOrder);
  state.fieldUi.order = next;
}

function renderFieldOptions() {
  captureFieldUiState();
  dom.artifactFieldList.innerHTML = "";
  dom.systemFieldList.innerHTML = "";
  const selectedStorageFields = getSelectedStorageFields();
  const comparable = selectedStorageFields.filter((field) => field.label !== "ID");
  if (!comparable.length) {
    const message = hasSelectedInventoryScope()
      ? (state.language === "en" ? "No fields available for comparison." : "暂无可用于比较的字段。")
      : (state.language === "en" ? "Select a specific inventory to load fields." : "请选择具体库房后加载字段。");
    dom.artifactFieldList.innerHTML = `<p class="quiet-line">${message}</p>`;
    renderFieldSelect(dom.artifactFilterField, []);
    renderFieldSelect(dom.siteNodeFieldSelect, []);
    renderFieldSelect(dom.siteTargetFieldSelect, []);
    renderImportantMissingFieldOptions([]);
    renderVisualFieldOptions([]);
    updateInventoryScopedFieldUi();
    syncFieldToolbar();
    saveNetworkSettings();
    return;
  }
  const systemLabels = new Set(["ID", "Title", "Date", "Location", "Author", "Source", "Image Path", "record", "Record", "Note"]);
  const isMetadataField = (field) => field.isSystemField || systemLabels.has(field.label) || field.source === "metadata" || field.group === "metadata";
  const customFields = comparable.filter((field) => !isMetadataField(field));
  const systemFields = comparable.filter(isMetadataField);
  const defaultCustom = customFields.filter((field) => ["Material", "Style", "Type"].includes(field.label)).slice(0, 3);
  const fallbackCustom = customFields.slice(0, 3);
  const checkedCustomIds = new Set((defaultCustom.length ? defaultCustom : fallbackCustom).map((field) => field.id));
  const defaultWeight = Math.max(1, Math.round(100 / Math.max(1, checkedCustomIds.size || 1)));
  prepareFieldsForDisplay(customFields).forEach((field) => {
    const selection = getInitialFieldSelection(field, checkedCustomIds.has(field.id), defaultWeight);
    dom.artifactFieldList.append(createWeightedFieldRow(field, selection.checked, selection.weight));
  });
  if (!customFields.length) {
    dom.artifactFieldList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No custom fields in the current scope." : "当前范围暂无自定义字段。"}</p>`;
  } else if (state.fieldUi.showCheckedOnly && !dom.artifactFieldList.children.length) {
    dom.artifactFieldList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No checked custom fields." : "暂无已勾选的自定义字段。"}</p>`;
  }
  prepareFieldsForDisplay(systemFields, { ignoreCheckedOnly: true }).forEach((field) => {
    const selection = getInitialFieldSelection(field, false, 0);
    dom.systemFieldList.append(createWeightedFieldRow(field, selection.checked, selection.weight));
  });
  if (systemFields.length && !dom.systemFieldList.children.length) {
    dom.systemFieldList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No metadata fields in the current scope." : "当前范围暂无元数据字段。"}</p>`;
  }
  renderFieldSelect(dom.artifactFilterField, selectedStorageFields);
  renderFieldSelect(dom.siteNodeFieldSelect, state.fields, ["Location", "Site", "Region"]);
  renderFieldSelect(dom.siteTargetFieldSelect, comparable, ["Type", "Material", "Style", "Title"]);
  renderImportantMissingFieldOptions(comparable);
  renderVisualFieldOptions(comparable);
  renderArtifactFilterValues();
  updateFieldWeightPercents();
  updateInventoryScopedFieldUi();
  syncFieldToolbar();
  saveNetworkSettings();
}

function createWeightedFieldRow(field, checked, defaultWeight) {
  const label = document.createElement("label");
  const handle = document.createElement("span");
  const input = document.createElement("input");
  const name = document.createElement("span");
  const weight = document.createElement("input");
  const percent = document.createElement("span");
  label.draggable = true;
  label.dataset.fieldId = field.id;
  handle.className = "field-drag-handle";
  handle.textContent = "⋮";
  handle.title = state.language === "en" ? "Drag to reorder" : "拖动排序";
  input.type = "checkbox";
  input.value = field.id;
  input.checked = checked;
  name.className = "field-name";
  name.textContent = field.label;
  name.title = field.label;
  weight.type = "number";
  weight.className = "field-weight-input";
  weight.min = "0";
  weight.max = "100";
  weight.step = "1";
  weight.value = checked ? String(defaultWeight) : "0";
  weight.dataset.fieldId = field.id;
  weight.title = "Field weight";
  percent.className = "field-weight-percent";
  percent.textContent = "0%";
  input.addEventListener("change", () => {
    state.fieldUi.checked[field.id] = input.checked;
    if (!input.checked && Number(weight.value || 0) === 0) state.fieldUi.weights[field.id] = 0;
    updateFieldWeightPercents();
  });
  weight.addEventListener("input", () => {
    state.fieldUi.weights[field.id] = Math.max(0, Number(weight.value || 0));
    updateFieldWeightPercents();
  });
  label.addEventListener("dragstart", (event) => {
    state.fieldUi.draggingId = field.id;
    state.fieldUi.sortDirection = "custom";
    event.dataTransfer?.setData("text/plain", field.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    label.classList.add("dragging");
  });
  label.addEventListener("dragover", (event) => {
    if (!state.fieldUi.draggingId || state.fieldUi.draggingId === field.id) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  });
  label.addEventListener("drop", (event) => {
    event.preventDefault();
    moveFieldBefore(state.fieldUi.draggingId || event.dataTransfer?.getData("text/plain"), field.id);
  });
  label.addEventListener("dragend", () => {
    state.fieldUi.draggingId = "";
    label.classList.remove("dragging");
  });
  label.append(handle, input, name, weight, percent);
  return label;
}

function moveFieldBefore(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;
  captureFieldUiState();
  const order = (state.fieldUi.order || []).filter((fieldId) => fieldId !== sourceId);
  const targetIndex = order.indexOf(targetId);
  order.splice(targetIndex >= 0 ? targetIndex : order.length, 0, sourceId);
  state.fieldUi.order = order;
  state.fieldUi.sortDirection = "custom";
  renderFieldOptions();
}

function syncFieldToolbar() {
  if (dom.fieldCheckedToggleBtn) {
    dom.fieldCheckedToggleBtn.classList.toggle("active", state.fieldUi.showCheckedOnly);
    const label = state.fieldUi.showCheckedOnly
      ? (state.language === "en" ? "Show all fields" : "显示全部字段")
      : (state.language === "en" ? "Show checked fields only" : "只显示已勾选字段");
    dom.fieldCheckedToggleBtn.title = label;
    dom.fieldCheckedToggleBtn.setAttribute("aria-label", label);
  }
  if (dom.fieldSortToggleBtn) {
    const isDesc = state.fieldUi.sortDirection === "desc";
    dom.fieldSortToggleBtn.textContent = isDesc ? "Z" : "A";
    const label = isDesc
      ? (state.language === "en" ? "Sort fields descending" : "字段降序排序")
      : (state.language === "en" ? "Sort fields ascending" : "字段升序排序");
    dom.fieldSortToggleBtn.title = label;
    dom.fieldSortToggleBtn.setAttribute("aria-label", label);
    dom.fieldSortToggleBtn.classList.toggle("active", state.fieldUi.sortDirection === "asc" || state.fieldUi.sortDirection === "desc");
  }
}

function renderImportantMissingFieldOptions(fields) {
  if (!dom.importantMissingFieldList) return;
  const availableIds = new Set(fields.map((field) => field.id));
  state.similarityRules.importantMissingFieldIds = new Set(
    Array.from(state.similarityRules.importantMissingFieldIds || []).filter((fieldId) => availableIds.has(fieldId))
  );
  dom.importantMissingFieldList.innerHTML = "";
  if (!fields.length) {
    dom.importantMissingFieldList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "Select a specific inventory to choose required fields." : "请选择具体库房后设置必须完整的重要字段。"}</p>`;
    return;
  }
  fields.forEach((field) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const name = document.createElement("span");
    input.type = "checkbox";
    input.value = field.id;
    input.checked = state.similarityRules.importantMissingFieldIds.has(field.id);
    input.addEventListener("change", () => {
      if (input.checked) state.similarityRules.importantMissingFieldIds.add(field.id);
      else state.similarityRules.importantMissingFieldIds.delete(field.id);
      saveNetworkSettings();
      rebuildArtifactNetworkIfReady();
    });
    name.textContent = field.label;
    label.append(input, name);
    dom.importantMissingFieldList.append(label);
  });
}

function normalizeFieldWeights(redistribute = false) {
  const selected = getSelectedFieldCheckboxes();
  const allWeights = Array.from(document.querySelectorAll(".field-weight-input"));
  if (!selected.length) return updateFieldWeightPercents();
  if (redistribute) {
    const base = Math.floor(100 / selected.length);
    let remainder = 100 - base * selected.length;
    selected.forEach((checkbox) => {
      const input = allWeights.find((item) => item.dataset.fieldId === checkbox.value);
      if (input) input.value = String(base + (remainder-- > 0 ? 1 : 0));
    });
    allWeights.forEach((input) => {
      if (!selected.some((checkbox) => checkbox.value === input.dataset.fieldId)) input.value = "0";
    });
    updateFieldWeightPercents();
    return;
  }
  updateFieldWeightPercents();
}

function updateFieldWeightPercents() {
  const selectedIds = new Set(getSelectedFieldCheckboxes().map((checkbox) => checkbox.value));
  const inputs = Array.from(document.querySelectorAll(".field-weight-input"));
  const total = inputs.reduce((sum, input) => {
    if (!selectedIds.has(input.dataset.fieldId)) return sum;
    return sum + Math.max(0, Number(input.value || 0));
  }, 0);
  inputs.forEach((input) => {
    const percent = input.parentElement?.querySelector(".field-weight-percent");
    if (!percent) return;
    const value = selectedIds.has(input.dataset.fieldId) && total
      ? (Math.max(0, Number(input.value || 0)) / total) * 100
      : 0;
    percent.textContent = `${round(value, 1)}%`;
  });
  captureFieldUiState();
  saveNetworkSettings();
}

function renderFieldSelect(select, fields, preferredLabels = []) {
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  fields.forEach((field) => select.append(new Option(field.label, field.id)));
  const preferred = fields.find((field) => preferredLabels.includes(field.label));
  select.value = fields.some((field) => field.id === previous) ? previous : (preferred?.id || fields[0]?.id || "");
}

function renderVisualFieldOptions(labelFields = null) {
  const fields = (labelFields || state.fields).filter((field) => field.label !== "ID");
  [
    [dom.nodeColorFieldSelect, "nodeColorFieldId"],
    [dom.nodeShapeFieldSelect, "nodeShapeFieldId"],
    [dom.nodeSizeFieldSelect, "nodeSizeFieldId"],
    [dom.nodeOpacityFieldSelect, "nodeOpacityFieldId"]
  ].forEach(([select, key]) => renderNodeVisualSelect(select, key, fields));
  [
    [dom.edgeColorFieldSelect, "edgeColorFieldId"],
    [dom.edgeOpacityFieldSelect, "edgeOpacityFieldId"],
    [dom.edgeLabelFieldSelect, "edgeLabelFieldId"]
  ].forEach(([select, key]) => renderEdgeVisualSelect(select, key));
  renderClassificationLegend();
  renderEdgeClassificationLegend();
  renderLabelFieldOptions(labelFields || fields);
}

function renderLabelFieldOptions(fields) {
  if (dom.nodeLabelFieldSelect) {
    const previous = state.style.nodeLabelField || dom.nodeLabelFieldSelect.value || "label";
    dom.nodeLabelFieldSelect.innerHTML = "";
    [
      { id: "label", label: state.language === "en" ? "Title" : "标题" },
      { id: "id", label: "ID" }
    ].forEach((option) => dom.nodeLabelFieldSelect.append(new Option(option.label, option.id)));
    fields.forEach((field) => dom.nodeLabelFieldSelect.append(new Option(field.label, field.id)));
    dom.nodeLabelFieldSelect.value = Array.from(dom.nodeLabelFieldSelect.options).some((option) => option.value === previous) ? previous : "label";
    state.style.nodeLabelField = dom.nodeLabelFieldSelect.value;
  }
  if (dom.edgeStyleLabelFieldSelect) {
    const previous = state.style.edgeStyleLabelField || dom.edgeStyleLabelFieldSelect.value || "none";
    const options = [{ id: "none", label: state.language === "en" ? "None" : "无" }, ...getEdgeVisualOptions()];
    dom.edgeStyleLabelFieldSelect.innerHTML = "";
    options.forEach((option) => dom.edgeStyleLabelFieldSelect.append(new Option(option.label, option.id)));
    dom.edgeStyleLabelFieldSelect.value = options.some((option) => option.id === previous) ? previous : "none";
    state.style.edgeStyleLabelField = dom.edgeStyleLabelFieldSelect.value;
  }
  updateInventoryScopedFieldUi();
}

function renderNodeVisualSelect(select, key, fields) {
  if (!select) return;
  const previous = state.visualEncoding[key] || select.value;
  select.innerHTML = "";
  select.append(new Option(state.language === "en" ? "No field" : "不使用字段", ""));
  fields.forEach((field) => select.append(new Option(field.label, field.id)));
  const nextValue = fields.some((field) => field.id === previous) ? previous : "";
  select.value = nextValue;
  state.visualEncoding[key] = nextValue;
}

function renderEdgeVisualSelect(select, key) {
  if (!select) return;
  const previous = state.visualEncoding[key] || select.value || "similarity";
  const options = getEdgeVisualOptions();
  select.innerHTML = "";
  options.forEach((option) => select.append(new Option(option.label, option.id)));
  const nextValue = options.some((option) => option.id === previous) ? previous : "similarity";
  select.value = nextValue;
  state.visualEncoding[key] = nextValue;
}

function renderClassificationLegend() {
  if (!dom.classificationLegend) return;
  const fields = [
    ["Color", "颜色", state.visualEncoding.mapColorByField, getNodeVisualField("color")],
    ["Shape", "形状", state.visualEncoding.mapShapeByField, getNodeVisualField("shape")],
    ["Size", "大小", state.visualEncoding.mapSizeByField, getNodeVisualField("size")],
    ["Opacity", "透明度", state.visualEncoding.mapOpacityByField, getNodeVisualField("opacity")]
  ].filter(([, , enabled, field]) => enabled && field);
  dom.classificationLegend.innerHTML = "";
  if (!fields.length) {
    dom.classificationLegend.innerHTML = `<p class="quiet-line">${state.language === "en" ? "Node attributes stay uniform until a mapping is enabled." : "启用映射前，节点视觉属性保持统一。"}</p>`;
    return;
  }
  fields.forEach(([enLabel, zhLabel, , field]) => {
    const group = document.createElement("details");
    group.className = "legend-group";
    group.open = true;
    const title = document.createElement("summary");
    title.textContent = `${state.language === "en" ? enLabel : zhLabel}: ${field.label}`;
    group.append(title);
    getClassificationValues(field).slice(0, 8).forEach((value, index) => {
      const row = document.createElement("div");
      row.className = "classification-row";
      const swatch = document.createElement("span");
      swatch.className = "classification-swatch";
      swatch.style.background = state.visualEncoding.nodeColorOverrides?.[field.id]?.[value] || colorForCategoryValue(value);
      swatch.textContent = shapeSymbolForIndex(index);
      row.append(swatch, document.createTextNode(value || (state.language === "en" ? "Empty" : "空值")));
      if (enLabel === "Color") {
        const color = document.createElement("input");
        color.type = "color";
        color.value = state.visualEncoding.nodeColorOverrides?.[field.id]?.[value] || hslToHex(colorForCategoryValue(value));
        color.addEventListener("input", () => {
          state.visualEncoding.nodeColorOverrides[field.id] ||= {};
          state.visualEncoding.nodeColorOverrides[field.id][value] = color.value;
          renderGraph();
          swatch.style.background = color.value;
        });
        row.append(color);
      }
      if (enLabel === "Shape") {
        const shape = document.createElement("select");
        ["circle", "square", "diamond"].forEach((item) => shape.append(new Option(item, item)));
        shape.value = state.visualEncoding.nodeShapeOverrides?.[field.id]?.[value] || shapeForCategoryValue(value, field);
        shape.addEventListener("change", () => {
          state.visualEncoding.nodeShapeOverrides[field.id] ||= {};
          state.visualEncoding.nodeShapeOverrides[field.id][value] = shape.value;
          renderGraph();
        });
        row.append(shape);
      }
      group.append(row);
    });
    dom.classificationLegend.append(group);
  });
}

function renderEdgeClassificationLegend() {
  if (!dom.edgeClassificationLegend) return;
  const active = [
    ["Color", "颜色", state.visualEncoding.mapEdgeColorByField, state.visualEncoding.edgeColorFieldId],
    ["Opacity", "透明度", state.visualEncoding.mapEdgeOpacityByField, state.visualEncoding.edgeOpacityFieldId],
    ["Label", "标签", state.visualEncoding.mapEdgeLabelByField, state.visualEncoding.edgeLabelFieldId]
  ].filter(([, , enabled]) => enabled);
  dom.edgeClassificationLegend.innerHTML = "";
  if (!active.length) {
    dom.edgeClassificationLegend.innerHTML = `<p class="quiet-line">${state.language === "en" ? "Edge attributes use the base styling until a mapping is enabled." : "启用映射前，边使用基础样式。"}</p>`;
    return;
  }
  active.forEach(([enLabel, zhLabel, , fieldId]) => {
    const row = document.createElement("div");
    row.className = "classification-row";
    const swatch = document.createElement("span");
    swatch.className = "classification-swatch";
    swatch.style.background = colorForCategoryValue(fieldId);
    swatch.textContent = "E";
    row.append(swatch, document.createTextNode(`${state.language === "en" ? enLabel : zhLabel}: ${getEdgeVisualOptionLabel(fieldId)}`));
    dom.edgeClassificationLegend.append(row);
  });
}

function getStorages() {
  const names = new Set();
  try {
    JSON.parse(localStorage.getItem("easy-network-storages") || "[]").forEach((name) => {
      if (cleanCell(name)) names.add(normalizeStorageName(name));
    });
  } catch {
    // Ignore malformed localStorage from older prototypes.
  }
  state.artifacts.forEach((artifact) => {
    const name = getArtifactStorageName(artifact);
    if (name) names.add(name);
  });
  if (!names.size) names.add(DEFAULT_STORAGE_NAME);
  return Array.from(names);
}

function getArtifactStorageName(artifact) {
  return normalizeStorageName(artifact.storageName || DEFAULT_STORAGE_NAME);
}

function normalizeStorageName(name) {
  const clean = cleanCell(name || DEFAULT_STORAGE_NAME);
  return LEGACY_DEFAULT_STORAGE_NAMES.has(clean) ? DEFAULT_STORAGE_NAME : clean;
}

function getScopedArtifacts() {
  const storageScoped = state.activeStorageName
    ? state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === state.activeStorageName)
    : state.artifacts;
  if (state.scopeMode === "storage") {
    if (!state.activeStorageName) return [];
    return storageScoped;
  }
  if (state.scopeMode === "filtered") {
    const field = state.fields.find((item) => item.id === state.filterFieldId);
    const values = new Set((state.filterValues || []).map(normalizeText).filter(Boolean));
    const fallbackValue = normalizeText(state.filterValue);
    if (!values.size && fallbackValue) values.add(fallbackValue);
    if (!field || !values.size) return storageScoped;
    return storageScoped.filter((artifact) => values.has(normalizeText(getFieldValue(artifact, field))));
  }
  return state.artifacts;
}

function getCurrentFilterSelection() {
  const fieldId = dom.artifactFilterField?.value || state.filterFieldId;
  const values = Array.from(dom.artifactFilterValue?.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
  return { fieldId, values };
}

function getArtifactsMatchingFilter(fieldId = state.filterFieldId, values = state.filterValues) {
  const field = state.fields.find((item) => item.id === fieldId);
  const normalizedValues = new Set((values || []).map(normalizeText).filter(Boolean));
  if (!field || !normalizedValues.size) return [];
  return getFilterSourceArtifacts().filter((artifact) => normalizedValues.has(normalizeText(getFieldValue(artifact, field))));
}

function applyArtifactFilter() {
  const { fieldId, values } = getCurrentFilterSelection();
  if (!fieldId || !values.length) {
    window.alert(state.language === "en" ? "Choose a filter field and at least one value." : "请选择筛选字段和至少一个值。");
    return;
  }
  state.filterFieldId = fieldId;
  state.filterValues = values;
  state.filterValue = values.join("\u001f");
  state.filterAction = dom.focusFilterOnlyToggle?.checked ? "focus" : "keep";
  if (state.filterAction === "focus") {
    focusArtifactsFromFilter();
  } else {
    state.scopeMode = "filtered";
    clearSelection();
    renderScopeControls();
    renderFieldOptions();
    rebuildArtifactNetworkIfReady();
  }
  saveNetworkSettings();
}

function focusArtifactsFromFilter() {
  if (state.scopeMode === "filtered") state.scopeMode = state.activeStorageName ? "storage" : "all";
  const matchingIds = new Set(getArtifactsMatchingFilter().map((artifact) => artifact.id));
  state.selectedNodeIds = new Set(
    state.graph.nodes
      .filter((node) => matchingIds.has(node.artifactId || node.uniqueID || node.id))
      .map((node) => node.id)
  );
  state.selectedNodeId = Array.from(state.selectedNodeIds)[0] || null;
  state.selectedEdgeId = null;
  state.selectedEdgeIds.clear();
  renderScopeControls();
  renderGraph();
  renderInspector();
  renderTables();
}

function clearArtifactFilter() {
  state.filterValues = [];
  state.filterValue = "";
  state.selectedNodeIds.clear();
  state.selectedEdgeIds.clear();
  state.selectedNodeId = null;
  state.selectedEdgeId = null;
  if (dom.artifactFilterValue) Array.from(dom.artifactFilterValue.options).forEach((option) => { option.selected = false; });
  if (state.scopeMode === "filtered") state.scopeMode = state.activeStorageName ? "storage" : "all";
  renderScopeControls();
  renderFieldOptions();
  saveNetworkSettings();
  rebuildArtifactNetworkIfReady();
}

function getFilterSourceArtifacts() {
  return state.activeStorageName
    ? state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === state.activeStorageName)
    : state.artifacts;
}

function toggleFilterPanelFromTool() {
  if (state.sidebarCollapsed) toggleSidebar();
  dom.artifactFilterPanel?.classList.remove("hidden");
  renderScopeControls();
  renderArtifactFilterValues();
  dom.artifactFilterField?.focus();
}

function renderScopeControls() {
  dom.storageScopeSelect.innerHTML = "";
  if (!state.activeStorageName) {
    const placeholder = new Option(nt("selectStorage"), "");
    placeholder.disabled = true;
    placeholder.hidden = true;
    dom.storageScopeSelect.append(placeholder);
  }
  state.storages.forEach((name) => dom.storageScopeSelect.append(new Option(name, name)));
  if (!state.storages.includes(state.activeStorageName)) state.activeStorageName = "";
  dom.storageScopeSelect.value = state.activeStorageName;
  dom.scopeAllStoragesBtn?.classList.toggle("active", state.scopeMode === "all");
  dom.scopeCurrentStorageBtn.classList.toggle("active", state.scopeMode === "storage");
  const filterPanelOpen = !dom.artifactFilterPanel?.classList.contains("hidden");
  dom.scopeFilteredBtn.classList.toggle("active", filterPanelOpen || state.scopeMode === "filtered");
  dom.filterToolBtn?.classList.toggle("active", filterPanelOpen);
  if (dom.focusFilterOnlyToggle) dom.focusFilterOnlyToggle.checked = state.filterAction === "focus";
  if (dom.artifactFilterField.value) state.filterFieldId = dom.artifactFilterField.value;
  const label = state.scopeMode === "all" ? nt("allStorages") : state.scopeMode === "storage" ? (state.activeStorageName || nt("selectStorage")) : nt("filteredItems");
  const separator = state.language === "en" ? ": " : "：";
  dom.scopeStatus.textContent = `${nt("scopePrefix")}${separator}${label} · ${getScopedArtifacts().length} ${nt("items")}`;
  renderFilterPresetOptions();
  updateNetworkSummary();
  updateInventoryScopedFieldUi();
}

function renderArtifactFilterValues() {
  const field = state.fields.find((item) => item.id === dom.artifactFilterField.value);
  state.filterFieldId = dom.artifactFilterField.value;
  if (!dom.artifactFilterValue) return;
  dom.artifactFilterValue.innerHTML = "";
  if (!field) return;
  const selectedValues = new Set(state.filterValues || []);
  const values = new Set();
  getFilterSourceArtifacts().forEach((artifact) => {
    const value = cleanCell(getFieldValue(artifact, field));
    if (value) values.add(value);
  });
  Array.from(values).sort((a, b) => a.localeCompare(b)).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    option.selected = selectedValues.has(value);
    dom.artifactFilterValue.append(option);
  });
}

function renderFilterPresetOptions() {
  if (!dom.filterPresetSelect) return;
  const current = dom.filterPresetSelect.value;
  dom.filterPresetSelect.innerHTML = "";
  dom.filterPresetSelect.append(new Option(state.language === "en" ? "Select Preset" : "选择预设", ""));
  state.filterPresets.forEach((preset) => {
    dom.filterPresetSelect.append(new Option(preset.name || "Preset", preset.id));
  });
  if (current && state.filterPresets.some((preset) => preset.id === current)) dom.filterPresetSelect.value = current;
}

function saveCurrentFilterPreset() {
  const fieldId = dom.artifactFilterField?.value || state.filterFieldId;
  const values = Array.from(dom.artifactFilterValue?.selectedOptions || []).map((option) => option.value).filter(Boolean);
  if (!fieldId || !values.length) {
    window.alert(state.language === "en" ? "Choose a filter field and at least one value before saving a preset." : "保存预设前请先选择筛选字段和至少一个值。");
    return;
  }
  const field = state.fields.find((item) => item.id === fieldId);
  const defaultName = `${field?.label || "Filter"}: ${values.join(", ")}`;
  const name = cleanCell(window.prompt(state.language === "en" ? "Preset name" : "预设名称", defaultName));
  if (!name) return;
  const preset = {
    id: `preset-${Date.now()}`,
    name,
    storageName: state.activeStorageName,
    fieldId,
    values,
    filterAction: dom.focusFilterOnlyToggle?.checked ? "focus" : "keep"
  };
  state.filterPresets = [...state.filterPresets.filter((item) => item.name !== name), preset];
  renderFilterPresetOptions();
  dom.filterPresetSelect.value = preset.id;
  saveNetworkSettings();
}

function loadSelectedFilterPreset() {
  const preset = state.filterPresets.find((item) => item.id === dom.filterPresetSelect?.value);
  if (!preset) return;
  if (preset.storageName && state.storages.includes(preset.storageName)) {
    state.activeStorageName = preset.storageName;
    dom.storageScopeSelect.value = preset.storageName;
  }
  state.filterFieldId = preset.fieldId;
  state.filterValues = [...(preset.values || [])];
  state.filterValue = state.filterValues.join("\u001f");
  state.filterAction = preset.filterAction === "focus" ? "focus" : "keep";
  if (dom.focusFilterOnlyToggle) dom.focusFilterOnlyToggle.checked = state.filterAction === "focus";
  if (dom.artifactFilterField) dom.artifactFilterField.value = state.filterFieldId;
  renderArtifactFilterValues();
  if (state.filterAction === "keep") state.scopeMode = "filtered";
  renderScopeControls();
  renderFieldOptions();
  saveNetworkSettings();
  if (state.filterAction === "focus") focusArtifactsFromFilter();
  else rebuildArtifactNetworkIfReady();
}

function renderAnalysisMode() {
  const isSite = dom.analysisTypeSelect.value === "site";
  dom.artifactAnalysisPanel.classList.toggle("hidden", isSite);
  dom.siteAnalysisPanel.classList.toggle("hidden", !isSite);
  updateInventoryScopedFieldUi();
}

function getSelectedFieldWeights() {
  const selected = getSelectedFieldCheckboxes();
  if (!selected.length) return {};
  const raw = {};
  let total = 0;
  selected.forEach((checkbox) => {
    const weightInput = Array.from(document.querySelectorAll(".field-weight-input"))
      .find((input) => input.dataset.fieldId === checkbox.value);
    const weight = Math.max(0, Number(weightInput?.value || 0));
    raw[checkbox.value] = weight;
    total += weight;
  });
  if (!total) {
    const even = 1 / selected.length;
    selected.forEach((checkbox) => {
      raw[checkbox.value] = even;
    });
    return raw;
  }
  Object.keys(raw).forEach((fieldId) => {
    raw[fieldId] /= total;
  });
  return raw;
}

function getSelectedFieldCheckboxes() {
  return Array.from(document.querySelectorAll("#artifactFieldList input[type='checkbox']:checked, #systemFieldList input[type='checkbox']:checked"));
}

function addManualNode() {
  const id = cleanCell(dom.newNodeId.value);
  if (!id) return;
  if (state.graph.nodes.some((node) => node.id === id)) {
    window.alert(state.language === "en" ? "This uniqueID already exists." : "这个 uniqueID 已经存在。");
    return;
  }
  state.graph.nodes.push({
    id,
    uniqueID: id,
    label: cleanCell(dom.newNodeLabel.value) || id,
    type: "manual",
    group: "manual",
    notes: "",
    attrs: {}
  });
  dom.newNodeId.value = "";
  dom.newNodeLabel.value = "";
  selectNode(id);
  renderAll();
}

function addManualEdge() {
  const source = cleanCell(dom.newEdgeSource.value);
  const target = cleanCell(dom.newEdgeTarget.value);
  if (!source || !target) return;
  if (source === target && !state.allowSelfLoop) return;
  addNodeById(source);
  addNodeById(target);
  const edge = {
    id: createEdgeId(source, target, state.graph.edges.length),
    source,
    target,
    weight: 1,
    label: state.edgeMode === "directed" ? "directed" : "",
    directed: state.edgeMode === "directed",
    notes: "",
    attrs: {}
  };
  state.graph.edges.push(edge);
  dom.newEdgeSource.value = "";
  dom.newEdgeTarget.value = "";
  selectEdge(edge.id);
  applySelectedLayout(true);
  renderAll();
}

function addNodeById(id) {
  if (state.graph.nodes.some((node) => node.id === id)) return;
  state.graph.nodes.push({ id, uniqueID: id, label: id, type: "manual", group: "", notes: "", attrs: {} });
}

function updateSelectedNode() {
  const node = getSelectedNode();
  if (!node) return;
  node.label = dom.inspectNodeLabel.value;
  node.group = dom.inspectNodeGroup.value;
  node.notes = dom.inspectNodeNotes.value;
  renderAll();
}

function updateSelectedEdge() {
  const edge = getSelectedEdge();
  if (!edge) return;
  edge.label = dom.inspectEdgeLabel.value;
  edge.weight = parseWeight(dom.inspectEdgeWeight.value, 1);
  edge.notes = dom.inspectEdgeNotes.value;
  renderAll();
}

function deleteSelectedNode() {
  const node = getSelectedNode();
  if (!node) return;
  state.graph.nodes = state.graph.nodes.filter((item) => item.id !== node.id);
  state.graph.edges = state.graph.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
  clearSelection();
  renderAll();
}

function deleteSelectedEdge() {
  const edge = getSelectedEdge();
  if (!edge) return;
  state.graph.edges = state.graph.edges.filter((item) => item.id !== edge.id);
  clearSelection();
  renderAll();
}

function openSelectedArtifact() {
  const node = getSelectedNode();
  openArtifactFromNode(node);
}

function openArtifactFromNode(node) {
  if (!node?.artifactId) return;
  if (IS_EMBEDDED) {
    window.parent.postMessage({ type: "easy-network-open-artifact", artifactId: node.artifactId }, "*");
    return;
  }
  window.location.href = `${window.location.origin}/index.html#/items/${encodeURIComponent(node.artifactId)}`;
}

function renderAll() {
  normalizeGraph();
  updateTimeFilterDomain();
  renderThresholdControls();
  renderTimeFilterControls();
  renderGraph();
  renderMetrics();
  renderInspector();
  renderTables();
  renderClassificationLegend();
  renderEdgeClassificationLegend();
  saveNetworkSettings();
}

function setGraphTool(tool) {
  state.graphTool = tool;
  dom.selectToolBtn?.classList.toggle("active", tool === "select");
  dom.boxSelectToolBtn?.classList.toggle("active", tool === "box");
  dom.panToolBtn?.classList.toggle("active", tool === "pan");
  dom.rotateGraphBtn?.classList.toggle("active", tool === "rotate");
}

function renderThresholdControls() {
  renderCentralityThresholds();
  renderHierarchyRules();
  renderEdgeThresholdStyles();
}

function renderCentralityThresholds() {
  if (!dom.centralityThresholdList) return;
  dom.centralityThresholdList.innerHTML = "";
  if (!state.centralityThresholds.length) {
    dom.centralityThresholdList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No attraction rules. Add one when Spring Layout needs custom force bands." : "暂无吸引强度规则。需要自定义 Spring 布局力时再添加。"}</p>`;
    return;
  }
  state.centralityThresholds
    .sort((a, b) => b.similarity - a.similarity)
    .forEach((rule, index) => {
      const row = document.createElement("div");
      row.className = "threshold-row";
      row.innerHTML = `
        <label>${escapeHtml(nt("thresholdSimilarity"))}<input class="input" type="number" min="0" max="1" step="0.01" value="${rule.similarity}"></label>
        <label>${escapeHtml(state.language === "en" ? "Attraction" : "吸引强度")}<input class="input" type="number" min="0.05" step="0.05" value="${rule.strength ?? rule.distance ?? 1}"></label>
        <button class="icon-button" type="button" aria-label="${state.language === "en" ? "Remove rule" : "删除规则"}">×</button>
      `;
      const [similarityInput, strengthInput] = row.querySelectorAll("input");
      similarityInput.addEventListener("change", () => {
        rule.similarity = clamp(Number(similarityInput.value), 0, 1);
        applySelectedLayout(false);
      });
      strengthInput.addEventListener("change", () => {
        rule.strength = Math.max(0.05, Number(strengthInput.value) || 1);
        applySelectedLayout(false);
      });
      row.querySelector("button").addEventListener("click", () => {
        state.centralityThresholds.splice(index, 1);
        renderAll();
      });
      dom.centralityThresholdList.append(row);
    });
}

function addCentralityThreshold() {
  state.centralityThresholds.push({ similarity: 0.25, strength: 0.4 });
  renderAll();
}

function syncHierarchyRulesPanel() {
  const isHierarchical = (dom.layoutModeSelect?.value || state.layoutMode) === "hierarchical";
  dom.hierarchyRulesPanel?.classList.toggle("hidden", !isHierarchical);
  if (dom.hierarchyRulesPanel && isHierarchical) dom.hierarchyRulesPanel.open = true;
}

function renderHierarchyRules() {
  syncHierarchyRulesPanel();
  if (!dom.hierarchyRuleList) return;
  dom.hierarchyRuleList.innerHTML = "";
  if (!state.hierarchyRules.length) {
    dom.hierarchyRuleList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No distance rules. Add similarity intervals to place stronger links closer together." : "暂无距离规则。添加相似度区间后，关联更强的边会使用更短距离。"}</p>`;
    return;
  }
  state.hierarchyRules
    .slice()
    .sort((a, b) => Number(normalizeHierarchyRule(b).max) - Number(normalizeHierarchyRule(a).max))
    .forEach((rule) => {
      const normalized = normalizeHierarchyRule(rule);
      const row = document.createElement("div");
      row.className = "threshold-row hierarchy-rule-row";
      row.innerHTML = `
        <label>${escapeHtml(state.language === "en" ? "Left" : "左边界")}<select class="input hierarchy-bracket-input"><option value="["${normalized.leftInclusive ? " selected" : ""}>[</option><option value="("${!normalized.leftInclusive ? " selected" : ""}>(</option></select></label>
        <label>${escapeHtml(state.language === "en" ? "Min" : "最小")}<input class="input" type="number" min="0" max="1" step="0.01" value="${normalized.min}"></label>
        <label>${escapeHtml(state.language === "en" ? "Max" : "最大")}<input class="input" type="number" min="0" max="1" step="0.01" value="${normalized.max}"></label>
        <label>${escapeHtml(state.language === "en" ? "Right" : "右边界")}<select class="input hierarchy-bracket-input"><option value="]"${normalized.rightInclusive ? " selected" : ""}>]</option><option value=")"${!normalized.rightInclusive ? " selected" : ""}>)</option></select></label>
        <label>${escapeHtml(state.language === "en" ? "Distance" : "距离")}<input class="input" type="number" min="0.01" max="1" step="0.01" value="${normalized.distance}"></label>
        <button class="icon-button" type="button" aria-label="${state.language === "en" ? "Remove rule" : "删除规则"}">×</button>
      `;
      const [leftSelect, rightSelect] = row.querySelectorAll("select");
      const [minInput, maxInput, distanceInput] = row.querySelectorAll("input");
      const commitRule = () => {
        const minValue = clamp(Number(minInput.value) || 0, 0, 1);
        const maxValue = clamp(Number(maxInput.value) || 0, 0, 1);
        rule.min = Math.min(minValue, maxValue);
        rule.max = Math.max(minValue, maxValue);
        rule.leftInclusive = leftSelect.value === "[";
        rule.rightInclusive = rightSelect.value === "]";
        rule.distance = clamp(Number(distanceInput.value) || 0.3, 0.01, 1);
        minInput.value = String(rule.min);
        maxInput.value = String(rule.max);
        distanceInput.value = String(rule.distance);
        applySelectedLayout(false);
        saveNetworkSettings();
      };
      leftSelect.addEventListener("change", commitRule);
      rightSelect.addEventListener("change", commitRule);
      minInput.addEventListener("change", commitRule);
      maxInput.addEventListener("change", commitRule);
      distanceInput.addEventListener("change", commitRule);
      row.querySelector("button").addEventListener("click", () => {
        state.hierarchyRules = state.hierarchyRules.filter((item) => item !== rule);
        renderAll();
        saveNetworkSettings();
      });
      dom.hierarchyRuleList.append(row);
    });
}

function addHierarchyRule() {
  const defaults = [
    { min: 0.8, max: 1, leftInclusive: true, rightInclusive: true, distance: 0.15 },
    { min: 0.6, max: 0.8, leftInclusive: true, rightInclusive: false, distance: 0.3 },
    { min: 0, max: 0.6, leftInclusive: true, rightInclusive: false, distance: 0.45 }
  ];
  const next = defaults[state.hierarchyRules.length] || { min: 0, max: 1, leftInclusive: true, rightInclusive: true, distance: 0.45 };
  state.hierarchyRules.push({ ...next });
  if (dom.layoutModeSelect) dom.layoutModeSelect.value = "hierarchical";
  if (dom.layoutSelect) dom.layoutSelect.value = "hierarchical";
  applySelectedLayout(true);
  saveNetworkSettings();
}

function renderEdgeThresholdStyles() {
  if (!dom.edgeThresholdStyleList) return;
  dom.edgeThresholdStyleList.innerHTML = "";
  const rawScale = state.style.edgeThresholdField === "weightRaw";
  const maxAttr = rawScale ? "" : ` max="1"`;
  if (!state.edgeThresholdStyles.length) {
    dom.edgeThresholdStyleList.innerHTML = `<p class="quiet-line">${state.language === "en" ? "No threshold styles. Add similarity or weight intervals to classify edge color and opacity." : "暂无边阈值样式。添加相似度或权重区间来控制边颜色和透明度。"}</p>`;
    return;
  }
  state.edgeThresholdStyles
    .slice()
    .sort((a, b) => normalizeEdgeThresholdStyle(b).max - normalizeEdgeThresholdStyle(a).max)
    .forEach((rule) => {
      const normalized = normalizeEdgeThresholdStyle(rule);
      const row = document.createElement("div");
      row.className = "threshold-style-row";
      row.innerHTML = `
        <label>${escapeHtml(state.language === "en" ? "Left" : "左边界")}<select class="input hierarchy-bracket-input"><option value="["${normalized.leftInclusive ? " selected" : ""}>[</option><option value="("${!normalized.leftInclusive ? " selected" : ""}>(</option></select></label>
        <label>${escapeHtml(state.language === "en" ? "Min" : "最小")}<input class="input" type="number" min="0"${maxAttr} step="0.01" value="${normalized.min}"></label>
        <label>${escapeHtml(state.language === "en" ? "Max" : "最大")}<input class="input" type="number" min="0"${maxAttr} step="0.01" value="${normalized.max}"></label>
        <label>${escapeHtml(state.language === "en" ? "Right" : "右边界")}<select class="input hierarchy-bracket-input"><option value="]"${normalized.rightInclusive ? " selected" : ""}>]</option><option value=")"${!normalized.rightInclusive ? " selected" : ""}>)</option></select></label>
        <label>${escapeHtml(nt("color"))}<input type="color" value="${normalized.color}"></label>
        <label>${escapeHtml(nt("opacity"))}<input class="input" type="number" min="0" max="1" step="0.05" value="${normalized.opacity}"></label>
        <label>${escapeHtml(nt("width"))}<input class="input" type="number" min="0.2" step="0.1" value="${normalized.width}"></label>
        <button class="icon-button threshold-delete-button" type="button" title="${state.language === "en" ? "Delete threshold style" : "删除阈值样式"}" aria-label="${state.language === "en" ? "Delete threshold style" : "删除阈值样式"}">x</button>
      `;
      const [leftSelect, rightSelect] = row.querySelectorAll("select");
      const inputs = row.querySelectorAll("input");
      const readOptionalNumber = (input) => {
        const text = String(input.value || "").trim();
        if (!text) return null;
        const number = Number(text);
        return Number.isFinite(number) ? number : null;
      };
      const commitRule = (formatInputs = false) => {
        const minRaw = readOptionalNumber(inputs[0]);
        const maxRaw = readOptionalNumber(inputs[1]);
        const opacityRaw = readOptionalNumber(inputs[3]);
        const widthRaw = readOptionalNumber(inputs[4]);
        const minValue = minRaw !== null ? normalizeThresholdBoundary(minRaw) : rule.min;
        const maxValue = maxRaw !== null ? normalizeThresholdBoundary(maxRaw) : rule.max;
        rule.min = Math.min(minValue, maxValue);
        rule.max = Math.max(minValue, maxValue);
        rule.leftInclusive = leftSelect.value === "[";
        rule.rightInclusive = rightSelect.value === "]";
        rule.color = inputs[2].value;
        rule.opacity = clamp(opacityRaw !== null ? opacityRaw : rule.opacity ?? 0.6, 0, 1);
        rule.width = Math.max(0.2, widthRaw !== null ? widthRaw : rule.width ?? 1);
        if (formatInputs) {
          inputs[0].value = String(rule.min);
          inputs[1].value = String(rule.max);
          inputs[3].value = String(rule.opacity);
          inputs[4].value = String(rule.width);
        }
        renderGraph();
        saveNetworkSettings();
      };
      leftSelect.addEventListener("change", () => commitRule(true));
      rightSelect.addEventListener("change", () => commitRule(true));
      inputs.forEach((input) => {
        input.addEventListener("input", () => commitRule(false));
        input.addEventListener("change", () => commitRule(true));
      });
      row.querySelector("button").addEventListener("click", () => {
        state.edgeThresholdStyles = state.edgeThresholdStyles.filter((item) => item !== rule);
        renderAll();
        saveNetworkSettings();
      });
      dom.edgeThresholdStyleList.append(row);
    });
}

function addEdgeThresholdStyle() {
  const defaults = [
    { min: 0.8, max: 1, leftInclusive: true, rightInclusive: true, color: "#5db7ad", width: 1.4, opacity: 0.9 },
    { min: 0.5, max: 0.8, leftInclusive: true, rightInclusive: false, color: "#d6a13c", width: 1, opacity: 0.62 },
    { min: 0, max: 0.5, leftInclusive: true, rightInclusive: false, color: state.style.edgeColor, width: 0.8, opacity: 0.32 }
  ];
  state.edgeThresholdStyles.push({ ...(defaults[state.edgeThresholdStyles.length] || defaults[2]) });
  renderAll();
  saveNetworkSettings();
}

window.addEdgeThresholdStyle = addEdgeThresholdStyle;

function applyEdgeThresholdStyles() {
  state.style.edgeStyleMode = "threshold";
  if (dom.edgeStyleModeSelect) dom.edgeStyleModeSelect.value = "threshold";
  state.edgeThresholdStyles = state.edgeThresholdStyles.map(normalizeEdgeThresholdStyle);
  renderEdgeThresholdStyles();
  renderGraph();
  saveNetworkSettings();
}

function getEdgeThresholdStyle(edge) {
  const value = getEdgeThresholdValue(edge);
  if (state.style.edgeStyleMode === "global") return null;
  const rules = state.edgeThresholdStyles
    .map(normalizeEdgeThresholdStyle)
    .sort((a, b) => b.max - a.max || b.min - a.min);
  if (!rules.length) return null;
  const exact = rules.find((rule) => hierarchyRuleContains(rule, value));
  if (exact) return exact;
  return rules.find((rule) => value >= rule.min) || rules[rules.length - 1];
}

function normalizeEdgeThresholdStyle(rule) {
  const min = normalizeThresholdBoundary(rule.min);
  const rawMax = Object.prototype.hasOwnProperty.call(rule, "max") ? Number(rule.max) : 1;
  const max = normalizeThresholdBoundary(Number.isFinite(rawMax) ? rawMax : 1);
  const rawWidth = Number(rule.width);
  const rawOpacity = Number(rule.opacity);
  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
    leftInclusive: rule.leftInclusive !== false,
    rightInclusive: rule.rightInclusive !== false,
    color: rule.color || state.style.edgeColor,
    width: Math.max(0.2, Number.isFinite(rawWidth) ? rawWidth : 1),
    opacity: clamp(Number.isFinite(rawOpacity) ? rawOpacity : 0.6, 0, 1)
  };
}

function normalizeThresholdBoundary(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  if (state.style.edgeThresholdField === "weightRaw") return Math.max(0, number);
  return clamp(number, 0, 1);
}

function getEdgeThresholdValue(edge) {
  const field = state.style.edgeThresholdField || "similarity";
  if (field === "weightRaw") return Math.max(0, Number(edge.weight || 0));
  if (field === "weightNormalized") return normalizedEdgeNumber(edge, "weight");
  if (field === "matchedCount") return normalizedEdgeNumber(edge, "matchedCount");
  const rawSimilarity = Number(edge.similarity ?? edge.weight ?? 0);
  if (Number.isFinite(rawSimilarity) && rawSimilarity >= 0 && rawSimilarity <= 1) return rawSimilarity;
  return normalizedEdgeNumber(edge, "similarity");
}

function normalizedEdgeNumber(edge, field) {
  const value = edgeNumericValue(edge, field);
  const values = state.graph.edges
    .map((item) => edgeNumericValue(item, field))
    .filter(Number.isFinite);
  if (!Number.isFinite(value) || !values.length) return 0;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return value > 0 ? 1 : 0;
  return clamp((value - min) / (max - min), 0, 1);
}

function edgeNumericValue(edge, field) {
  if (field === "weight") return Number(edge.weight || 0);
  if (field === "matchedCount") {
    const matched = edge.attrs?.matchedFields || edge.attrs?.reasons || [];
    if (Array.isArray(matched)) return matched.length;
    return cleanCell(matched).split(",").filter(Boolean).length;
  }
  return Number(edge.similarity ?? edge.weight ?? 0);
}

function getEdgeLabel(edge) {
  if (state.style.edgeStyleLabelField && state.style.edgeStyleLabelField !== "none") return formatEdgeVisualValue(getEdgeVisualValue(edge, state.style.edgeStyleLabelField));
  if (state.visualEncoding.mapEdgeLabelByField) return formatEdgeVisualValue(getEdgeVisualValue(edge, state.visualEncoding.edgeLabelFieldId));
  return "";
}

function applyEdgeSvgStyle(element, edgeVisual) {
  const stroke = edgeVisual.stroke || state.style.edgeColor;
  const width = Number.isFinite(Number(edgeVisual.width)) ? Number(edgeVisual.width) : 1;
  const opacity = clamp(Number(edgeVisual.opacity), 0, 1);
  element.setAttribute("stroke", stroke);
  element.setAttribute("stroke-width", width);
  element.setAttribute("stroke-opacity", opacity);
  element.style.setProperty("--edge-stroke", stroke);
  element.style.setProperty("--edge-width", String(width));
  element.style.setProperty("--edge-opacity", String(opacity));
  element.style.setProperty("stroke", stroke, "important");
  element.style.setProperty("stroke-width", String(width), "important");
  element.style.setProperty("stroke-opacity", String(opacity), "important");
}

function getNodeLabel(node) {
  const fieldId = state.style.nodeLabelField || "label";
  if (fieldId === "id") return node.id;
  if (fieldId === "label") return node.label || node.id;
  const field = state.fields.find((item) => item.id === fieldId);
  return cleanCell(getNodeFieldValue(node, field)) || node.label || node.id;
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function renderGraph() {
  const svg = dom.graphSvg;
  const rect = dom.graphStage.getBoundingClientRect();
  const width = Math.max(rect.width, 200);
  const height = Math.max(rect.height, 200);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";
  dom.graphEmpty?.classList.toggle("hidden", state.graph.nodes.length > 0);
  dom.graphSummary.textContent = `${state.graph.nodes.length} ${nt("nodes")} · ${state.graph.edges.length} ${nt("edges")}`;
  renderSavedGraphLink();

  const rotation = Number(state.view.rotation) || 0;
  const root = createSvg("g", { class: "graph-root", transform: `translate(${state.view.x} ${state.view.y}) scale(${state.view.scale}) rotate(${rotation} ${width / 2} ${height / 2})` });
  const edgeLayer = createSvg("g", { class: "graph-edge-layer" });
  const nodeLayer = createSvg("g", { class: "graph-node-layer" });
  const labelLayer = createSvg("g", { class: "graph-label-layer" });
  const visualContext = VisualEncodingEngine.context();
  root.append(edgeLayer, nodeLayer, labelLayer);
  svg.append(root);

  const hasNodeSelection = state.selectedNodeIds.size > 0;
  const hasEdgeSelection = state.selectedEdgeIds.size > 0;
  const denseEdgeMode = state.graph.edges.length > 2500
    && !hasNodeSelection
    && !hasEdgeSelection
    && !state.style.showEdgeLabels
    && !state.style.vectorEdges;
  if (state.style.showEdges && denseEdgeMode) {
    renderDenseEdges(edgeLayer, visualContext);
  } else if (state.style.showEdges) state.graph.edges.forEach((edge) => {
    const source = findNode(edge.source);
    const target = findNode(edge.target);
    if (!source || !target) return;
    const edgeVisual = VisualEncodingEngine.edgeStyle(edge);
    const isTemporalMuted = isNodeOutsideTimeRange(source) || isNodeOutsideTimeRange(target);
    const line = createSvg("line", {
      class: `graph-link ${state.selectedEdgeIds.has(edge.id) ? "selected" : ""} ${isTemporalMuted ? "temporal-muted" : ""} ${(hasNodeSelection && (!state.selectedNodeIds.has(edge.source) || !state.selectedNodeIds.has(edge.target))) || (hasEdgeSelection && !state.selectedEdgeIds.has(edge.id)) ? "unfocused" : ""}`,
      x1: source.x,
      y1: source.y,
      x2: target.x,
      y2: target.y,
      "stroke-width": edgeVisual.width,
      stroke: edgeVisual.stroke,
      "stroke-opacity": edgeVisual.opacity,
      style: `--edge-stroke: ${edgeVisual.stroke}; --edge-width: ${edgeVisual.width}; --edge-opacity: ${edgeVisual.opacity}; stroke: ${edgeVisual.stroke} !important; stroke-width: ${edgeVisual.width} !important; stroke-opacity: ${edgeVisual.opacity} !important;`
    });
    applyEdgeSvgStyle(line, edgeVisual);
    line.addEventListener("click", (event) => {
      event.stopPropagation();
      selectEdge(edge.id, event);
    });
    edgeLayer.append(line);
    const edgeLabel = getEdgeLabel(edge);
    if (edgeLabel && state.style.showEdgeLabels) {
      const labelX = (source.x + target.x) / 2 + 4;
      const labelY = (source.y + target.y) / 2 - 4;
      const text = createSvg("text", {
        class: `graph-label graph-edge-label ${isTemporalMuted ? "temporal-muted" : ""}`,
        x: labelX,
        y: labelY,
        fill: state.style.edgeLabelColor || state.style.labelColor,
        "font-size": Math.max(8, (state.style.edgeLabelSize || state.style.labelSize || 11) - 1),
        transform: rotation ? `rotate(${-rotation} ${labelX} ${labelY})` : "",
        style: `font-size: ${Math.max(8, (state.style.edgeLabelSize || state.style.labelSize || 11) - 1)}px`
      });
      text.textContent = edgeLabel;
      text.addEventListener("click", (event) => {
        event.stopPropagation();
        selectEdge(edge.id);
      });
      labelLayer.append(text);
    }
  });

  state.graph.nodes.forEach((node) => {
    const isSelected = state.selectedNodeIds.has(node.id);
    const isTemporalMuted = isNodeOutsideTimeRange(node);
    const group = createSvg("g", {
      class: `graph-node ${isSelected ? "selected" : ""} ${isTemporalMuted ? "temporal-muted" : ""} ${hasNodeSelection && !isSelected ? "unfocused" : ""}`,
      transform: `translate(${node.x} ${node.y})`
    });
    const radius = VisualEncodingEngine.nodeRadius(node, visualContext);
    if (state.style.showNodes) {
      group.append(createNodeShape(
        radius,
        VisualEncodingEngine.nodeFill(node, visualContext),
        VisualEncodingEngine.nodeShape(node),
        VisualEncodingEngine.nodeOpacity(node),
        state.style.nodeStrokeColor,
        state.style.nodeStrokeWidth,
        state.style.nodeStrokeOpacity
      ));
    }
    if (state.style.showNodeLabels) {
      const labelX = (node.x || 0) + radius + 5;
      const labelY = (node.y || 0) + 4;
      const label = createSvg("text", {
        class: `graph-label graph-node-label ${isTemporalMuted ? "temporal-muted" : ""} ${hasNodeSelection && !isSelected ? "unfocused" : ""}`,
        x: labelX,
        y: labelY,
        fill: state.style.nodeLabelColor || state.style.labelColor,
        "font-size": state.style.nodeLabelSize || state.style.labelSize,
        transform: rotation ? `rotate(${-rotation} ${labelX} ${labelY})` : "",
        style: `font-size: ${state.style.nodeLabelSize || state.style.labelSize || 11}px; fill: ${state.style.nodeLabelColor || state.style.labelColor || "#243438"}`
      });
      label.textContent = getNodeLabel(node);
      labelLayer.append(label);
    }
    group.addEventListener("click", (event) => {
      event.stopPropagation();
      selectNode(node.id, event);
    });
    group.addEventListener("pointerenter", (event) => showNodeHover(node, event));
    group.addEventListener("pointermove", (event) => positionNodeHover(event));
    group.addEventListener("pointerleave", hideNodeHover);
    group.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      openArtifactFromNode(node);
    });
    nodeLayer.append(group);
  });
}

function renderDenseEdges(edgeLayer) {
  const buckets = new Map();
  state.graph.edges.forEach((edge) => {
    const source = findNode(edge.source);
    const target = findNode(edge.target);
    if (!source || !target) return;
    const edgeVisual = VisualEncodingEngine.edgeStyle(edge);
    const isTemporalMuted = isNodeOutsideTimeRange(source) || isNodeOutsideTimeRange(target);
    const key = [
      edgeVisual.stroke,
      round(edgeVisual.opacity, 3),
      round(edgeVisual.width, 2),
      isTemporalMuted ? "temporal-muted" : ""
    ].join("|");
    if (!buckets.has(key)) {
      buckets.set(key, {
        d: [],
        stroke: edgeVisual.stroke,
        opacity: edgeVisual.opacity,
        width: edgeVisual.width,
        className: `graph-link graph-link-batch ${isTemporalMuted ? "temporal-muted" : ""}`.trim()
      });
    }
    buckets.get(key).d.push(`M${round(source.x, 1)},${round(source.y, 1)}L${round(target.x, 1)},${round(target.y, 1)}`);
  });
  buckets.forEach((bucket) => {
    const path = createSvg("path", {
      class: bucket.className,
      d: bucket.d.join(""),
      stroke: bucket.stroke,
      "stroke-width": bucket.width,
      "stroke-opacity": bucket.opacity,
      fill: "none",
      style: `--edge-stroke: ${bucket.stroke}; --edge-width: ${bucket.width}; --edge-opacity: ${bucket.opacity}; stroke: ${bucket.stroke} !important; stroke-width: ${bucket.width} !important; stroke-opacity: ${bucket.opacity} !important;`
    });
    applyEdgeSvgStyle(path, bucket);
    edgeLayer.append(path);
  });
}

function createNodeShape(radius, fill, shape = state.style.nodeShape, opacity = 1, stroke = state.style.nodeStrokeColor, strokeWidth = state.style.nodeStrokeWidth, strokeOpacity = state.style.nodeStrokeOpacity) {
  const strokeAttrs = {
    stroke: stroke || "none",
    "stroke-width": Math.max(0, Number(strokeWidth || 0)),
    "stroke-opacity": clamp(Number(strokeOpacity || 0), 0, 1)
  };
  if (shape === "square") {
    return createSvg("rect", { x: -radius, y: -radius, width: radius * 2, height: radius * 2, fill, opacity, ...strokeAttrs });
  }
  if (shape === "diamond") {
    return createSvg("polygon", { points: `0,${-radius} ${radius},0 0,${radius} ${-radius},0`, fill, opacity, ...strokeAttrs });
  }
  return createSvg("circle", { r: radius, fill, opacity, ...strokeAttrs });
}

function showNodeHover(node, event) {
  clearTimeout(state.hoverHideTimer);
  if (node.type === "site") {
    showSiteNodeHover(node, event);
    return;
  }
  const artifact = state.artifacts.find((item) => item.id === node.artifactId);
  const metadataFields = artifact
    ? state.fields
      .filter((field) => field.isSystemField)
      .map((field) => [field.label, getFieldValue(artifact, field)])
      .filter(([, value]) => cleanCell(value))
    : [];
  const customFields = artifact
    ? state.fields
      .filter((field) => !field.isSystemField)
      .map((field) => [field.label, getFieldValue(artifact, field)])
      .filter(([, value]) => cleanCell(value))
    : [];
  const image = artifact ? getPrimaryImage(artifact) : null;
  const renderFieldRows = (fields) => fields.map(([label, value]) => `<div><b title="${escapeHtml(label)}">${escapeHtml(label)}</b><span title="${escapeHtml(value)}">${escapeHtml(value)}</span></div>`).join("");
  dom.nodeHoverCard.innerHTML = `
    ${image ? `<img src="${getImageUrl(image)}" alt="">` : ""}
    <strong>${escapeHtml(node.label || node.id)}</strong>
    <span>${escapeHtml(node.id)}</span>
    ${node.artifactId ? `<button class="button subtle hover-expand-button" type="button">${state.language === "en" ? "Expand item details" : "展开条目详情"}</button>` : ""}
    <details open>
      <summary>${state.language === "en" ? "Metadata" : "元数据"}</summary>
      ${metadataFields.length ? renderFieldRows(metadataFields) : `<p class="quiet-line">${state.language === "en" ? "No metadata values" : "暂无元数据值"}</p>`}
    </details>
    <details ${customFields.length ? "open" : ""}>
      <summary>${state.language === "en" ? "Custom Fields" : "自定义字段"}</summary>
      ${customFields.length ? renderFieldRows(customFields) : `<p class="quiet-line">${state.language === "en" ? "No custom field values" : "暂无自定义字段值"}</p>`}
    </details>
  `;
  dom.nodeHoverCard.querySelector(".hover-expand-button")?.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
    state.hoverCardPinned = true;
    openArtifactFromNode(node);
  });
  dom.nodeHoverCard.classList.remove("hidden");
  positionNodeHover(event);
}

function showSiteNodeHover(node, event) {
  const counts = node.attrs?.counts || {};
  const total = Object.values(counts).reduce((sum, value) => sum + Number(value || 0), 0);
  const rows = Object.entries(counts)
    .sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0))
    .map(([label, count]) => {
      const percentage = total ? `${round((Number(count || 0) / total) * 100, 1)}%` : "0%";
      return `<div><b title="${escapeHtml(label)}">${escapeHtml(label)}</b><span title="${Number(count || 0)} · ${percentage}">${Number(count || 0)} · ${percentage}</span></div>`;
    })
    .join("");
  dom.nodeHoverCard.innerHTML = `
    <strong>${escapeHtml(node.label || node.id)}</strong>
    <span>${escapeHtml(node.attrs?.nodeField || node.group || "Site")} · ${escapeHtml(node.attrs?.targetField || "")}</span>
    <details open>
      <summary>${state.language === "en" ? "Distribution" : "分布统计"}</summary>
      ${rows || `<p class="quiet-line">${state.language === "en" ? "No statistic values" : "暂无统计值"}</p>`}
    </details>
    <details>
      <summary>${state.language === "en" ? "Summary" : "摘要"}</summary>
      <div><b title="${state.language === "en" ? "Items" : "条目数"}">${state.language === "en" ? "Items" : "条目数"}</b><span>${Number(node.attrs?.total || total || 0)}</span></div>
      <div><b title="${state.language === "en" ? "Metric" : "相似度函数"}">${state.language === "en" ? "Metric" : "相似度函数"}</b><span title="${escapeHtml(node.attrs?.metric || "")}">${escapeHtml(node.attrs?.metric || "")}</span></div>
    </details>
  `;
  dom.nodeHoverCard.classList.remove("hidden");
  positionNodeHover(event);
}

function positionNodeHover(event) {
  const rect = dom.graphStage.getBoundingClientRect();
  dom.nodeHoverCard.style.left = `${Math.min(rect.width - 310, Math.max(8, event.clientX - rect.left + 2))}px`;
  dom.nodeHoverCard.style.top = `${Math.min(rect.height - 260, Math.max(8, event.clientY - rect.top + 2))}px`;
}

function hideNodeHover() {
  clearTimeout(state.hoverHideTimer);
  if (state.hoverCardPinned) return;
  state.hoverHideTimer = setTimeout(() => {
    if (!state.hoverCardPinned) dom.nodeHoverCard.classList.add("hidden");
  }, 650);
}

function hideNodeHoverNow() {
  dom.nodeHoverCard.classList.add("hidden");
}

function renderMetrics() {
  const n = state.graph.nodes.length;
  const e = state.graph.edges.length;
  const density = MetricsEngine.density();
  const components = MetricsEngine.components();
  const centrality = MetricsEngine.centrality()
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  dom.metricNodes.textContent = n;
  dom.metricEdges.textContent = e;
  dom.metricDensity.textContent = round(density, 3);
  dom.metricComponents.textContent = components;
  dom.centralityList.innerHTML = "";
  centrality.forEach((item) => {
    const row = document.createElement("div");
    row.className = "centrality-row";
    row.innerHTML = `<span>${escapeHtml(item.label)}</span><strong>${round(item.score, 3)}</strong>`;
    dom.centralityList.append(row);
  });
}

function getCentralityScores(mode = dom.centralitySelect?.value || "degree") {
  const degreeMap = getDegrees();
  if (mode === "betweenness") return scoreMapToRows(betweennessScores());
  if (mode === "eigenvector") return scoreMapToRows(eigenvectorScores());
  if (mode === "pagerank") return scoreMapToRows(pageRankScores());
  if (mode === "harmonic") return scoreMapToRows(harmonicScores());
  if (mode === "clustering") return scoreMapToRows(clusteringScores());
  const maxPossible = Math.max(1, state.graph.nodes.length - 1);
  return state.graph.nodes.map((node) => {
    let score = degreeMap.get(node.id) || 0;
    if (mode === "degree") score = score / maxPossible;
    if (mode === "inDegree") score = state.graph.edges.filter((edge) => edge.target === node.id).length / maxPossible;
    if (mode === "outDegree") score = state.graph.edges.filter((edge) => edge.source === node.id).length / maxPossible;
    if (mode === "weighted") {
      score = state.graph.edges
        .filter((edge) => edge.source === node.id || edge.target === node.id)
        .reduce((sum, edge) => sum + Number(edge.weight || 0), 0);
    }
    if (mode === "closeness") score = closenessLikeScore(node.id);
    return { id: node.id, label: node.label || node.id, score };
  });
}

function closenessLikeScore(nodeId) {
  const distances = shortestDistances(nodeId);
  const values = Array.from(distances.values()).filter((value) => value > 0 && Number.isFinite(value));
  if (!values.length) return 0;
  return values.length / values.reduce((sum, value) => sum + value, 0);
}

function similarityDistance(weight) {
  return ThresholdRules.pathDistance(weight);
}

function scoreMapToRows(scores) {
  return state.graph.nodes.map((node) => ({ id: node.id, label: node.label || node.id, score: scores.get(node.id) || 0 }));
}

function adjacencyMap() {
  const map = new Map(state.graph.nodes.map((node) => [node.id, []]));
  state.graph.edges.forEach((edge) => {
    if (!map.has(edge.source) || !map.has(edge.target)) return;
    const distance = similarityDistance(edge.weight);
    const weight = Number(edge.weight || 0);
    map.get(edge.source).push({ id: edge.target, distance, weight });
    if (!edge.directed) map.get(edge.target).push({ id: edge.source, distance, weight });
  });
  return map;
}

function shortestDistances(sourceId) {
  const adjacency = adjacencyMap();
  const distances = new Map(state.graph.nodes.map((node) => [node.id, Infinity]));
  distances.set(sourceId, 0);
  const queue = new Set(distances.keys());
  while (queue.size) {
    let current = null;
    queue.forEach((id) => {
      if (current === null || distances.get(id) < distances.get(current)) current = id;
    });
    if (current === null || !Number.isFinite(distances.get(current))) break;
    queue.delete(current);
    adjacency.get(current)?.forEach((next) => {
      const candidate = distances.get(current) + next.distance;
      if (candidate < distances.get(next.id)) distances.set(next.id, candidate);
    });
  }
  return distances;
}

function harmonicScores() {
  const scores = new Map();
  state.graph.nodes.forEach((node) => {
    let score = 0;
    shortestDistances(node.id).forEach((distance, id) => {
      if (id !== node.id && distance > 0 && Number.isFinite(distance)) score += 1 / distance;
    });
    scores.set(node.id, score);
  });
  return scores;
}

function betweennessScores() {
  const scores = new Map(state.graph.nodes.map((node) => [node.id, 0]));
  state.graph.nodes.forEach((source, sourceIndex) => {
    state.graph.nodes.forEach((target, targetIndex) => {
      if (sourceIndex >= targetIndex) return;
      shortestPath(source.id, target.id).slice(1, -1).forEach((id) => scores.set(id, scores.get(id) + 1));
    });
  });
  return scores;
}

function shortestPath(sourceId, targetId) {
  const adjacency = adjacencyMap();
  const distances = new Map(state.graph.nodes.map((node) => [node.id, Infinity]));
  const previous = new Map();
  distances.set(sourceId, 0);
  const queue = new Set(distances.keys());
  while (queue.size) {
    let current = null;
    queue.forEach((id) => {
      if (current === null || distances.get(id) < distances.get(current)) current = id;
    });
    if (current === null || current === targetId) break;
    queue.delete(current);
    adjacency.get(current)?.forEach((next) => {
      const candidate = distances.get(current) + next.distance;
      if (candidate < distances.get(next.id)) {
        distances.set(next.id, candidate);
        previous.set(next.id, current);
      }
    });
  }
  const path = [];
  let current = targetId;
  while (current) {
    path.unshift(current);
    if (current === sourceId) break;
    current = previous.get(current);
  }
  return path[0] === sourceId ? path : [];
}

function eigenvectorScores() {
  const adjacency = adjacencyMap();
  let scores = new Map(state.graph.nodes.map((node) => [node.id, 1]));
  for (let i = 0; i < 30; i += 1) {
    const nextScores = new Map(state.graph.nodes.map((node) => [node.id, 0]));
    state.graph.nodes.forEach((node) => {
      adjacency.get(node.id)?.forEach((next) => {
        nextScores.set(next.id, nextScores.get(next.id) + scores.get(node.id) * Math.max(next.weight, 0.01));
      });
    });
    const norm = Math.hypot(...nextScores.values()) || 1;
    scores = new Map(Array.from(nextScores, ([id, score]) => [id, score / norm]));
  }
  return scores;
}

function pageRankScores() {
  const adjacency = adjacencyMap();
  const n = Math.max(1, state.graph.nodes.length);
  let scores = new Map(state.graph.nodes.map((node) => [node.id, 1 / n]));
  for (let i = 0; i < 30; i += 1) {
    const nextScores = new Map(state.graph.nodes.map((node) => [node.id, 0.15 / n]));
    state.graph.nodes.forEach((node) => {
      const out = adjacency.get(node.id) || [];
      if (!out.length) return;
      const share = (scores.get(node.id) * 0.85) / out.length;
      out.forEach((next) => nextScores.set(next.id, nextScores.get(next.id) + share));
    });
    scores = nextScores;
  }
  return scores;
}

function clusteringScores() {
  const adjacency = adjacencyMap();
  const scores = new Map();
  state.graph.nodes.forEach((node) => {
    const neighbors = Array.from(new Set((adjacency.get(node.id) || []).map((item) => item.id)));
    const possible = neighbors.length * (neighbors.length - 1) / 2;
    if (!possible) {
      scores.set(node.id, 0);
      return;
    }
    let links = 0;
    for (let i = 0; i < neighbors.length; i += 1) {
      for (let j = i + 1; j < neighbors.length; j += 1) {
        if (adjacency.get(neighbors[i])?.some((item) => item.id === neighbors[j])) links += 1;
      }
    }
    scores.set(node.id, links / possible);
  });
  return scores;
}

function renderInspector() {
  const node = getSelectedNode();
  const edge = getSelectedEdge();
  dom.inspectorEmpty.classList.toggle("hidden", Boolean(node || edge));
  dom.nodeInspector.classList.toggle("hidden", !node);
  dom.edgeInspector.classList.toggle("hidden", !edge || Boolean(node));

  if (node) {
    dom.inspectNodeId.value = node.id;
    dom.inspectNodeLabel.value = node.label || "";
    dom.inspectNodeGroup.value = node.group || "";
    dom.inspectNodeNotes.value = node.notes || "";
    dom.openArtifactBtn.disabled = !node.artifactId;
    renderArtifactPreview(node);
  }
  if (edge && !node) {
    dom.inspectEdgeId.value = edge.id;
    dom.inspectEdgeLabel.value = edge.label || "";
    dom.inspectEdgeWeight.value = edge.weight || 1;
    dom.inspectEdgeNotes.value = edge.notes || "";
  }
}

function renderArtifactPreview(node) {
  const artifact = state.artifacts.find((item) => item.id === node.artifactId);
  dom.artifactPreview.classList.toggle("hidden", !artifact);
  dom.artifactPreview.innerHTML = "";
  if (!artifact) return;
  const image = getPrimaryImage(artifact);
  if (image) {
    const img = document.createElement("img");
    img.src = getImageUrl(image);
    img.alt = artifact.metadata?.Title || artifact.id;
    dom.artifactPreview.append(img);
  }
  const title = document.createElement("strong");
  title.textContent = artifact.metadata?.Title || artifact.title || artifact.id;
  const meta = document.createElement("div");
  meta.className = "artifact-preview-fields";
  state.fields.slice(0, 8).forEach((field) => {
    const value = getFieldValue(artifact, field);
    if (!value) return;
    const row = document.createElement("div");
    row.innerHTML = `<b>${escapeHtml(field.label)}</b><span>${escapeHtml(value)}</span>`;
    meta.append(row);
  });
  dom.artifactPreview.append(title, meta);
}

function renderTables() {
  renderNodeTable();
  renderEdgeTable();
  dom.nodeTableTab.classList.toggle("active", state.tableMode === "nodes");
  dom.edgeTableTab.classList.toggle("active", state.tableMode === "edges");
  dom.nodeTable.classList.toggle("hidden", state.tableMode !== "nodes");
  dom.edgeTable.classList.toggle("hidden", state.tableMode !== "edges");
}

function renderNodeTable() {
  const degrees = getDegrees();
  const extraFields = (state.nodeTableFieldIds || [])
    .map((fieldId) => state.fields.find((field) => field.id === fieldId))
    .filter(Boolean);
  const availableFields = state.fields.filter((field) => !extraFields.some((selected) => selected.id === field.id));
  const headerCells = [
    "<th>ID</th>",
    "<th>Label</th>",
    ...extraFields.map((field) => `<th>${escapeHtml(field.label)} <button class="table-field-remove" type="button" data-field-id="${escapeHtml(field.id)}" aria-label="Remove ${escapeHtml(field.label)}">×</button></th>`),
    "<th>Degree</th>"
  ].join("");
  const rows = state.graph.nodes
    .map((node) => `<tr data-id="${escapeHtml(node.id)}" class="${state.selectedNodeIds.has(node.id) ? "selected" : ""}">
      <td>${escapeHtml(node.id)}</td>
      <td>${escapeHtml(node.label || "")}</td>
      ${extraFields.map((field) => `<td>${escapeHtml(getNodeFieldValue(node, field))}</td>`).join("")}
      <td>${degrees.get(node.id) || 0}</td>
    </tr>`)
    .join("");
  const options = availableFields
    .map((field) => `<option value="${escapeHtml(field.id)}">${escapeHtml(field.label)}</option>`)
    .join("");
  dom.nodeTable.innerHTML = `
    <div class="table-field-controls">
      <select id="nodeTableFieldSelect" class="input">
        <option value="">${state.language === "en" ? "Add Field" : "添加字段"}</option>
        ${options}
      </select>
      <button id="addNodeTableFieldBtn" class="button subtle" type="button">${state.language === "en" ? "Add" : "添加"}</button>
    </div>
    <table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`;
  dom.nodeTable.querySelector("#addNodeTableFieldBtn")?.addEventListener("click", () => {
    const value = dom.nodeTable.querySelector("#nodeTableFieldSelect")?.value;
    if (!value || state.nodeTableFieldIds.includes(value)) return;
    state.nodeTableFieldIds = [...state.nodeTableFieldIds, value];
    saveNetworkSettings();
    renderNodeTable();
  });
  dom.nodeTable.querySelectorAll(".table-field-remove").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.nodeTableFieldIds = state.nodeTableFieldIds.filter((fieldId) => fieldId !== button.dataset.fieldId);
      saveNetworkSettings();
      renderNodeTable();
    });
  });
  dom.nodeTable.querySelectorAll("tr[data-id]").forEach((row) => row.addEventListener("click", (event) => selectNode(row.dataset.id, event)));
}

function renderEdgeTable() {
  const rows = state.graph.edges
    .map((edge) => `<tr data-id="${escapeHtml(edge.id)}" class="${state.selectedEdgeIds.has(edge.id) ? "selected" : ""}">
      <td>${escapeHtml(edge.source)}</td>
      <td>${escapeHtml(edge.target)}</td>
      <td>${round(edge.weight || 1, 3)}</td>
      <td>${escapeHtml(edge.label || "")}</td>
    </tr>`)
    .join("");
  dom.edgeTable.innerHTML = `<table><thead><tr><th>Source</th><th>Target</th><th>Weight</th><th>Label</th></tr></thead><tbody>${rows}</tbody></table>`;
  dom.edgeTable.querySelectorAll("tr[data-id]").forEach((row) => row.addEventListener("click", (event) => selectEdge(row.dataset.id, event)));
}

function setTableMode(mode) {
  state.tableMode = mode;
  renderTables();
}

function selectNode(id, event = null) {
  if (event?.ctrlKey || event?.metaKey) {
    if (state.selectedNodeIds.has(id)) state.selectedNodeIds.delete(id);
    else state.selectedNodeIds.add(id);
  } else {
    state.selectedNodeIds = new Set([id]);
  }
  state.selectedNodeId = state.selectedNodeIds.has(id) ? id : (Array.from(state.selectedNodeIds)[0] || null);
  state.selectedEdgeId = null;
  state.selectedEdgeIds.clear();
  renderAll();
}

function selectEdge(id, event = null) {
  if (event?.ctrlKey || event?.metaKey) {
    if (state.selectedEdgeIds.has(id)) state.selectedEdgeIds.delete(id);
    else state.selectedEdgeIds.add(id);
  } else {
    state.selectedEdgeIds = new Set([id]);
  }
  state.selectedEdgeId = state.selectedEdgeIds.has(id) ? id : (Array.from(state.selectedEdgeIds)[0] || null);
  state.selectedNodeId = null;
  state.selectedNodeIds.clear();
  renderAll();
}

function clearSelection() {
  state.selectedNodeId = null;
  state.selectedEdgeId = null;
  state.selectedNodeIds.clear();
  state.selectedEdgeIds.clear();
}

function applySelectedLayout(shouldFit = false) {
  const mode = dom.layoutModeSelect?.value || dom.layoutSelect?.value || state.layoutMode || "spring";
  LayoutEngine.apply(mode, { reset: true });
  renderAll();
  if (shouldFit) fitGraph();
}

function applyStaticLayout(mode) {
  LayoutEngine.apply(mode, { reset: true });
}

function runLayout(resetPositions = false) {
  LayoutEngine.apply("spring", { reset: resetPositions });
  renderAll();
}

function ensurePositions() {
  LayoutEngine.ensure();
}

function fitGraph() {
  if (!state.graph.nodes.length) {
    state.view = { x: 0, y: 0, scale: 1, rotation: Number(state.view.rotation) || 0 };
    renderGraph();
    return;
  }
  const rect = dom.graphStage.getBoundingClientRect();
  const bounds = getBounds();
  const padding = 80;
  const scale = Math.min(
    1.8,
    Math.max(0.25, Math.min((rect.width - padding) / Math.max(bounds.width, 1), (rect.height - padding) / Math.max(bounds.height, 1)))
  );
  state.view.scale = scale;
  state.view.x = rect.width / 2 - (bounds.left + bounds.width / 2) * scale;
  state.view.y = rect.height / 2 - (bounds.top + bounds.height / 2) * scale;
  renderGraph();
}

function pointerAngleFromGraphCenter(event, center) {
  return Math.atan2(event.clientY - center.y, event.clientX - center.x) * 180 / Math.PI;
}

function beginGraphRotate(event) {
  event.preventDefault();
  event.stopPropagation();
  const rect = dom.graphStage.getBoundingClientRect();
  const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  state.rotating = {
    center,
    startAngle: pointerAngleFromGraphCenter(event, center),
    baseRotation: Number(state.view.rotation) || 0,
    pointerId: event.pointerId
  };
  if (typeof dom.graphStage.setPointerCapture === "function") {
    dom.graphStage.setPointerCapture(event.pointerId);
  }
  dom.rotateGraphBtn.classList.add("active");
}

function beginNodeDrag(event, node) {
  event.preventDefault();
  event.stopPropagation();
  selectNode(node.id);
}

function beginPan(event) {
  if (event.target.closest(".graph-tool-rail")) return;
  if (event.target.closest(".graph-node")) return;
  if (state.graphTool === "rotate") {
    beginGraphRotate(event);
    return;
  }
  if (state.graphTool === "box") {
    beginGraphBoxSelect(event);
    return;
  }
  if (state.graphTool !== "pan") {
    if (state.graphTool === "select") {
      clearSelection();
      renderAll();
    }
    return;
  }
  event.preventDefault();
  clearSelection();
  state.panning = { last: { x: event.clientX, y: event.clientY } };
  renderAll();
}

function beginGraphBoxSelect(event) {
  event.preventDefault();
  const rect = dom.graphStage.getBoundingClientRect();
  state.boxSelecting = {
    startX: event.clientX - rect.left,
    startY: event.clientY - rect.top,
    currentX: event.clientX - rect.left,
    currentY: event.clientY - rect.top,
    additive: event.ctrlKey || event.metaKey
  };
  updateGraphSelectionBox();
}

function handlePointerMove(event) {
  if (state.dragging) {
    endPointerAction();
  }
  if (state.boxSelecting) {
    const rect = dom.graphStage.getBoundingClientRect();
    state.boxSelecting.currentX = event.clientX - rect.left;
    state.boxSelecting.currentY = event.clientY - rect.top;
    updateGraphSelectionBox();
    return;
  }
  if (state.rotating) {
    event.preventDefault();
    const angle = pointerAngleFromGraphCenter(event, state.rotating.center);
    const nextRotation = state.rotating.baseRotation + angle - state.rotating.startAngle;
    state.view.rotation = ((nextRotation % 360) + 360) % 360;
    renderGraph();
    return;
  }
  if (state.panning) {
    state.view.x += event.clientX - state.panning.last.x;
    state.view.y += event.clientY - state.panning.last.y;
    state.panning.last = { x: event.clientX, y: event.clientY };
    renderGraph();
  }
}

function endPointerAction() {
  if (state.boxSelecting) {
    finishGraphBoxSelect();
  }
  if (state.rotating && typeof dom.graphStage.releasePointerCapture === "function") {
    try {
      dom.graphStage.releasePointerCapture(state.rotating.pointerId);
    } catch (error) {
      // Pointer capture may already be released by the browser.
    }
  }
  state.dragging = null;
  state.panning = null;
  state.rotating = null;
  dom.rotateGraphBtn?.classList.toggle("active", state.graphTool === "rotate");
}

function updateGraphSelectionBox() {
  if (!dom.graphSelectionBox || !state.boxSelecting) return;
  const box = state.boxSelecting;
  const left = Math.min(box.startX, box.currentX);
  const top = Math.min(box.startY, box.currentY);
  const width = Math.abs(box.currentX - box.startX);
  const height = Math.abs(box.currentY - box.startY);
  Object.assign(dom.graphSelectionBox.style, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`
  });
  dom.graphSelectionBox.classList.remove("hidden");
}

function finishGraphBoxSelect() {
  const box = state.boxSelecting;
  state.boxSelecting = null;
  if (!box) return;
  dom.graphSelectionBox?.classList.add("hidden");
  const left = Math.min(box.startX, box.currentX);
  const right = Math.max(box.startX, box.currentX);
  const top = Math.min(box.startY, box.currentY);
  const bottom = Math.max(box.startY, box.currentY);
  if (right - left < 4 || bottom - top < 4) return;
  if (!box.additive) {
    state.selectedNodeIds.clear();
    state.selectedEdgeIds.clear();
  }
  state.graph.nodes.forEach((node) => {
    const point = graphPointToStage(node.x, node.y);
    if (!point) return;
    const sx = point.x;
    const sy = point.y;
    if (sx >= left && sx <= right && sy >= top && sy <= bottom) {
      state.selectedNodeIds.add(node.id);
    }
  });
  state.selectedNodeId = Array.from(state.selectedNodeIds)[0] || null;
  state.selectedEdgeId = null;
  renderAll();
}

function graphPointToStage(x, y) {
  const root = dom.graphSvg?.querySelector(".graph-root");
  if (!root || !dom.graphSvg || !dom.graphStage) return null;
  const matrix = root.getScreenCTM();
  if (!matrix) return null;
  const point = dom.graphSvg.createSVGPoint();
  point.x = Number(x) || 0;
  point.y = Number(y) || 0;
  const screenPoint = point.matrixTransform(matrix);
  const stageRect = dom.graphStage.getBoundingClientRect();
  return {
    x: screenPoint.x - stageRect.left,
    y: screenPoint.y - stageRect.top
  };
}

function handleWheel(event) {
  event.preventDefault();
  const nextScale = Math.min(3, Math.max(0.2, state.view.scale * (event.deltaY > 0 ? 0.9 : 1.1)));
  const rect = dom.graphSvg.getBoundingClientRect();
  const cx = event.clientX - rect.left;
  const cy = event.clientY - rect.top;
  state.view.x = cx - ((cx - state.view.x) / state.view.scale) * nextScale;
  state.view.y = cy - ((cy - state.view.y) / state.view.scale) * nextScale;
  state.view.scale = nextScale;
  renderGraph();
}

function saveGraph() {
  const id = `net-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const payload = {
    graph: state.graph,
    style: state.style,
    visualEncoding: state.visualEncoding,
    hierarchyRules: state.hierarchyRules,
    edgeThresholdStyles: state.edgeThresholdStyles,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(GRAPH_STORAGE_KEY, JSON.stringify(state.graph));
  localStorage.setItem(`${GRAPH_LINK_STORAGE_PREFIX}${id}`, JSON.stringify(payload));
  const url = new URL(window.location.href);
  url.pathname = "/network.html";
  url.hash = "";
  url.search = "";
  url.searchParams.set("graph", id);
  state.savedNetworkLink = url.toString();
  dom.graphSummary.textContent = `${state.graph.nodes.length} ${nt("nodes")} · ${state.graph.edges.length} ${nt("edges")} · ${state.language === "en" ? "saved" : "已保存"}`;
  renderSavedGraphLink();
}

function loadSavedGraph() {
  const raw = localStorage.getItem(GRAPH_STORAGE_KEY);
  if (!raw) return;
  try {
    const graph = JSON.parse(raw);
    state.graph = {
      nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
      edges: Array.isArray(graph.edges) ? graph.edges : []
    };
    normalizeGraph();
  } catch {
    localStorage.removeItem(GRAPH_STORAGE_KEY);
  }
}

function loadLinkedGraphFromUrl() {
  const id = new URLSearchParams(window.location.search).get("graph");
  if (!id) return;
  const raw = localStorage.getItem(`${GRAPH_LINK_STORAGE_PREFIX}${id}`);
  if (!raw) return;
  try {
    const payload = JSON.parse(raw);
    const graph = payload.graph || payload;
    state.graph = {
      nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
      edges: Array.isArray(graph.edges) ? graph.edges : []
    };
    if (payload.style) state.style = { ...state.style, ...payload.style };
    if (payload.visualEncoding) state.visualEncoding = { ...state.visualEncoding, ...payload.visualEncoding };
    if (Array.isArray(payload.hierarchyRules)) state.hierarchyRules = payload.hierarchyRules;
    if (Array.isArray(payload.edgeThresholdStyles)) state.edgeThresholdStyles = payload.edgeThresholdStyles;
    state.savedNetworkLink = window.location.href;
    normalizeGraph();
  } catch {
    localStorage.removeItem(`${GRAPH_LINK_STORAGE_PREFIX}${id}`);
  }
}

function renderSavedGraphLink() {
  if (!dom.savedGraphLinkPanel || !dom.savedGraphLinkInput || !dom.openSavedGraphLink) return;
  dom.savedGraphLinkPanel.classList.toggle("hidden", !state.savedNetworkLink);
  if (!state.savedNetworkLink) return;
  dom.savedGraphLinkInput.value = state.savedNetworkLink;
  dom.openSavedGraphLink.href = state.savedNetworkLink;
  dom.openSavedGraphLink.textContent = state.language === "en" ? "Open saved link" : "打开保存链接";
}

function exportGraph() {
  const blob = new Blob([JSON.stringify(state.graph, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `easy-network-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadText(fileName, text, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function saveTextFile(fileName, text, mime = "text/plain;charset=utf-8") {
  const picker = window.showSaveFilePicker;
  if (typeof picker === "function") {
    try {
      const handle = await picker({
        suggestedName: fileName,
        types: [{
          description: mime.includes("csv") ? "CSV file" : "Text file",
          accept: { [mime.split(";")[0]]: [fileName.slice(fileName.lastIndexOf(".")) || ".txt"] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(new Blob([text], { type: mime }));
      await writable.close();
      return "file-picker";
    } catch (error) {
      if (error?.name === "AbortError") return "cancelled";
    }
  }
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }
  downloadText(fileName, text, mime);
  return copied ? "clipboard-download" : "download";
}

function openImageExportDialog() {
  if (!dom.imageExportDialog) {
    exportGraphImage();
    return;
  }
  if (dom.imageExportName) dom.imageExportName.value = `easy-network-${new Date().toISOString().slice(0, 10)}`;
  dom.imageExportDialog.classList.remove("hidden");
}

function closeImageExportDialog() {
  dom.imageExportDialog?.classList.add("hidden");
}

async function exportGraphImage() {
  const format = dom.imageExportFormat?.value || "png";
  const scale = Math.max(1, Math.min(4, Number(dom.imageExportScale?.value || 2)));
  const baseName = cleanFileBaseName(dom.imageExportName?.value || `easy-network-${new Date().toISOString().slice(0, 10)}`);
  const extension = format === "jpeg" ? "jpg" : format;
  const mime = format === "svg" ? "image/svg+xml" : `image/${format}`;
  const fileName = `${baseName}.${extension}`;
  if (dom.confirmImageExportBtn) {
    dom.confirmImageExportBtn.disabled = true;
    dom.confirmImageExportBtn.textContent = state.language === "en" ? "Saving..." : "正在保存...";
  }
  try {
    const blob = await createGraphImageBlob(format, scale);
    await saveBlobWithPicker(blob, fileName, mime, extension);
    closeImageExportDialog();
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(error);
      window.alert(state.language === "en" ? `Image export failed: ${error.message}` : `图像导出失败：${error.message}`);
    }
  } finally {
    if (dom.confirmImageExportBtn) {
      dom.confirmImageExportBtn.disabled = false;
      dom.confirmImageExportBtn.textContent = state.language === "en" ? "Save" : "保存";
    }
  }
}

async function createGraphImageBlob(format = "png", scale = 2) {
  const rect = dom.graphStage.getBoundingClientRect();
  const width = Math.max(400, Math.round(rect.width));
  const height = Math.max(400, Math.round(rect.height));
  const svgClone = dom.graphSvg.cloneNode(true);
  inlineSvgComputedStyles(dom.graphSvg, svgClone);
  svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgClone.setAttribute("width", width);
  svgClone.setAttribute("height", height);
  svgClone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const serializedSvg = new XMLSerializer().serializeToString(svgClone);
  if (format === "svg") {
    return new Blob([serializedSvg], { type: "image/svg+xml" });
  }
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serializedSvg)}`;
  const image = new Image();
  const loaded = new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  image.src = url;
  await loaded;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d");
  context.scale(scale, scale);
  context.fillStyle = state.theme === "dark" ? "#182528" : "#f7f8f5";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, format === "jpeg" ? 0.92 : 0.95));
  if (!blob) throw new Error("Canvas could not create an image blob.");
  return blob;
}

async function saveBlobWithPicker(blob, fileName, mime, extension) {
  if (window.showSaveFilePicker) {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [{ description: `${extension.toUpperCase()} image`, accept: { [mime]: [`.${extension}`] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function cleanFileBaseName(value) {
  return String(value || "easy-network")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.+$/g, "") || "easy-network";
}

async function exportGraphPng() {
  if (dom.exportPngBtn) {
    dom.exportPngBtn.disabled = true;
    dom.exportPngBtn.textContent = state.language === "en" ? "Saving..." : "正在保存...";
  }
  const rect = dom.graphStage.getBoundingClientRect();
  const width = Math.max(400, Math.round(rect.width));
  const height = Math.max(400, Math.round(rect.height));
  const dpi = 300;
  const scale = dpi / 96;
  try {
    const svgClone = dom.graphSvg.cloneNode(true);
    inlineSvgComputedStyles(dom.graphSvg, svgClone);
    svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgClone.setAttribute("width", width);
    svgClone.setAttribute("height", height);
    svgClone.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const serializedSvg = new XMLSerializer().serializeToString(svgClone);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serializedSvg)}`;
    const image = new Image();
    const loaded = new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
    image.src = url;
    await loaded;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.fillStyle = state.theme === "dark" ? "#182528" : "#f7f8f5";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Canvas could not create a PNG blob.");
    const fileName = `easy-network-${dpi}dpi-${new Date().toISOString().slice(0, 10)}.png`;
    try {
      const dataUrl = await blobToDataUrl(blob);
      const response = await fetch("/api/save-screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, dpi, dataUrl })
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        if (dom.exportPngBtn) dom.exportPngBtn.textContent = state.language === "en" ? "Saved" : "已保存";
        window.alert(state.language === "en" ? `Screenshot saved:\n${result.path}` : `截图已保存：\n${result.path}`);
        return;
      }
    } catch (error) {
      // Fall back to browser-native saving below when the local helper endpoint is unavailable.
    }
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [{ description: "PNG image", accept: { "image/png": [".png"] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        if (dom.exportPngBtn) dom.exportPngBtn.textContent = state.language === "en" ? "Saved" : "已保存";
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const pngUrl = URL.createObjectURL(blob);
    let downloadDocument = document;
    try {
      if (window.top?.document && window.top.location.origin === window.location.origin) {
        downloadDocument = window.top.document;
      }
    } catch (error) {
      downloadDocument = document;
    }
    const anchor = downloadDocument.createElement("a");
    anchor.href = pngUrl;
    anchor.download = fileName;
    anchor.rel = "noopener";
    downloadDocument.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
    if (dom.exportPngBtn) dom.exportPngBtn.textContent = state.language === "en" ? "Saved" : "已保存";
  } catch (error) {
    console.error(error);
    window.alert(state.language === "en" ? `Screenshot export failed: ${error.message}` : `截图导出失败：${error.message}`);
  } finally {
    window.setTimeout(() => {
      if (dom.exportPngBtn) {
        dom.exportPngBtn.disabled = false;
        dom.exportPngBtn.textContent = nt("exportPng");
      }
    }, 1200);
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function inlineSvgComputedStyles(source, target) {
  const sourceElements = [source, ...source.querySelectorAll("*")];
  const targetElements = [target, ...target.querySelectorAll("*")];
  const properties = [
    "fill",
    "stroke",
    "stroke-width",
    "stroke-opacity",
    "fill-opacity",
    "opacity",
    "font-family",
    "font-size",
    "font-weight",
    "text-anchor",
    "dominant-baseline"
  ];
  targetElements.forEach((element, index) => {
    const sourceElement = sourceElements[index];
    if (!sourceElement) return;
    const computed = window.getComputedStyle(sourceElement);
    properties.forEach((property) => {
      const value = computed.getPropertyValue(property);
      if (value) element.style.setProperty(property, value);
    });
  });
}

function resetGraph() {
  if (!window.confirm(state.language === "en" ? "Clear the current network canvas and local saved network?" : "清空当前网络画布和本地保存的网络？")) return;
  state.graph = { nodes: [], edges: [] };
  state.savedNetworkLink = "";
  localStorage.removeItem(GRAPH_STORAGE_KEY);
  clearSelection();
  renderAll();
}

function mergeGraph(next) {
  const nodes = new Map(state.graph.nodes.map((node) => [node.id, node]));
  next.nodes.forEach((node) => {
    nodes.set(node.id, { ...(nodes.get(node.id) || {}), ...node });
  });
  const edgeIds = new Set(state.graph.edges.map((edge) => edge.id));
  state.graph.nodes = Array.from(nodes.values());
  next.edges.forEach((edge) => {
    if (!edgeIds.has(edge.id)) state.graph.edges.push(edge);
  });
}

function normalizeGraph() {
  const nodeIds = new Set();
  state.graph.nodes = state.graph.nodes
    .map((node) => enrichNodeWithArtifact({
      ...node,
      id: cleanCell(node.id || node.uniqueID),
      uniqueID: cleanCell(node.uniqueID || node.id),
      label: cleanCell(node.label || node.id),
      attrs: node.attrs || {}
    }))
    .map(ensureNodeDateRange)
    .filter((node) => node.id && !nodeIds.has(node.id) && nodeIds.add(node.id));
  state.graph.edges = state.graph.edges
    .map((edge, index) => ({
      ...edge,
      id: cleanCell(edge.id) || createEdgeId(edge.source, edge.target, index),
      source: cleanCell(edge.source),
      target: cleanCell(edge.target),
      weight: parseWeight(edge.weight, 1),
      similarity: parseWeight(edge.similarity ?? edge.weight, parseWeight(edge.weight, 1)),
      attrs: edge.attrs || {}
    }))
    .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target) && (edge.source !== edge.target || state.allowSelfLoop));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      i += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((item) => item.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((item) => item.trim())) rows.push(row);
  const headers = (rows.shift() || []).map((item) => item.trim());
  return {
    headers,
    rows: rows.map((items) => Object.fromEntries(headers.map((header, index) => [header, items[index] || ""])))
  };
}

function getFieldValue(artifact, field) {
  if (!field) return "";
  if (field.label === "ID") return artifact.id;
  if (field.isSystemField) return artifact.metadata?.[field.label] || "";
  return artifact.customFields?.[field.id] || "";
}

function addNode(map, node) {
  if (!node.id || map.has(node.id)) return;
  map.set(node.id, enrichNodeWithArtifact({ uniqueID: node.id, notes: "", attrs: {}, ...node }));
}

function enrichNodeWithArtifact(node) {
  const artifact = state.artifacts.find((item) => item.id === node.id || item.id === node.uniqueID);
  if (!artifact) return node;
  const artifactLabel = artifact.metadata?.Title || artifact.title || artifact.id;
  return {
    ...node,
    uniqueID: artifact.id,
    artifactId: artifact.id,
    type: "artifact",
    label: node.label && node.label !== node.id ? node.label : artifactLabel,
    group: node.group || artifact.metadata?.Location || "文物",
    attrs: { ...collectArtifactAttrs(artifact), ...(node.attrs || {}) }
  };
}

function getSelectedNode() {
  return state.graph.nodes.find((node) => node.id === state.selectedNodeId);
}

function getSelectedEdge() {
  return state.graph.edges.find((edge) => edge.id === state.selectedEdgeId);
}

function findNode(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

function getDegrees() {
  const degrees = new Map(state.graph.nodes.map((node) => [node.id, 0]));
  state.graph.edges.forEach((edge) => {
    degrees.set(edge.source, (degrees.get(edge.source) || 0) + 1);
    degrees.set(edge.target, (degrees.get(edge.target) || 0) + 1);
  });
  return degrees;
}

function countComponents() {
  const adjacency = new Map(state.graph.nodes.map((node) => [node.id, []]));
  state.graph.edges.forEach((edge) => {
    adjacency.get(edge.source)?.push(edge.target);
    adjacency.get(edge.target)?.push(edge.source);
  });
  const seen = new Set();
  let count = 0;
  state.graph.nodes.forEach((node) => {
    if (seen.has(node.id)) return;
    count += 1;
    const stack = [node.id];
    seen.add(node.id);
    while (stack.length) {
      const current = stack.pop();
      (adjacency.get(current) || []).forEach((next) => {
        if (!seen.has(next)) {
          seen.add(next);
          stack.push(next);
        }
      });
    }
  });
  return count;
}

function getBounds() {
  const xs = state.graph.nodes.map((node) => node.x || 0);
  const ys = state.graph.nodes.map((node) => node.y || 0);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  return { left, top, width: right - left || 1, height: bottom - top || 1 };
}

function scoreRowsToMap(rows) {
  return new Map((rows || []).map((row) => [row.id, Number(row.score || 0)]));
}

function getNodeVisualField(kind) {
  const key = {
    color: "nodeColorFieldId",
    shape: "nodeShapeFieldId",
    size: "nodeSizeFieldId",
    opacity: "nodeOpacityFieldId"
  }[kind];
  return state.fields.find((field) => field.id === state.visualEncoding[key]);
}

function getNodeFieldValue(node, field) {
  if (!field) return "";
  if (node.artifactId) {
    const artifact = state.artifacts.find((item) => item.id === node.artifactId);
    if (artifact) return cleanCell(getFieldValue(artifact, field));
  }
  return cleanCell(node.attrs?.[field.label] || node.attrs?.[field.id] || "");
}

function getClassificationValues(field) {
  const values = new Set();
  state.graph.nodes.forEach((node) => values.add(getNodeFieldValue(node, field)));
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

function categoryIndex(value, values = null) {
  const list = values || [cleanCell(value)];
  return Math.max(0, list.indexOf(cleanCell(value)));
}

function categoryIndexForField(value, field) {
  const values = getClassificationValues(field);
  return Math.max(0, values.indexOf(cleanCell(value)));
}

function colorForCategoryValue(value) {
  return colorFromValue(cleanCell(value) || "empty");
}

function shapeForCategoryValue(value, field = null) {
  const index = field ? categoryIndexForField(value, field) : categoryIndex(value);
  return ["circle", "square", "diamond"][index % 3];
}

function shapeSymbolForIndex(index) {
  return ["●", "■", "◆"][index % 3];
}

function colorFromValue(value) {
  const key = cleanCell(value) || "default";
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) % 360;
  return `hsl(${hash}, 46%, 44%)`;
}

function hslToHex(hsl) {
  const match = String(hsl).match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
  if (!match) return "#286f6c";
  let h = Number(match[1]) / 360;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const hue = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const rgb = [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)]
    .map((value) => Math.round(value * 255).toString(16).padStart(2, "0"));
  return `#${rgb.join("")}`;
}

function getEdgeVisualOptions() {
  return [
    { id: "similarity", label: state.language === "en" ? "Similarity" : "相似度" },
    { id: "weight", label: state.language === "en" ? "Weight" : "权重" },
    { id: "label", label: state.language === "en" ? "Label" : "标签" },
    { id: "matchFields", label: state.language === "en" ? "Matched fields" : "匹配字段" },
    { id: "sourceGroup", label: state.language === "en" ? "Source group" : "源节点组" },
    { id: "targetGroup", label: state.language === "en" ? "Target group" : "目标节点组" }
  ];
}

function getEdgeVisualOptionLabel(id) {
  return getEdgeVisualOptions().find((option) => option.id === id)?.label || id;
}

function getEdgeVisualValue(edge, fieldId = "similarity") {
  const source = findNode(edge.source);
  const target = findNode(edge.target);
  if (fieldId === "weight") return Number(edge.weight || 0);
  if (fieldId === "label") return edge.label || "";
  if (fieldId === "matchFields") return (edge.attrs?.matchedFields || []).join(", ") || edge.attrs?.reasons?.join(", ") || "";
  if (fieldId === "sourceGroup") return source?.group || "";
  if (fieldId === "targetGroup") return target?.group || "";
  return Number(edge.similarity ?? edge.weight ?? 0);
}

function formatEdgeVisualValue(value) {
  if (typeof value === "number") return round(value, 3);
  return cleanCell(value);
}

function normalizedVisualValue(value, fieldId) {
  if (typeof value === "number") return clamp(value, 0, 1);
  const values = Array.from(new Set(state.graph.edges.map((edge) => cleanCell(getEdgeVisualValue(edge, fieldId))))).sort((a, b) => a.localeCompare(b));
  if (!values.length) return 0;
  return categoryIndex(value, values) / Math.max(1, values.length - 1);
}

function hierarchyKey(node) {
  return cleanCell(node.attrs?.Date || node.attrs?.date || node.group || node.type || "unsorted");
}

function hierarchyGroupForNode(node) {
  const rules = normalizedHierarchyRules();
  if (!rules.length) {
    const label = hierarchyKey(node);
    return { label, sort: label };
  }
  const strongest = maxIncidentSimilarity(node.id);
  const match = rules.find((rule) => hierarchyRuleContains(rule, strongest));
  if (!match) return { label: state.language === "en" ? "Beyond rules" : "规则之外", sort: Number.MAX_SAFE_INTEGER };
  const distance = clamp(Number(match.distance) || 0.3, 0.01, 1);
  const label = state.language === "en" ? `Distance ${distance}` : `距离 ${distance}`;
  return { label, sort: distance };
}

function normalizedHierarchyRules() {
  return (state.hierarchyRules || [])
    .map(normalizeHierarchyRule)
    .sort((a, b) => b.max - a.max || b.min - a.min);
}

function normalizeHierarchyRule(rule) {
  const legacyMin = Object.prototype.hasOwnProperty.call(rule, "similarity") ? Number(rule.similarity) : 0;
  const rawMin = Object.prototype.hasOwnProperty.call(rule, "min") ? Number(rule.min) : legacyMin;
  const rawMax = Object.prototype.hasOwnProperty.call(rule, "max") ? Number(rule.max) : 1;
  const min = clamp(Number.isFinite(rawMin) ? rawMin : 0, 0, 1);
  const max = clamp(Number.isFinite(rawMax) ? rawMax : 1, 0, 1);
  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
    leftInclusive: rule.leftInclusive !== false,
    rightInclusive: rule.rightInclusive !== false,
    distance: clamp(Number(rule.distance) || 0.3, 0.01, 1)
  };
}

function hierarchyDistanceForSimilarity(similarity) {
  const rules = normalizedHierarchyRules();
  if (!rules.length) return 0.3;
  const value = clamp(Number(similarity) || 0, 0, 1);
  const matched = rules.find((rule) => hierarchyRuleContains(rule, value));
  return (matched || rules[rules.length - 1]).distance;
}

function hierarchyRuleContains(rule, value) {
  const aboveMin = rule.leftInclusive ? value >= rule.min : value > rule.min;
  const belowMax = rule.rightInclusive ? value <= rule.max : value < rule.max;
  return aboveMin && belowMax;
}

function hierarchyPreferredPixelDistance(edge, size) {
  const distance = Number(edge.distance ?? hierarchyDistanceForSimilarity(edge.similarity ?? edge.weight ?? 0));
  return clamp(distance, 0.01, 1) * Math.min(size.width, size.height);
}

function applyHierarchyEdgeDistances() {
  state.graph.edges.forEach((edge) => {
    const similarity = Number(edge.similarity ?? edge.weight ?? 0) || 0;
    const distance = hierarchyDistanceForSimilarity(similarity);
    edge.distance = distance;
    edge.hierarchyLayer = distance <= 0.2 ? "high" : distance <= 0.35 ? "mid" : "low";
  });
}

function maxIncidentSimilarity(nodeId) {
  return state.graph.edges.reduce((max, edge) => {
    if (edge.source !== nodeId && edge.target !== nodeId) return max;
    return Math.max(max, Number(edge.similarity ?? edge.weight ?? 0) || 0);
  }, 0);
}

function applyPairForce(a, b, preferredDistance, strength) {
  const dx = (b.x || 0) - (a.x || 0) || 0.01;
  const dy = (b.y || 0) - (a.y || 0) || 0.01;
  const distance = Math.max(Math.hypot(dx, dy), 1);
  const force = (distance - preferredDistance) * strength;
  const fx = (dx / distance) * force;
  const fy = (dy / distance) * force;
  a.vx = (a.vx || 0) + fx;
  a.vy = (a.vy || 0) + fy;
  b.vx = (b.vx || 0) - fx;
  b.vy = (b.vy || 0) - fy;
}

function settleNodes(size, centerStrength) {
  const nodes = state.graph.nodes;
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = (b.x || 0) - (a.x || 0) || 0.01;
      const dy = (b.y || 0) - (a.y || 0) || 0.01;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const minDistance = Math.max(18, state.style.nodeSize * 2.4 * state.visualEncoding.collisionStrength);
      if (distance >= minDistance) continue;
      const force = (minDistance - distance) * 0.04;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      a.vx -= fx;
      a.vy -= fy;
      b.vx += fx;
      b.vy += fy;
    }
  }
  state.graph.nodes.forEach((node) => {
    node.vx = (node.vx || 0) + (size.width / 2 - node.x) * centerStrength;
    node.vy = (node.vy || 0) + (size.height / 2 - node.y) * centerStrength;
    node.x += node.vx;
    node.y += node.vy;
  });
}

function syncLayoutControls(mode) {
  if (dom.layoutSelect) dom.layoutSelect.value = mode;
  if (dom.layoutModeSelect) dom.layoutModeSelect.value = mode;
  syncHierarchyRulesPanel();
}

function colorForNode(node) {
  const key = cleanCell(node.group || node.type || node.id);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) % 360;
  return `hsl(${hash}, 48%, 52%)`;
}

function createSvg(tag, attrs) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function createEdgeId(source, target, index) {
  return `E-${source}--${target}-${index}`.replace(/\s+/g, "_");
}

function cleanCell(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function parseWeight(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeKey(value) {
  return cleanCell(value).toLowerCase().replace(/[\s-]+/g, "_");
}

function normalizeText(value) {
  return cleanCell(value).toLowerCase();
}

function round(value, digits) {
  const factor = 10 ** digits;
  return Math.round(Number(value || 0) * factor) / factor;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

boot().catch((error) => {
  console.error(error);
  window.alert(`缃戠粶鍒嗘瀽椤靛惎鍔ㄥけ璐ワ細${error.message}`);
});






