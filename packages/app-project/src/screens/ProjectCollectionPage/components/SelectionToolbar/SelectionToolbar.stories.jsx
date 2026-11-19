import SelectionToolbar from './SelectionToolbar'

export default {
  title: 'Project App / Screens / Project Collection / SelectionToolbar',
  component: SelectionToolbar
}

export const Default = {
  args: { canAdd: true, canEdit: true }
}

export const Selecting = {
  args: { canAdd: true, canEdit: true, isSelecting: true }
}

export const SelectingWithSelection = {
  args: { canAdd: true, canEdit: true, isSelecting: true, selectedCount: 3 }
}

export const SelectingAllSelected = {
  args: { allSelected: true, canAdd: true, canEdit: true, isSelecting: true, selectedCount: 20 }
}

export const SelectingAsViewer = {
  args: { canAdd: true, isSelecting: true, selectedCount: 1 }
}
