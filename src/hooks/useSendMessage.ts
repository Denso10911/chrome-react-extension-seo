import { useState } from "react"
import { DOMMessage, DOMMessageResponse } from "../types"

const useSendMessage = () => {
  const [response, setResponse] = useState<DOMMessageResponse | null>(null)

  const sendMsgToTab = (message: DOMMessage) => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        tabs => {
          chrome.tabs.sendMessage(tabs[0].id || 0, message, (response: DOMMessageResponse) => {
            setResponse(response)
          })
        }
      )
  }

  return { sendMsgToTab, response }
}

export default useSendMessage
