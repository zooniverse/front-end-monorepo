import SelectionToolbar from './SelectionToolbar'

export default {
  title: 'Project App / Screens / Project Collection / SelectionToolbar',
  component: SelectionToolbar
}

export const Default = {
  args: { canAdd: true, canDelete: true }
}

export const Selecting = {
  args: { canAdd: true, canDelete: true, isSelecting: true }
}

export const SelectingWithSelection = {
  args: { canAdd: true, canDelete: true, isSelecting: true, selectedCount: 3 }
}

export const SelectingAllSelected = {
  args: { allSelected: true, canAdd: true, canDelete: true, isSelecting: true, selectedCount: 20 }
}

export const SelectingAsViewer = {
  args: { canAdd: true, isSelecting: true, selectedCount: 1 }
}
