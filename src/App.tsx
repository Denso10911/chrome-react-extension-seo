import React, { useEffect, useState } from "react"
import Popup from "./popup"
import useSendMessage from "./hooks/useSendMessage"

function App() {
  const [title, setTitle] = useState("")
  const [headlines, setHeadlines] = useState<string[]>([])

  const { sendMsgToTab, response } = useSendMessage()

  useEffect(() => {
    if (response) {
      setTitle(response.title)
      setHeadlines(response.headlines)
    }
  }, [response])

  useEffect(() => {
    sendMsgToTab({ type: "GET_DOM" })
  }, [])

  return <Popup title={title} headlines={headlines} />
}

export default App
