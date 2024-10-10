import React, { useState } from 'react'
import { useShortnerContext } from '../context/ContextProvider'

export default function Burger() {

    const { burger, setBurger } = useShortnerContext()

    return (
        <button style={{ transform: 'scale(0.5)', opacity:'0.5', cursor:'default' }}>
            <label className="bar morebaaar jadabaaar" htmlFor="check">
                <input
                    type="checkbox"
                    id="check"
                    checked={burger}
                    onChange={(e) => setBurger(e.target.checked)}
                />
                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
            </label>
        </button>
    )
}
