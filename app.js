const DB_NAME = "archaeodesk-prototype";
const DB_VERSION = 1;

const SYSTEM_FIELDS = [
  { id: "system-id", label: "ID", type: "text", visibleInList: true, isSystemField: true },
  { id: "system-title", label: "Title", type: "text", visibleInList: true, isSystemField: true },
  { id: "system-date", label: "Date", type: "text", visibleInList: true, isSystemField: true },
  { id: "system-location", label: "Location", type: "text", visibleInList: true, isSystemField: true },
  { id: "system-author", label: "Author", type: "text", visibleInList: false, isSystemField: true },
  { id: "system-source", label: "Source", type: "text", visibleInList: false, isSystemField: true },
  { id: "system-image-path", label: "Image Path", type: "longtext", visibleInList: false, isSystemField: true },
  { id: "system-record", label: "record", type: "text", visibleInList: false, isSystemField: true },
  { id: "system-note", label: "Note", type: "longtext", visibleInList: false, isSystemField: true }
];

const SYSTEM_METADATA_KEYS = SYSTEM_FIELDS.filter((field) => field.label !== "ID").map((field) => field.label);
const DEFAULT_LANGUAGE = "en";
localStorage.setItem("easy-network-language", DEFAULT_LANGUAGE);
const DEFAULT_STORAGE_NAME = "Local Archive";
const LEGACY_DEFAULT_STORAGE_NAMES = new Set(["考古文物项目", "鑰冨彜鏂囩墿椤圭洰"]);
const ALL_STORAGE_KEY = "__all_storages__";
const SILK_ROAD_LUTE_STORAGE = "Silk Road Lute";
const SILK_ROAD_MIGRATION_KEY = "easy-network-silk-road-lute-storage-migrated";

const dom = {
  projectSummary: document.querySelector("#projectSummary"),
  inventoryWorkspaceTab: document.querySelector("#inventoryWorkspaceTab"),
  networkAnalysisLink: document.querySelector("#networkAnalysisLink"),
  shareProjectBtn: document.querySelector("#shareProjectBtn"),
  shareStorageBtn: document.querySelector("#shareStorageBtn"),
  networkWorkspace: document.querySelector("#networkWorkspace"),
  networkFrame: document.querySelector("#networkFrame"),
  undoBtn: document.querySelector("#undoBtn"),
  themeToggleBtn: document.querySelector("#themeToggleBtn"),
  languageToggleBtn: document.querySelector("#languageToggleBtn"),
  workspace: document.querySelector("#workspace"),
  newProjectBtn: document.querySelector("#newProjectBtn"),
  uploadCreateInput: document.querySelector("#uploadCreateInput"),
  createEmptyBtn: document.querySelector("#createEmptyBtn"),
  libraryCreateEmptyBtn: document.querySelector("#libraryCreateEmptyBtn"),
  libraryUploadBtn: document.querySelector("#libraryUploadBtn"),
  addImagesInput: document.querySelector("#addImagesInput"),
  openProjectBtn: document.querySelector("#openProjectBtn"),
  closeProjectDialogBtn: document.querySelector("#closeProjectDialogBtn"),
  projectDialog: document.querySelector("#projectDialog"),
  shareLink: document.querySelector("#shareLink"),
  fieldDialog: document.querySelector("#fieldDialog"),
  closeFieldDialogBtn: document.querySelector("#closeFieldDialogBtn"),
  fieldNameInput: document.querySelector("#fieldNameInput"),
  fieldScopeSelect: document.querySelector("#fieldScopeSelect"),
  fieldScopeFilter: document.querySelector("#fieldScopeFilter"),
  scopeFieldSelect: document.querySelector("#scopeFieldSelect"),
  scopeValueInput: document.querySelector("#scopeValueInput"),
  scopeValueOptions: document.querySelector("#scopeValueOptions"),
  confirmFieldBtn: document.querySelector("#confirmFieldBtn"),
  searchInput: document.querySelector("#searchInput"),
  fieldFilterSelect: document.querySelector("#fieldFilterSelect"),
  valueFilterInput: document.querySelector("#valueFilterInput"),
  clearFiltersBtn: document.querySelector("#clearFiltersBtn"),
  collapseSidebarBtn: document.querySelector("#collapseSidebarBtn"),
  hideSidebarBtn: document.querySelector("#hideSidebarBtn"),
  showSidebarBtn: document.querySelector("#showSidebarBtn"),
  sidebarResizer: document.querySelector("#sidebarResizer"),
  addFieldBtn: document.querySelector("#addFieldBtn"),
  fieldList: document.querySelector("#fieldList"),
  gridViewBtn: document.querySelector("#gridViewBtn"),
  listViewBtn: document.querySelector("#listViewBtn"),
  sortToggleBtn: document.querySelector("#sortToggleBtn"),
  storageViewSelect: document.querySelector("#storageViewSelect"),
  storageBreadcrumb: document.querySelector("#storageBreadcrumb"),
  sortPanel: document.querySelector("#sortPanel"),
  sortRules: document.querySelector("#sortRules"),
  addSortRuleBtn: document.querySelector("#addSortRuleBtn"),
  clearSortBtn: document.querySelector("#clearSortBtn"),
  listControls: document.querySelector("#listControls"),
  tableScrollSlider: document.querySelector("#tableScrollSlider"),
  tableScaleSlider: document.querySelector("#tableScaleSlider"),
  stickyTableScrollbar: document.querySelector("#stickyTableScrollbar"),
  stickyTableScrollbarTrack: document.querySelector("#stickyTableScrollbarTrack"),
  csvImportInput: document.querySelector("#csvImportInput"),
  csvImportFab: document.querySelector("#csvImportFab"),
  selectionSummary: document.querySelector("#selectionSummary"),
  collectionSurface: document.querySelector("#collectionSurface"),
  gridView: document.querySelector("#gridView"),
  listView: document.querySelector("#listView"),
  selectionBox: document.querySelector("#selectionBox"),
  emptyState: document.querySelector("#emptyState"),
  detailResizer: document.querySelector("#detailResizer"),
  detailPane: document.querySelector("#detailPane"),
  detailCollapseBtn: document.querySelector("#detailCollapseBtn"),
  detailEmpty: document.querySelector("#detailEmpty"),
  detailContent: document.querySelector("#detailContent"),
  detailTitle: document.querySelector("#detailTitle"),
  detailId: document.querySelector("#detailId"),
  openDetailTabsBtn: document.querySelector("#openDetailTabsBtn"),
  imageViewport: document.querySelector("#imageViewport"),
  mainImage: document.querySelector("#mainImage"),
  noImageState: document.querySelector("#noImageState"),
  panModeBtn: document.querySelector("#panModeBtn"),
  zoomSlider: document.querySelector("#zoomSlider"),
  resetViewBtn: document.querySelector("#resetViewBtn"),
  deleteImageBtn: document.querySelector("#deleteImageBtn"),
  thumbnailStrip: document.querySelector("#thumbnailStrip"),
  metadataFields: document.querySelector("#metadataFields"),
  metadataBlock: document.querySelector("#metadataBlock"),
  metadataTitle: document.querySelector("#metadataTitle"),
  metadataCollapseBtn: document.querySelector("#metadataCollapseBtn"),
  customFields: document.querySelector("#customFields"),
  addCustomFieldBtn: document.querySelector("#addCustomFieldBtn"),
  columnMenu: document.querySelector("#columnMenu"),
  summaryDialog: document.querySelector("#summaryDialog"),
  closeSummaryDialogBtn: document.querySelector("#closeSummaryDialogBtn"),
  summaryDialogTitle: document.querySelector("#summaryDialogTitle"),
  summaryContent: document.querySelector("#summaryContent"),
  summaryExportCsvBtn: document.querySelector("#summaryExportCsvBtn"),
  expandedView: document.querySelector("#expandedView"),
  expandedTitle: document.querySelector("#expandedTitle"),
  expandedSubTitle: document.querySelector("#expandedSubTitle"),
  expandedImageViewport: document.querySelector("#expandedImageViewport"),
  expandedImage: document.querySelector("#expandedImage"),
  expandedNoImageState: document.querySelector("#expandedNoImageState"),
  expandedPanModeBtn: document.querySelector("#expandedPanModeBtn"),
  expandedZoomSlider: document.querySelector("#expandedZoomSlider"),
  expandedResetViewBtn: document.querySelector("#expandedResetViewBtn"),
  imageBrightnessControl: document.querySelector("#imageBrightnessControl"),
  imageContrastControl: document.querySelector("#imageContrastControl"),
  imageSaturationControl: document.querySelector("#imageSaturationControl"),
  imageExposureControl: document.querySelector("#imageExposureControl"),
  saveImageAdjustmentsBtn: document.querySelector("#saveImageAdjustmentsBtn"),
  expandedMetadataFields: document.querySelector("#expandedMetadataFields"),
  expandedCustomFields: document.querySelector("#expandedCustomFields"),
  expandedInlineMetadataFields: document.querySelector("#expandedInlineMetadataFields"),
  expandedInlineCustomFields: document.querySelector("#expandedInlineCustomFields"),
  expandedInlineAddFieldBtn: document.querySelector("#expandedInlineAddFieldBtn"),
  expandedAddFieldBtn: document.querySelector("#expandedAddFieldBtn"),
  expandedImageTab: document.querySelector("#expandedImageTab"),
  expandedMetadataTab: document.querySelector("#expandedMetadataTab"),
  expandedFieldsTab: document.querySelector("#expandedFieldsTab"),
  closeExpandedBtn: document.querySelector("#closeExpandedBtn")
};

const state = {
  project: null,
  artifacts: [],
  images: [],
  fields: [],
  viewMode: "grid",
  selectedIds: new Set(),
  activeArtifactId: null,
  activeImageId: null,
  noteExpanded: false,
  metadataCollapsed: false,
  detailCollapsed: false,
  detailWidth: 390,
  sortPanelOpen: false,
  sortRules: [],
  tableScale: 1,
  sidebarWidth: Number(localStorage.getItem("easy-network-sidebar-width") || 280),
  sidebarCollapsed: localStorage.getItem("easy-network-sidebar-collapsed") === "true",
  sidebarHidden: localStorage.getItem("easy-network-sidebar-hidden") === "true",
  theme: localStorage.getItem("easy-network-theme") || "light",
  language: DEFAULT_LANGUAGE,
  clipboard: null,
  storageClipboard: null,
  undoStack: [],
  showAllCustomFields: false,
  fieldListStorageName: "",
  fieldListFieldId: "all",
  workspaceMode: "inventory",
  activeStorageName: normalizeStorageName(localStorage.getItem("easy-network-storage-name") || DEFAULT_STORAGE_NAME),
  storages: JSON.parse(localStorage.getItem("easy-network-storages") || `["${DEFAULT_STORAGE_NAME}"]`).map(normalizeStorageName),
  fieldDialogMode: "global",
  expandedOpen: false,
  expandedTab: "image",
  objectUrls: new Map(),
  filters: {
    search: "",
    fieldId: "all",
    value: ""
  }
};

const I18N = {
  zh: {
    newProject: "新建项目",
    uploadCreate: "上传图片建条目",
    createEmpty: "新建条目",
    network: "网络分析",
    projectLink: "项目链接",
    filters: "筛选",
    fieldOrContent: "字段或内容",
    searchPlaceholder: "输入 Title、Location、青铜...",
    field: "字段",
    allFields: "所有字段",
    fieldValue: "字段值",
    valuePlaceholder: "按所选字段过滤",
    fields: "字段",
    archiveItems: "文物条目",
    sort: "排序",
    grid: "大图",
    list: "列表",
    horizontalScroll: "左右滑动",
    tableSize: "表格大小",
    uploadToCurrent: "向当前条目上传图片",
    metadata: "元数据",
    customFields: "自定义字段",
    noCustomFields: "暂无自定义字段",
    noImage: "此条目还没有图片",
    zoom: "缩放",
    expand: "展开",
    collapse: "折叠",
    column: "列",
    deleteImage: "删除当前图片",
    undo: "撤销上一步",
    themeToggle: "切换主题",
    languageToggle: "切换语言",
    storage: "库房",
    newStorage: "新建库房",
    renameStorage: "重命名库房",
    showAllFields: "显示全部字段",
    showCurrentFields: "仅显示本条目字段",
    addThisField: "给本条目添加字段",
    imagePath: "图片路径",
    selectOne: "选择一个条目",
    selectHelp: "右侧会显示图片、缩略图、元数据和自定义字段。",
    summaryTitle: "条目汇总",
    exportCsv: "导出 CSV",
    close: "关闭",
    selected: "已选",
    items: "个条目",
    light: "浅色主题",
    dark: "深色主题"
  },
  en: {
    newProject: "New Project",
    uploadCreate: "Upload Images",
    createEmpty: "New Item",
    network: "Network",
    projectLink: "Project Link",
    filters: "Filters",
    fieldOrContent: "Field or Content",
    searchPlaceholder: "Search Title, Location, bronze...",
    field: "Field",
    allFields: "All Fields",
    fieldValue: "Field Value",
    valuePlaceholder: "Filter by selected field",
    fields: "Fields",
    archiveItems: "Artifacts",
    sort: "Sort",
    grid: "Grid",
    list: "List",
    horizontalScroll: "Horizontal",
    tableSize: "Table Size",
    uploadToCurrent: "Upload Images to Current Item",
    metadata: "Metadata",
    customFields: "Custom Fields",
    noCustomFields: "No custom fields",
    noImage: "No image for this item",
    zoom: "Zoom",
    expand: "Expand",
    collapse: "Collapse",
    column: "Col",
    deleteImage: "Delete Current Image",
    undo: "Undo Last Action",
    themeToggle: "Toggle Theme",
    languageToggle: "Switch Language",
    storage: "Storage",
    newStorage: "New Storage",
    renameStorage: "Rename Storage",
    showAllFields: "Show All Fields",
    showCurrentFields: "Current Fields Only",
    addThisField: "Add Field to This Item",
    imagePath: "Image Path",
    selectOne: "Select an Item",
    selectHelp: "The right pane shows images, thumbnails, metadata, and custom fields.",
    summaryTitle: "Item Summary",
    exportCsv: "Export CSV",
    close: "Close",
    selected: "selected",
    items: "items",
    light: "Light theme",
    dark: "Dark theme"
  }
};

function tr(key) {
  return I18N[state.language]?.[key] || I18N.zh[key] || key;
}

class IndexedArtifactStore {
  constructor() {
    this.dbPromise = this.open();
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("projects")) db.createObjectStore("projects", { keyPath: "id" });
        if (!db.objectStoreNames.contains("artifacts")) db.createObjectStore("artifacts", { keyPath: "id" });
        if (!db.objectStoreNames.contains("images")) db.createObjectStore("images", { keyPath: "id" });
        if (!db.objectStoreNames.contains("fields")) db.createObjectStore("fields", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async tx(storeNames, mode, callback) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeNames, mode);
      const stores = Array.isArray(storeNames)
        ? Object.fromEntries(storeNames.map((name) => [name, tx.objectStore(name)]))
        : tx.objectStore(storeNames);
      const result = callback(stores);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  request(store, method, ...args) {
    return new Promise((resolve, reject) => {
      const request = store[method](...args);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async init() {
    await this.tx(["projects", "fields"], "readwrite", ({ projects, fields }) => {
      projects.count().onsuccess = (event) => {
        if (event.target.result === 0) {
          projects.put({
            id: "project-local-archive",
            title: "考古文物项目",
            description: "本地原型项目，预留线上分享和多人编辑能力。",
            ownerId: null,
            shareToken: "share-local-archive",
            createdAt: now(),
            updatedAt: now()
          });
        }
      };
      fields.count().onsuccess = (event) => {
        if (event.target.result === 0) {
          SYSTEM_FIELDS.forEach((field, index) => {
            fields.put({ ...field, projectId: "project-local-archive", sortOrder: index, createdAt: now() });
          });
        } else {
          fields.getAll().onsuccess = (fieldEvent) => {
            const existingIds = new Set(fieldEvent.target.result.map((field) => field.id));
            SYSTEM_FIELDS.forEach((field, index) => {
              if (!existingIds.has(field.id)) {
                fields.put({ ...field, projectId: "project-local-archive", sortOrder: index, createdAt: now() });
              }
            });
          };
        }
      };
    });
  }

  async getState() {
    const [projects, artifacts, images, fields] = await Promise.all([
      this.getAll("projects"),
      this.getAll("artifacts"),
      this.getAll("images"),
      this.getAll("fields")
    ]);
    return {
      project: projects[0],
      artifacts: artifacts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
      images: images.sort((a, b) => a.sortOrder - b.sortOrder),
      fields: fields.sort((a, b) => a.sortOrder - b.sortOrder)
    };
  }

  async getAll(storeName) {
    return this.tx(storeName, "readonly", (store) => this.request(store, "getAll"));
  }

  async replaceState(snapshot) {
    await this.tx(["projects", "artifacts", "images", "fields"], "readwrite", ({ projects, artifacts, images, fields }) => {
      [projects, artifacts, images, fields].forEach((store) => store.clear());
      snapshot.projects.forEach((item) => projects.put(item));
      snapshot.artifacts.forEach((item) => artifacts.put(item));
      snapshot.images.forEach((item) => images.put(item));
      snapshot.fields.forEach((item) => fields.put(item));
    });
  }

  async createArtifact(input = {}) {
    const metadata = { ...createDefaultMetadata(input.title), ...(input.metadata || {}) };
    const artifact = {
      id: input.id || createArtifactId(),
      projectId: "project-local-archive",
      storageName: input.storageName || currentWriteStorageName(),
      title: input.title || "Untitled artifact",
      createdAt: now(),
      updatedAt: now(),
      version: 1,
      metadata,
      customFields: { ...(input.customFields || {}) },
      imageIds: []
    };
    await this.tx("artifacts", "readwrite", (store) => store.put(artifact));
    return artifact;
  }

  async updateArtifact(id, patch) {
    await this.tx("artifacts", "readwrite", (store) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const current = getRequest.result;
        if (!current) return;
        const next = {
          ...current,
          ...patch,
          metadata: { ...current.metadata, ...(patch.metadata || {}) },
          customFields: { ...current.customFields, ...(patch.customFields || {}) },
          updatedAt: now(),
          version: current.version + 1
        };
        next.title = next.metadata.Title || next.title || "Untitled artifact";
        store.put(next);
      };
    });
  }

  async replaceArtifactCustomFields(id, customFields) {
    await this.tx("artifacts", "readwrite", (store) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const current = getRequest.result;
        if (!current) return;
        store.put({
          ...current,
          customFields: { ...(customFields || {}) },
          updatedAt: now(),
          version: current.version + 1
        });
      };
    });
  }

  async updateArtifactId(oldId, newId) {
    const cleanId = newId.trim();
    if (!cleanId || cleanId === oldId) return { ok: cleanId === oldId, id: oldId };
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(["artifacts", "images", "fields"], "readwrite");
      const artifacts = tx.objectStore("artifacts");
      const images = tx.objectStore("images");
      const fields = tx.objectStore("fields");
      let result = { ok: false, reason: "unknown" };

      artifacts.get(cleanId).onsuccess = (duplicateEvent) => {
        if (duplicateEvent.target.result) {
          result = { ok: false, reason: "duplicate" };
          tx.abort();
          return;
        }

        artifacts.get(oldId).onsuccess = (event) => {
          const artifact = event.target.result;
          if (!artifact) {
            result = { ok: false, reason: "missing" };
            tx.abort();
            return;
          }

          artifacts.delete(oldId);
          artifacts.put({ ...artifact, id: cleanId, updatedAt: now(), version: artifact.version + 1 });
          images.getAll().onsuccess = (imageEvent) => {
            imageEvent.target.result.forEach((image) => {
              if (image.artifactId === oldId) {
                images.put({ ...image, artifactId: cleanId, storageKey: image.storageKey?.replace(oldId, cleanId) || image.storageKey });
              }
            });
          };
          fields.getAll().onsuccess = (fieldEvent) => {
            fieldEvent.target.result.forEach((field) => {
              if (Array.isArray(field.artifactIds) && field.artifactIds.includes(oldId)) {
                fields.put({ ...field, artifactIds: field.artifactIds.map((id) => (id === oldId ? cleanId : id)) });
              }
            });
          };
          result = { ok: true, id: cleanId };
        };
      };

      tx.oncomplete = () => resolve(result);
      tx.onabort = () => resolve(result);
      tx.onerror = () => reject(tx.error);
    });
  }

  async addImages(artifactId, files) {
    if (!files.length) return [];
    const created = [];
    await this.tx(["artifacts", "images"], "readwrite", ({ artifacts, images }) => {
      const artifactRequest = artifacts.get(artifactId);
      artifactRequest.onsuccess = () => {
        const artifact = artifactRequest.result;
        if (!artifact) return;
        const existingCount = artifact.imageIds.length;
        Array.from(files).forEach((file, index) => {
          const image = {
            id: createId("IMG"),
            artifactId,
            storageKey: `local/${artifactId}/${file.name}`,
            blob: file,
            filename: file.name,
            sortOrder: existingCount + index,
            createdAt: now(),
            viewState: { zoom: 1, panX: 0, panY: 0 }
          };
          imageIdsSafePush(artifact, image.id);
          images.put(image);
          created.push(image);
        });
        const paths = Array.from(files).map((file) => `local/${artifactId}/${file.name}`);
        artifact.metadata = {
          ...(artifact.metadata || {}),
          "Image Path": [artifact.metadata?.["Image Path"], ...paths].filter(Boolean).join("; ")
        };
        artifact.updatedAt = now();
        artifact.version += 1;
        artifacts.put(artifact);
      };
    });
    return created;
  }

  async deleteImage(imageId) {
    await this.tx(["artifacts", "images"], "readwrite", ({ artifacts, images }) => {
      const imageRequest = images.get(imageId);
      imageRequest.onsuccess = () => {
        const image = imageRequest.result;
        if (!image) return;
        images.delete(imageId);
        const artifactRequest = artifacts.get(image.artifactId);
        artifactRequest.onsuccess = () => {
          const artifact = artifactRequest.result;
          if (!artifact) return;
          const imageIds = (artifact.imageIds || []).filter((id) => id !== imageId);
          artifacts.put({ ...artifact, imageIds, updatedAt: now(), version: artifact.version + 1 });
        };
      };
    });
  }

  async reorderImages(artifactId, orderedImageIds) {
    await this.tx(["artifacts", "images"], "readwrite", ({ artifacts, images }) => {
      const artifactRequest = artifacts.get(artifactId);
      artifactRequest.onsuccess = () => {
        const artifact = artifactRequest.result;
        if (!artifact) return;
        const existing = new Set(artifact.imageIds || []);
        const ordered = orderedImageIds.filter((id) => existing.has(id));
        (artifact.imageIds || []).forEach((id) => {
          if (!ordered.includes(id)) ordered.push(id);
        });
        artifacts.put({ ...artifact, imageIds: ordered, updatedAt: now(), version: artifact.version + 1 });
        ordered.forEach((imageId, sortOrder) => {
          const imageRequest = images.get(imageId);
          imageRequest.onsuccess = () => {
            const image = imageRequest.result;
            if (image) images.put({ ...image, sortOrder });
          };
        });
      };
    });
  }

  async deleteArtifacts(ids) {
    const idSet = new Set(ids);
    if (!idSet.size) return;
    await this.tx(["artifacts", "images", "fields"], "readwrite", ({ artifacts, images, fields }) => {
      idSet.forEach((id) => artifacts.delete(id));
      images.getAll().onsuccess = (event) => {
        event.target.result.forEach((image) => {
          if (idSet.has(image.artifactId)) images.delete(image.id);
        });
      };
      fields.getAll().onsuccess = (event) => {
        event.target.result.forEach((field) => {
          if (Array.isArray(field.artifactIds)) {
            fields.put({ ...field, artifactIds: field.artifactIds.filter((id) => !idSet.has(id)) });
          }
        });
      };
    });
  }

  async pasteArtifacts(payload) {
    if (!payload?.artifacts?.length) return [];
    const createdIds = [];
    await this.tx(["artifacts", "images"], "readwrite", ({ artifacts, images }) => {
      payload.artifacts.forEach((artifact) => {
        const oldId = artifact.id;
        const newId = createArtifactId();
        const clonedImageIds = [];
        (payload.images || [])
          .filter((image) => image.artifactId === oldId)
          .forEach((image, index) => {
            const imageId = createId("IMG");
            clonedImageIds.push(imageId);
            images.put({
              ...image,
              id: imageId,
              artifactId: newId,
              storageKey: `local/${newId}/${image.filename || imageId}`,
              sortOrder: index,
              createdAt: now()
            });
          });
        artifacts.put({
          ...artifact,
          id: newId,
          title: `${artifact.title || artifact.metadata?.Title || "Untitled artifact"} copy`,
          metadata: { ...(artifact.metadata || {}), Title: `${artifact.metadata?.Title || artifact.title || "Untitled artifact"} copy` },
          storageName: currentWriteStorageName(),
          imageIds: clonedImageIds,
          createdAt: now(),
          updatedAt: now(),
          version: 1
        });
        createdIds.push(newId);
      });
    });
    return createdIds;
  }

  async updateImageViewState(imageId, viewState) {
    await this.tx("images", "readwrite", (store) => {
      const request = store.get(imageId);
      request.onsuccess = () => {
        const image = request.result;
        if (!image) return;
        store.put({ ...image, viewState: { ...image.viewState, ...viewState } });
      };
    });
  }

  async createField(label, options = {}) {
    const cleanLabel = label.trim();
    if (!cleanLabel) return null;
    const field = {
      id: createId("FIELD"),
      projectId: "project-local-archive",
      label: cleanLabel,
      type: "text",
      visibleInList: true,
      isSystemField: false,
      storageName: options.storageName || currentWriteStorageName(),
      linkedStorageName: options.linkedStorageName || "",
      appliesTo: options.appliesTo || "all",
      artifactIds: options.artifactIds || [],
      sortOrder: this.fieldsSortOrderHint(),
      createdAt: now()
    };
    await this.tx("fields", "readwrite", (store) => store.put(field));
    return field;
  }

  fieldsSortOrderHint() {
    return Date.now();
  }

  async updateField(fieldId, patch) {
    await this.tx("fields", "readwrite", (store) => {
      const request = store.get(fieldId);
      request.onsuccess = () => {
        const field = request.result;
        if (!field) return;
        store.put({ ...field, ...patch });
      };
    });
  }

  async deleteField(fieldId) {
    await this.tx(["fields", "artifacts"], "readwrite", ({ fields, artifacts }) => {
      fields.delete(fieldId);
      artifacts.getAll().onsuccess = (event) => {
        event.target.result.forEach((artifact) => {
          if (artifact.customFields && Object.prototype.hasOwnProperty.call(artifact.customFields, fieldId)) {
            const nextCustomFields = { ...artifact.customFields };
            delete nextCustomFields[fieldId];
            artifacts.put({ ...artifact, customFields: nextCustomFields, updatedAt: now(), version: artifact.version + 1 });
          }
        });
      };
    });
  }

  async deleteFields(fieldIds) {
    const ids = new Set(fieldIds);
    if (!ids.size) return;
    await this.tx(["fields", "artifacts"], "readwrite", ({ fields, artifacts }) => {
      ids.forEach((fieldId) => fields.delete(fieldId));
      artifacts.getAll().onsuccess = (event) => {
        event.target.result.forEach((artifact) => {
          const nextCustomFields = { ...(artifact.customFields || {}) };
          let changed = false;
          ids.forEach((fieldId) => {
            if (Object.prototype.hasOwnProperty.call(nextCustomFields, fieldId)) {
              delete nextCustomFields[fieldId];
              changed = true;
            }
          });
          if (changed) artifacts.put({ ...artifact, customFields: nextCustomFields, updatedAt: now(), version: artifact.version + 1 });
        });
      };
    });
  }
}

const store = new IndexedArtifactStore();

function now() {
  return new Date().toISOString();
}

function createId(prefix) {
  if (crypto.randomUUID) return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  return `${prefix}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
}

function createArtifactId() {
  const prefix = storagePrefix(state.activeStorageName);
  const used = state.artifacts
    .map((artifact) => String(artifact.id || ""))
    .filter((id) => id.startsWith(`${prefix}-`))
    .map((id) => Number(id.split("-").pop()))
    .filter(Number.isFinite);
  const next = Math.max(0, ...used) + 1;
  return `${prefix}-${String(next).padStart(3, "0")}`;
}

function storagePrefix(name) {
  const clean = String(name || DEFAULT_STORAGE_NAME).trim();
  const ascii = clean.match(/[A-Za-z0-9]+/g);
  if (ascii?.length) return ascii.map((part) => part[0]).join("").slice(0, 4).toUpperCase();
  const code = Array.from(clean).slice(0, 3).map((char) => char.codePointAt(0).toString(36).slice(-1)).join("");
  return (code || "ART").toUpperCase();
}

function createDefaultMetadata(title = "") {
  return SYSTEM_METADATA_KEYS.reduce((metadata, key) => {
    metadata[key] = key === "Title" ? title : key === "record" ? new Date().toISOString() : "";
    return metadata;
  }, {});
}

function imageIdsSafePush(artifact, imageId) {
  if (!Array.isArray(artifact.imageIds)) artifact.imageIds = [];
  artifact.imageIds.push(imageId);
}

function ensureCollectionToolbarLayout() {
  if (dom.tableScaleSlider) {
    dom.tableScaleSlider.min = "30";
    dom.tableScaleSlider.max = "260";
  }
  const titleBlock = document.querySelector(".collection-toolbar > div");
  const heading = titleBlock?.querySelector("h2");
  if (titleBlock && heading && !dom.storageBreadcrumb) {
    dom.storageBreadcrumb = document.createElement("div");
    dom.storageBreadcrumb.id = "storageBreadcrumb";
    dom.storageBreadcrumb.className = "storage-breadcrumb";
    heading.after(dom.storageBreadcrumb);
  }
  if (dom.sortToggleBtn && dom.listControls && dom.sortToggleBtn.parentElement !== dom.listControls) {
    dom.listControls.append(dom.sortToggleBtn);
  }
  if (!dom.csvImportInput) {
    dom.csvImportInput = document.createElement("input");
    dom.csvImportInput.id = "csvImportInput";
    dom.csvImportInput.className = "visually-hidden";
    dom.csvImportInput.type = "file";
    dom.csvImportInput.accept = ".csv,text/csv";
    dom.workspace?.append(dom.csvImportInput);
  }
  if (!dom.csvImportFab && dom.collectionSurface) {
    dom.csvImportFab = document.createElement("label");
    dom.csvImportFab.id = "csvImportFab";
    dom.csvImportFab.className = "csv-import-fab";
    dom.csvImportFab.htmlFor = "csvImportInput";
    dom.csvImportFab.textContent = "CSV";
    (dom.collectionSurface.closest(".collection-pane") || dom.collectionSurface).append(dom.csvImportFab);
  }
  const topbarActions = document.querySelector(".topbar-actions");
  [dom.shareStorageBtn, dom.shareProjectBtn].forEach((button) => {
    if (!button || !topbarActions || button.parentElement === topbarActions) return;
    button.className = "button subtle compact";
    topbarActions.append(button);
  });
}

async function boot() {
  await store.init();
  await refreshState();
  ensureStorageState();
  ensureCollectionToolbarLayout();
  applyTheme();
  updateUndoButton();
  bindEvents();
  applyLanguage();
  render();
  applyRoute();
}

async function refreshState() {
  const next = await store.getState();
  state.project = next.project;
  state.artifacts = next.artifacts;
  state.images = next.images;
  state.fields = next.fields;
  await migrateDefaultStorageToSilkRoadLute();
  notifyNetworkInventoryChanged();
}

async function migrateDefaultStorageToSilkRoadLute() {
  if (localStorage.getItem(SILK_ROAD_MIGRATION_KEY)) return;
  if (!state.artifacts.length) return;
  const storageNames = [...new Set(state.artifacts.map(getArtifactStorageName))];
  if (storageNames.length !== 1 || storageNames[0] !== DEFAULT_STORAGE_NAME) return;
  await Promise.all(state.artifacts.map((artifact) => store.updateArtifact(artifact.id, { storageName: SILK_ROAD_LUTE_STORAGE })));
  state.artifacts = state.artifacts.map((artifact) => ({ ...artifact, storageName: SILK_ROAD_LUTE_STORAGE }));
  state.storages = [SILK_ROAD_LUTE_STORAGE];
  if (state.activeStorageName === DEFAULT_STORAGE_NAME) state.activeStorageName = SILK_ROAD_LUTE_STORAGE;
  localStorage.setItem(SILK_ROAD_MIGRATION_KEY, "1");
  ensureStorageState();
}

async function pushUndoSnapshot() {
  const [projects, artifacts, images, fields] = await Promise.all([
    store.getAll("projects"),
    store.getAll("artifacts"),
    store.getAll("images"),
    store.getAll("fields")
  ]);
  state.undoStack.push({
    projects: projects.map(cloneRecord),
    artifacts: artifacts.map(cloneRecord),
    images: images.map(cloneRecord),
    fields: fields.map(cloneRecord)
  });
  if (state.undoStack.length > 20) state.undoStack.shift();
  updateUndoButton();
}

function cloneRecord(record) {
  return {
    ...record,
    metadata: record.metadata ? { ...record.metadata } : record.metadata,
    customFields: record.customFields ? { ...record.customFields } : record.customFields,
    imageIds: Array.isArray(record.imageIds) ? [...record.imageIds] : record.imageIds,
    artifactIds: Array.isArray(record.artifactIds) ? [...record.artifactIds] : record.artifactIds,
    viewState: record.viewState ? { ...record.viewState } : record.viewState
  };
}

async function undoLastAction() {
  const snapshot = state.undoStack.pop();
  if (!snapshot) return;
  await store.replaceState(snapshot);
  await refreshState();
  state.selectedIds = new Set();
  state.activeArtifactId = state.artifacts[0]?.id || null;
  state.activeImageId = null;
  updateUndoButton();
  render();
}

function updateUndoButton() {
  if (dom.undoBtn) dom.undoBtn.disabled = state.undoStack.length === 0;
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("easy-network-theme", theme);
  applyTheme();
}

function ensureStorageState() {
  state.storages = Array.from(new Set(state.storages.map(normalizeStorageName).filter((name) => name && name !== ALL_STORAGE_KEY)));
  if (state.activeStorageName !== ALL_STORAGE_KEY) state.activeStorageName = normalizeStorageName(state.activeStorageName);
  if (state.activeStorageName !== ALL_STORAGE_KEY && !state.storages.includes(state.activeStorageName)) state.storages.push(state.activeStorageName);
  localStorage.setItem("easy-network-storages", JSON.stringify(state.storages));
  localStorage.setItem("easy-network-storage-name", state.activeStorageName);
}

function setActiveStorage(name) {
  const clean = normalizeStorageName(name);
  if (!clean) return;
  state.activeStorageName = clean;
  if (!state.storages.includes(clean)) state.storages.push(clean);
  ensureStorageState();
  state.selectedIds = new Set();
  state.activeArtifactId = null;
  state.activeImageId = null;
  render();
}

function openArtifactFromNetwork(artifactId) {
  const artifact = state.artifacts.find((item) => item.id === artifactId);
  if (!artifact) return;
  showWorkspaceMode("inventory", false);
  state.activeStorageName = getArtifactStorageName(artifact);
  ensureStorageState();
  state.activeArtifactId = artifact.id;
  state.selectedIds = new Set([artifact.id]);
  state.activeImageId = artifact.imageIds?.[0] || null;
  window.location.hash = `#/items/${encodeURIComponent(artifact.id)}`;
  render();
}

function getArtifactStorageName(artifact) {
  return normalizeStorageName(artifact.storageName || DEFAULT_STORAGE_NAME);
}

function currentWriteStorageName() {
  return state.activeStorageName === ALL_STORAGE_KEY ? (state.storages[0] || DEFAULT_STORAGE_NAME) : state.activeStorageName;
}

function normalizeStorageName(name) {
  const clean = String(name || DEFAULT_STORAGE_NAME).trim();
  return LEGACY_DEFAULT_STORAGE_NAMES.has(clean) ? DEFAULT_STORAGE_NAME : clean;
}

function getAllStorageNames() {
  const names = new Set([
    ...state.storages,
    ...state.artifacts.map(getArtifactStorageName),
    ...state.fields.flatMap((field) => [
      field.storageName,
      field.linkedStorageName,
      ...(Array.isArray(field.storageNames) ? field.storageNames : [])
    ])
  ]);
  names.delete("");
  names.delete(null);
  names.delete(undefined);
  names.delete(ALL_STORAGE_KEY);
  return Array.from(names).filter(Boolean);
}

function fieldBelongsToStorage(field, storageName) {
  if (!field || field.isSystemField) return true;
  const target = storageName || currentWriteStorageName();
  if (Array.isArray(field.storageNames) && field.storageNames.length) return field.storageNames.includes(target);
  if (field.storageName) return field.storageName === target || field.linkedStorageName === target;
  return target === SILK_ROAD_LUTE_STORAGE || target === DEFAULT_STORAGE_NAME;
}

function fieldIsDefinedInStorage(field, storageName) {
  if (!field || field.isSystemField || !storageName) return false;
  return state.artifacts.some((artifact) => (
    getArtifactStorageName(artifact) === storageName
    && Object.prototype.hasOwnProperty.call(artifact.customFields || {}, field.id)
  ));
}

function fieldsForStorage(storageName, options = {}) {
  return state.fields.filter((field) => {
    if (field.isSystemField) return true;
    if (!options.includeCustom) return false;
    return fieldBelongsToStorage(field, storageName);
  });
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
  if (dom.themeToggleBtn) {
    dom.themeToggleBtn.textContent = state.theme === "light" ? "☀" : "☾";
    dom.themeToggleBtn.classList.toggle("active", state.theme === "light");
  }
  dom.networkFrame?.contentWindow?.postMessage({ type: "easy-network-theme-changed", theme: state.theme }, window.location.origin);
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  if (dom.inventoryWorkspaceTab) dom.inventoryWorkspaceTab.textContent = "Inventory";
  dom.languageToggleBtn?.classList.toggle("is-en", state.language === "en");
  const languageParts = dom.languageToggleBtn?.querySelectorAll("span");
  if (languageParts?.length >= 2) {
    languageParts[0].textContent = state.language === "en" ? "ZH" : "中";
    languageParts[1].textContent = "EN";
  }
  dom.undoBtn.title = tr("undo");
  dom.undoBtn.setAttribute("aria-label", tr("undo"));
  dom.newProjectBtn.textContent = tr("newStorage");
  document.querySelectorAll("label[for='uploadCreateInput']").forEach((label) => {
    label.textContent = tr("uploadCreate");
  });
  dom.createEmptyBtn.textContent = tr("createEmpty");
  if (dom.libraryCreateEmptyBtn) dom.libraryCreateEmptyBtn.textContent = state.language === "en" ? "New Item" : "新建条目";
  dom.networkAnalysisLink.textContent = tr("network");
  dom.openProjectBtn.textContent = tr("projectLink");
  dom.themeToggleBtn.title = tr("themeToggle");
  dom.themeToggleBtn.setAttribute("aria-label", tr("themeToggle"));
  dom.languageToggleBtn.title = tr("languageToggle");
  dom.languageToggleBtn.setAttribute("aria-label", tr("languageToggle"));
  setText(".sidebar .panel:nth-of-type(1) .section-title span", tr("filters"));
  setText("label[for='searchInput']", tr("fieldOrContent"));
  dom.searchInput.placeholder = tr("searchPlaceholder");
  setText("label[for='fieldFilterSelect']", tr("field"));
  setText("label[for='valueFilterInput']", tr("fieldValue"));
  dom.valueFilterInput.placeholder = tr("valuePlaceholder");
  setText(".sidebar .panel:nth-of-type(2) .section-title span", tr("fields"));
  setText(".collection-toolbar h2", tr("archiveItems"));
  setText("#emptyState h3", state.language === "en" ? "No items yet" : "还没有文物条目");
  setText("#emptyState p", state.language === "en" ? "Upload images to create items, or start with a blank item." : "上传图片可以直接创建条目，也可以先新建条目。");
  setText(".architecture-note .section-title", state.language === "en" ? "Online Version Placeholder" : "线上版本预留");
  const architectureLines = document.querySelectorAll(".architecture-note p");
  if (architectureLines[0]) architectureLines[0].textContent = "Project -> Artifact -> Images / Metadata";
  if (architectureLines[1]) {
    architectureLines[1].textContent = state.language === "en"
      ? "Currently using IndexedDB; it can later be replaced with a PostgreSQL API and object storage."
      : "当前使用 IndexedDB；未来可替换为 PostgreSQL API 与对象存储。";
  }
  dom.sortToggleBtn.textContent = tr("sort");
  if (dom.addSortRuleBtn) dom.addSortRuleBtn.textContent = state.language === "en" ? "Add Sort Level" : "添加排序层级";
  if (dom.clearSortBtn) dom.clearSortBtn.textContent = state.language === "en" ? "Clear Sort" : "清空排序";
  dom.gridViewBtn.textContent = tr("grid");
  dom.listViewBtn.textContent = tr("list");
  const listLabels = dom.listControls.querySelectorAll("label");
  if (listLabels[0]) listLabels[0].firstChild.textContent = `${tr("horizontalScroll")} `;
  if (listLabels[1]) listLabels[1].firstChild.textContent = `${tr("tableSize")} `;
  document.querySelector("label[for='addImagesInput']").textContent = tr("uploadToCurrent");
  document.querySelectorAll("label[for='zoomSlider'], label[for='expandedZoomSlider']").forEach((label) => {
    label.textContent = tr("zoom");
  });
  dom.openDetailTabsBtn.textContent = tr("expand");
  dom.deleteImageBtn.title = tr("deleteImage");
  dom.deleteImageBtn.setAttribute("aria-label", tr("deleteImage"));
  setText("#metadataTitle", tr("metadata"));
  if (dom.metadataCollapseBtn) {
    dom.metadataCollapseBtn.textContent = state.metadataCollapsed ? "⌄" : "⌃";
    dom.metadataCollapseBtn.title = state.metadataCollapsed
      ? (state.language === "en" ? "Expand metadata" : "展开元数据")
      : (state.language === "en" ? "Collapse metadata" : "折叠元数据");
    dom.metadataCollapseBtn.setAttribute("aria-label", dom.metadataCollapseBtn.title);
  }
  setText(".metadata-block:nth-of-type(2) .section-title span", tr("customFields"));
  dom.noImageState.textContent = tr("noImage");
  dom.expandedNoImageState.textContent = tr("noImage");
  dom.detailEmpty.querySelector("h2").textContent = tr("selectOne");
  dom.detailEmpty.querySelector("p").textContent = tr("selectHelp");
  dom.summaryDialogTitle.textContent = tr("summaryTitle");
  dom.summaryExportCsvBtn.textContent = tr("exportCsv");
  dom.closeExpandedBtn.textContent = tr("close");
  if (dom.sortRules?.children.length) renderSortControls();
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function showWorkspaceMode(mode, updateHash = true) {
  state.workspaceMode = mode === "network" ? "network" : "inventory";
  const isNetwork = state.workspaceMode === "network";
  dom.workspace?.classList.toggle("hidden", isNetwork);
  dom.networkWorkspace?.classList.toggle("hidden", !isNetwork);
  dom.inventoryWorkspaceTab?.classList.toggle("active", !isNetwork);
  dom.networkAnalysisLink?.classList.toggle("active", isNetwork);
  document.body.dataset.workspace = state.workspaceMode;

  if (isNetwork && dom.networkFrame && !dom.networkFrame.src) {
    dom.networkFrame.src = dom.networkFrame.dataset.src || "network.html?embedded=1";
  }
  if (isNetwork) notifyNetworkInventoryChanged();

  if (!updateHash) return;
  if (isNetwork) {
    window.location.hash = "network";
  } else if (window.location.hash === "#network") {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function notifyNetworkInventoryChanged() {
  localStorage.setItem("easy-network-inventory-updated-at", String(Date.now()));
  dom.networkFrame?.contentWindow?.postMessage({ type: "easy-network-inventory-updated" }, window.location.origin);
}

function bindEvents() {
  dom.undoBtn?.addEventListener("click", undoLastAction);
  dom.themeToggleBtn?.addEventListener("click", () => setTheme(state.theme === "light" ? "dark" : "light"));
  dom.languageToggleBtn?.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    localStorage.setItem("easy-network-language", state.language);
    applyLanguage();
    render();
  });
  dom.inventoryWorkspaceTab?.addEventListener("click", () => showWorkspaceMode("inventory"));
  dom.networkAnalysisLink?.addEventListener("click", (event) => {
    event.preventDefault();
    showWorkspaceMode("network");
  });
  dom.shareStorageBtn?.addEventListener("click", () => createEditableShareLink("storage"));
  dom.shareProjectBtn?.addEventListener("click", () => createEditableShareLink("project"));
  window.addEventListener("message", (event) => {
    if (event.data?.type === "easy-network-show-workspace") {
      showWorkspaceMode(event.data.workspace);
    } else if (event.data?.type === "easy-network-open-artifact") {
      openArtifactFromNetwork(event.data.artifactId);
    }
  });
  dom.uploadCreateInput.addEventListener("change", handleUploadCreate);
  dom.csvImportInput?.addEventListener("change", handleCsvImport);
  dom.createEmptyBtn.addEventListener("click", handleCreateEmpty);
  dom.libraryCreateEmptyBtn?.addEventListener("click", handleCreateEmpty);
  dom.addImagesInput.addEventListener("change", handleAddImages);
  dom.deleteImageBtn?.addEventListener("click", deleteActiveImage);
  dom.searchInput.addEventListener("input", () => {
    state.filters.search = dom.searchInput.value;
    renderCollection();
  });
  dom.fieldFilterSelect.addEventListener("change", () => {
    state.filters.fieldId = dom.fieldFilterSelect.value;
    renderCollection();
  });
  dom.valueFilterInput.addEventListener("input", () => {
    state.filters.value = dom.valueFilterInput.value;
    renderCollection();
  });
  dom.clearFiltersBtn?.addEventListener("click", () => {
    state.filters = { search: "", fieldId: "all", value: "" };
    dom.searchInput.value = "";
    dom.fieldFilterSelect.value = "all";
    dom.valueFilterInput.value = "";
    renderCollection();
  });
  dom.addFieldBtn.addEventListener("click", openFieldDialog);
  dom.addCustomFieldBtn.addEventListener("click", openFieldDialog);
  dom.expandedAddFieldBtn.addEventListener("click", openFieldDialog);
  dom.expandedInlineAddFieldBtn?.addEventListener("click", openFieldDialog);
  dom.closeFieldDialogBtn.addEventListener("click", closeFieldDialog);
  dom.fieldDialog.addEventListener("click", (event) => {
    if (event.target === dom.fieldDialog) closeFieldDialog();
  });
  dom.fieldScopeSelect.addEventListener("change", renderFieldScopeControls);
  dom.scopeFieldSelect.addEventListener("change", renderScopeValueOptions);
  dom.confirmFieldBtn.addEventListener("click", confirmCreateField);
  dom.newProjectBtn.addEventListener("click", createStorageFromPrompt);
  dom.projectSummary.addEventListener("dblclick", renameActiveStorage);
  document.querySelector(".collection-toolbar h2")?.addEventListener("dblclick", renameActiveStorage);
  dom.gridViewBtn.addEventListener("click", () => setViewMode("grid"));
  dom.listViewBtn.addEventListener("click", () => setViewMode("list"));
  dom.sortToggleBtn.addEventListener("click", () => {
    state.sortPanelOpen = !state.sortPanelOpen;
    renderSortControls();
  });
  dom.addSortRuleBtn.addEventListener("click", addSortRule);
  dom.clearSortBtn.addEventListener("click", () => {
    state.sortRules = [];
    renderSortControls();
    renderCollection();
  });
  dom.storageViewSelect?.addEventListener("change", () => {
    setActiveStorage(dom.storageViewSelect.value);
  });
  dom.metadataCollapseBtn?.addEventListener("click", () => {
    state.metadataCollapsed = !state.metadataCollapsed;
    renderDetail();
  });
  dom.tableScrollSlider.addEventListener("input", syncTableScrollFromSlider);
  dom.stickyTableScrollbar?.addEventListener("scroll", syncTableScrollFromStickyBar);
  dom.tableScaleSlider.addEventListener("input", () => {
    state.tableScale = Number(dom.tableScaleSlider.value) / 100;
    dom.listView.style.setProperty("--table-scale", state.tableScale);
    requestAnimationFrame(syncTableScrollSlider);
  });
  dom.collapseSidebarBtn.addEventListener("click", toggleSidebarPanel);
  dom.hideSidebarBtn?.addEventListener("click", hideSidebarPanel);
  dom.showSidebarBtn.addEventListener("click", showSidebarPanel);
  dom.sidebarResizer.addEventListener("pointerdown", beginSidebarResize);
  dom.collectionSurface.addEventListener("pointerdown", beginBoxSelect);
  dom.collectionSurface.addEventListener("scroll", syncTableScrollSlider);
  dom.detailCollapseBtn.addEventListener("click", toggleDetailPanel);
  dom.detailResizer.addEventListener("pointerdown", beginDetailResize);
  dom.openProjectBtn.addEventListener("click", openProjectDialog);
  dom.closeProjectDialogBtn.addEventListener("click", () => dom.projectDialog.classList.add("hidden"));
  dom.projectDialog.addEventListener("click", (event) => {
    if (event.target === dom.projectDialog) dom.projectDialog.classList.add("hidden");
  });
  dom.openDetailTabsBtn.addEventListener("click", openExpandedView);
  dom.closeSummaryDialogBtn?.addEventListener("click", closeSummaryDialog);
  dom.summaryDialog?.addEventListener("click", (event) => {
    if (event.target === dom.summaryDialog) closeSummaryDialog();
  });
  dom.summaryExportCsvBtn?.addEventListener("click", () => exportArtifactsCsv(getSelectedArtifacts()));
  dom.closeExpandedBtn.addEventListener("click", closeExpandedView);
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => setExpandedTab(button.dataset.tab));
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#columnMenu")) dom.columnMenu.classList.add("hidden");
  });
  window.addEventListener("hashchange", applyRoute);
  setupImageViewer({
    viewport: dom.imageViewport,
    img: dom.mainImage,
    noImage: dom.noImageState,
    slider: dom.zoomSlider,
    panButton: dom.panModeBtn,
    resetButton: dom.resetViewBtn,
    getImage: getActiveImage,
    onChange: updateActiveImageViewState
  });
  setupImageViewer({
    viewport: dom.expandedImageViewport,
    img: dom.expandedImage,
    noImage: dom.expandedNoImageState,
    slider: dom.expandedZoomSlider,
    panButton: dom.expandedPanModeBtn,
    resetButton: dom.expandedResetViewBtn,
    getImage: getActiveImage,
    onChange: updateActiveImageViewState
  });
  [dom.imageBrightnessControl, dom.imageContrastControl, dom.imageSaturationControl, dom.imageExposureControl].forEach((control) => {
    control?.addEventListener("input", updateImageAdjustmentFromControls);
  });
  dom.saveImageAdjustmentsBtn?.addEventListener("click", saveActiveImageAdjustments);
}

async function handleUploadCreate(event) {
  const files = Array.from(event.target.files || []);
  event.target.value = "";
  if (files.length) await pushUndoSnapshot();
  if (files.length > 1) {
    const mergeIntoOne = window.confirm(
      state.language === "en"
        ? "You selected multiple images.\n\nOK: add them to one new item.\nCancel: create one new item per image."
        : "你选择了多张图片。\n\n确定：归入同一个新条目。\n取消：每张图片创建一个新条目。"
    );
    if (mergeIntoOne) {
      const artifact = await store.createArtifact({ title: files[0].name.replace(/\.[^.]+$/, "") });
      await store.addImages(artifact.id, files);
      state.activeArtifactId = artifact.id;
      state.selectedIds = new Set([artifact.id]);
      window.location.hash = `#/items/${artifact.id}`;
      await refreshState();
      render();
      return;
    }
  }
  for (const file of files) {
    const artifact = await store.createArtifact({ title: file.name.replace(/\.[^.]+$/, "") });
    await store.addImages(artifact.id, [file]);
    state.activeArtifactId = artifact.id;
    state.selectedIds = new Set([artifact.id]);
    window.location.hash = `#/items/${artifact.id}`;
  }
  await refreshState();
  render();
}

async function handleCreateEmpty() {
  await pushUndoSnapshot();
  const artifact = await store.createArtifact({ title: "Untitled artifact" });
  state.activeArtifactId = artifact.id;
  state.selectedIds = new Set([artifact.id]);
  window.location.hash = `#/items/${artifact.id}`;
  await refreshState();
  render();
}

async function handleCsvImport(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  const text = await file.text();
  const rows = parseCsvRows(text).filter((row) => row.some((cell) => cleanCell(cell)));
  if (rows.length < 2) {
    window.alert(state.language === "en" ? "No CSV rows found." : "CSV 没有可导入的行。");
    return;
  }
  const headers = rows[0].map((header, index) => cleanCell(header) || `Column ${index + 1}`);
  const records = rows.slice(1);
  const idIndex = findCsvColumn(headers, ["id", "uniqueid", "unique_id", "unique id"]);
  const titleIndex = findCsvColumn(headers, ["title", "label", "name", "标题", "名称"]);
  const systemByHeader = new Map(SYSTEM_FIELDS.map((field) => [normalizeHeader(field.label), field]));
  const storageName = currentWriteStorageName();
  const existingCustom = new Map(
    state.fields
      .filter((field) => !field.isSystemField && fieldBelongsToStorage(field, storageName))
      .map((field) => [normalizeHeader(field.label), field])
  );
  const fieldByColumn = new Map();
  await pushUndoSnapshot();
  for (let index = 0; index < headers.length; index += 1) {
    const header = headers[index];
    const normalized = normalizeHeader(header);
    if (!normalized || index === idIndex || systemByHeader.has(normalized)) continue;
    let field = existingCustom.get(normalized);
    if (!field) {
      field = await store.createField(header, { storageName, appliesTo: "all" });
      existingCustom.set(normalized, field);
    }
    fieldByColumn.set(index, field);
  }
  const usedIds = new Set(state.artifacts.map((artifact) => artifact.id));
  let imported = 0;
  for (const row of records) {
    const csvId = idIndex >= 0 ? cleanCell(row[idIndex]) : "";
    const id = csvId && !usedIds.has(csvId) ? csvId : nextImportedArtifactId(storageName, usedIds);
    usedIds.add(id);
    const title = cleanCell(row[titleIndex]) || cleanCell(row[0]) || "Imported item";
    const metadata = createDefaultMetadata(title);
    headers.forEach((header, index) => {
      const field = systemByHeader.get(normalizeHeader(header));
      if (!field || field.label === "ID") return;
      metadata[field.label] = cleanCell(row[index]);
    });
    metadata.Title = metadata.Title || title;
    const customFields = {};
    fieldByColumn.forEach((field, index) => {
      customFields[field.id] = cleanCell(row[index]);
    });
    await store.createArtifact({ id, title: metadata.Title || title, storageName, metadata, customFields });
    imported += 1;
  }
  await refreshState();
  render();
  const fieldCount = fieldByColumn.size;
  window.alert(state.language === "en"
    ? `Imported ${imported} items and ${fieldCount} fields.`
    : `已导入 ${imported} 个条目和 ${fieldCount} 个字段。`);
}

handleCsvImport = async function handleCsvImportWithMapping(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  const text = await file.text();
  const rows = parseCsvRows(text).filter((row) => row.some((cell) => cleanCell(cell)));
  if (rows.length < 2) {
    window.alert(state.language === "en" ? "No CSV rows found." : "No CSV rows found.");
    return;
  }
  const headers = rows[0].map((header, index) => cleanCell(header) || `Column ${index + 1}`);
  const records = rows.slice(1);
  const mapping = await openCsvMappingDialog(headers, file);
  if (!mapping) return;
  const storageName = mapping.targetMode === "new"
    ? uniqueStorageName(mapping.newStorageName || file.name.replace(/\.[^.]+$/, "") || "Imported CSV")
    : (mapping.mergeStorageName || currentWriteStorageName());
  const systemByLabel = new Map(SYSTEM_FIELDS.map((field) => [field.label, field]));
  const fieldByColumn = new Map();
  let idIndex = -1;
  let titleIndex = -1;

  await pushUndoSnapshot();
  if (mapping.targetMode === "new") {
    state.activeStorageName = storageName;
    if (!state.storages.includes(storageName)) state.storages.push(storageName);
    ensureStorageState();
  }

  for (let index = 0; index < mapping.columns.length; index += 1) {
    const column = mapping.columns[index];
    const action = column.action;
    if (!action || action === "skip") continue;
    if (action.startsWith("metadata:")) {
      const label = action.slice("metadata:".length);
      if (label === "ID") idIndex = index;
      if (label === "Title") titleIndex = index;
      continue;
    }
    if (action.startsWith("custom-existing:")) {
      const field = state.fields.find((candidate) => candidate.id === action.slice("custom-existing:".length));
      if (!field) continue;
      if (!fieldBelongsToStorage(field, storageName)) {
        const storageNames = new Set(Array.isArray(field.storageNames) ? field.storageNames : []);
        if (field.storageName) storageNames.add(field.storageName);
        storageNames.add(storageName);
        await store.updateField(field.id, { storageNames: Array.from(storageNames) });
        field.storageNames = Array.from(storageNames);
      }
      fieldByColumn.set(index, field);
      continue;
    }
    if (action.startsWith("custom-new:")) {
      const label = action.slice("custom-new:".length) || column.header;
      const field = await store.createField(label, { storageName, appliesTo: "all" });
      if (field) fieldByColumn.set(index, field);
    }
  }

  const usedIds = new Set(state.artifacts.map((artifact) => artifact.id));
  let imported = 0;
  for (const row of records) {
    const csvId = idIndex >= 0 ? cleanCell(row[idIndex]) : "";
    const id = csvId && !usedIds.has(csvId) ? csvId : nextImportedArtifactId(storageName, usedIds);
    usedIds.add(id);
    const title = cleanCell(row[titleIndex]) || cleanCell(row[0]) || "Imported item";
    const metadata = createDefaultMetadata(title);
    mapping.columns.forEach((column, index) => {
      if (!column.action?.startsWith("metadata:")) return;
      const field = systemByLabel.get(column.action.slice("metadata:".length));
      if (!field || field.label === "ID") return;
      metadata[field.label] = cleanCell(row[index]);
    });
    metadata.Title = metadata.Title || title;
    const customFields = {};
    fieldByColumn.forEach((field, index) => {
      customFields[field.id] = cleanCell(row[index]);
    });
    await store.createArtifact({ id, title: metadata.Title || title, storageName, metadata, customFields });
    imported += 1;
  }
  await refreshState();
  state.activeStorageName = storageName;
  ensureStorageState();
  render();
  window.alert(state.language === "en"
    ? `Imported ${imported} items into ${storageName}.`
    : `Imported ${imported} items into ${storageName}.`);
};

function openCsvMappingDialog(headers, file) {
  const existingCustomFields = state.fields.filter((field) => !field.isSystemField);
  const systemByHeader = new Map(SYSTEM_FIELDS.map((field) => [normalizeHeader(field.label), field]));
  const customByHeader = new Map(existingCustomFields.map((field) => [normalizeHeader(field.label), field]));
  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop csv-mapping-dialog";
  backdrop.innerHTML = `
    <div class="dialog">
      <div class="dialog-header">
        <h2>${state.language === "en" ? "Import CSV" : "导入 CSV"}</h2>
        <button class="icon-button csv-cancel" type="button">x</button>
      </div>
      <label class="field-label">${state.language === "en" ? "Import target" : "导入目标"}</label>
      <select class="input csv-target-mode">
        <option value="new">${state.language === "en" ? "Create new inventory" : "创建新库房"}</option>
        <option value="merge">${state.language === "en" ? "Merge into existing inventory" : "合并到已有库房"}</option>
      </select>
      <input class="input csv-new-storage" type="text" value="${escapeAttr(file.name.replace(/\.[^.]+$/, "") || "Imported CSV")}" />
      <select class="input csv-merge-storage">
        ${state.storages.map((name) => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`).join("")}
      </select>
      <p class="quiet-line">${state.language === "en"
        ? "Map each CSV header to metadata, an existing custom field, a new custom field, or skip it."
        : "将每个 CSV 表头映射到元数据、已有自定义字段、新自定义字段，或跳过。"}</p>
      <div class="csv-mapping-grid"></div>
      <div class="dialog-actions">
        <button class="button subtle csv-cancel" type="button">${state.language === "en" ? "Cancel" : "取消"}</button>
        <button class="button primary csv-confirm" type="button">${state.language === "en" ? "Import" : "导入"}</button>
      </div>
    </div>
  `;
  const grid = backdrop.querySelector(".csv-mapping-grid");
  headers.forEach((header) => {
    const row = document.createElement("label");
    row.className = "csv-mapping-row";
    const select = document.createElement("select");
    select.className = "input";
    select.append(new Option(state.language === "en" ? "Skip" : "跳过", "skip"));
    SYSTEM_FIELDS.forEach((field) => select.append(new Option(`${state.language === "en" ? "Metadata" : "元数据"}: ${field.label}`, `metadata:${field.label}`)));
    select.append(new Option(`${state.language === "en" ? "New custom field" : "新自定义字段"}: ${header}`, `custom-new:${header}`));
    existingCustomFields.forEach((field) => select.append(new Option(`${state.language === "en" ? "Existing custom field" : "已有自定义字段"}: ${field.label}`, `custom-existing:${field.id}`)));
    const normalized = normalizeHeader(header);
    if (systemByHeader.has(normalized)) {
      select.value = `metadata:${systemByHeader.get(normalized).label}`;
    } else if (customByHeader.has(normalized)) {
      select.value = `custom-existing:${customByHeader.get(normalized).id}`;
    } else {
      select.value = `custom-new:${header}`;
    }
    const title = document.createElement("span");
    title.textContent = header;
    row.append(title, select);
    grid.append(row);
  });
  const mode = backdrop.querySelector(".csv-target-mode");
  const newStorage = backdrop.querySelector(".csv-new-storage");
  const mergeStorage = backdrop.querySelector(".csv-merge-storage");
  const syncTarget = () => {
    newStorage.classList.toggle("hidden", mode.value !== "new");
    mergeStorage.classList.toggle("hidden", mode.value !== "merge");
  };
  mode.addEventListener("change", syncTarget);
  syncTarget();
  document.body.append(backdrop);
  return new Promise((resolve) => {
    const close = (value) => {
      backdrop.remove();
      resolve(value);
    };
    backdrop.querySelectorAll(".csv-cancel").forEach((button) => button.addEventListener("click", () => close(null)));
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close(null);
    });
    backdrop.querySelector(".csv-confirm").addEventListener("click", () => {
      close({
        targetMode: mode.value,
        newStorageName: newStorage.value.trim(),
        mergeStorageName: mergeStorage.value,
        columns: Array.from(grid.querySelectorAll("select")).map((select, index) => ({
          header: headers[index],
          action: select.value
        }))
      });
    });
  });
}

function uniqueStorageName(baseName) {
  const clean = String(baseName || "Imported CSV").trim() || "Imported CSV";
  if (!state.storages.includes(clean)) return clean;
  let index = 2;
  let candidate = `${clean} ${index}`;
  while (state.storages.includes(candidate)) {
    index += 1;
    candidate = `${clean} ${index}`;
  }
  return candidate;
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

async function handleAddImages(event) {
  const files = Array.from(event.target.files || []);
  event.target.value = "";
  const artifact = getActiveArtifact();
  if (!artifact || !files.length) return;
  await pushUndoSnapshot();
  const created = await store.addImages(artifact.id, files);
  if (created[0]) state.activeImageId = created[0].id;
  await refreshState();
  render();
}

async function deleteActiveImage() {
  const image = getActiveImage();
  if (!image) return;
  const message = state.language === "zh" ? "删除当前图片？" : "Delete the current image?";
  if (!window.confirm(message)) return;
  await pushUndoSnapshot();
  await store.deleteImage(image.id);
  state.activeImageId = null;
  await refreshState();
  render();
}

function openFieldDialog() {
  dom.fieldNameInput.value = "";
  dom.fieldScopeSelect.value = "all";
  dom.scopeValueInput.value = "";
  renderFieldScopeControls();
  dom.fieldDialog.classList.remove("hidden");
  dom.fieldNameInput.focus();
}

function closeFieldDialog() {
  dom.fieldDialog.classList.add("hidden");
}

function renderFieldScopeControls() {
  const isFiltered = dom.fieldScopeSelect.value === "filtered";
  dom.fieldScopeFilter.classList.toggle("hidden", !isFiltered);
  dom.scopeFieldSelect.innerHTML = "";
  state.fields.forEach((field) => dom.scopeFieldSelect.append(new Option(field.label, field.id)));
  if (isFiltered) renderScopeValueOptions();
}

function renderScopeValueOptions() {
  const field = state.fields.find((candidate) => candidate.id === dom.scopeFieldSelect.value);
  const values = new Set(state.artifacts.map((artifact) => getFieldValue(artifact, field)).filter(Boolean));
  dom.scopeValueOptions.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    dom.scopeValueOptions.append(option);
  });
}

async function confirmCreateField() {
  const label = dom.fieldNameInput.value.trim();
  if (!label) {
    window.alert("请输入字段名称。");
    return;
  }
  const exists = state.fields.some((field) => field.label.toLowerCase() === label.toLowerCase());
  if (exists) {
    window.alert("字段已经存在，请换一个名称。");
    return;
  }

  const scope = dom.fieldScopeSelect.value;
  let artifactIds = [];
  if (scope === "current") {
    const artifact = getActiveArtifact();
    if (!artifact) {
      window.alert("请先选择一个条目。");
      return;
    }
    artifactIds = [artifact.id];
  }
  if (scope === "filtered") {
    const field = state.fields.find((candidate) => candidate.id === dom.scopeFieldSelect.value);
    const value = normalize(dom.scopeValueInput.value);
    artifactIds = state.artifacts
      .filter((artifact) => !value || normalize(getFieldValue(artifact, field)).includes(value))
      .map((artifact) => artifact.id);
  }

  await pushUndoSnapshot();
  await store.createField(label, {
    appliesTo: scope === "all" ? "all" : "selected",
    artifactIds
  });
  closeFieldDialog();
  await refreshState();
  render();
}

function setViewMode(mode) {
  state.viewMode = mode;
  dom.gridViewBtn.classList.toggle("active", mode === "grid");
  dom.listViewBtn.classList.toggle("active", mode === "list");
  dom.gridView.classList.toggle("hidden", mode !== "grid");
  dom.listView.classList.toggle("hidden", mode !== "list");
  dom.listControls.classList.toggle("hidden", mode !== "list");
  renderCollection();
}

function render() {
  if (!state.project) return;
  renderStorageViewSelect();
  const visibleCount = state.activeStorageName === ALL_STORAGE_KEY
    ? state.artifacts.length
    : state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === state.activeStorageName).length;
  dom.projectSummary.textContent = `Inventory · ${state.activeStorageName} · ${visibleCount} ${tr("items")}`;
  applyWorkspaceLayout();
  applyLanguage();
  const collectionTitle = document.querySelector(".collection-toolbar h2");
  const projectTitle = normalizeStorageName(state.project.title || DEFAULT_STORAGE_NAME);
  collectionTitle.textContent = state.activeStorageName === ALL_STORAGE_KEY
    ? (state.language === "en" ? "Total Library" : "总库")
    : `${projectTitle} - ${normalizeStorageName(state.activeStorageName)}`;
  collectionTitle.title = state.activeStorageName === ALL_STORAGE_KEY
    ? ""
    : (state.language === "en" ? "Double click to rename this storage" : "双击重命名当前库房");
  renderStorageBreadcrumb();
  renderFilters();
  renderFieldList();
  renderSortControls();
  renderCollection();
  renderDetail();
  renderExpandedView();
}

function renderStorageBreadcrumb() {
  if (!dom.storageBreadcrumb) return;
  dom.storageBreadcrumb.innerHTML = "";
  const root = document.createElement("button");
  root.className = `folder-crumb ${state.activeStorageName === ALL_STORAGE_KEY ? "active" : ""}`;
  root.type = "button";
  root.textContent = state.language === "en" ? "Total Library" : "总库";
  root.addEventListener("click", () => setActiveStorage(ALL_STORAGE_KEY));
  dom.storageBreadcrumb.append(root);
  if (state.activeStorageName !== ALL_STORAGE_KEY) {
    const separator = document.createElement("span");
    separator.className = "folder-crumb-separator";
    separator.textContent = "›";
    const current = document.createElement("button");
    current.className = "folder-crumb active";
    current.type = "button";
    current.textContent = normalizeStorageName(state.activeStorageName);
    current.title = state.language === "en" ? "Double click to rename this inventory" : "双击重命名当前库房";
    current.addEventListener("dblclick", renameActiveStorage);
    dom.storageBreadcrumb.append(separator, current);
  }
}

function renderStorageViewSelect() {
  if (!dom.storageViewSelect) return;
  state.storages = state.storages.filter((name) => name && name !== ALL_STORAGE_KEY);
  const options = [
    { value: ALL_STORAGE_KEY, label: state.language === "en" ? "Total Library" : "总库" },
    ...state.storages.map((name) => ({ value: name, label: name }))
  ];
  if (state.activeStorageName !== ALL_STORAGE_KEY && !state.storages.includes(state.activeStorageName)) {
    state.activeStorageName = state.storages[0] || ALL_STORAGE_KEY;
  }
  dom.storageViewSelect.innerHTML = "";
  options.forEach((option) => dom.storageViewSelect.append(new Option(option.label, option.value)));
  dom.storageViewSelect.value = state.activeStorageName;
}

function applyWorkspaceLayout() {
  dom.workspace.style.setProperty("--sidebar-width", `${state.sidebarWidth}px`);
  dom.workspace.style.setProperty("--detail-width", `${state.detailWidth}px`);
  dom.workspace.classList.toggle("detail-collapsed", state.detailCollapsed);
  dom.workspace.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
  dom.workspace.classList.toggle("sidebar-hidden", state.sidebarHidden);
  dom.showSidebarBtn.classList.toggle("hidden", !state.sidebarHidden);
  dom.detailPane.classList.toggle("collapsed", state.detailCollapsed);
  dom.detailPane.classList.toggle("wide", state.detailWidth >= 620);
  dom.metadataBlock?.classList.toggle("collapsed", state.metadataCollapsed);
  dom.detailCollapseBtn.textContent = state.detailCollapsed ? "‹" : "›";
  dom.detailCollapseBtn.title = state.detailCollapsed ? "展开详情面板" : "折叠详情面板";
  dom.collapseSidebarBtn.textContent = state.sidebarCollapsed ? "›" : "‹";
}

function toggleDetailPanel() {
  state.detailCollapsed = !state.detailCollapsed;
  applyWorkspaceLayout();
}

function toggleSidebarPanel() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  state.sidebarHidden = false;
  localStorage.setItem("easy-network-sidebar-collapsed", String(state.sidebarCollapsed));
  localStorage.setItem("easy-network-sidebar-hidden", "false");
  applyWorkspaceLayout();
}

function hideSidebarPanel() {
  state.sidebarHidden = true;
  localStorage.setItem("easy-network-sidebar-hidden", "true");
  applyWorkspaceLayout();
}

function showSidebarPanel() {
  state.sidebarHidden = false;
  state.sidebarCollapsed = false;
  localStorage.setItem("easy-network-sidebar-hidden", "false");
  localStorage.setItem("easy-network-sidebar-collapsed", "false");
  applyWorkspaceLayout();
}

function createStorageFromPrompt() {
  const name = window.prompt(state.language === "zh" ? "输入新库房名" : "New storage name");
  if (!name?.trim()) return;
  setActiveStorage(name);
}

function createNewInventory() {
  const base = "New Inventory";
  let name = base;
  let index = 2;
  while (state.storages.includes(name)) {
    name = `${base} ${index}`;
    index += 1;
  }
  setActiveStorage(name);
}

async function renameActiveStorage() {
  const next = window.prompt(state.language === "zh" ? "重命名当前库房" : "Rename current storage", state.activeStorageName);
  const clean = next?.trim();
  if (!clean || clean === state.activeStorageName) return;
  await pushUndoSnapshot();
  const old = state.activeStorageName;
  state.activeStorageName = clean;
  state.storages = state.storages.map((name) => (name === old ? clean : name));
  await Promise.all(state.artifacts
    .filter((artifact) => getArtifactStorageName(artifact) === old)
    .map((artifact) => store.updateArtifact(artifact.id, { storageName: clean })));
  await Promise.all(state.fields.map((field) => {
    const patch = storageMovePatch(field, old, clean);
    return Object.keys(patch).length ? store.updateField(field.id, patch) : Promise.resolve();
  }));
  ensureStorageState();
  await refreshState();
  render();
}

function beginSidebarResize(event) {
  event.preventDefault();
  state.sidebarCollapsed = false;
  state.sidebarHidden = false;
  const startX = event.clientX;
  const startWidth = state.sidebarWidth;
  const onMove = (moveEvent) => {
    state.sidebarWidth = Math.max(180, Math.min(520, startWidth + moveEvent.clientX - startX));
    localStorage.setItem("easy-network-sidebar-width", String(state.sidebarWidth));
    applyWorkspaceLayout();
  };
  const onUp = () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
  };
  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
}

function beginDetailResize(event) {
  event.preventDefault();
  const startX = event.clientX;
  const startWidth = state.detailWidth;
  const onMove = (moveEvent) => {
    state.detailCollapsed = false;
    state.detailWidth = Math.max(320, Math.min(760, startWidth - (moveEvent.clientX - startX)));
    applyWorkspaceLayout();
  };
  const onUp = () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
  };
  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
}

function renderSortControls() {
  dom.sortPanel.classList.toggle("hidden", !state.sortPanelOpen);
  dom.sortRules.innerHTML = "";
  state.sortRules.forEach((rule, index) => dom.sortRules.append(createSortRuleControl(rule, index)));
  dom.sortToggleBtn.classList.toggle("active", state.sortPanelOpen);
  dom.sortToggleBtn.textContent = state.sortRules.length ? `${tr("sort")} ${state.sortRules.length}` : tr("sort");
  dom.listControls.classList.toggle("hidden", state.viewMode !== "list");
  dom.listView.style.setProperty("--table-scale", state.tableScale);
}

function createSortRuleControl(rule, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "sort-rule";
  const fieldSelect = document.createElement("select");
  state.fields.forEach((field) => fieldSelect.append(new Option(field.label, field.id)));
  fieldSelect.value = rule.fieldId;
  fieldSelect.addEventListener("change", () => {
    state.sortRules[index].fieldId = fieldSelect.value;
    renderCollection();
  });
  const directionSelect = document.createElement("select");
  directionSelect.append(
    new Option(state.language === "en" ? "Ascending" : "升序", "asc"),
    new Option(state.language === "en" ? "Descending" : "降序", "desc")
  );
  directionSelect.value = rule.direction;
  directionSelect.addEventListener("change", () => {
    state.sortRules[index].direction = directionSelect.value;
    renderCollection();
  });
  const remove = document.createElement("button");
  remove.className = "icon-button";
  remove.type = "button";
  remove.textContent = "x";
  remove.title = state.language === "en" ? "Remove this sort level" : "删除此排序层级";
  remove.addEventListener("click", () => {
    state.sortRules.splice(index, 1);
    renderSortControls();
    renderCollection();
  });
  wrapper.append(fieldSelect, directionSelect, remove);
  return wrapper;
}

function addSortRule() {
  const fallback = state.sortRules[0]?.fieldId || state.fields.find((field) => field.label === "ID")?.id || state.fields[0]?.id;
  if (!fallback) return;
  const existing = state.sortRules.find((rule) => rule.fieldId === fallback);
  if (existing) existing.direction = existing.direction === "asc" ? "desc" : "asc";
  else state.sortRules.push({ fieldId: fallback, direction: "asc" });
  renderSortControls();
  renderCollection();
}

function toggleHeaderSort(fieldId) {
  const existing = state.sortRules.find((rule) => rule.fieldId === fieldId);
  if (!existing) state.sortRules.push({ fieldId, direction: "asc" });
  else if (existing.direction === "asc") existing.direction = "desc";
  else state.sortRules = state.sortRules.filter((rule) => rule !== existing);
  state.sortPanelOpen = true;
  renderSortControls();
  renderCollection();
}

function syncTableScrollFromSlider() {
  const max = dom.collectionSurface.scrollWidth - dom.collectionSurface.clientWidth;
  dom.collectionSurface.scrollLeft = max * (Number(dom.tableScrollSlider.value) / 100);
  syncTableScrollSlider();
}

function syncTableScrollSlider() {
  const max = dom.collectionSurface.scrollWidth - dom.collectionSurface.clientWidth;
  dom.tableScrollSlider.value = max > 0 ? String(Math.round((dom.collectionSurface.scrollLeft / max) * 100)) : "0";
  if (dom.stickyTableScrollbar && dom.stickyTableScrollbarTrack) {
    const isList = state.viewMode === "list";
    dom.stickyTableScrollbar.classList.toggle("hidden", !isList || max <= 0);
    dom.stickyTableScrollbarTrack.style.width = `${Math.max(dom.collectionSurface.scrollWidth, dom.collectionSurface.clientWidth)}px`;
    if (Math.abs(dom.stickyTableScrollbar.scrollLeft - dom.collectionSurface.scrollLeft) > 1) {
      dom.stickyTableScrollbar.scrollLeft = dom.collectionSurface.scrollLeft;
    }
  }
}

function syncTableScrollFromStickyBar() {
  if (!dom.stickyTableScrollbar || state.viewMode !== "list") return;
  if (Math.abs(dom.collectionSurface.scrollLeft - dom.stickyTableScrollbar.scrollLeft) > 1) {
    dom.collectionSurface.scrollLeft = dom.stickyTableScrollbar.scrollLeft;
  }
  syncTableScrollSlider();
}

function renderFilters() {
  const current = state.filters.fieldId;
  dom.fieldFilterSelect.innerHTML = "";
  dom.fieldFilterSelect.append(new Option(tr("allFields"), "all"));
  fieldsForStorage(currentWriteStorageName(), { includeCustom: true }).forEach((field) => dom.fieldFilterSelect.append(new Option(field.label, field.id)));
  dom.fieldFilterSelect.value = current;
}

function renderGroupedFieldList() {
  dom.fieldList.innerHTML = "";
  const currentStorage = currentWriteStorageName();
  const groups = [
    { label: state.language === "en" ? "Metadata" : "元数据", fields: state.fields.filter((field) => field.isSystemField), open: true },
    { label: state.language === "en" ? "Custom Fields" : "自定义字段", fields: state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, currentStorage)), open: true }
  ];
  groups.forEach((group) => {
    const folder = document.createElement("details");
    folder.className = "field-list-folder";
    folder.open = group.open;
    const summary = document.createElement("summary");
    summary.textContent = group.label;
    const body = document.createElement("div");
    body.className = "field-list-folder-body";
    if (group.fields.length) {
      group.fields.forEach((field) => body.append(createFieldChip(field)));
    } else {
      const empty = document.createElement("p");
      empty.className = "quiet-line";
      empty.textContent = state.language === "en" ? "No fields yet." : "暂无字段";
      body.append(empty);
    }
    if (group.fields.every((field) => !field.isSystemField) && currentStorage !== ALL_STORAGE_KEY) {
      const syncTools = createFieldSyncTools(currentStorage);
      if (syncTools) body.append(syncTools);
    }
    folder.append(summary, body);
    dom.fieldList.append(folder);
  });
}

function renderGroupedFieldList() {
  dom.fieldList.innerHTML = "";
  if (state.fieldListStorageName && !getAllStorageNames().includes(state.fieldListStorageName)) {
    state.fieldListStorageName = "";
    state.fieldListFieldId = "all";
  }
  const selectedStorage = state.fieldListStorageName || "";
  const customSourceFields = selectedStorage
    ? state.fields.filter((field) => fieldIsDefinedInStorage(field, selectedStorage))
    : [];
  const customFields = state.fieldListFieldId && state.fieldListFieldId !== "all"
    ? customSourceFields.filter((field) => field.id === state.fieldListFieldId)
    : customSourceFields;
  const groups = [
    { label: state.language === "en" ? "Metadata" : "Metadata", fields: state.fields.filter((field) => field.isSystemField), open: true, custom: false },
    { label: state.language === "en" ? "Custom Fields" : "Custom Fields", fields: customFields, sourceFields: customSourceFields, open: true, custom: true }
  ];
  groups.forEach((group) => {
    const folder = document.createElement("details");
    folder.className = "field-list-folder";
    folder.open = group.open;
    const summary = document.createElement("summary");
    summary.textContent = group.label;
    const body = document.createElement("div");
    body.className = "field-list-folder-body";
    if (group.custom) body.append(createCustomFieldListControls(group.sourceFields));
    if (group.fields.length) {
      group.fields.forEach((field) => body.append(createFieldChip(field)));
    } else {
      const empty = document.createElement("p");
      empty.className = "quiet-line";
      empty.textContent = group.custom && !selectedStorage
        ? (state.language === "en" ? "Select an inventory first." : "先选择 inventory。")
        : (state.language === "en" ? "No fields yet." : "暂无字段。");
      body.append(empty);
    }
    const currentStorage = currentWriteStorageName();
    if (group.custom && currentStorage !== ALL_STORAGE_KEY) {
      const syncTools = createFieldSyncTools(currentStorage);
      if (syncTools) body.append(syncTools);
    }
    folder.append(summary, body);
    dom.fieldList.append(folder);
  });
}

function createCustomFieldListControls(sourceFields) {
  const wrapper = document.createElement("div");
  wrapper.className = "field-list-controls";
  const storageSelect = document.createElement("select");
  storageSelect.className = "input";
  storageSelect.append(new Option(state.language === "en" ? "Select inventory" : "Select inventory", ""));
  getAllStorageNames().forEach((name) => storageSelect.append(new Option(name, name)));
  storageSelect.value = state.fieldListStorageName || "";
  storageSelect.addEventListener("change", () => {
    state.fieldListStorageName = storageSelect.value;
    state.fieldListFieldId = "all";
    renderFieldList();
  });
  const fieldSelect = document.createElement("select");
  fieldSelect.className = "input";
  fieldSelect.disabled = !state.fieldListStorageName;
  fieldSelect.append(new Option(state.language === "en" ? "All fields" : "All fields", "all"));
  sourceFields.forEach((field) => fieldSelect.append(new Option(field.label, field.id)));
  fieldSelect.value = sourceFields.some((field) => field.id === state.fieldListFieldId) ? state.fieldListFieldId : "all";
  fieldSelect.addEventListener("change", () => {
    state.fieldListFieldId = fieldSelect.value;
    renderFieldList();
  });
  wrapper.append(storageSelect, fieldSelect);
  return wrapper;
}

function createFieldSyncTools(targetStorage) {
  const sourceStorages = getAllStorageNames();
  if (!sourceStorages.length) return null;
  const tools = document.createElement("div");
  tools.className = "field-sync-tools";
  const select = document.createElement("select");
  select.className = "input";
  select.append(new Option(state.language === "en" ? "Select inventory" : "Select inventory", ""));
  sourceStorages.forEach((name) => select.append(new Option(name, name)));
  const apply = document.createElement("button");
  apply.className = "button subtle";
  apply.type = "button";
  apply.textContent = state.language === "en" ? "Apply fields" : "套用字段";
  apply.addEventListener("click", () => applyFieldsFromStorage(select.value, targetStorage));
  const link = document.createElement("button");
  link.className = "button subtle";
  link.type = "button";
  link.textContent = state.language === "en" ? "Link fields" : "关联字段";
  link.dataset.targetStorage = targetStorage;
  const openLinkDialog = (event) => {
    event.preventDefault();
    tools.dataset.lastLinkError = "";
    try {
      openFieldMappingDialog(select.value, targetStorage);
    } catch (error) {
      tools.dataset.lastLinkError = error?.message || String(error);
    }
  };
  link.addEventListener("click", (event) => {
    openLinkDialog(event);
  });
  link.addEventListener("pointerdown", (event) => {
    openLinkDialog(event);
  });
  link.onclick = (event) => {
    openLinkDialog(event);
  };
  const merge = document.createElement("button");
  merge.className = "button subtle";
  merge.type = "button";
  merge.textContent = state.language === "en" ? "Merge fields" : "合并字段";
  merge.addEventListener("click", () => openCombineFieldsDialog(select.value));
  tools.append(select, apply, link, merge);
  return tools;
}

function openCombineFieldsDialog(storageName) {
  const fields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, storageName));
  const text = (en, zh) => state.language === "en" ? en : zh;
  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop field-map-dialog";
  const dialog = document.createElement("div");
  dialog.className = "dialog";
  const header = document.createElement("div");
  header.className = "dialog-header";
  const title = document.createElement("h2");
  title.textContent = text("Merge existing fields", "合并已有字段");
  const closeButton = document.createElement("button");
  closeButton.className = "icon-button";
  closeButton.type = "button";
  closeButton.textContent = "x";
  header.append(title, closeButton);
  const hint = document.createElement("p");
  hint.className = "quiet-line";
  hint.textContent = text("Selected field values are joined with underscores into a new field. Original fields stay unchanged.", "选中字段的值会用 _ 连接生成新字段，原字段保留。");
  const nameLabel = document.createElement("label");
  nameLabel.className = "field-label";
  nameLabel.textContent = text("New field name", "新字段名称");
  const nameInput = document.createElement("input");
  nameInput.className = "input";
  nameInput.placeholder = fields.slice(0, 2).map((field) => field.label).join("_") || text("Merged_Field", "合并字段");
  const list = document.createElement("div");
  list.className = "field-map-list";
  fields.forEach((field) => {
    const row = document.createElement("label");
    row.className = "field-map-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = field.id;
    const label = document.createElement("span");
    label.textContent = field.label;
    row.append(checkbox, label);
    list.append(row);
  });
  const feedback = document.createElement("div");
  feedback.className = "context-menu-feedback";
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const mergeButton = document.createElement("button");
  mergeButton.className = "button primary";
  mergeButton.type = "button";
  mergeButton.textContent = text("Create merged field", "创建合并字段");
  actions.append(mergeButton);
  dialog.append(header, hint, nameLabel, nameInput, list, feedback, actions);
  backdrop.append(dialog);
  const close = () => backdrop.remove();
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  mergeButton.addEventListener("click", async () => {
    const fieldIds = Array.from(list.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value);
    if (fieldIds.length < 2) {
      feedback.textContent = text("Select at least two fields.", "请至少选择两个字段。");
      return;
    }
    const result = await combineFieldsIntoNewField(storageName, fieldIds, nameInput.value || nameInput.placeholder);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });
  document.body.append(backdrop);
}

function openCombineFieldsDialog(initialStorageName) {
  const text = (en, zh) => state.language === "en" ? en : zh;
  const storageNames = getAllStorageNames();
  let selectedStorageName = storageNames.includes(initialStorageName)
    ? initialStorageName
    : "";

  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop field-map-dialog";
  const dialog = document.createElement("div");
  dialog.className = "dialog";
  const header = document.createElement("div");
  header.className = "dialog-header";
  const title = document.createElement("h2");
  title.textContent = text("Merge existing fields", "合并已存在字段");
  const closeButton = document.createElement("button");
  closeButton.className = "icon-button";
  closeButton.type = "button";
  closeButton.textContent = "x";
  header.append(title, closeButton);

  const hint = document.createElement("p");
  hint.className = "quiet-line";
  hint.textContent = text(
    "Choose an inventory first. Only fields in that inventory can be merged, and original fields stay unchanged.",
    "请先选择一个 inventory；只显示该 inventory 已存在的字段，原字段会保留。"
  );

  const storageLabel = document.createElement("label");
  storageLabel.className = "field-label";
  storageLabel.textContent = text("Inventory", "Inventory");
  const storageSelect = document.createElement("select");
  storageSelect.className = "input";
  storageSelect.append(new Option(text("Select inventory", "Select inventory"), ""));
  storageNames.forEach((name) => storageSelect.append(new Option(name, name)));
  storageSelect.value = selectedStorageName;

  const nameLabel = document.createElement("label");
  nameLabel.className = "field-label";
  nameLabel.textContent = text("New field name", "新字段名称");
  const nameInput = document.createElement("input");
  nameInput.className = "input";

  const list = document.createElement("div");
  list.className = "field-map-list";
  const feedback = document.createElement("div");
  feedback.className = "context-menu-feedback";

  const getStorageFields = () => state.fields
    .filter((field) => fieldIsDefinedInStorage(field, selectedStorageName));

  const renderFieldChoices = () => {
    list.replaceChildren();
    const fields = getStorageFields();
    nameInput.placeholder = fields.slice(0, 2).map((field) => field.label).join("_") || text("Merged_Field", "合并字段");
    if (!fields.length) {
      const empty = document.createElement("p");
      empty.className = "quiet-line";
      empty.textContent = selectedStorageName
        ? text("This inventory has no custom fields.", "这个 inventory 还没有自定义字段。")
        : text("Choose an inventory to see its fields.", "请选择一个 inventory 后查看字段。");
      list.append(empty);
      return;
    }
    fields.forEach((field) => {
      const row = document.createElement("label");
      row.className = "field-map-row";
      row.title = field.label;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = field.id;
      const label = document.createElement("span");
      label.textContent = field.label;
      label.title = field.label;
      row.append(checkbox, label);
      list.append(row);
    });
  };

  storageSelect.addEventListener("change", () => {
    selectedStorageName = storageSelect.value;
    feedback.textContent = "";
    renderFieldChoices();
  });

  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const mergeButton = document.createElement("button");
  mergeButton.className = "button primary";
  mergeButton.type = "button";
  mergeButton.textContent = text("Create merged field", "创建合并字段");
  actions.append(mergeButton);
  dialog.append(header, hint, storageLabel, storageSelect, nameLabel, nameInput, list, feedback, actions);
  backdrop.append(dialog);

  const close = () => backdrop.remove();
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  mergeButton.addEventListener("click", async () => {
    if (!selectedStorageName) {
      feedback.textContent = text("Choose an inventory first.", "请先选择一个 inventory。");
      return;
    }
    const fieldIds = Array.from(list.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value);
    if (fieldIds.length < 2) {
      feedback.textContent = text("Select at least two fields.", "请至少选择两个字段。");
      return;
    }
    const result = await combineFieldsIntoNewField(selectedStorageName, fieldIds, nameInput.value || nameInput.placeholder);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });

  renderFieldChoices();
  document.body.append(backdrop);
}

async function combineFieldsIntoNewField(storageName, fieldIds, label) {
  const cleanLabel = cleanCell(label);
  if (!cleanLabel) return { error: state.language === "en" ? "Enter a new field name." : "请输入新字段名称。" };
  const fields = fieldIds.map((id) => state.fields.find((field) => field.id === id)).filter(Boolean);
  if (fields.length < 2) return { error: state.language === "en" ? "Select at least two fields." : "请至少选择两个字段。" };
  await pushUndoSnapshot();
  const newField = await store.createField(cleanLabel, { storageName, appliesTo: "all", artifactIds: [] });
  if (!newField) return { error: state.language === "en" ? "Could not create field." : "无法创建字段。" };
  const artifacts = state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName);
  await Promise.all(artifacts.map((artifact) => {
    const customFields = { ...(artifact.customFields || {}) };
    const value = fields
      .map((field) => cleanCell(customFields[field.id]))
      .filter(Boolean)
      .join("_");
    customFields[newField.id] = value;
    return store.replaceArtifactCustomFields(artifact.id, customFields);
  }));
  await refreshState();
  render();
  notifyNetworkInventoryChanged();
  return { ok: true };
}

async function applyFieldsFromStorage(sourceStorage, targetStorage) {
  if (!sourceStorage || !targetStorage) return;
  await pushUndoSnapshot();
  const existing = new Set(state.fields
    .filter((field) => !field.isSystemField && fieldBelongsToStorage(field, targetStorage))
    .map((field) => normalizeHeader(field.label)));
  const sourceFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, sourceStorage));
  for (const field of sourceFields) {
    if (existing.has(normalizeHeader(field.label))) continue;
    await store.createField(field.label, {
      storageName: targetStorage,
      appliesTo: field.appliesTo || "all",
      artifactIds: []
    });
    existing.add(normalizeHeader(field.label));
  }
  await refreshState();
  render();
}

async function linkFieldsFromStorage(sourceStorage, targetStorage) {
  if (!sourceStorage || !targetStorage) return;
  await pushUndoSnapshot();
  const sourceFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, sourceStorage));
  for (const field of sourceFields) {
    const storageNames = new Set([field.storageName || sourceStorage, ...(field.storageNames || []), targetStorage]);
    await store.updateField(field.id, { storageNames: Array.from(storageNames) });
  }
  await refreshState();
  render();
}

function openFieldMappingDialogLegacy(sourceStorage, targetStorage) {
  if (!sourceStorage || !targetStorage) return;
  const sourceFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, sourceStorage));
  const targetFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, targetStorage));
  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop field-map-dialog";
  backdrop.innerHTML = `
    <div class="dialog">
      <div class="dialog-header">
        <h2>${escapeHtml(state.language === "en" ? "Field mapping" : "字段映射")}</h2>
        <button class="icon-button" type="button" data-close>x</button>
      </div>
      <p class="quiet-line">${escapeHtml(sourceStorage)} -> ${escapeHtml(targetStorage)}</p>
      <div class="field-map-list"></div>
      <label class="field-label">${state.language === "en" ? "Batch rename" : "批量重命名"}</label>
      <textarea class="input field-map-batch" rows="4" placeholder="Old=New, one per line"></textarea>
      <div class="context-menu-feedback"></div>
      <div class="dialog-actions">
        <button class="button subtle" type="button" data-rename>${state.language === "en" ? "Batch rename fields" : "批量重命名字段"}</button>
        <button class="button primary" type="button" data-apply>${state.language === "en" ? "Apply mapping" : "应用映射"}</button>
      </div>
    </div>
  `;
  const list = backdrop.querySelector(".field-map-list");
  const feedback = backdrop.querySelector(".context-menu-feedback");
  if (!sourceFields.length) {
    const empty = document.createElement("p");
    empty.className = "quiet-line";
    empty.textContent = state.language === "en" ? "The source inventory has no custom fields." : "来源库房还没有自定义字段。";
    list.append(empty);
  } else {
    sourceFields.forEach((field) => {
      const row = document.createElement("label");
      row.className = "field-map-row";
      const source = document.createElement("span");
      source.textContent = field.label;
      const select = document.createElement("select");
      select.className = "input";
      select.dataset.sourceFieldId = field.id;
      select.append(new Option(state.language === "en" ? "No mapping" : "不映射", ""));
      targetFields.forEach((targetField) => select.append(new Option(targetField.label, targetField.id)));
      const same = targetFields.find((targetField) => normalizeHeader(targetField.label) === normalizeHeader(field.label));
      if (same) select.value = same.id;
      row.append(source, select);
      list.append(row);
    });
  }
  const close = () => backdrop.remove();
  backdrop.querySelector("[data-close]").addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.querySelector("[data-rename]").addEventListener("click", async () => {
    const result = await applyBatchRenameTextForStorage(backdrop.querySelector(".field-map-batch").value, sourceStorage);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });
  backdrop.querySelector("[data-apply]").addEventListener("click", async () => {
    const mappings = Array.from(backdrop.querySelectorAll("select[data-source-field-id]"))
      .map((select) => ({ sourceFieldId: select.dataset.sourceFieldId, targetFieldId: select.value }))
      .filter((mapping) => mapping.targetFieldId && mapping.targetFieldId !== mapping.sourceFieldId);
    const result = await applyFieldMappings(sourceStorage, mappings);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });
  document.body.append(backdrop);
}

function openFieldMappingDialog(sourceStorage, targetStorage) {
  if (!sourceStorage || !targetStorage) return;
  const sourceFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, sourceStorage));
  const targetFields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, targetStorage));
  const text = (en, zh) => state.language === "en" ? en : zh;
  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop field-map-dialog";

  const dialog = document.createElement("div");
  dialog.className = "dialog";
  const header = document.createElement("div");
  header.className = "dialog-header";
  const title = document.createElement("h2");
  title.textContent = text("Field mapping", "\u5b57\u6bb5\u6620\u5c04");
  const closeButton = document.createElement("button");
  closeButton.className = "icon-button";
  closeButton.type = "button";
  closeButton.textContent = "x";
  header.append(title, closeButton);

  const scope = document.createElement("p");
  scope.className = "quiet-line";
  scope.textContent = `${sourceStorage} -> ${targetStorage}`;
  const list = document.createElement("div");
  list.className = "field-map-list";
  const batchLabel = document.createElement("label");
  batchLabel.className = "field-label";
  batchLabel.textContent = text("Batch rename", "\u6279\u91cf\u91cd\u547d\u540d");
  const batchBox = document.createElement("textarea");
  batchBox.className = "input field-map-batch";
  batchBox.rows = 4;
  batchBox.placeholder = "Old=New, one per line";
  const feedback = document.createElement("div");
  feedback.className = "context-menu-feedback";
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const renameButton = document.createElement("button");
  renameButton.className = "button subtle";
  renameButton.type = "button";
  renameButton.textContent = text("Batch rename fields", "\u6279\u91cf\u91cd\u547d\u540d\u5b57\u6bb5");
  const applyButton = document.createElement("button");
  applyButton.className = "button primary";
  applyButton.type = "button";
  applyButton.textContent = text("Apply mapping", "\u5e94\u7528\u6620\u5c04");
  actions.append(renameButton, applyButton);
  dialog.append(header, scope, list, batchLabel, batchBox, feedback, actions);
  backdrop.append(dialog);

  if (!sourceFields.length) {
    const empty = document.createElement("p");
    empty.className = "quiet-line";
    empty.textContent = text("The source inventory has no custom fields.", "\u6765\u6e90\u5e93\u623f\u8fd8\u6ca1\u6709\u81ea\u5b9a\u4e49\u5b57\u6bb5\u3002");
    list.append(empty);
  } else {
    sourceFields.forEach((field) => {
      const row = document.createElement("label");
      row.className = "field-map-row";
      const source = document.createElement("span");
      source.textContent = field.label;
      const select = document.createElement("select");
      select.className = "input";
      select.dataset.sourceFieldId = field.id;
      select.append(new Option(text("No mapping", "\u4e0d\u6620\u5c04"), ""));
      targetFields.forEach((targetField) => select.append(new Option(targetField.label, targetField.id)));
      const same = targetFields.find((targetField) => normalizeHeader(targetField.label) === normalizeHeader(field.label));
      if (same) select.value = same.id;
      row.append(source, select);
      list.append(row);
    });
  }

  const close = () => backdrop.remove();
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  renameButton.addEventListener("click", async () => {
    const result = await applyBatchRenameTextForStorage(batchBox.value, sourceStorage);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });
  applyButton.addEventListener("click", async () => {
    const mappings = Array.from(backdrop.querySelectorAll("select[data-source-field-id]"))
      .map((select) => ({ sourceFieldId: select.dataset.sourceFieldId, targetFieldId: select.value }))
      .filter((mapping) => mapping.targetFieldId && mapping.targetFieldId !== mapping.sourceFieldId);
    const result = await applyFieldMappings(sourceStorage, mappings);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    close();
  });
  document.body.append(backdrop);
}

async function applyFieldMappings(sourceStorage, mappings) {
  if (!mappings.length) return { error: "Choose at least one field mapping." };
  await pushUndoSnapshot();
  for (const mapping of mappings) {
    const sourceField = state.fields.find((field) => field.id === mapping.sourceFieldId);
    const targetField = state.fields.find((field) => field.id === mapping.targetFieldId);
    if (sourceField && targetField) await mergeFieldIntoExistingField(sourceField, targetField, sourceStorage);
  }
  await refreshState();
  render();
  return { ok: true };
}

async function mergeFieldIntoExistingField(sourceField, targetField, sourceStorage) {
  const sourceArtifacts = state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === sourceStorage);
  await Promise.all(sourceArtifacts.map((artifact) => {
    const customFields = { ...(artifact.customFields || {}) };
    const value = customFields[sourceField.id];
    if (value !== undefined && value !== "" && (customFields[targetField.id] === undefined || customFields[targetField.id] === "")) {
      customFields[targetField.id] = value;
    }
    delete customFields[sourceField.id];
    return store.replaceArtifactCustomFields(artifact.id, customFields);
  }));
  const storageNames = new Set(Array.isArray(targetField.storageNames) ? targetField.storageNames : []);
  if (targetField.storageName) storageNames.add(targetField.storageName);
  storageNames.add(sourceStorage);
  await store.updateField(targetField.id, { storageNames: Array.from(storageNames) });
  const operation = storageDeleteOperation(sourceField, sourceStorage);
  if (!operation) return;
  if (operation.delete) await store.deleteField(sourceField.id);
  else await store.updateField(sourceField.id, operation.patch);
}

async function applyBatchRenameTextForStorage(text, storageName) {
  const pairs = String(text || "").split(/\n|;/).map((line) => line.split("=")).filter((pair) => pair.length === 2);
  if (!pairs.length) return { error: "Use Old=New, one pair per line." };
  await pushUndoSnapshot();
  const fields = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, storageName));
  for (const [from, to] of pairs) {
    const field = fields.find((item) => item.label.toLowerCase() === from.trim().toLowerCase());
    const clean = to.trim();
    if (field && clean) await store.updateField(field.id, { label: clean });
  }
  await refreshState();
  render();
  return { ok: true };
}

function createFieldChip(field) {
  const row = document.createElement("div");
  row.className = "field-chip";
  const label = document.createElement("span");
  label.textContent = field.appliesTo === "selected"
    ? `${field.label} · ${state.language === "en" ? "partial items" : "部分条目"}`
    : field.label;
  if (!field.isSystemField) {
    label.title = state.language === "zh" ? "双击重命名，右键查看更多字段操作" : "Double click to rename, right click for field actions";
    label.addEventListener("dblclick", () => renameField(field));
    label.addEventListener("contextmenu", (event) => openFieldContextMenu(event, field));
  }
  const actions = document.createElement("div");
  const visible = document.createElement("button");
  visible.className = `icon-button ${field.visibleInList ? "active" : ""}`;
  visible.type = "button";
  visible.title = state.language === "zh" ? "在列表中显示" : "Show in list";
  visible.title = field.visibleInList ? "Shown in list" : "Hidden from list";
  visible.setAttribute("aria-label", visible.title);
  visible.setAttribute("aria-pressed", String(field.visibleInList));
  visible.textContent = field.visibleInList ? "✓" : "";
  visible.addEventListener("click", async () => {
    await pushUndoSnapshot();
    await store.updateField(field.id, { visibleInList: !field.visibleInList });
    await refreshState();
    render();
  });
  actions.append(visible);
  if (!field.isSystemField) {
    const remove = document.createElement("button");
    remove.className = "icon-button delete-field";
    remove.type = "button";
    remove.title = state.language === "zh" ? "删除字段" : "Delete field";
    remove.textContent = "x";
    remove.addEventListener("click", async () => {
      await deleteOneField(field);
    });
    actions.append(remove);
  }
  row.append(label, actions);
  return row;
}

function renderFieldList() {
  renderGroupedFieldList();
  return;
  dom.fieldList.innerHTML = "";
  state.fields.forEach((field) => {
    const row = document.createElement("div");
    row.className = "field-chip";
    const label = document.createElement("span");
    label.textContent = field.appliesTo === "selected" ? `${field.label} · 部分条目` : field.label;
    if (!field.isSystemField) {
      label.title = state.language === "zh" ? "双击重命名，右键更多字段操作" : "Double click to rename, right click for field actions";
      label.addEventListener("dblclick", () => renameField(field));
      label.addEventListener("contextmenu", (event) => openFieldContextMenu(event, field));
    }
    const actions = document.createElement("div");
    const visible = document.createElement("button");
    visible.className = `icon-button ${field.visibleInList ? "active" : ""}`;
    visible.type = "button";
    visible.title = state.language === "zh" ? "在列表中显示" : "Show in list";
    visible.title = field.visibleInList ? "Shown in list" : "Hidden from list";
    visible.setAttribute("aria-label", visible.title);
    visible.setAttribute("aria-pressed", String(field.visibleInList));
    visible.textContent = field.visibleInList ? "✓" : "";
    visible.addEventListener("click", async () => {
      await pushUndoSnapshot();
      await store.updateField(field.id, { visibleInList: !field.visibleInList });
      await refreshState();
      render();
    });
    actions.append(visible);
    if (!field.isSystemField) {
      const remove = document.createElement("button");
      remove.className = "icon-button delete-field";
      remove.type = "button";
      remove.title = "删除字段";
      remove.textContent = "x";
      remove.addEventListener("click", async () => {
        await deleteOneField(field);
      });
      actions.append(remove);
    }
    row.append(label, actions);
    dom.fieldList.append(row);
  });
}

function renderCollection() {
  if (state.activeStorageName === ALL_STORAGE_KEY) {
    renderStorageOverview();
    return;
  }
  const artifacts = getFilteredArtifacts();
  dom.selectionSummary.textContent = `${artifacts.length} ${tr("items")} · ${tr("selected")} ${state.selectedIds.size}`;
  dom.emptyState.classList.toggle("hidden", state.artifacts.length > 0);
  dom.gridView.innerHTML = "";
  dom.listView.innerHTML = "";
  artifacts.forEach((artifact) => dom.gridView.append(createArtifactCard(artifact)));
  dom.listView.append(createArtifactTable(artifacts));
  syncTableScrollSlider();
}

function renderStorageOverview() {
  const storages = state.storages.length ? state.storages : [SILK_ROAD_LUTE_STORAGE];
  dom.selectionSummary.textContent = `${state.artifacts.length} ${tr("items")} · ${storages.length} ${state.language === "en" ? "storages" : "个库房"} · ${tr("selected")} ${state.selectedIds.size}`;
  dom.emptyState.classList.toggle("hidden", state.artifacts.length > 0);
  dom.gridView.innerHTML = "";
  dom.listView.innerHTML = "";
  const isList = state.viewMode === "list";
  dom.listControls.classList.toggle("hidden", !isList);
  dom.listView.classList.toggle("hidden", !isList);
  dom.gridView.classList.toggle("hidden", isList);
  dom.gridViewBtn.classList.toggle("active", !isList);
  dom.listViewBtn.classList.toggle("active", isList);
  if (isList) {
    storages.forEach((storageName) => {
      const artifacts = sortArtifacts(state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName));
      dom.listView.append(createStorageTableSection(storageName, artifacts));
    });
  } else {
    storages.forEach((storageName) => {
      const artifacts = state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName);
      dom.gridView.append(createStorageCard(storageName, artifacts));
    });
    dom.gridView.append(createNewStorageCard());
  }
  syncTableScrollSlider();
}

function createStorageTableSection(storageName, artifacts) {
  const section = document.createElement("section");
  section.className = "storage-table-section";
  const heading = document.createElement("div");
  heading.className = "storage-table-heading";
  heading.innerHTML = `
    <div>
      <h3>${escapeHtml(storageName)}</h3>
      <p>${artifacts.length} ${escapeHtml(tr("items"))}</p>
    </div>
  `;
  const openButton = document.createElement("button");
  openButton.className = "button subtle";
  openButton.type = "button";
  openButton.textContent = state.language === "en" ? "Open Storage" : "打开库房";
  openButton.addEventListener("click", () => setActiveStorage(storageName));
  heading.append(openButton);
  section.addEventListener("contextmenu", (event) => openStorageMenu(event, storageName));
  section.append(heading, createArtifactTable(artifacts, storageName));
  return section;
}

function createNewStorageCard() {
  const card = document.createElement("article");
  card.className = "storage-card new-storage-card";
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="artifact-thumb storage-thumb storage-add-thumb">+</div>
    <div class="artifact-card-body">
      <div class="artifact-title">${state.language === "en" ? "New Folder" : "新建文件夹"}</div>
      <div class="artifact-meta-line">${state.language === "en" ? "Create a storage for other entries" : "创建库房来装其他条目"}</div>
    </div>
  `;
  card.querySelector(".artifact-title").textContent = "New Inventory";
  const create = () => createNewInventory();
  card.addEventListener("click", create);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      create();
    }
  });
  return card;
}

function createStorageCard(storageName, artifacts) {
  const card = document.createElement("article");
  card.className = "storage-card";
  card.tabIndex = 0;
  const thumb = document.createElement("div");
  thumb.className = "artifact-thumb storage-thumb";
  const image = artifacts.map(getPrimaryImage).find(Boolean);
  if (image) {
    const img = document.createElement("img");
    img.src = getObjectUrl(image);
    img.alt = storageName;
    thumb.append(img);
  } else {
    const empty = document.createElement("div");
    empty.className = "artifact-thumb-empty";
    empty.textContent = state.language === "en" ? "Storage" : "库房";
    thumb.append(empty);
  }
  const body = document.createElement("div");
  body.className = "artifact-card-body";
  body.innerHTML = `
    <div class="artifact-title">${escapeHtml(storageName)}</div>
    <div class="artifact-meta-line">${artifacts.length} ${escapeHtml(tr("items"))}</div>
  `;
  card.append(thumb, body);
  const open = () => {
    state.activeStorageName = storageName;
    localStorage.setItem("easy-network-storage-name", state.activeStorageName);
    render();
  };
  card.addEventListener("click", open);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
  card.addEventListener("dblclick", async (event) => {
    event.stopPropagation();
    state.activeStorageName = storageName;
    await renameActiveStorage();
  });
  card.addEventListener("contextmenu", (event) => openStorageMenu(event, storageName));
  return card;
}

function menuText(en, zh) {
  return state.language === "zh" ? zh : en;
}

function showContextMenu(event, menuItems) {
  event.preventDefault();
  event.stopPropagation();
  dom.columnMenu.innerHTML = "";
  menuItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = `context-menu-button ${item.danger ? "danger" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.disabled = item.disabled;
    button.addEventListener("click", async () => {
      dom.columnMenu.classList.add("hidden");
      await item.action();
    });
    dom.columnMenu.append(button);
  });
  positionContextMenu(event);
}

function positionContextMenu(event, fallbackWidth = 240) {
  const margin = 12;
  dom.columnMenu.classList.remove("hidden");
  dom.columnMenu.style.visibility = "hidden";
  dom.columnMenu.style.left = "0px";
  dom.columnMenu.style.top = "0px";
  const rect = dom.columnMenu.getBoundingClientRect();
  const width = rect.width || fallbackWidth;
  const height = rect.height || 260;
  const left = Math.max(margin, Math.min(event.clientX, window.innerWidth - width - margin));
  const top = Math.max(margin, Math.min(event.clientY, window.innerHeight - height - margin));
  dom.columnMenu.style.left = `${left}px`;
  dom.columnMenu.style.top = `${top}px`;
  dom.columnMenu.style.visibility = "";
}

function createStorageClipboardPayload(storageName, mode) {
  const artifacts = state.artifacts
    .filter((artifact) => getArtifactStorageName(artifact) === storageName)
    .map((artifact) => ({
      ...artifact,
      metadata: { ...(artifact.metadata || {}) },
      customFields: { ...(artifact.customFields || {}) },
      imageIds: [...(artifact.imageIds || [])]
    }));
  const ids = new Set(artifacts.map((artifact) => artifact.id));
  const images = state.images
    .filter((image) => ids.has(image.artifactId))
    .map((image) => ({ ...image, viewState: { ...(image.viewState || {}) } }));
  return { mode, storageName, artifacts, images, sourceIds: artifacts.map((artifact) => artifact.id) };
}

function fieldStorageLinkPatch(field, targetStorage) {
  const storageNames = new Set(Array.isArray(field.storageNames) ? field.storageNames : []);
  if (field.storageName) storageNames.add(field.storageName);
  storageNames.add(targetStorage);
  return { storageNames: Array.from(storageNames) };
}

async function linkFieldsToStorageForArtifacts(artifacts, targetStorage) {
  const fieldIds = new Set(artifacts.flatMap((artifact) => Object.keys(artifact.customFields || {})));
  await Promise.all(state.fields
    .filter((field) => fieldIds.has(field.id))
    .map((field) => store.updateField(field.id, fieldStorageLinkPatch(field, targetStorage))));
}

function storageMovePatch(field, sourceStorage, targetStorage) {
  const patch = {};
  if (field.storageName === sourceStorage) patch.storageName = targetStorage;
  if (field.linkedStorageName === sourceStorage) patch.linkedStorageName = targetStorage;
  if (Array.isArray(field.storageNames) && field.storageNames.length) {
    patch.storageNames = [...new Set(field.storageNames.map((name) => (name === sourceStorage ? targetStorage : name)))];
  }
  return patch;
}

function storageDeleteOperation(field, sourceStorage) {
  if (field.isSystemField) return null;
  const patch = {};
  const remainingNames = Array.isArray(field.storageNames)
    ? [...new Set(field.storageNames.filter((name) => name !== sourceStorage))]
    : [];
  if (Array.isArray(field.storageNames)) patch.storageNames = remainingNames;
  if (field.storageName === sourceStorage) {
    if (!remainingNames.length) return { delete: true };
    patch.storageName = remainingNames[0];
  }
  if (field.linkedStorageName === sourceStorage) patch.linkedStorageName = "";
  return Object.keys(patch).length ? { patch } : null;
}

function promptTargetStorage(sourceStorage, title) {
  const existing = state.storages.filter((name) => name !== sourceStorage);
  const suggestion = existing[0] || "New Inventory";
  const help = existing.length ? `\nExisting: ${existing.join(", ")}` : "";
  return window.prompt(`${title}${help}`, suggestion)?.trim();
}

async function renameStorage(storageName) {
  const next = window.prompt(menuText("Rename inventory", "重命名库房"), storageName);
  const clean = next?.trim();
  if (!clean || clean === storageName) return;
  if (state.storages.includes(clean)) {
    window.alert(menuText("An inventory with this name already exists.", "已经存在同名库房。"));
    return;
  }
  await pushUndoSnapshot();
  state.storages = state.storages.map((name) => (name === storageName ? clean : name));
  if (state.activeStorageName === storageName) state.activeStorageName = clean;
  await Promise.all(state.artifacts
    .filter((artifact) => getArtifactStorageName(artifact) === storageName)
    .map((artifact) => store.updateArtifact(artifact.id, { storageName: clean })));
  await Promise.all(state.fields.map((field) => {
    const patch = storageMovePatch(field, storageName, clean);
    return Object.keys(patch).length ? store.updateField(field.id, patch) : Promise.resolve();
  }));
  ensureStorageState();
  await refreshState();
  render();
}

async function moveStorage(storageName) {
  const target = promptTargetStorage(storageName, menuText("Move inventory contents to", "移动库房内容到"));
  if (!target || target === storageName) return;
  await pushUndoSnapshot();
  if (!state.storages.includes(target)) state.storages.push(target);
  await Promise.all(state.artifacts
    .filter((artifact) => getArtifactStorageName(artifact) === storageName)
    .map((artifact) => store.updateArtifact(artifact.id, { storageName: target })));
  await Promise.all(state.fields.map((field) => {
    const patch = storageMovePatch(field, storageName, target);
    return Object.keys(patch).length ? store.updateField(field.id, patch) : Promise.resolve();
  }));
  state.storages = state.storages.filter((name) => name !== storageName);
  state.activeStorageName = target;
  if (state.storageClipboard?.storageName === storageName) state.storageClipboard = null;
  ensureStorageState();
  await refreshState();
  render();
}

function copyStorage(storageName) {
  state.storageClipboard = createStorageClipboardPayload(storageName, "copy");
}

function cutStorage(storageName) {
  state.storageClipboard = createStorageClipboardPayload(storageName, "cut");
}

async function pasteStorageInto(targetStorage) {
  if (!state.storageClipboard) return;
  const sourceStorage = state.storageClipboard.storageName;
  if (state.storageClipboard.mode === "cut") {
    if (sourceStorage === targetStorage) return;
    await pushUndoSnapshot();
    if (!state.storages.includes(targetStorage)) state.storages.push(targetStorage);
    await Promise.all(state.storageClipboard.sourceIds.map((id) => store.updateArtifact(id, { storageName: targetStorage })));
    await Promise.all(state.fields.map((field) => {
      const patch = storageMovePatch(field, sourceStorage, targetStorage);
      return Object.keys(patch).length ? store.updateField(field.id, patch) : Promise.resolve();
    }));
    state.storages = state.storages.filter((name) => name !== sourceStorage);
    state.storageClipboard = null;
    state.activeStorageName = targetStorage;
    ensureStorageState();
    await refreshState();
    render();
    return;
  }
  await pushUndoSnapshot();
  if (!state.storages.includes(targetStorage)) state.storages.push(targetStorage);
  const previousStorage = state.activeStorageName;
  state.activeStorageName = targetStorage;
  await linkFieldsToStorageForArtifacts(state.storageClipboard.artifacts, targetStorage);
  const createdIds = await store.pasteArtifacts(state.storageClipboard);
  state.activeStorageName = previousStorage === ALL_STORAGE_KEY ? ALL_STORAGE_KEY : targetStorage;
  state.selectedIds = new Set(createdIds);
  state.activeArtifactId = createdIds[0] || null;
  ensureStorageState();
  await refreshState();
  render();
}

async function deleteStorage(storageName) {
  const artifacts = state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName);
  const message = menuText(
    `Delete "${storageName}" and ${artifacts.length} item(s)?`,
    `删除“${storageName}”及其中 ${artifacts.length} 个条目？`
  );
  if (!window.confirm(message)) return;
  await pushUndoSnapshot();
  await store.deleteArtifacts(artifacts.map((artifact) => artifact.id));
  await Promise.all(state.fields.map((field) => {
    const operation = storageDeleteOperation(field, storageName);
    if (!operation) return Promise.resolve();
    if (operation.delete) return store.deleteField(field.id);
    return store.updateField(field.id, operation.patch);
  }));
  state.storages = state.storages.filter((name) => name !== storageName);
  state.activeStorageName = ALL_STORAGE_KEY;
  if (state.storageClipboard?.storageName === storageName) state.storageClipboard = null;
  ensureStorageState();
  await refreshState();
  render();
}

function openStorageMenu(event, storageName) {
  const itemCount = state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName).length;
  showContextMenu(event, [
    { label: menuText("Open inventory", "打开库房"), action: () => setActiveStorage(storageName) },
    { label: menuText("Rename inventory", "重命名库房"), action: () => renameStorage(storageName) },
    { label: menuText("Move contents to...", "移动内容到..."), action: () => moveStorage(storageName) },
    { label: menuText("Copy inventory", "复制库房"), action: () => copyStorage(storageName) },
    { label: menuText("Cut inventory", "剪切库房"), action: () => cutStorage(storageName) },
    {
      label: state.storageClipboard
        ? menuText(`Paste into "${storageName}"`, `粘贴到“${storageName}”`)
        : menuText("Paste into inventory", "粘贴到库房"),
      action: () => pasteStorageInto(storageName),
      disabled: !state.storageClipboard
    },
    { label: menuText(`Delete inventory (${itemCount})`, `删除库房（${itemCount}）`), action: () => deleteStorage(storageName), danger: true }
  ]);
}

function createArtifactCard(artifact) {
  const card = document.createElement("article");
  card.className = `artifact-card selectable-item ${state.selectedIds.has(artifact.id) ? "selected" : ""}`;
  card.dataset.artifactId = artifact.id;
  const thumb = document.createElement("div");
  thumb.className = "artifact-thumb";
  const image = getPrimaryImage(artifact);
  if (image) {
    const img = document.createElement("img");
    img.src = getObjectUrl(image);
    img.alt = artifact.title;
    thumb.append(img);
  } else {
    const empty = document.createElement("div");
    empty.className = "artifact-thumb-empty";
    empty.textContent = tr("noImage");
    thumb.append(empty);
  }
  const body = document.createElement("div");
  body.className = "artifact-card-body";
  const imageBadge = artifactHasImages(artifact) ? imagePresenceBadgeHtml() : "";
  body.innerHTML = `
    <div class="artifact-title">${escapeHtml(artifact.metadata.Title || artifact.title)}${imageBadge}</div>
    <div class="artifact-meta-line">${escapeHtml(artifact.metadata.Date || (state.language === "zh" ? "无日期" : "No date"))}</div>
    <div class="artifact-meta-line">${escapeHtml(artifact.metadata.Location || artifact.id)}</div>
  `;
  card.append(thumb, body);
  card.addEventListener("click", (event) => selectArtifact(artifact.id, event));
  card.addEventListener("contextmenu", (event) => openArtifactMenu(event, artifact.id));
  card.addEventListener("dblclick", openExpandedView);
  return card;
}

function createArtifactTable(artifacts, storageOverride = "") {
  const table = document.createElement("table");
  table.className = "artifact-table";
  const storageName = storageOverride || (artifacts[0] ? getArtifactStorageName(artifacts[0]) : currentWriteStorageName());
  const visibleFields = fieldsForStorage(storageName, { includeCustom: true }).filter((field) => field.visibleInList);
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  visibleFields.forEach((field) => {
    const th = document.createElement("th");
    th.textContent = field.label;
    const sortRule = state.sortRules.find((rule) => rule.fieldId === field.id);
    if (sortRule) {
      const indicator = document.createElement("button");
      indicator.className = "sort-indicator";
      indicator.type = "button";
      indicator.textContent = sortRule.direction === "asc" ? "↑" : "↓";
      indicator.title = state.language === "en" ? "Toggle sort direction" : "切换排序方向";
      indicator.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleHeaderSort(field.id);
      });
      th.append(indicator);
    }
    th.title = state.language === "en" ? "Click to sort by this field. Right click to choose visible fields." : "点击按此字段排序，右键选择显示字段";
    th.addEventListener("click", () => toggleHeaderSort(field.id));
    th.addEventListener("contextmenu", (event) => openColumnMenu(event));
    headerRow.append(th);
  });
  thead.append(headerRow);
  const tbody = document.createElement("tbody");
  artifacts.forEach((artifact) => {
    const row = document.createElement("tr");
    row.className = `artifact-row selectable-item ${state.selectedIds.has(artifact.id) ? "selected" : ""}`;
    row.dataset.artifactId = artifact.id;
    visibleFields.forEach((field, fieldIndex) => {
      const td = document.createElement("td");
      td.textContent = getFieldValue(artifact, field);
      if (fieldIndex === 0 && artifactHasImages(artifact)) td.append(createImagePresenceBadge());
      row.append(td);
    });
    row.addEventListener("click", (event) => selectArtifact(artifact.id, event));
    row.addEventListener("contextmenu", (event) => openArtifactMenu(event, artifact.id));
    row.addEventListener("dblclick", openExpandedView);
    tbody.append(row);
  });
  table.append(thead, tbody);
  return table;
}

function artifactHasImages(artifact) {
  if (!artifact) return false;
  return Boolean(artifact.imageIds?.length || state.images.some((image) => image.artifactId === artifact.id));
}

function imagePresenceBadgeHtml() {
  const label = state.language === "en" ? "Has images" : "有图片";
  return ` <span class="image-presence-badge" title="${label}" aria-label="${label}">IMG</span>`;
}

function createImagePresenceBadge() {
  const badge = document.createElement("span");
  badge.className = "image-presence-badge";
  badge.title = state.language === "en" ? "Has images" : "有图片";
  badge.setAttribute("aria-label", badge.title);
  badge.textContent = "IMG";
  return badge;
}

function openColumnMenu(event) {
  event.preventDefault();
  event.stopPropagation();
  dom.columnMenu.innerHTML = "";
  state.fields.forEach((field) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = field.visibleInList;
    checkbox.addEventListener("change", async () => {
      await store.updateField(field.id, { visibleInList: checkbox.checked });
      await refreshState();
      render();
      dom.columnMenu.classList.remove("hidden");
    });
    label.append(checkbox, document.createTextNode(field.label));
    dom.columnMenu.append(label);
  });
  positionContextMenu(event);
}

function openArtifactMenu(event, artifactId) {
  event.preventDefault();
  event.stopPropagation();
  if (!state.selectedIds.has(artifactId)) {
    state.selectedIds = new Set([artifactId]);
    state.activeArtifactId = artifactId;
    const artifact = getActiveArtifact();
    state.activeImageId = artifact?.imageIds?.[0] || null;
    renderCollection();
    renderDetail();
  }
  const selectedCount = state.selectedIds.size;
  dom.columnMenu.innerHTML = "";
  const menuItems = [
    { label: state.language === "zh" ? "选择此条" : "Select this row", action: () => selectArtifact(artifactId) },
    {
      label: state.selectedIds.has(artifactId)
        ? (state.language === "zh" ? "从多选中移除" : "Remove from selection")
        : (state.language === "zh" ? "加入多选" : "Add to selection"),
      action: () => toggleArtifactSelection(artifactId)
    },
    { label: state.language === "zh" ? "选择全部可见" : "Select visible rows", action: selectVisibleArtifacts },
    { label: `${state.language === "zh" ? "生成卡片/属性页" : "Build summary page"} (${selectedCount})`, action: () => openSummaryDialog(getSelectedArtifacts()) },
    { label: state.language === "zh" ? "导出 CSV" : "Export CSV", action: () => exportArtifactsCsv(getSelectedArtifacts()) },
    { label: state.language === "zh" ? "复制" : "Copy", action: copySelectedArtifacts },
    { label: state.language === "zh" ? "剪切" : "Cut", action: cutSelectedArtifacts },
    { label: state.language === "zh" ? "粘贴" : "Paste", action: pasteArtifactsFromClipboard, disabled: !state.clipboard },
    { label: state.language === "zh" ? "删除" : "Delete", action: deleteSelectedArtifacts, danger: true }
  ];
  menuItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = `context-menu-button ${item.danger ? "danger" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.disabled = item.disabled;
    button.addEventListener("click", async () => {
      dom.columnMenu.classList.add("hidden");
      await item.action();
    });
    dom.columnMenu.append(button);
  });
  positionContextMenu(event);
}

function toggleArtifactSelection(id) {
  if (state.selectedIds.has(id)) state.selectedIds.delete(id);
  else state.selectedIds.add(id);
  state.activeArtifactId = id;
  renderCollection();
  renderDetail();
}

function selectVisibleArtifacts() {
  state.selectedIds = new Set(getFilteredArtifacts().map((artifact) => artifact.id));
  state.activeArtifactId = Array.from(state.selectedIds)[0] || null;
  renderCollection();
  renderDetail();
}

function getSelectedArtifacts() {
  const selected = state.artifacts.filter((artifact) => state.selectedIds.has(artifact.id));
  return selected.length ? selected : getActiveArtifact() ? [getActiveArtifact()] : [];
}

function createClipboardPayload(mode) {
  const artifacts = getSelectedArtifacts().map((artifact) => ({
    ...artifact,
    metadata: { ...(artifact.metadata || {}) },
    customFields: { ...(artifact.customFields || {}) },
    imageIds: [...(artifact.imageIds || [])]
  }));
  const ids = new Set(artifacts.map((artifact) => artifact.id));
  const images = state.images
    .filter((image) => ids.has(image.artifactId))
    .map((image) => ({ ...image, viewState: { ...(image.viewState || {}) } }));
  return { mode, artifacts, images, sourceIds: artifacts.map((artifact) => artifact.id) };
}

function copySelectedArtifacts() {
  state.clipboard = createClipboardPayload("copy");
}

function cutSelectedArtifacts() {
  state.clipboard = createClipboardPayload("cut");
}

async function pasteArtifactsFromClipboard() {
  if (!state.clipboard) return;
  await pushUndoSnapshot();
  const createdIds = await store.pasteArtifacts(state.clipboard);
  if (state.clipboard.mode === "cut") {
    await store.deleteArtifacts(state.clipboard.sourceIds);
    state.clipboard = null;
  }
  await refreshState();
  state.selectedIds = new Set(createdIds);
  state.activeArtifactId = createdIds[0] || null;
  render();
}

async function deleteSelectedArtifacts() {
  const artifacts = getSelectedArtifacts();
  if (!artifacts.length) return;
  const message = state.language === "zh" ? `删除 ${artifacts.length} 个条目？` : `Delete ${artifacts.length} item(s)?`;
  if (!window.confirm(message)) return;
  await pushUndoSnapshot();
  await store.deleteArtifacts(artifacts.map((artifact) => artifact.id));
  await refreshState();
  state.selectedIds = new Set();
  state.activeArtifactId = null;
  state.activeImageId = null;
  render();
}

function openSummaryDialog(artifacts) {
  if (!artifacts.length) return;
  dom.summaryDialogTitle.textContent = `${tr("summaryTitle")} · ${artifacts.length}`;
  dom.summaryContent.innerHTML = "";
  artifacts.forEach((artifact) => {
    const card = document.createElement("article");
    card.className = "summary-card";
    const title = document.createElement("h3");
    title.textContent = artifact.metadata?.Title || artifact.title || artifact.id;
    const list = document.createElement("dl");
    state.fields.forEach((field) => {
      const dt = document.createElement("dt");
      dt.textContent = field.label;
      const dd = document.createElement("dd");
      dd.textContent = getFieldValue(artifact, field) || "";
      list.append(dt, dd);
    });
    const imageCount = document.createElement("p");
    imageCount.className = "artifact-meta-line";
    imageCount.textContent = state.language === "zh"
      ? `图片：${getImagesForArtifact(artifact).length}`
      : `Images: ${getImagesForArtifact(artifact).length}`;
    card.append(title, list, imageCount);
    dom.summaryContent.append(card);
  });
  dom.summaryDialog.classList.remove("hidden");
}

function closeSummaryDialog() {
  dom.summaryDialog.classList.add("hidden");
}

function exportArtifactsCsv(artifacts) {
  if (!artifacts.length) return;
  const headers = state.fields.map((field) => field.label);
  const rows = artifacts.map((artifact) => state.fields.map((field) => getFieldValue(artifact, field)));
  const csv = [headers, ...rows].map((row) => row.map(formatCsvCell).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `easy-network-artifacts-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function formatCsvCell(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function selectArtifact(id, event = {}) {
  if (event.ctrlKey || event.metaKey) {
    if (state.selectedIds.has(id)) state.selectedIds.delete(id);
    else state.selectedIds.add(id);
  } else {
    state.selectedIds = new Set([id]);
  }
  state.activeArtifactId = id;
  const artifact = getActiveArtifact();
  state.activeImageId = artifact?.imageIds?.[0] || null;
  window.location.hash = `#/items/${id}`;
  renderCollection();
  renderDetail();
  renderExpandedView();
}

function beginBoxSelect(event) {
  if (event.button !== 0) return;
  if (event.target.closest("button,input,textarea,select,.artifact-card,.artifact-row,.context-menu")) return;
  const start = { x: event.clientX, y: event.clientY };
  const surfaceRect = dom.collectionSurface.getBoundingClientRect();
  dom.selectionBox.classList.remove("hidden");
  dom.selectionBox.style.left = `${start.x - surfaceRect.left + dom.collectionSurface.scrollLeft}px`;
  dom.selectionBox.style.top = `${start.y - surfaceRect.top + dom.collectionSurface.scrollTop}px`;
  dom.selectionBox.style.width = "0px";
  dom.selectionBox.style.height = "0px";

  const onMove = (moveEvent) => {
    const current = { x: moveEvent.clientX, y: moveEvent.clientY };
    const left = Math.min(start.x, current.x) - surfaceRect.left + dom.collectionSurface.scrollLeft;
    const top = Math.min(start.y, current.y) - surfaceRect.top + dom.collectionSurface.scrollTop;
    const width = Math.abs(current.x - start.x);
    const height = Math.abs(current.y - start.y);
    Object.assign(dom.selectionBox.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`
    });
    const box = dom.selectionBox.getBoundingClientRect();
    const selected = new Set();
    document.querySelectorAll(".selectable-item").forEach((item) => {
      if (intersects(box, item.getBoundingClientRect())) selected.add(item.dataset.artifactId);
    });
    if (selected.size) {
      state.selectedIds = selected;
      state.activeArtifactId = Array.from(selected)[0];
      renderCollection();
    }
  };

  const onUp = () => {
    dom.selectionBox.classList.add("hidden");
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
    renderDetail();
  };

  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
}

function intersects(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function renderDetail() {
  const artifact = getActiveArtifact();
  if (!artifact) {
    dom.detailEmpty.classList.remove("hidden");
    dom.detailContent.classList.add("hidden");
    return;
  }
  dom.detailEmpty.classList.add("hidden");
  dom.detailContent.classList.remove("hidden");
  dom.detailTitle.textContent = artifact.metadata.Title || artifact.title;
  dom.detailId.textContent = artifact.id;
  ensureActiveImage(artifact);
  renderImage(dom.mainImage, dom.noImageState, getActiveImage());
  renderThumbnails(artifact);
  dom.metadataBlock?.classList.toggle("collapsed", state.metadataCollapsed);
  if (dom.metadataCollapseBtn) {
    dom.metadataCollapseBtn.textContent = state.metadataCollapsed ? "⌄" : "⌃";
    dom.metadataCollapseBtn.title = state.metadataCollapsed
      ? (state.language === "en" ? "Expand metadata" : "展开元数据")
      : (state.language === "en" ? "Collapse metadata" : "折叠元数据");
    dom.metadataCollapseBtn.setAttribute("aria-label", dom.metadataCollapseBtn.title);
  }
  renderMetadataForm(dom.metadataFields, artifact, false);
  renderCustomFields(dom.customFields, artifact, false);
}

function ensureActiveImage(artifact) {
  if (!artifact.imageIds?.length) {
    state.activeImageId = null;
    return;
  }
  if (!state.activeImageId || !artifact.imageIds.includes(state.activeImageId)) {
    state.activeImageId = artifact.imageIds[0];
  }
}

function renderImage(img, noImage, image) {
  if (!image) {
    img.removeAttribute("src");
    img.classList.add("hidden");
    noImage.classList.remove("hidden");
    dom.deleteImageBtn.disabled = true;
    return;
  }
  img.src = getObjectUrl(image);
  img.classList.remove("hidden");
  noImage.classList.add("hidden");
  dom.deleteImageBtn.disabled = false;
  applyTransform(img, image.viewState || { zoom: 1, panX: 0, panY: 0 });
  dom.zoomSlider.value = image.viewState?.zoom || 1;
  dom.expandedZoomSlider.value = image.viewState?.zoom || 1;
  syncImageAdjustmentControls(image.viewState || {});
}

function renderThumbnails(artifact) {
  dom.thumbnailStrip.innerHTML = "";
  getImagesForArtifact(artifact).forEach((image) => {
    const button = document.createElement("button");
    button.className = `thumbnail ${image.id === state.activeImageId ? "active" : ""}`;
    button.type = "button";
    button.draggable = true;
    button.setAttribute("draggable", "true");
    button.dataset.imageId = image.id;
    const img = document.createElement("img");
    img.src = getObjectUrl(image);
    img.alt = image.filename;
    button.append(img);
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", image.id);
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
      button.classList.add("dragging");
    });
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      button.classList.add("drag-over");
    });
    button.addEventListener("dragleave", () => button.classList.remove("drag-over"));
    button.addEventListener("drop", async (event) => {
      event.preventDefault();
      button.classList.remove("drag-over");
      const sourceId = event.dataTransfer?.getData("text/plain");
      await reorderThumbnailImage(artifact, sourceId, image.id);
    });
    button.addEventListener("dragend", () => {
      button.classList.remove("dragging", "drag-over");
    });
    button.addEventListener("click", () => {
      state.activeImageId = image.id;
      renderDetail();
      renderExpandedView();
    });
    dom.thumbnailStrip.append(button);
  });
}

async function reorderThumbnailImage(artifact, sourceId, targetId) {
  if (!artifact || !sourceId || !targetId || sourceId === targetId) return;
  const ordered = [...(artifact.imageIds || [])];
  const sourceIndex = ordered.indexOf(sourceId);
  const targetIndex = ordered.indexOf(targetId);
  if (sourceIndex < 0 || targetIndex < 0) return;
  ordered.splice(sourceIndex, 1);
  ordered.splice(targetIndex, 0, sourceId);
  await pushUndoSnapshot();
  await store.reorderImages(artifact.id, ordered);
  state.activeImageId = sourceId;
  await refreshState();
  render();
}

function renderMetadataForm(container, artifact, expanded) {
  container.innerHTML = "";
  SYSTEM_FIELDS.forEach((field) => {
    const value = getFieldValue(artifact, field);
    const row = createMetadataRow(field.label, value, {
      readOnly: false,
      longText: field.label === "Note",
      expanded: expanded || state.noteExpanded,
      suggestions: getExistingFieldValues(field),
      onInput: async (nextValue) => {
        if (field.label === "ID") {
          await pushUndoSnapshot();
          const result = await store.updateArtifactId(artifact.id, nextValue);
          if (!result.ok) {
            window.alert(result.reason === "duplicate" ? "这个 ID 已经存在，请输入一个不一样的 ID。" : "无法修改这个 ID。");
            renderDetail();
            renderExpandedView();
            return;
          }
          state.activeArtifactId = result.id;
          state.selectedIds = new Set([result.id]);
          window.location.hash = `#/items/${result.id}`;
          await refreshState();
          render();
          return;
        }
        await pushUndoSnapshot();
        await store.updateArtifact(artifact.id, { metadata: { [field.label]: nextValue } });
        await refreshState();
        if (field.label === "Title") renderCollection();
        renderDetail();
        renderExpandedView();
      },
      onToggle: expanded ? null : () => {
        state.noteExpanded = !state.noteExpanded;
        renderDetail();
        renderExpandedView();
      }
    });
    container.append(row);
  });
}

function renderCustomFields(container, artifact, expanded) {
  container.innerHTML = "";
  const storageName = getArtifactStorageName(artifact);
  const allCustom = state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, storageName));
  const applicable = allCustom.filter((field) => fieldAppliesToArtifact(field, artifact));
  if (allCustom.length && allCustom.length !== applicable.length) {
    const toolbar = document.createElement("div");
    toolbar.className = "field-align-toolbar";
    const toggle = document.createElement("button");
    toggle.className = "button subtle";
    toggle.type = "button";
    toggle.textContent = state.showAllCustomFields ? tr("showCurrentFields") : tr("showAllFields");
    toggle.addEventListener("click", () => {
      state.showAllCustomFields = !state.showAllCustomFields;
      renderDetail();
      renderExpandedView();
    });
    toolbar.append(toggle);
    container.append(toolbar);
  }
  const custom = state.showAllCustomFields ? allCustom : applicable;
  if (!custom.length) {
    const empty = document.createElement("p");
    empty.className = "artifact-meta-line";
    empty.textContent = tr("noCustomFields");
    container.append(empty);
    return;
  }
  custom.forEach((field) => {
    const applies = fieldAppliesToArtifact(field, artifact);
    if (!applies) {
      const row = document.createElement("div");
      row.className = "metadata-row missing-field-row";
      const label = document.createElement("label");
      label.textContent = field.label;
      const input = document.createElement("input");
      input.className = "metadata-input";
      input.disabled = true;
      input.placeholder = state.language === "zh" ? "本条目未启用" : "Not on this item";
      const add = document.createElement("button");
      add.className = "icon-button";
      add.type = "button";
      add.title = tr("addThisField");
      add.textContent = "+";
      add.addEventListener("click", () => addFieldToArtifact(field, artifact));
      row.append(label, input, add);
      container.append(row);
      return;
    }
    const row = createMetadataRow(field.label, artifact.customFields?.[field.id] || "", {
      readOnly: false,
      longText: field.type === "longtext",
      expanded,
      suggestions: getExistingFieldValues(field),
      onInput: async (nextValue) => {
        await pushUndoSnapshot();
        await store.updateArtifact(artifact.id, { customFields: { [field.id]: nextValue } });
        await refreshState();
        renderCollection();
        renderDetail();
        renderExpandedView();
      }
    });
    row.addEventListener("contextmenu", (event) => openFieldContextMenu(event, field));
    container.append(row);
  });
}

function getExistingFieldValues(field) {
  const values = new Set();
  state.artifacts.forEach((artifact) => {
    const value = getFieldValue(artifact, field);
    if (value) values.add(value);
  });
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

function attachValueSuggestions(input, fieldLabel, values = []) {
  if (!input || !values.length) return;
  const safeId = `values-${fieldLabel}`.replace(/[^a-zA-Z0-9_-]+/g, "-");
  let datalist = document.getElementById(safeId);
  if (!datalist) {
    datalist = document.createElement("datalist");
    datalist.id = safeId;
    document.body.append(datalist);
  }
  datalist.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    datalist.append(option);
  });
  input.setAttribute("list", safeId);
  input.setAttribute("autocomplete", "off");
}

async function openFieldContextMenu(event, field) {
  event.preventDefault();
  const action = window.prompt(
    state.language === "zh"
      ? `字段：${field.label}\n1 重命名这个字段\n2 删除这个字段\n3 批量重命名字段\n4 批量删除字段`
      : `Field: ${field.label}\n1 Rename this field\n2 Delete this field\n3 Batch rename fields\n4 Batch delete fields`,
    "1"
  );
  if (action === "1") await renameField(field);
  if (action === "2") await deleteOneField(field);
  if (action === "3") await batchRenameFields();
  if (action === "4") await batchDeleteFields();
}

async function renameField(field) {
  if (field.isSystemField) return;
  const next = window.prompt(state.language === "zh" ? "新的字段名" : "New field name", field.label);
  const clean = String(next || "").trim();
  if (!clean || clean === field.label) return;
  if (state.fields.some((item) => item.id !== field.id && item.label.toLowerCase() === clean.toLowerCase())) {
    window.alert(state.language === "zh" ? "字段名已经存在。" : "That field name already exists.");
    return;
  }
  await pushUndoSnapshot();
  await store.updateField(field.id, { label: clean });
  await refreshState();
  render();
}

async function renameField(field) {
  if (field.isSystemField) return;
  const next = window.prompt("New field name", field.label);
  const clean = String(next || "").trim();
  if (!clean || clean === field.label) return;

  const selectedArtifacts = getSelectedArtifacts();
  const scope = selectedArtifacts.length
    ? String(window.prompt("Rename scope: all / selected", "all") || "all").trim().toLowerCase()
    : "all";
  if (scope.startsWith("s")) {
    await renameFieldForSelectedArtifacts(field, clean, selectedArtifacts);
    return;
  }

  if (state.fields.some((item) => item.id !== field.id && item.label.toLowerCase() === clean.toLowerCase())) {
    window.alert("That field name already exists.");
    return;
  }
  await pushUndoSnapshot();
  await store.updateField(field.id, { label: clean });
  await refreshState();
  render();
}

async function renameFieldForSelectedArtifacts(field, cleanLabel, selectedArtifacts) {
  if (!selectedArtifacts.length) {
    return { error: "Select at least one item first." };
  }
  if (state.fields.some((item) => item.label.toLowerCase() === cleanLabel.toLowerCase())) {
    return { error: "That field name already exists." };
  }

  await pushUndoSnapshot();
  const selectedIds = new Set(selectedArtifacts.map((artifact) => artifact.id));
  const storageName = field.storageName || getArtifactStorageName(selectedArtifacts[0]);
  const scopedField = await store.createField(cleanLabel, {
    storageName,
    linkedStorageName: field.linkedStorageName || "",
    appliesTo: "selected",
    artifactIds: Array.from(selectedIds)
  });
  if (field.storageNames?.length) {
    await store.updateField(scopedField.id, { storageNames: [...field.storageNames] });
  }

  await Promise.all(selectedArtifacts.map((artifact) => store.updateArtifact(artifact.id, {
    customFields: { [scopedField.id]: artifact.customFields?.[field.id] || "" }
  })));

  const remainingIds = state.artifacts
    .filter((artifact) => fieldBelongsToStorage(field, getArtifactStorageName(artifact)) && !selectedIds.has(artifact.id))
    .map((artifact) => artifact.id);
  await store.updateField(field.id, { appliesTo: "selected", artifactIds: remainingIds });
  await refreshState();
  render();
  return { ok: true };
}

async function deleteOneField(field) {
  if (field.isSystemField) return;
  if (!window.confirm(state.language === "zh" ? `删除字段 "${field.label}"？` : `Delete field "${field.label}"?`)) return;
  await pushUndoSnapshot();
  await store.deleteField(field.id);
  await refreshState();
  render();
}

async function batchRenameFields() {
  const text = window.prompt(
    state.language === "zh"
      ? "批量重命名：每行写 旧字段名=新字段名"
      : "Batch rename: one pair per line, Old field=New field",
    ""
  );
  if (!text) return;
  const pairs = text.split(/\n|;/).map((line) => line.split("=")).filter((pair) => pair.length === 2);
  if (!pairs.length) return;
  await pushUndoSnapshot();
  for (const [from, to] of pairs) {
    const field = state.fields.find((item) => !item.isSystemField && item.label.toLowerCase() === from.trim().toLowerCase());
    const clean = to.trim();
    if (field && clean) await store.updateField(field.id, { label: clean });
  }
  await refreshState();
  render();
}

async function batchDeleteFields() {
  const text = window.prompt(
    state.language === "zh"
      ? "批量删除字段：输入字段名，用逗号或换行分隔"
      : "Batch delete fields: enter field names separated by commas or new lines",
    ""
  );
  if (!text) return;
  const names = text.split(/[,\n，]+/).map((item) => item.trim().toLowerCase()).filter(Boolean);
  const fields = state.fields.filter((field) => !field.isSystemField && names.includes(field.label.toLowerCase()));
  if (!fields.length) return;
  if (!window.confirm(state.language === "zh" ? `删除 ${fields.length} 个字段？` : `Delete ${fields.length} fields?`)) return;
  await pushUndoSnapshot();
  await store.deleteFields(fields.map((field) => field.id));
  await refreshState();
  render();
}

function openFieldContextMenu(event, field) {
  event.preventDefault();
  if (field.isSystemField) return;
  dom.columnMenu.innerHTML = "";
  const title = document.createElement("div");
  title.className = "context-menu-title";
  title.textContent = `Field: ${field.label}`;

  const nameInput = document.createElement("input");
  nameInput.className = "input context-menu-input";
  nameInput.value = field.label;

  const scopeSelect = document.createElement("select");
  scopeSelect.className = "input context-menu-input";
  scopeSelect.innerHTML = `
    <option value="all">Rename all matching field uses</option>
    <option value="selected">Selected entries only</option>
  `;

  const feedback = document.createElement("div");
  feedback.className = "context-menu-feedback";

  const renameButton = createContextButton("Rename field", async () => {
    const clean = nameInput.value.trim();
    const result = await applyFieldRename(field, clean, scopeSelect.value);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    dom.columnMenu.classList.add("hidden");
  });
  const deleteButton = createContextButton("Delete field", async () => {
    await deleteFieldsDirect([field]);
    dom.columnMenu.classList.add("hidden");
  }, true);

  const batchBox = document.createElement("textarea");
  batchBox.className = "input context-menu-input";
  batchBox.rows = 3;
  batchBox.placeholder = "Batch rename: Old=New, one per line";
  const batchRenameButton = createContextButton("Batch rename", async () => {
    const result = await applyBatchRenameText(batchBox.value);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    dom.columnMenu.classList.add("hidden");
  });
  const batchDeleteButton = createContextButton("Batch delete listed fields", async () => {
    const result = await applyBatchDeleteText(batchBox.value);
    if (result?.error) {
      feedback.textContent = result.error;
      return;
    }
    dom.columnMenu.classList.add("hidden");
  }, true);

  dom.columnMenu.append(title, nameInput, scopeSelect, renameButton, deleteButton, batchBox, batchRenameButton, batchDeleteButton, feedback);
  positionContextMenu(event, 280);
  nameInput.focus();
  nameInput.select();
}

function createContextButton(label, action, danger = false) {
  const button = document.createElement("button");
  button.className = `context-menu-button ${danger ? "danger" : ""}`;
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", action);
  return button;
}

async function renameField(field) {
  const rect = document.body.getBoundingClientRect();
  openFieldContextMenu({
    preventDefault() {},
    clientX: rect.left + 240,
    clientY: rect.top + 180
  }, field);
}

async function applyFieldRename(field, cleanLabel, scope = "all") {
  if (field.isSystemField) return { error: "System fields cannot be renamed here." };
  if (!cleanLabel || cleanLabel === field.label) return { error: "Enter a new field name." };
  if (scope === "selected") {
    return renameFieldForSelectedArtifacts(field, cleanLabel, getSelectedArtifacts());
  }
  if (state.fields.some((item) => item.id !== field.id && item.label.toLowerCase() === cleanLabel.toLowerCase())) {
    return { error: "That field name already exists." };
  }
  await pushUndoSnapshot();
  await store.updateField(field.id, { label: cleanLabel });
  await refreshState();
  render();
  return { ok: true };
}

async function deleteOneField(field) {
  await deleteFieldsDirect([field]);
}

async function deleteFieldsDirect(fields) {
  const ids = fields.filter((field) => field && !field.isSystemField).map((field) => field.id);
  if (!ids.length) return { error: "No editable fields selected." };
  await pushUndoSnapshot();
  if (ids.length === 1) await store.deleteField(ids[0]);
  else await store.deleteFields(ids);
  await refreshState();
  render();
  return { ok: true };
}

async function applyBatchRenameText(text) {
  const pairs = String(text || "").split(/\n|;/).map((line) => line.split("=")).filter((pair) => pair.length === 2);
  if (!pairs.length) return { error: "Use Old=New, one pair per line." };
  await pushUndoSnapshot();
  for (const [from, to] of pairs) {
    const field = state.fields.find((item) => !item.isSystemField && item.label.toLowerCase() === from.trim().toLowerCase());
    const clean = to.trim();
    if (field && clean) await store.updateField(field.id, { label: clean });
  }
  await refreshState();
  render();
  return { ok: true };
}

async function applyBatchDeleteText(text) {
  const names = String(text || "").split(/[,\n;]+/).map((item) => item.trim().toLowerCase()).filter(Boolean);
  const fields = state.fields.filter((field) => !field.isSystemField && names.includes(field.label.toLowerCase()));
  if (!fields.length) return { error: "List at least one matching custom field name." };
  return deleteFieldsDirect(fields);
}

async function addFieldToArtifact(field, artifact) {
  await pushUndoSnapshot();
  await store.updateField(field.id, {
    appliesTo: field.appliesTo === "all" ? "all" : "selected",
    artifactIds: Array.from(new Set([...(field.artifactIds || []), artifact.id]))
  });
  await refreshState();
  render();
}

function createMetadataRow(labelText, value, options) {
  const row = document.createElement("div");
  row.className = "metadata-row";
  const label = document.createElement("label");
  label.textContent = labelText;
  const input = options.longText ? document.createElement("textarea") : document.createElement("input");
  input.className = options.longText
    ? `metadata-textarea ${options.expanded ? "expanded" : "compact"}`
    : "metadata-input";
  input.value = value || "";
  input.readOnly = options.readOnly;
  if (!options.longText) attachValueSuggestions(input, labelText, options.suggestions);
  input.addEventListener("change", () => options.onInput?.(input.value));
  row.append(label, input);
  if (options.longText && options.onToggle) {
    const toggle = document.createElement("button");
    toggle.className = "icon-button";
    toggle.type = "button";
    toggle.textContent = options.expanded ? tr("collapse") : tr("expand");
    toggle.title = options.expanded ? tr("collapse") : tr("expand");
    toggle.addEventListener("click", () => options.onToggle?.());
    row.append(toggle);
  } else {
    const spacer = document.createElement("span");
    row.append(spacer);
  }
  return row;
}

function openExpandedView() {
  if (!getActiveArtifact()) return;
  state.expandedOpen = true;
  dom.expandedView.classList.remove("hidden");
  renderExpandedView();
}

function closeExpandedView() {
  state.expandedOpen = false;
  dom.expandedView.classList.add("hidden");
}

function setExpandedTab(tab) {
  state.expandedTab = tab;
  applyExpandedTabUI();
  renderExpandedView();
}

function applyExpandedTabUI() {
  document.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.tab === state.expandedTab));
  dom.expandedImageTab.classList.toggle("hidden", state.expandedTab !== "image");
  dom.expandedMetadataTab.classList.toggle("hidden", state.expandedTab !== "metadata");
  dom.expandedFieldsTab.classList.toggle("hidden", state.expandedTab !== "fields");
}

function renderExpandedView() {
  const artifact = getActiveArtifact();
  if (!artifact || !state.expandedOpen) return;
  dom.expandedTitle.textContent = artifact.metadata.Title || artifact.title;
  dom.expandedSubTitle.textContent = artifact.id;
  renderImage(dom.expandedImage, dom.expandedNoImageState, getActiveImage());
  renderMetadataForm(dom.expandedInlineMetadataFields, artifact, true);
  renderCustomFields(dom.expandedInlineCustomFields, artifact, true);
  renderMetadataForm(dom.expandedMetadataFields, artifact, true);
  renderCustomFields(dom.expandedCustomFields, artifact, true);
  applyExpandedTabUI();
}

function setupImageViewer(config) {
  let panMode = false;
  let dragging = false;
  let last = { x: 0, y: 0 };

  config.slider.addEventListener("input", () => {
    const image = config.getImage();
    if (!image) return;
    const viewState = { ...(image.viewState || {}), zoom: Number(config.slider.value) };
    config.onChange(viewState);
  });

  config.panButton.addEventListener("click", () => {
    panMode = !panMode;
    config.panButton.classList.toggle("active", panMode);
    config.viewport.classList.toggle("pannable", panMode);
  });

  config.resetButton.addEventListener("click", () => {
    config.onChange({ zoom: 1, panX: 0, panY: 0 });
  });

  config.viewport.addEventListener("pointerdown", (event) => {
    if (!panMode || !config.getImage()) return;
    dragging = true;
    last = { x: event.clientX, y: event.clientY };
    config.viewport.classList.add("panning");
    config.viewport.setPointerCapture(event.pointerId);
  });

  config.viewport.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const image = config.getImage();
    const current = image.viewState || { zoom: 1, panX: 0, panY: 0 };
    const next = {
      ...current,
      panX: (current.panX || 0) + event.clientX - last.x,
      panY: (current.panY || 0) + event.clientY - last.y
    };
    last = { x: event.clientX, y: event.clientY };
    config.onChange(next);
  });

  config.viewport.addEventListener("pointerup", () => {
    dragging = false;
    config.viewport.classList.remove("panning");
  });
}

let saveViewStateTimer = null;
function updateActiveImageViewState(viewState) {
  const image = getActiveImage();
  if (!image) return;
  image.viewState = { ...image.viewState, ...viewState };
  applyTransform(dom.mainImage, image.viewState);
  applyTransform(dom.expandedImage, image.viewState);
  dom.zoomSlider.value = image.viewState.zoom || 1;
  dom.expandedZoomSlider.value = image.viewState.zoom || 1;
  syncImageAdjustmentControls(image.viewState);
  window.clearTimeout(saveViewStateTimer);
  saveViewStateTimer = window.setTimeout(async () => {
    await store.updateImageViewState(image.id, image.viewState);
  }, 160);
}

function applyTransform(img, viewState) {
  const zoom = viewState.zoom || 1;
  const panX = viewState.panX || 0;
  const panY = viewState.panY || 0;
  const brightness = Number(viewState.brightness ?? 1);
  const contrast = Number(viewState.contrast ?? 1);
  const saturation = Number(viewState.saturation ?? 1);
  const exposure = Number(viewState.exposure ?? 1);
  img.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`;
  img.style.filter = `brightness(${brightness * exposure}) contrast(${contrast}) saturate(${saturation})`;
}

function updateImageAdjustmentFromControls() {
  const image = getActiveImage();
  if (!image) return;
  updateActiveImageViewState({
    brightness: Number(dom.imageBrightnessControl?.value || 1),
    contrast: Number(dom.imageContrastControl?.value || 1),
    saturation: Number(dom.imageSaturationControl?.value || 1),
    exposure: Number(dom.imageExposureControl?.value || 1)
  });
}

function syncImageAdjustmentControls(viewState = {}) {
  if (dom.imageBrightnessControl) dom.imageBrightnessControl.value = viewState.brightness ?? 1;
  if (dom.imageContrastControl) dom.imageContrastControl.value = viewState.contrast ?? 1;
  if (dom.imageSaturationControl) dom.imageSaturationControl.value = viewState.saturation ?? 1;
  if (dom.imageExposureControl) dom.imageExposureControl.value = viewState.exposure ?? 1;
}

async function saveActiveImageAdjustments() {
  const image = getActiveImage();
  if (!image) return;
  await store.updateImageViewState(image.id, image.viewState || {});
}

function getFilteredArtifacts() {
  const search = normalize(state.filters.search);
  const filterValue = normalize(state.filters.value);
  const filterField = state.fields.find((field) => field.id === state.filters.fieldId);
  const filtered = state.artifacts.filter((artifact) => {
    if (state.activeStorageName !== ALL_STORAGE_KEY && getArtifactStorageName(artifact) !== state.activeStorageName) return false;
    const values = [
      artifact.id,
      ...SYSTEM_METADATA_KEYS.map((key) => artifact.metadata?.[key] || ""),
      ...state.fields.filter((field) => !field.isSystemField && fieldBelongsToStorage(field, getArtifactStorageName(artifact))).map((field) => artifact.customFields?.[field.id] || "")
    ];
    const haystack = values.join(" ");
    const searchMatches = !search || normalize(haystack).includes(search) || state.fields.some((field) => normalize(field.label).includes(search));
    const fieldMatches = !filterValue
      || (state.filters.fieldId === "all" && values.some((value) => normalize(value).includes(filterValue)))
      || (filterField && normalize(getFieldValue(artifact, filterField)).includes(filterValue));
    return searchMatches && fieldMatches;
  });
  return sortArtifacts(filtered);
}

function sortArtifacts(artifacts) {
  if (!state.sortRules.length) {
    const idField = state.fields.find((field) => field.label === "ID");
    return [...artifacts].sort((a, b) => String(getFieldValue(a, idField)).localeCompare(String(getFieldValue(b, idField)), undefined, { numeric: true, sensitivity: "base" }));
  }
  return [...artifacts].sort((a, b) => {
    for (const rule of state.sortRules) {
      const field = state.fields.find((candidate) => candidate.id === rule.fieldId);
      const left = getFieldValue(a, field);
      const right = getFieldValue(b, field);
      const comparison = String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: "base" });
      if (comparison !== 0) return rule.direction === "desc" ? -comparison : comparison;
    }
    return a.updatedAt.localeCompare(b.updatedAt);
  });
}

function getFieldValue(artifact, field) {
  if (!field) return "";
  if (field.label === "ID") return artifact.id;
  if (field.isSystemField) return artifact.metadata?.[field.label] || "";
  if (!fieldAppliesToArtifact(field, artifact)) return "";
  return artifact.customFields?.[field.id] || "";
}

function fieldAppliesToArtifact(field, artifact) {
  if (!field || field.isSystemField) return true;
  if (!fieldBelongsToStorage(field, getArtifactStorageName(artifact))) return false;
  if (!field.appliesTo || field.appliesTo === "all") return true;
  return Array.isArray(field.artifactIds) && field.artifactIds.includes(artifact.id);
}

function getActiveArtifact() {
  return state.artifacts.find((artifact) => artifact.id === state.activeArtifactId) || state.artifacts.find((artifact) => state.selectedIds.has(artifact.id));
}

function getPrimaryImage(artifact) {
  return getImagesForArtifact(artifact)[0];
}

function getImagesForArtifact(artifact) {
  if (!artifact) return [];
  return artifact.imageIds.map((id) => state.images.find((image) => image.id === id)).filter(Boolean);
}

function getActiveImage() {
  const artifact = getActiveArtifact();
  if (!artifact) return null;
  ensureActiveImage(artifact);
  return state.images.find((image) => image.id === state.activeImageId) || null;
}

function getObjectUrl(image) {
  if (state.objectUrls.has(image.id)) return state.objectUrls.get(image.id);
  const url = URL.createObjectURL(image.blob);
  state.objectUrls.set(image.id, url);
  return url;
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanCell(value) {
  return String(value ?? "").replace(/\uFEFF/g, "").trim();
}

function normalizeHeader(value) {
  return cleanCell(value).toLowerCase().replace(/[\s_-]+/g, "");
}

function findCsvColumn(headers, names) {
  const normalizedNames = new Set(names.map(normalizeHeader));
  return headers.findIndex((header) => normalizedNames.has(normalizeHeader(header)));
}

function nextImportedArtifactId(storageName, usedIds) {
  const prefix = storagePrefix(storageName);
  let index = 1;
  let id = `${prefix}-${String(index).padStart(3, "0")}`;
  while (usedIds.has(id)) {
    index += 1;
    id = `${prefix}-${String(index).padStart(3, "0")}`;
  }
  return id;
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === "\"" && next === "\"") {
        cell += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }
    if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyRoute() {
  if (window.location.hash === "#network") {
    showWorkspaceMode("network", false);
    return;
  }
  showWorkspaceMode("inventory", false);

  const shareMatch = window.location.hash.match(/^#\/share\/([^/]+)$/);
  if (shareMatch) {
    const token = shareMatch[1];
    let payload = null;
    try {
      payload = JSON.parse(localStorage.getItem(`easy-network-share-${token}`) || "null");
    } catch (error) {
      payload = null;
    }
    if (payload?.editable && payload.scope === "storage" && payload.storageName) {
      state.activeStorageName = payload.storageName;
      localStorage.setItem("easy-network-storage-name", state.activeStorageName);
    }
    if (!state.activeArtifactId && state.artifacts[0]) {
      state.activeArtifactId = state.artifacts[0].id;
      state.selectedIds = new Set([state.artifacts[0].id]);
    }
    render();
    return;
  }
  const match = window.location.hash.match(/^#\/items\/([^/]+)$/);
  if (!match) return;
  const id = decodeURIComponent(match[1]);
  if (state.artifacts.some((artifact) => artifact.id === id)) {
    state.activeArtifactId = id;
    state.selectedIds = new Set([id]);
    render();
  }
}

function openProjectDialog() {
  const token = state.project?.shareToken || "share-local-archive";
  const url = `${location.origin}${location.pathname}#/share/${token}`;
  dom.shareLink.textContent = url;
  dom.shareLink.href = `#/share/${token}`;
  dom.projectDialog.classList.remove("hidden");
}

async function createEditableShareLink(scope) {
  const isStorage = scope === "storage";
  const storageName = state.activeStorageName === ALL_STORAGE_KEY ? "" : state.activeStorageName;
  if (isStorage && !storageName) {
    window.alert(state.language === "en" ? "Choose an inventory before sharing it." : "请先选择一个 inventory。");
    return;
  }
  const token = `${isStorage ? "storage" : "project"}-${Date.now().toString(36)}`;
  const artifacts = isStorage
    ? state.artifacts.filter((artifact) => getArtifactStorageName(artifact) === storageName)
    : state.artifacts;
  const artifactIds = new Set(artifacts.map((artifact) => artifact.id));
  const fields = isStorage
    ? state.fields.filter((field) => field.isSystemField || fieldIsDefinedInStorage(field, storageName))
    : state.fields;
  const images = isStorage
    ? state.images.filter((image) => artifactIds.has(image.artifactId))
    : state.images;
  const payload = {
    token,
    editable: true,
    scope,
    storageName,
    createdAt: new Date().toISOString(),
    project: state.project,
    artifacts,
    fields,
    images
  };
  localStorage.setItem(`easy-network-share-${token}`, JSON.stringify(payload));
  const url = `${location.origin}${location.pathname}#/share/${token}`;
  if (dom.shareLink) {
    dom.shareLink.textContent = url;
    dom.shareLink.href = `#/share/${token}`;
  }
  dom.projectDialog?.classList.remove("hidden");
  try {
    await navigator.clipboard?.writeText(url);
  } catch (error) {
    // The visible link remains available when clipboard access is blocked.
  }
}

boot().catch((error) => {
  console.error(error);
  window.alert(`应用启动失败：${error.message}`);
});
