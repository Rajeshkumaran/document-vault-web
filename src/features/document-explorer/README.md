# FolderView Integration with DocumentsExplorer

The DocumentsExplorer now supports switching to a FolderView when a folder is clicked in the tree navigation.

## How It Works

1. **Tree View (Default)**: Shows the traditional tree structure with expandable folders
2. **Folder View**: Shows the grid-based folder/file view when a folder is clicked

## Features Added

### In TreeNode Component:
- Added `onFolderClick` prop to handle folder click events
- Updated click handlers to distinguish between file and folder clicks
- Folders now trigger the folder view when clicked (not just expanded)

### In DocumentsExplorer Component:
- Added view mode state management (`tree` | `folder`)
- Added current folder and folder history state
- Added handlers for folder navigation in grid view
- Integrated FolderView component with proper data conversion

### Navigation Flow:
1. User clicks on a folder in the tree view → switches to folder view
2. In folder view, user can:
   - Click on subfolders to navigate deeper
   - Click on files to open them
   - Click back button to return to previous folder or tree view
3. Back navigation maintains folder history for proper breadcrumb behavior

## Data Conversion

The system converts between two data structures:
- **DocumentNode**: Tree structure used by document-explorer
- **FolderItem**: Flat structure used by FolderView

The `documentConverter.ts` utility handles this conversion automatically.

## Usage

The integration is automatic. When users click on a folder in the tree view, they will see the folder contents in a grid layout, similar to a file manager interface.

### Tree View:
```
📁 Documents
  📁 Projects
    📄 report.pdf
    📄 presentation.pptx
  📁 Personal
    📄 photo.jpg
```

### Folder View (when clicking on "Projects"):
```
[Folders section]
📁 Subfolder1  📁 Subfolder2

[Files section]  
📄 report.pdf   📄 presentation.pptx
2.4 MB         1.8 MB
```

## Benefits

- **Familiar Interface**: Users can choose between tree and grid views
- **Better File Management**: Grid view shows file sizes, types, and counts
- **Responsive Design**: Grid adapts to screen size (2-5 columns)
- **Navigation History**: Back button supports multi-level navigation
- **Consistent Styling**: Matches existing design system
