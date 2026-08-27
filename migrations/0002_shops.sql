-- shop overrides (edit/delete for static shop-card-data)
CREATE TABLE IF NOT EXISTS shop_overrides (
  shop_id TEXT PRIMARY KEY,
  data_json TEXT NOT NULL DEFAULT '{}',
  deleted INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by INTEGER
);

CREATE INDEX IF NOT EXISTS idx_shop_overrides_deleted ON shop_overrides(deleted);
