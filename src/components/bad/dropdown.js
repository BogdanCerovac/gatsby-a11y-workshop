import React, { useState, useRef, useEffect } from "react"
import uuid from "uuid"

import  "./dropdown.scss"

const Dropdown = ({ activatorText, items = [] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const activatorRef = useRef()
    const listRef = useRef()

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    const handleClickOutside = (event) => {
        if (isOpen && (listRef.current.contains(event.target) || activatorRef.current.contains(event.target))) {
            return
        }
        setIsOpen(false)
    }
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mouseup", handleClickOutside)
        } else {
            document.removeEventListener("mouseup", handleClickOutside)
        }
        // clean up on unmount
        return function cleanup () {
            document.removeEventListener("mouseup", handleClickOutside)
        }
      }, [isOpen])
    return (
        <div
            className="wrap"
        >
            <span
                ref={activatorRef}
                className="activator"
                onClick={handleClick}
            >
                { activatorText + '' }
            </span>
            <div
                ref={listRef}
                id={`list${uuid.v4()}`}
                className={
                    `itemList ` +
                    (isOpen ? 'active' : null)
                }
            >
                {items.map((item, index) => {
                    return <div key={index}>
                        <a href={item.url}>item.text</a>
                    </div>
                })}
            </div>
        </div>
    )
}
export default Dropdown
