# Easy Network

Easy Network is a static, browser-based inventory and network analysis tool. It keeps local editable projects in IndexedDB and can also export projects as portable ZIP packages or read-only published snapshots for GitHub Pages.

## Guide and Read-Only Example

For a short explanation of Easy Network and its intended use, see:

```text
docs/Easy Network.pdf
```

GitHub Pages PDF link:

```text
https://wenronghan.github.io/Easy-Network/docs/Easy%20Network.pdf
```

Read-only example inventory:

```text
https://wenronghan.github.io/Easy-Network/#/cloud/lute-iconography-dataset
```

This link opens the published `Lute Iconography` snapshot for browsing, sharing, and copying into a local editable library. It is not the browser's local editable IndexedDB library itself.

## Local Projects

Open the app normally, for example:

```text
https://wenronghan.github.io/Easy-Network/
```

Local projects are editable and saved in the current browser's IndexedDB. Existing data is preserved; this update does not change the IndexedDB schema version.

## Export

Use **Export** to choose what to export and where it goes.

Export scope:

```text
This inventory
Whole project
```

`This inventory` defaults to the inventory currently being browsed, and the dialog also lets you choose any existing inventory. `Whole project` includes all local inventories plus saved Network data.

Export destination:

```text
Download File
Create Link
```

Link permissions:

```text
Read-only
Editable
```

`Read-only` is the default. Visitors can open the link, browse the inventory/project, copy it into their own library, or export their own copy, but exporting from a read-only cloud link creates a new `copy` link instead of overwriting the original cloud slug. `Editable` links allow visitors to make changes in the browser and publish updates back to the same shared slug.

Use **Download File** to download a portable package:

```text
project-slug.easy-network.zip
```

The ZIP contains:

```text
project.json
data/artifacts.csv
images/
```

`project.json` includes the project snapshot, inventories, fields, artifacts, metadata, custom fields, image ordering, image view state, and network-related local settings. `data/artifacts.csv` is a tabular export of the same artifact dataset for review or reuse. Images are stored as real files inside `images/`, not as local filesystem paths.

Use **Import** to choose an import source:

```text
Import Local File
Import Link
```

`Import Local File` restores a portable ZIP package into the current browser. `Import Link` accepts Easy Network shared project links, published project links, or direct `project.json` URLs, then copies the project into the local editable library. If an inventory name already exists, Easy Network creates names such as `Name Copy` or `Name Copy 2`.

## Published Projects

The old separate **Export Publishable** and **Share Link** top-bar buttons have been folded into **Export**. For manual GitHub Pages publishing, the internal publishable package format is still:

```text
projects/{project-slug}/project.json
projects/{project-slug}/data/artifacts.csv
projects/{project-slug}/images/
```

Unzip it into the repository so the folder lives under `projects/{project-slug}/`, then publish the repository with GitHub Pages as usual.

Published projects are read-only snapshots. Visitors can browse inventory, images, metadata, filters, sorting, item details, and Network analysis without using their own IndexedDB.

## Project URLs

The default public site URL is:

```text
https://wenronghan.github.io/Easy-Network/
```

Published project:

```text
#/project/{projectSlug}
```

Published item:

```text
#/project/{projectSlug}/items/{artifactId}
```

Published network:

```text
#/project/{projectSlug}/network
```

In a published project, use **Copy Project Link** or **Copy Item Link** to copy the full URL.

## Share Links

Click **Create Link** to upload a snapshot through the configured Easy Network upload service. The dialog shows percentage progress while images are prepared and uploaded. The generated link opens the project through the GitHub Pages app while loading `project.json`, CSV data, and web-optimized image files from the saved snapshot. Use **Download File** when you need to preserve original image files in a portable ZIP.

The generated link is copied automatically and uses the form:

```text
#/cloud/{projectSlug}?source={projectJsonUrl}
```

The link includes the saved `project.json` URL, so another browser can load the inventory data and image files from the public share service.

## Copy to My Library

When viewing a published project, click **Copy to My Library** to create an editable local copy in IndexedDB. The copy is independent from the published snapshot; editing it never changes the public project files.

## Import / Export Notes

Image paths inside portable and published packages are relative paths such as:

```text
images/AD-01/001-photo.jpg
```

Packages must not depend on local paths such as `C:\Users\...`, `blob:`, or `localhost:` for published access.

## Restoring the Pre-Change Version

This working copy did not contain usable git metadata: `.git` existed but was empty, so no `main` commit SHA, branch, or tag could be created. Before implementation, the editable source files were copied into:

```text
archive/backup-before-shareable-projects-*
```

To restore manually, copy the files from that backup folder back to the project root.

## Known Limits

GitHub Pages publishing is still package-based: authors unzip the generated publishable package into the repository and let GitHub Pages serve it. One-click link creation requires a writable upload service; GitHub Pages alone cannot accept uploaded project files.

ZIP import is intended for Easy Network packages. Exported packages use standard uncompressed ZIP entries; import supports uncompressed entries and browser-supported deflate entries.
