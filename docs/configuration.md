# Configuration

Parime is configured through the Fable settings object, which can be passed when creating the Fable instance or loaded from a JSON file.

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `Product` | string | `"Parime"` | Application name identifier |
| `ProductVersion` | string | `"1.0.0"` | Application version string |
| `APIServerPort` | number | `9999` | Port for the HTTP server to listen on |
| `ParimeBinaryStorageRoot` | string | `"./parime-binary-storage/"` | Root directory for binary file storage |
| `RestifyConfiguration` | object | `{ strictNext: true, handleUpgrades: true }` | Configuration passed to the Restify server |

## Example Configuration

```json
{
  "Product": "MyDataLake",
  "ProductVersion": "1.0.0",
  "APIServerPort": 8080,
  "ParimeBinaryStorageRoot": "/var/data/parime/",
  "RestifyConfiguration": {
    "strictNext": true,
    "handleUpgrades": true
  }
}
```

## Binary Storage Root

The `ParimeBinaryStorageRoot` setting controls where binary files are stored on the filesystem. The directory is created automatically during initialization if it does not exist.

Files are organized under this root as `{root}/{category}/{hash-path-segments}`. For example, with a root of `./data/`, a category of `images` and a hash of `2024/photos/vacation.jpg`, the file would be stored at `./data/images/2024/photos/vacation.jpg`.

## Restify Configuration

The `RestifyConfiguration` object is passed directly to the Restify server constructor. The `handleUpgrades: true` setting is required for WebSocket support -- it tells Restify to allow HTTP upgrade requests rather than rejecting them.

| RestifyConfiguration Key | Default | Description |
|--------------------------|---------|-------------|
| `strictNext` | `true` | Enforce calling `next()` in route handlers |
| `handleUpgrades` | `true` | Allow HTTP upgrade requests for WebSocket support |

## Default Options File

Parime ships with a default options file at `source/Parime-Server-Options.json`:

```json
{
  "Product": "Parime",
  "ProductVersion": "1.0.0",
  "APIServerPort": 9999,
  "ParimeBinaryStorageRoot": "./parime-binary-storage/",
  "RestifyConfiguration": {
    "strictNext": true,
    "handleUpgrades": true
  }
}
```

Any settings you provide when creating the Fable instance are merged on top of these defaults.
