import React from "react"
import useSendMessage from "../hooks/useSendMessage"

interface Props {
  title: string
  headlines: string[]
}

const Popup: React.FC<Props> = ({ title, headlines }) => {
  const { sendMsgToTab } = useSendMessage()

  const handleTitleMouseEvent = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: "MARK_TITLE" | "REMOVE_MARK_TITLE"
  ) => {
    const target = e.target as HTMLDivElement
    await sendMsgToTab({
      type,
      value: target.innerText,
    })
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">SEO Extension built with React!</h1>
      <ul className="flex flex-col gap-3">
        <li className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Title</span>
            <span
              className={`flex w-max items-center rounded-2xl px-4 text-lg font-bold ${
                title?.length < 30 || title?.length > 65 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {title?.length} Characters
            </span>
          </div>
          <div className="italic">{title}</div>
        </li>
        <li className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Main Heading</span>
            <span
              className={`flex w-max items-center rounded-2xl bg-green-500 px-4 text-lg font-bold ${
                headlines?.length !== 1 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {headlines?.length}
            </span>
          </div>
          <div className="italic">
            {headlines?.map((headline, index) => (
              <div
                key={index}
                onMouseLeave={e => handleTitleMouseEvent(e, "REMOVE_MARK_TITLE")}
                onMouseEnter={e => handleTitleMouseEvent(e, "MARK_TITLE")}
              >
                {headline}
              </div>
            ))}
          </div>
        </li>
      </ul>
    </>
  )
}

export default Popup
