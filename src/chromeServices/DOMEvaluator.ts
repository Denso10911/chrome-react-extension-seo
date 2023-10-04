import { DOMMessage, DOMMessageResponse } from "../types"

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  let response: DOMMessageResponse = {
    title: "",
    headlines: [],
  }

  if (msg.type === "MARK_TITLE" || msg.type === "REMOVE_MARK_TITLE") {
    const selectedTitles = Array.from(document.getElementsByTagName<"h1">("h1")).filter(
      h1 => h1.innerText === msg.value
    )
    selectedTitles.forEach(title => {
      title.style.cssText += msg.type === "MARK_TITLE" ? "border: 1px solid red" : "border: none"
    })
    response = {
      title: "done",
      headlines: [],
    }
  }

  if (msg.type === "GET_DOM") {
    const headlines = Array.from(document.getElementsByTagName<"h1">("h1")).map(h1 => h1.innerText)
    response = {
      title: document?.title,
      headlines,
    }
  }

  sendResponse(response)
}

chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
