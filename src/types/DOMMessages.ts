export type DOMMessage = {
  type: "GET_DOM" | "MARK_TITLE" | "REMOVE_MARK_TITLE"
  value?: string
}

export type DOMMessageResponse = {
  title: string
  headlines: string[]
}
